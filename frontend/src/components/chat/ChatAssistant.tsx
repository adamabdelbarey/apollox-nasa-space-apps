import React, { useState, useEffect, useRef } from 'react';
import { Mission, ChatMessage } from '../../types';
import { speechSynthesizer, SpeechState } from '../../audio/speechSynthesizer';
import { soundEffects } from '../../audio/soundEffects';
import {
  streamChatResponse,
  checkBackendHealth,
  ChatApiMessage,
  ChatSpacecraftContext,
  BackendHealthResponse,
} from '../../services/chatApi';
import {
  BotIcon,
  SendIcon,
  Volume2Icon,
  VolumeXIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  XIcon,
  Loader2Icon,
  SparklesIcon,
} from '../icons/Icons';

export interface ChatAssistantProps {
  currentMission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  currentMission,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [ttsState, setTtsState] = useState<SpeechState>(speechSynthesizer.getState());
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [backendInfo, setBackendInfo] = useState<BackendHealthResponse | null>(null);

  const conversationIdRef = useRef<string>(`apollo-cadet-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check backend health and active AI model on mount and open
  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((info) => {
      if (isMounted) {
        setBackendInfo(info);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Subscribe to speech synthesizer state changes
  useEffect(() => {
    const unsubscribe = speechSynthesizer.subscribe((state) => {
      setTtsState(state);
    });
    return unsubscribe;
  }, []);

  // Initialize welcome message when mission changes or on first mount
  useEffect(() => {
    if (messages.length === 0 || (currentMission && !messages.some(m => m.missionId === currentMission.id))) {
      const missionName = currentMission ? currentMission.name : 'Solar Exploration Platform';
      const spacecraft = currentMission ? currentMission.spacecraftName : 'our fleet of historical explorers';
      const welcomeContent = currentMission
        ? `**Hi Space Cadet!** I'm WALLE X, your space exploration robot buddy! We're exploring **${missionName}** and the amazing **${spacecraft}**!\n\nAsk me anything! Did you know astronauts set up special science detective instruments on the Moon to listen for moonquakes? What would you like to explore?`
        : `**Hi Space Cadet!** I'm WALLE X, your space exploration robot buddy! Welcome to Apollo X!\n\nAsk me anything about the Moon, Mars, astronaut moonwalks, or how my robotic rover wheels roll over alien rocks!`;

      setMessages((prev) => [
        ...prev,
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: welcomeContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          missionId: currentMission?.id,
        },
      ]);
    }
  }, [currentMission]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Handle Stop Generation
  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsGenerating(false);
    soundEffects.playClick();
  };

  // Generate fallback telemetry response if backend is offline
  const generateTelemetryFallback = (query: string, mission: Mission | null): string => {
    const q = query.toLowerCase();
    if (!mission) {
      return `Telemetry archives cover Apollo 11 (Eagle), Apollo 12 (Intrepid & ALSEP), Apollo 15 (Falcon & Lunar Rover), Mars Pathfinder (Sojourner), and Mars 1. Click on any site on the 3D globe to load active telemetry!`;
    }

    if (mission.id === 'apollo-12') {
      if (q.includes('alsep') || q.includes('instrument') || q.includes('detective') || q.includes('detect')) {
        return `**Apollo 12 ALSEP Telemetry:** The Apollo Lunar Surface Experiments Package included a passive seismometer, cold cathode ion gauge, solar wind spectrometer, and lunar dust detector powered by a SNAP-27 nuclear radioisotope thermoelectric generator (RTG). It recorded moonquake seismic waves continuously for 7.8 years!`;
      }
      if (q.includes('bell') || q.includes('vibrat') || q.includes('shake') || q.includes('quake')) {
        return `**The Lunar Bell Discovery:** When Conrad and Bean steered Intrepid's empty ascent stage into the lunar surface at 1.68 km/s, the impact released energy equivalent to 800 kg of TNT. The seismometer recorded reverberations that lasted 72 continuous minutes! Scientists concluded the lunar crust is extremely dry, rigid, and fractured.`;
      }
      if (q.includes('surveyor') || q.includes('camera') || q.includes('bacteria') || q.includes('land')) {
        return `**Pinpoint Landing & Surveyor 3:** Pete Conrad accomplished the first precision lunar landing, settling Intrepid just 180 meters from the Surveyor 3 robotic probe that landed in April 1967. The astronauts retrieved Surveyor's TV camera, soil scoop, and polished tubing for return to Earth laboratory analysis!`;
      }
    }

    if (mission.id === 'apollo-11') {
      if (q.includes('alarm') || q.includes('1202') || q.includes('1201') || q.includes('computer')) {
        return `**Descent Alarms & Manual Touchdown:** The Apollo Guidance Computer triggered 1202 and 1201 CPU overload alarms when the rendezvous radar flooded memory buffers. Software engineer Margaret Hamilton's priority executive software dropped secondary tasks while keeping critical descent thruster guidance alive, enabling Neil Armstrong to pilot Eagle manually to safety.`;
      }
      return `**Apollo 11 Eagle Telemetry:** Landed at Tranquility Base (0.67408° N, 23.47298° E) on July 20, 1969. Armstrong and Aldrin performed a 2 hour 31 minute EVA, collected 21.55 kg of lunar samples, and placed the EASEP laser ranging retroreflector, which scientists still bounce lasers off today!`;
    }

    if (mission.id === 'apollo-15') {
      if (q.includes('rover') || q.includes('car') || q.includes('buggy') || q.includes('drive')) {
        return `**Lunar Roving Vehicle (LRV-1):** The Apollo 15 "Moon Car" was built by Boeing and GM with four 0.25-hp electric wheel motors and woven zinc-coated steel wire mesh tires with titanium chevrons. Dave Scott and Jim Irwin drove 27.76 km across the Hadley-Apennine terrain, reaching speeds of 12 km/h!`;
      }
      if (q.includes('feather') || q.includes('hammer') || q.includes('galileo')) {
        return `**Galileo's Equivalence Experiment:** On August 2, 1971, Commander Dave Scott stood before the color TV camera and dropped a 1.32 kg aluminum geology hammer and a 0.03 kg falcon feather simultaneously. In the lunar vacuum, both struck the dust at the exact same instant, validating Galileo's law of falling bodies!`;
      }
    }

    if (mission.id === 'mars-pathfinder-sojourner') {
      if (q.includes('bounce') || q.includes('airbag') || q.includes('land')) {
        return `**The 15-Bounce Airbag Landing:** On July 4, 1997, Mars Pathfinder entered the Martian atmosphere at 7.3 km/s, fired retro-rockets, and deployed 24 pressurized Kevlar airbags. It slammed into Ares Vallis at 14 m/s and bounced more than 15 times over 1 km before coming to rest upright!`;
      }
      if (q.includes('sojourner') || q.includes('robot') || q.includes('rover') || q.includes('size')) {
        return `**Sojourner Rover Telemetry:** The first wheeled rover on Mars! Designed for 7 sols, it operated for 83 sols (1,180% of design lifespan). It traveled 100 meters, captured 550 images, and performed 16 chemical analyses of rocks named 'Barnacle Bill' and 'Yogi' using its Alpha Particle X-Ray Spectrometer (APXS).`;
      }
    }

    if (mission.id === 'mars-1') {
      return `**Mars 1 Telemetry:** Launched November 1, 1962 by the Soviet Union. Mars 1 made its closest approach on June 19, 1963 at approximately 193,000 km. It confirmed the existence of interplanetary magnetic fields and measured radiation belts outside Earth's magnetosphere.`;
    }

    return `Telemetry recorded for ${mission.name}: ${mission.summary} It remains preserved in the space archives for planetary exploration!`;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    const userText = inputText.trim();
    setInputText('');
    soundEffects.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      missionId: currentMission?.id,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    const controller = new AbortController();
    setAbortController(controller);

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      missionId: currentMission?.id,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialAssistantMsg]);

    // Build context object compatible with backend strict schema
    const spacecraftContext: ChatSpacecraftContext | undefined = currentMission
      ? {
          spacecraftId: currentMission.id,
          spacecraftName: currentMission.spacecraftName,
          celestialBody: currentMission.celestialBody,
          missionName: currentMission.name,
          missionFacts: [
            `Spacecraft: ${currentMission.spacecraftName}`,
            `Type: ${currentMission.spacecraftType}`,
            `Celestial Body: ${currentMission.celestialBody}`,
            `Landing Site: ${currentMission.coordinates.siteName}`,
            `Junior Hook: ${currentMission.juniorHook}`,
            `Summary: ${currentMission.summary}`,
            `Power Source: ${currentMission.technicalSpecs?.powerSource || 'Solar/RTG'}`,
            ...(currentMission.legacy?.keyDiscoveries?.slice(0, 3) || []),
          ],
        }
      : undefined;

    // Convert message history to API role format
    const apiMessages: ChatApiMessage[] = [
      ...messages
        .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim().length > 0)
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      { role: 'user', content: userText },
    ];

    let accumulatedText = '';

    try {
      await streamChatResponse({
        conversationId: conversationIdRef.current,
        messages: apiMessages,
        context: spacecraftContext,
        signal: controller.signal,
        onDelta: (token) => {
          accumulatedText += token;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: accumulatedText, isStreaming: true }
                : msg
            )
          );
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
            )
          );
          soundEffects.playDiscoveryChime();
        },
        onError: (err) => {
          console.warn('Backend SSE streaming notice:', err);
          if (!accumulatedText) {
            throw new Error(err.message || 'Streaming failed');
          }
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: msg.content + ' [Generation stopped]', isStreaming: false }
              : msg
          )
        );
      } else {
        // If backend is unavailable or stream failed with empty output, use educational fallback
        const telemetryFallback = generateTelemetryFallback(userText, currentMission);
        let currentLen = 0;
        const streamInterval = setInterval(() => {
          currentLen += 4;
          if (currentLen >= telemetryFallback.length) {
            clearInterval(streamInterval);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: telemetryFallback, isStreaming: false }
                  : msg
              )
            );
          } else {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: telemetryFallback.slice(0, currentLen), isStreaming: true }
                  : msg
              )
            );
          }
        }, 15);
      }
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] md:w-[480px] bg-[#10172E]/98 border-l-2 border-cyan-400/50  flex flex-col text-slate-100 animate-slideInRight font-sans">
      {/* Header */}
      <div className="p-4 border-b-2 border-slate-700/80 bg-[#151F3D] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center text-cyan-300 ">
            <BotIcon className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-sm tracking-wide text-white">
                WALLE X
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full">
                WALLE X Robot Guide
              </span>
            </div>
            <div className="text-xs text-slate-300 flex items-center space-x-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${backendInfo ? 'bg-emerald-400' : 'bg-cyan-400'} animate-ping`} />
              <span>
                {currentMission
                  ? `Ready to talk about ${currentMission.name}!`
                  : backendInfo
                  ? 'WALLE X Online & Ready!'
                  : 'Connecting to WALLE X...'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {/* Voice options toggle button */}
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            title="Speech Synthesis Voice Settings"
            className={`btn-bouncy p-2 rounded-xl text-xs transition-colors cursor-pointer ${
              showVoiceSettings ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Volume2Icon className="w-4 h-4 text-cyan-300" />
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              speechSynthesizer.stop();
              onClose();
            }}
            className="btn-bouncy btn-secondary p-2 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
            title="Close Chat"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Voice Settings Drawer */}
      {showVoiceSettings && (
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-bold text-cyan-400">Speech Synthesis Voice</span>
            <span className="text-[10px] text-slate-500">{ttsState.availableVoices.length} voices</span>
          </div>
          <select
            value={ttsState.currentVoice?.voiceURI || ''}
            onChange={(e) => speechSynthesizer.setVoice(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
          >
            {ttsState.availableVoices.map((v: SpeechSynthesisVoice) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400">Speech Rate: {ttsState.rate.toFixed(1)}x</span>
            <div className="flex space-x-1">
              {[0.8, 1.0, 1.2].map((r) => (
                <button
                  key={r}
                  onClick={() => speechSynthesizer.setRate(r)}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    ttsState.rate === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          const isThisSpeaking = ttsState.currentMessageId === msg.id && ttsState.status === 'playing';
          const isThisPaused = ttsState.currentMessageId === msg.id && ttsState.status === 'paused';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4  text-sm leading-relaxed ${
                  isAssistant
                    ? 'bg-[#151F3D] border-2 border-slate-700/70 text-slate-100 rounded-tl-sm'
                    : 'bg-cyan-600 text-white rounded-tr-sm  font-medium'
                }`}
              >
                {/* Header inside message */}
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10 text-xs opacity-90">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <span>{isAssistant ? 'WALLE X' : 'Space Cadet'}</span>
                  </div>
                  <span className="text-[10px] opacity-75">{msg.timestamp}</span>
                </div>

                {/* Message Body */}
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {msg.content}
                  {msg.isStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                  )}
                </div>

                {/* Assistant Audio Read Aloud & TTS Controls */}
                {isAssistant && msg.content && (
                  <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => {
                          soundEffects.playClick();
                          speechSynthesizer.speak(msg.content, msg.id);
                        }}
                        className={`btn-bouncy px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isThisSpeaking
                            ? 'btn-indigo animate-pulse'
                            : isThisPaused
                            ? 'btn-secondary text-cyan-300'
                            : 'btn-primary'
                        }`}
                      >
                        {isThisSpeaking ? (
                          <>
                            <PauseIcon className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : isThisPaused ? (
                          <>
                            <PlayIcon className="w-3.5 h-3.5" />
                            <span>Resume</span>
                          </>
                        ) : (
                          <>
                            <Volume2Icon className="w-3.5 h-3.5" />
                            <span>Read Aloud</span>
                          </>
                        )}
                      </button>

                      {(isThisSpeaking || isThisPaused) && (
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            speechSynthesizer.stop();
                          }}
                          title="Stop Speech"
                          className="btn-bouncy btn-secondary p-1 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                        >
                          <StopIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Animated Audio Equalizer Bars when speaking */}
                    {isThisSpeaking && (
                      <div className="flex items-center space-x-1 px-2.5 py-1 bg-cyan-500/20 border border-cyan-400/40 rounded-xl">
                        <span className="w-1 h-3 bg-cyan-400 rounded-full animate-audio-bar-1" />
                        <span className="w-1 h-4 bg-cyan-400 rounded-full animate-audio-bar-2" />
                        <span className="w-1 h-2 bg-cyan-400 rounded-full animate-audio-bar-3" />
                        <span className="w-1 h-3 bg-cyan-400 rounded-full animate-audio-bar-4" />
                        <span className="text-[10px] font-bold text-cyan-300 ml-1">Speaking!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area & Stop Generation button */}
      <div className="p-4 border-t-2 border-slate-700/80 bg-[#151F3D]">
        {/* Quick Suggestion Chips for Kids */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-xs">
          {[
            'Who are you, WALLE X?',
            'How do your rover wheels roll on Mars?',
            'Can the Ingenuity helicopter fly with you?',
            'Why do Moon footprints stay forever?',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setInputText(prompt);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-400/40 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {isGenerating && (
          <div className="mb-3 flex justify-center">
            <button
              onClick={handleStopGeneration}
              className="btn-bouncy btn-secondary px-4 py-1.5 rounded-xl text-xs font-bold text-cyan-300 flex items-center space-x-2  transition-all cursor-pointer border-cyan-400/40"
            >
              <StopIcon className="w-3.5 h-3.5" />
              <span>Stop Answering</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              currentMission
                ? `Ask WALLE X anything about ${currentMission.name}...`
                : 'Ask WALLE X anything about rockets, the Moon, or Mars!'
            }
            disabled={isGenerating}
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400  disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="absolute right-2 btn-bouncy btn-primary p-2 rounded-xl text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <Loader2Icon className="w-4 h-4 animate-spin text-white" />
            ) : (
              <SendIcon className="w-4 h-4 text-white" />
            )}
          </button>
        </form>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Ask questions or tap a suggestion above!</span>
          <span>Voice read-aloud ready</span>
        </div>
      </div>
    </div>
  );
};
