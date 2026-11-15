import React from 'react';
import { TimelineEvent } from '../../types';
import { RocketIcon, SparklesIcon, CompassIcon, ActivityIcon } from '../icons/Icons';

interface MissionTimelineProps {
  timeline: TimelineEvent[];
  className?: string;
}

export const MissionTimeline: React.FC<MissionTimelineProps> = ({ timeline, className = '' }) => {
  if (!timeline || timeline.length === 0) return null;

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'launch':
        return <RocketIcon className="w-4 h-4 text-cyan-400" />;
      case 'landing':
        return <CompassIcon className="w-4 h-4 text-emerald-400" />;
      case 'milestone':
        return <SparklesIcon className="w-4 h-4 text-sky-400" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="relative border-l-2 border-slate-700 ml-4 sm:ml-6 space-y-8">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Node Icon Pin */}
            <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
              {getTypeIcon(event.type)}
            </div>

            {/* Date Tag */}
            <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
              {event.date}
            </div>

            {/* Title */}
            <h4 className="text-base sm:text-lg font-black text-white font-display tracking-tight uppercase mt-0.5">
              {event.title}
            </h4>

            {/* Description */}
            <p className="mt-1 text-sm text-slate-200 leading-relaxed font-medium">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
