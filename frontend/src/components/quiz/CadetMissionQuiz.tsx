import React, { useState, useEffect } from 'react';
import { MISSION_QUIZZES, MissionQuiz } from '../../data/quizData';
import { soundEffects } from '../../audio/soundEffects';
import {
  AwardIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  RotateCcwIcon,
  SparklesIcon,
  RocketIcon,
  ChevronRightIcon,
} from '../icons/Icons';

export interface CadetMissionQuizProps {
  missionId: string;
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz?: (missionId: string, xpEarned: number) => void;
}

export const CadetMissionQuiz: React.FC<CadetMissionQuizProps> = ({
  missionId,
  isOpen,
  onClose,
  onCompleteQuiz,
}) => {
  const quizData: MissionQuiz | undefined = MISSION_QUIZZES[missionId];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shakeOption, setShakeOption] = useState<number | null>(null);

  // Global Cadet Stats stored in localStorage
  const [totalXp, setTotalXp] = useState(() => {
    try {
      const saved = localStorage.getItem('apollo_cadet_xp');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Reset quiz state when mission changes or when opened
  useEffect(() => {
    if (isOpen) {
      setQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setIsQuizFinished(false);
    }
  }, [missionId, isOpen]);

  if (!isOpen || !quizData) return null;

  const currentQuestion = quizData.questions[questionIndex];
  const totalQuestions = quizData.questions.length;

  const getCadetRank = (xp: number) => {
    if (xp >= 1600) return { title: 'NASA Space Apps Commander', level: 5 };
    if (xp >= 1000) return { title: 'Mission Flight Specialist', level: 4 };
    if (xp >= 600) return { title: 'Lunar & Martian Scout', level: 3 };
    if (xp >= 300) return { title: 'Planetary Explorer', level: 2 };
    return { title: 'Junior Space Cadet', level: 1 };
  };

  const rank = getCadetRank(totalXp + sessionXp);

  const handleSelectOption = (idx: number) => {
    if (isAnswered && isCorrect) return; // already got this question right

    setSelectedOption(idx);
    const correct = idx === currentQuestion.correctIndex;

    if (correct) {
      soundEffects.playSuccess();
      setIsAnswered(true);
      setIsCorrect(true);
      setSessionXp((prev) => prev + 100);

      // Save to global XP
      const newXp = totalXp + 100;
      setTotalXp(newXp);
      try {
        localStorage.setItem('apollo_cadet_xp', newXp.toString());
      } catch {}
    } else {
      soundEffects.playRattle();
      setShakeOption(idx);
      setTimeout(() => setShakeOption(null), 500);
      setIsCorrect(false);
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // Quiz Completed!
      soundEffects.playSuccess();
      setIsQuizFinished(true);

      // Record Badge
      try {
        const rawBadges = localStorage.getItem('apollo_earned_badges');
        const badges: string[] = rawBadges ? JSON.parse(rawBadges) : [];
        if (!badges.includes(quizData.badgeTitle)) {
          badges.push(quizData.badgeTitle);
          localStorage.setItem('apollo_earned_badges', JSON.stringify(badges));
        }
      } catch {}

      if (onCompleteQuiz) {
        onCompleteQuiz(missionId, sessionXp);
      }
    }
  };

  const handleRestartQuiz = () => {
    soundEffects.playClick();
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsQuizFinished(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn select-none pointer-events-auto"
      role="dialog"
      aria-label="Space Cadet Mission Quiz"
    >
      <div className="relative w-full max-w-xl bg-[#070D1E]/95 border-2 border-cyan-500/80 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.35)] p-5 sm:p-7 flex flex-col space-y-5 text-slate-100 font-sans max-h-[92vh] overflow-y-auto">
        {/* Top Header: Rank, XP & Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
          {/* Cadet Rank Badge */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-600 flex items-center justify-center text-cyan-300 shadow">
              <StarIcon className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-black uppercase tracking-wider text-cyan-400">
                Rank Level {rank.level} • {rank.title}
              </div>
              <div className="text-xs font-bold text-white flex items-center space-x-1.5 font-mono">
                <span>{totalXp + sessionXp} XP</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-300">Space Cadet Registry</span>
              </div>
            </div>
          </div>

          {/* Close Modal Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="btn-bouncy p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer shadow"
            title="Close Quiz"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* VIEW A: QUIZ QUESTIONS IN PROGRESS                                  */}
        {/* =================================================================== */}
        {!isQuizFinished ? (
          <div className="flex flex-col space-y-4">
            {/* Mission Category & Progress Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/80 text-[10px] sm:text-xs font-black uppercase tracking-wider text-cyan-300">
                <RocketIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{quizData.missionName}</span>
              </div>

              <div className="text-xs font-mono font-bold text-slate-300">
                Question {questionIndex + 1} of {totalQuestions}
              </div>
            </div>

            {/* Question Prompt Card */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border-2 border-cyan-900/60 shadow-lg">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* 4 Interactive Multiple-Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {currentQuestion.options.map((opt, idx) => {
                const isThisSelected = selectedOption === idx;
                const isThisCorrect = isThisSelected && isCorrect;
                const isThisWrong = isThisSelected && !isCorrect;
                const isShaking = shakeOption === idx;

                let btnStyle =
                  'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800/90 hover:border-cyan-600/70';

                if (isThisCorrect) {
                  btnStyle =
                    'bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]';
                } else if (isThisWrong) {
                  btnStyle = 'bg-slate-950 border-slate-700 text-slate-400 opacity-70';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`btn-bouncy p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${btnStyle} ${
                      isShaking ? 'animate-shake' : ''
                    }`}
                  >
                    <span className="flex-1 pr-2">{opt}</span>
                    <div className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-black">
                      {isThisCorrect ? (
                        <CheckIcon className="w-3.5 h-3.5 text-cyan-300" />
                      ) : (
                        <span>{String.fromCharCode(65 + idx)}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fun Fact / Intel Feedback (Revealed on Answer) */}
            {isAnswered && (
              <div
                className={`p-3.5 rounded-2xl border transition-all animate-fadeIn ${
                  isCorrect
                    ? 'bg-cyan-950/80 border-cyan-500/80 text-cyan-200'
                    : 'bg-slate-900/90 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 font-mono text-[11px] font-black uppercase">
                  {isCorrect ? (
                    <>
                      <SparklesIcon className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      <span className="text-cyan-300">Correct! +100 Explorer XP Earned</span>
                    </>
                  ) : (
                    <>
                      <RotateCcwIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-300">Not quite! Tap another option to try again, Cadet!</span>
                    </>
                  )}
                </div>

                {isCorrect && (
                  <p className="text-xs text-slate-100 font-medium pt-1.5 leading-relaxed">
                    {currentQuestion.funFact}
                  </p>
                )}
              </div>
            )}

            {/* Next Question / Proceed Button */}
            {isCorrect && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="btn-bouncy px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-black flex items-center space-x-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse"
                >
                  <span>
                    {questionIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Mission Quiz'}
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* =================================================================== */
          /* VIEW B: QUIZ COMPLETED - CELEBRATION & BADGE REWARD                */
          /* =================================================================== */
          <div className="flex flex-col items-center text-center space-y-4 py-2 animate-fadeIn">
            {/* Holographic Badge Card */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-cyan-950/90 border-4 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <AwardIcon className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-300 animate-bounce" />
              <div className="absolute -inset-2 rounded-3xl border border-cyan-400/40 animate-ping pointer-events-none" />
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-cyan-400">
                Official NASA Space Apps Cadet Badge Unlocked!
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-cinematic-title text-white uppercase tracking-tight pt-1">
                {quizData.badgeTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto pt-1 leading-relaxed">
                {quizData.badgeDescription}
              </p>
            </div>

            {/* Rewards Summary */}
            <div className="w-full bg-slate-950/90 p-4 rounded-2xl border border-cyan-900/60 flex items-center justify-around font-mono">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase">XP Awarded</span>
                <span className="text-lg font-black text-cyan-300">+{sessionXp} XP</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase">Current Rank</span>
                <span className="text-sm font-black text-white">{rank.title}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 w-full max-w-sm">
              <button
                onClick={handleRestartQuiz}
                className="btn-bouncy w-1/2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow"
              >
                <RotateCcwIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Replay Quiz</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                }}
                className="btn-bouncy w-1/2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-slate-950" />
                <span>Return to 3D Spacecraft</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
