import React from 'react';
import { FRAC_PILLARS } from '../data/fracFramework';

export default function FRACRadarChart({ userScores, targetScores }) {
  // 4 FRAC Pillars
  const pillars = FRAC_PILLARS;
  const numPillars = pillars.length;

  const size = 320;
  const center = size / 2;
  const radius = 105;

  // Calculate polygon points given an array of score values (0 - 100)
  const getCoordinates = (scores) => {
    return pillars.map((pillar, i) => {
      const angle = (Math.PI * 2 / numPillars) * i - Math.PI / 2;
      const score = Math.min(100, Math.max(0, scores[pillar.id] || 0));
      const r = (score / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, score, angle, pillarName: pillar.name };
    });
  };

  const currentCoords = getCoordinates(userScores);
  const targetCoords = getCoordinates(targetScores);

  const currentPoints = currentCoords.map(c => `${c.x},${c.y}`).join(' ');
  const targetPoints = targetCoords.map(c => `${c.x},${c.y}`).join(' ');

  // Grid concentric circles (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          FRAC Competency Radar
        </h3>
        <div className="flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-300 font-bold">Actual Score</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 border border-sky-300 border-dashed"></span>
            <span className="text-slate-400 font-medium">Target Benchmark</span>
          </div>
        </div>
      </div>

      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="currentFillDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Concentric grid circles */}
        {gridLevels.map((lvl, idx) => (
          <polygon
            key={idx}
            points={pillars.map((_, i) => {
              const angle = (Math.PI * 2 / numPillars) * i - Math.PI / 2;
              const r = lvl * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray={lvl === 1.0 ? "0" : "3,3"}
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {pillars.map((_, i) => {
          const angle = (Math.PI * 2 / numPillars) * i - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Target Benchmark Area */}
        <polygon
          points={targetPoints}
          fill="rgba(56, 189, 248, 0.08)"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />

        {/* Current Score Polygon */}
        <polygon
          points={currentPoints}
          fill="url(#currentFillDark)"
          stroke="#f59e0b"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Points on radar */}
        {currentCoords.map((pt, i) => (
          <g key={i}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="5"
              fill="#f59e0b"
              stroke="#0f172a"
              strokeWidth="2"
              className="hover:scale-125 transition-transform"
            />
          </g>
        ))}

        {/* Outer Pillar Labels */}
        {pillars.map((pillar, i) => {
          const angle = (Math.PI * 2 / numPillars) * i - Math.PI / 2;
          const labelDist = radius + 32;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          const userVal = userScores[pillar.id] || 0;
          const targetVal = targetScores[pillar.id] || 80;

          return (
            <g key={i} className="text-center">
              <text
                x={lx}
                y={ly - 6}
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="11"
                fontWeight="800"
              >
                {pillar.name.split(' ')[0]}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="600"
              >
                <tspan fill="#f59e0b" fontWeight="800">{userVal}</tspan> / <tspan fill="#38bdf8">{targetVal}</tspan>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
