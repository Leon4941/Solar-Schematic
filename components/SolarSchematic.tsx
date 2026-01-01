
import React from 'react';
import { SolarData } from '../types';
import { formatKWh } from '../services/calculations';

interface Props {
  data: SolarData;
  onBillChange: (val: number) => void;
  onAfaChange: (val: number) => void;
}

const SolarSchematic: React.FC<Props> = ({ data, onBillChange, onAfaChange }) => {
  const isGenerating = data.solarGeneration > 0;
  const isExporting = data.exportedToGrid > 0;
  const isImporting = data.importedFromGrid > 0;

  // Layout Constants
  const exportY = 380;
  const importY = 440;
  const meterX = 660;
  const gridX = 920;
  
  const panelsX = 400;
  const panelsY = 60;
  
  const inverterX = 520;
  const inverterY = 220;
  
  const homeDbWallX = 370; 
  const dbCenterY = 410; 

  const sunX = 940;
  const sunY = 50;

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
      <svg viewBox="0 0 1000 650" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f1f5f9', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1000" height="650" fill="url(#skyGrad)" />
        <path d="M0 580 H 1000" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="10 5" />
        
        {/* Sun */}
        <g transform={`translate(${sunX}, ${sunY})`}>
          <circle r="40" fill="#fbbf24" className={isGenerating ? 'animate-pulse' : ''} />
          <g stroke="#fbbf24" strokeWidth="4" strokeLinecap="round">
             {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
               <line 
                key={deg}
                x1={Math.cos(deg * Math.PI / 180) * 50} 
                y1={Math.sin(deg * Math.PI / 180) * 50} 
                x2={Math.cos(deg * Math.PI / 180) * 75} 
                y2={Math.sin(deg * Math.PI / 180) * 75} 
               />
             ))}
          </g>
        </g>

        {/* --- House Structure --- */}
        <g transform="translate(50, 210)">
          <rect width="320" height="340" fill="white" stroke="#334155" strokeWidth="4" rx="4" />
          <path d="M-20 0 L 160 -120 L 340 0" fill="white" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          
          <g transform="translate(20, 20)">
            <rect width="280" height="60" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
            <text x="15" y="25" className="text-xs font-black fill-slate-500 uppercase tracking-widest">D: Morning Usage (30%)</text>
            <text x="15" y="48" className="text-xl font-black fill-blue-700">{formatKWh(data.morningUsage)}</text>
          </g>

          <g transform="translate(20, 100)">
            <g transform="translate(10, 10)">
              <rect width="100" height="35" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" rx="4" />
              <line x1="10" y1="25" x2="90" y2="25" stroke="#cbd5e1" />
              <text x="50" y="55" textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase">Aircon</text>
              <path d="M100 17 H 280 V 140" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            </g>
            <g transform="translate(10, 130)">
              <rect width="70" height="50" fill="#1e293b" rx="2" />
              <rect x="5" y="5" width="60" height="35" fill="#334155" />
              <text x="35" y="65" textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase">TV</text>
              <path d="M70 25 H 290 V 70" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            </g>
          </g>

          <g transform="translate(290, 150)">
             <rect width="30" height="100" rx="4" fill="#334155" />
             <rect x="5" y="10" width="20" height="80" fill="#1e293b" rx="2" />
             <text x="15" y="115" textAnchor="middle" className="text-[9px] font-black fill-slate-500 uppercase">DB</text>
             <circle cx="15" cy="20" r="2" fill="#22c55e" />
          </g>
        </g>

        {/* --- Solar Panels --- */}
        <g transform={`translate(${panelsX}, ${panelsY})`}>
          <rect x="0" y="0" width="240" height="110" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="2" transform="skewX(-15)" />
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" transform="skewX(-15)">
            {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map(x => <line key={`h-${x}`} x1={x} y1="0" x2={x} y2="110" />)}
          </g>
          <text x="120" y="-15" textAnchor="middle" className="text-sm font-black fill-slate-800 uppercase tracking-widest">Solar Panels</text>
        </g>

        {/* --- Inverter --- */}
        <g transform={`translate(${inverterX}, ${inverterY})`}>
          <rect width="130" height="120" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
          <rect x="15" y="15" width="100" height="40" fill="#1e293b" rx="4" />
          <text x="65" y="40" textAnchor="middle" className="text-[10px] font-mono fill-green-400">STATUS: ON</text>
          <text x="65" y="100" textAnchor="middle" className="text-[11px] font-black fill-slate-800 uppercase tracking-widest">INVERTER</text>
        </g>

        {/* --- Path Flows --- */}
        <path d={`M${panelsX + 120} ${panelsY + 110} V ${inverterY}`} fill="none" stroke="#f97316" strokeWidth="6" />
        {isGenerating && <path d={`M${panelsX + 120} ${panelsY + 110} V ${inverterY}`} fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8" className="animate-flow" />}
        <g transform={`translate(${panelsX + 130}, ${inverterY - 30})`}>
           <rect x="0" y="-12" width="25" height="18" rx="4" fill="#f97316" />
           <text x="12.5" y="1" textAnchor="middle" className="text-[10px] font-black fill-white">DC</text>
        </g>

        <path d={`M${inverterX} ${inverterY + 60} H ${homeDbWallX + 50} V ${dbCenterY} H ${homeDbWallX}`} fill="none" stroke="#22c55e" strokeWidth="6" />
        {isGenerating && <path d={`M${inverterX} ${inverterY + 60} H ${homeDbWallX + 50} V ${dbCenterY} H ${homeDbWallX}`} fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8" className="animate-flow" />}
        <g transform={`translate(${inverterX - 60}, ${inverterY + 55})`}>
           <rect x="0" y="-12" width="25" height="18" rx="4" fill="#22c55e" />
           <text x="12.5" y="1" textAnchor="middle" className="text-[10px] font-black fill-white">AC</text>
        </g>

        <path d={`M${homeDbWallX} ${exportY} H ${meterX} H ${gridX}`} fill="none" stroke="#f59e0b" strokeWidth="6" opacity={isExporting ? 1 : 0.2} />
        {isExporting && <path d={`M${homeDbWallX} ${exportY} H ${meterX} H ${gridX}`} fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8" className="animate-flow" />}

        <path d={`M${gridX} ${importY} H ${meterX} H ${homeDbWallX}`} fill="none" stroke="#3b82f6" strokeWidth="6" opacity={isImporting ? 1 : 0.2} />
        {isImporting && <path d={`M${gridX} ${importY} H ${meterX} H ${homeDbWallX}`} fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8" className="animate-flow" />}

        {/* Meter & Grid */}
        <g transform={`translate(${meterX - 40}, 360)`}>
          <rect width="80" height="100" rx="8" fill="#1e293b" />
          <rect x="10" y="10" width="60" height="30" fill="#ecfdf5" rx="2" />
          <text x="40" y="30" textAnchor="middle" className="text-[12px] font-mono fill-slate-900">000452.1</text>
          <text x="40" y="65" textAnchor="middle" className="text-[8px] font-black fill-white uppercase text-center">TNB Meter</text>
        </g>
        <g transform={`translate(${gridX}, 350)`}>
          <line x1="0" y1="0" x2="0" y2="230" stroke="#334155" strokeWidth="8" />
          <line x1="-40" y1="40" x2="40" y2="40" stroke="#334155" strokeWidth="6" />
          <text x="0" y="240" textAnchor="middle" className="text-[11px] font-black fill-slate-800 uppercase tracking-tighter">TNB GRID</text>
        </g>

        {/* Box A/B: Interactive Input Area */}
        <foreignObject x="30" y="30" width="240" height="130">
          <div className="bg-slate-900 p-4 rounded-2xl shadow-xl border-2 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">A: TNB Bill (MYR)</label>
              <div className="flex flex-col items-end">
                 <label className="text-[8px] font-black text-orange-400 uppercase tracking-widest">AFA Rate</label>
                 <input 
                   type="number" 
                   step="0.0001"
                   value={data.afaRate}
                   onChange={(e) => onAfaChange(parseFloat(e.target.value) || 0)}
                   className="bg-transparent text-[11px] font-black text-white w-14 text-right focus:outline-none border-b border-orange-500/40 focus:border-orange-500 transition-colors"
                 />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">RM</span>
              <input 
                type="number" 
                value={data.billAmount}
                onChange={(e) => onBillChange(parseFloat(e.target.value) || 0)}
                className="bg-transparent text-3xl font-black text-white w-full focus:outline-none border-b-2 border-blue-500/30 focus:border-blue-500 transition-colors"
              />
            </div>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-wider">B: Est. {formatKWh(data.estimatedUsage)} /mo</p>
          </div>
        </foreignObject>

        {/* Legend & Other Labels */}
        <g transform="translate(680, 25)">
          <rect width="200" height="60" rx="12" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
          <text x="15" y="20" className="text-[9px] font-black fill-slate-500 uppercase tracking-tighter">C: Solar Generation</text>
          <text x="15" y="45" className="text-xl font-black fill-orange-600">{formatKWh(data.solarGeneration)}</text>
        </g>
        <g transform={`translate(${meterX + 20}, ${exportY - 90})`}>
          <rect width="180" height="75" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
          <text x="15" y="18" className="text-[9px] font-black fill-slate-500 uppercase tracking-tighter">E: Exported to Grid</text>
          <text x="15" y="42" className="text-lg font-black fill-orange-600">
            {formatKWh(data.exportedToGrid)}
          </text>
          {data.excessSolarExport > 0 && (
             <text x="15" y="60" className="text-[10px] font-bold fill-red-500">
                (+{formatKWh(data.excessSolarExport)} burned)
             </text>
          )}
        </g>
        <g transform={`translate(${meterX + 20}, ${importY + 20})`}>
          <rect width="180" height="55" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
          <text x="15" y="18" className="text-[9px] font-black fill-slate-500 uppercase tracking-tighter">F: Imported from Grid</text>
          <text x="15" y="42" className="text-lg font-black fill-blue-700">{formatKWh(data.importedFromGrid)}</text>
        </g>

        <g transform="translate(30, 595)">
           <rect width="940" height="35" rx="8" fill="#1e293b" />
           <g transform="translate(40, 22)">
              <circle r="5" fill="#f97316" />
              <text x="15" y="4" className="text-[9px] font-black uppercase tracking-widest" fill="white">DC Path</text>
           </g>
           <g transform="translate(200, 22)">
              <circle r="5" fill="#22c55e" />
              <text x="15" y="4" className="text-[9px] font-black uppercase tracking-widest" fill="white">AC Path</text>
           </g>
           <g transform="translate(420, 22)">
              <circle r="5" fill="#f59e0b" />
              <text x="15" y="4" className="text-[9px] font-black uppercase tracking-widest" fill="white">Grid Export</text>
           </g>
           <g transform="translate(640, 22)">
              <circle r="5" fill="#3b82f6" />
              <text x="15" y="4" className="text-[9px] font-black uppercase tracking-widest" fill="white">Grid Import</text>
           </g>
           <g transform="translate(850, 22)">
              <text x="0" y="4" className="text-[8px] font-black uppercase tracking-widest fill-blue-400">TECHNICAL ENGINE v7.0</text>
           </g>
        </g>
      </svg>
    </div>
  );
};

export default SolarSchematic;
