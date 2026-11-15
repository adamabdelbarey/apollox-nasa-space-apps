import React, { useState } from 'react';

export interface RocketShipProps {
  onClick?: () => void;
  isLaunching?: boolean;
  launchPhase?: 'idle' | 'activation' | 'ignition' | 'liftoff' | 'transition' | 'completed';
  className?: string;
  rocketRef?: React.RefObject<HTMLDivElement | null>;
}

export const RocketShip: React.FC<RocketShipProps> = ({
  onClick,
  isLaunching = false,
  launchPhase = 'idle',
  className = '',
  rocketRef,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isActivated = launchPhase === 'activation';
  const isIgnited = launchPhase === 'ignition' || launchPhase === 'liftoff';

  return (
    <div
      ref={rocketRef}
      role="button"
      tabIndex={0}
      aria-label="Launch Apollo X Space Adventure - Press START"
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-300 outline-none ${
        isHovered && !isLaunching ? '-translate-y-3 scale-102' : ''
      } ${className}`}
      style={{
        width: 'min(70vw, 340px)',
        height: 'min(72vh, 620px)',
      }}
    >
      {/* Main Vector Rocket (Solid flat design, no shadows or glows) */}
      <svg
        viewBox="0 0 340 860"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          animation: isLaunching ? 'none' : 'friendly-float 4.2s ease-in-out infinite',
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="fuselageGrad" x1="50" y1="180" x2="290" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="75%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Nose Cone: Cosmic Sapphire & Deep Blue */}
          <linearGradient id="noseGrad" x1="170" y1="20" x2="170" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Fins: Sapphire to Royal Blue */}
          <linearGradient id="finGradLeft" x1="20" y1="520" x2="110" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          <linearGradient id="finGradRight" x1="320" y1="520" x2="230" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Trim: Lunar Cyan Chrome */}
          <linearGradient id="cyanTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="portholeGlass" x1="140" y1="250" x2="200" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Plasma Engine Flame Plume (Electric Blue & Pure White Cryogenic Thrust) */}
          <linearGradient id="flameInner" x1="170" y1="740" x2="170" y2="850" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E0F2FE" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="flameOuter" x1="170" y1="730" x2="170" y2="860" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. LEFT FIN */}
        <path
          d="M 98 530
             C 70 540, 24 610, 16 705
             C 12 735, 45 745, 65 725
             C 85 705, 104 680, 108 670 Z"
          fill="url(#finGradLeft)"
          stroke="#075985"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Left Fin Cyan Accent Trim */}
        <path
          d="M 28 695 C 40 680, 68 640, 92 600"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 2. RIGHT FIN */}
        <path
          d="M 242 530
             C 270 540, 316 610, 324 705
             C 328 735, 295 745, 275 725
             C 255 705, 236 680, 232 670 Z"
          fill="url(#finGradRight)"
          stroke="#075985"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Right Fin Cyan Accent Trim */}
        <path
          d="M 312 695 C 300 680, 272 640, 248 600"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 3. CENTER FIN / STABILIZER */}
        <path
          d="M 170 560
             L 162 705
             C 162 715, 178 715, 178 705
             L 170 560 Z"
          fill="#0284C7"
          stroke="#075985"
          strokeWidth="2.5"
        />

        {/* 4. MAIN FUSELAGE / BODY */}
        <path
          d="M 170 110
             C 112 180, 88 280, 88 470
             C 88 575, 96 660, 104 700
             L 236 700
             C 244 660, 252 575, 252 470
             C 252 280, 228 180, 170 110 Z"
          fill="url(#fuselageGrad)"
          stroke="#334155"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Fuselage Curvature Highlight */}
        <path
          d="M 160 120
             C 142 145, 115 230, 112 380
             C 110 490, 116 590, 120 670"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* 5. NOSE CONE (Cosmic Sapphire) */}
        <path
          d="M 170 35
             C 170 35, 195 85, 222 170
             L 118 170
             C 145 85, 170 35, 170 35 Z"
          fill="url(#noseGrad)"
          stroke="#075985"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Cyan Antenna Tip */}
        <circle cx="170" cy="24" r="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
        <line x1="170" y1="24" x2="170" y2="40" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

        {/* Nose Cone Collar Ring */}
        <rect x="117" y="166" width="106" height="12" rx="6" fill="url(#cyanTrim)" stroke="#0369A1" strokeWidth="2" />

        {/* 6. BIG FRIENDLY PORTHOLE WINDOW */}
        {/* Outer Cyan Bezel with Screws */}
        <circle cx="170" cy="265" r="46" fill="url(#cyanTrim)" stroke="#075985" strokeWidth="3" />
        {/* Rivet studs */}
        <circle cx="170" cy="225" r="2.5" fill="#0C4A6E" />
        <circle cx="170" cy="305" r="2.5" fill="#0C4A6E" />
        <circle cx="130" cy="265" r="2.5" fill="#0C4A6E" />
        <circle cx="210" cy="265" r="2.5" fill="#0C4A6E" />
        <circle cx="142" cy="237" r="2.5" fill="#0C4A6E" />
        <circle cx="198" cy="237" r="2.5" fill="#0C4A6E" />
        <circle cx="142" cy="293" r="2.5" fill="#0C4A6E" />
        <circle cx="198" cy="293" r="2.5" fill="#0C4A6E" />

        {/* Glass Dome */}
        <circle cx="170" cy="265" r="36" fill="url(#portholeGlass)" stroke="#0369A1" strokeWidth="2.5" />

        {/* Little Cadet Helmet inside */}
        <g transform="translate(152, 246)">
          <circle cx="18" cy="18" r="15" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="18" cy="17" rx="10" ry="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <ellipse cx="15" cy="14" rx="4" ry="2" fill="#FFFFFF" fillOpacity="0.8" transform="rotate(-20 15 14)" />
        </g>

        {/* Glass Crescent Highlight */}
        <path
          d="M 145 255 A 30 30 0 0 1 195 255 A 26 26 0 0 0 145 255 Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
        />

        {/* 7. MIDDLE ACCENT WAIST BELT WITH GEOMETRIC DIAMONDS */}
        <rect x="99" y="336" width="142" height="18" rx="5" fill="url(#cyanTrim)" stroke="#0369A1" strokeWidth="2" />
        <polygon points="126,340 130,345 126,350 122,345" fill="#FFFFFF" />
        <polygon points="170,340 174,345 170,350 166,345" fill="#FFFFFF" />
        <polygon points="214,340 218,345 214,350 210,345" fill="#FFFFFF" />

        {/* =================================================================== */}
        {/* 8. VERTICAL "S T A R T" LETTERING - CRISP SOLID CYAN (NO SHADOW)    */}
        {/* =================================================================== */}
        <g className="transition-all duration-300">
          {/* Container behind START */}
          <rect
            x="138"
            y="375"
            width="64"
            height="275"
            rx="24"
            fill="#0B132B"
            fillOpacity="0.92"
            stroke="url(#cyanTrim)"
            strokeWidth="3"
          />

          {/* Letter S */}
          <text
            x="170"
            y="425"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="34"
            fill="#38BDF8"
          >
            S
          </text>

          {/* Letter T */}
          <text
            x="170"
            y="478"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="34"
            fill="#38BDF8"
          >
            T
          </text>

          {/* Letter A */}
          <text
            x="170"
            y="531"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="34"
            fill="#38BDF8"
          >
            A
          </text>

          {/* Letter R */}
          <text
            x="170"
            y="584"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="34"
            fill="#38BDF8"
          >
            R
          </text>

          {/* Letter T */}
          <text
            x="170"
            y="637"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="34"
            fill="#38BDF8"
          >
            T
          </text>
        </g>

        {/* 9. ROCKET BASE & ENGINE NOZZLE BELLS */}
        <rect x="110" y="694" width="120" height="14" rx="5" fill="#334155" stroke="#1E293B" strokeWidth="2" />
        {/* Left Nozzle */}
        <path d="M 125 708 L 118 732 L 146 732 L 140 708 Z" fill="#64748B" stroke="#334155" strokeWidth="2" />
        {/* Center Main Nozzle */}
        <path d="M 152 708 L 142 740 L 198 740 L 188 708 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        {/* Right Nozzle */}
        <path d="M 200 708 L 194 732 L 222 732 L 215 708 Z" fill="#64748B" stroke="#334155" strokeWidth="2" />

        {/* =================================================================== */}
        {/* 10. CRYOGENIC PLASMA THRUST (Electric Cyan - Active on hover/launch)*/}
        {/* =================================================================== */}
        <g
          className="transition-opacity duration-300"
          style={{
            opacity: isIgnited ? 1 : isActivated ? 0.8 : isHovered ? 0.75 : 0.35,
          }}
        >
          {/* Outer Flame Blast */}
          <path
            d="M 142 740 C 120 780, 130 840, 170 855 C 210 840, 220 780, 198 740 Z"
            fill="url(#flameOuter)"
            style={{
              animation: 'flame-bounce 0.18s ease-in-out infinite',
              transformOrigin: '170px 740px',
            }}
          />

          {/* Inner Core */}
          <path
            d="M 152 740 C 140 765, 145 810, 170 820 C 195 810, 200 765, 188 740 Z"
            fill="url(#flameInner)"
            style={{
              animation: 'flame-bounce 0.14s ease-in-out infinite alternate',
              transformOrigin: '170px 740px',
            }}
          />

          {/* Side plasma puffs */}
          <ellipse cx="132" cy="746" rx="8" ry="12" fill="#38BDF8" opacity="0.8" />
          <ellipse cx="208" cy="746" rx="8" ry="12" fill="#38BDF8" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
