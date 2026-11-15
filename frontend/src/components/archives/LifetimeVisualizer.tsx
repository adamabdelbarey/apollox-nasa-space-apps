import React from 'react';
import { LifetimeMetric } from '../../types';
import { ActivityIcon, SparklesIcon, CompassIcon } from '../icons/Icons';

interface LifetimeVisualizerProps {
  lifetime: LifetimeMetric;
  celestialBody: string;
  className?: string;
}

export const LifetimeVisualizer: React.FC<LifetimeVisualizerProps> = ({
  lifetime,
  celestialBody,
  className = '',
}) => {
  const isMars = celestialBody === 'mars';

  return (
    <div className={`w-full p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 font-sans ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-6">
        <div className="flex items-center space-x-2 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
          <ActivityIcon className="w-4 h-4 text-cyan-400" />
          <span>MISSION DURATION & ENDURANCE TELEMETRY</span>
        </div>
        {lifetime.achievedRatio && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
            {lifetime.achievedRatio} of Goal
          </span>
        )}
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {/* Metric 1: Sols (if Mars) or Earth Days */}
        {isMars && lifetime.sols !== undefined ? (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-indigo-300 font-cinematic-num tracking-tight">
              {lifetime.sols.toLocaleString()}
            </div>
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mt-1">
              Martian Sols
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              1 Sol = 24h 39m 35s
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-cinematic-num tracking-tight">
              {lifetime.earthDays.toLocaleString()}
            </div>
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mt-1">
              Earth Days
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              Operational Duration
            </div>
          </div>
        )}

        {/* Metric 2: Earth Days / Years Equivalent */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-3xl sm:text-4xl font-black text-white font-cinematic-num tracking-tight">
            {lifetime.earthYears || `${Math.round(lifetime.earthDays)} Days`}
          </div>
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mt-1">
            Total Earth Time
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            {isMars ? `${Math.round(lifetime.earthDays)} Earth Days` : 'Surface & Transit'}
          </div>
        </div>

        {/* Metric 3: Planned Duration */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xl sm:text-2xl font-black text-emerald-300 font-cinematic-num tracking-tight mt-1 sm:mt-2">
            {lifetime.plannedDuration || 'Baseline'}
          </div>
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mt-1">
            Planned Lifetime
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            Primary Mission Design
          </div>
        </div>
      </div>

      {/* Explanatory Note on Sols vs Earth Days */}
      {isMars && (
        <div className="mt-5 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed font-medium flex items-start space-x-2.5">
          <SparklesIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>Astronomical Fact:</strong> A Martian solar day is termed a <strong>Sol</strong>. It lasts 24 hours, 39 minutes, and 35 seconds—roughly 2.7% longer than an Earth day. Mission controllers synchronize their daily work schedules to Mars local solar time!
          </span>
        </div>
      )}

      {/* Additional Historical Notes */}
      {lifetime.notes && (
        <p className="mt-4 text-xs text-slate-300 font-medium text-center">
          {lifetime.notes}
        </p>
      )}
    </div>
  );
};
