
import React, { useState, useMemo } from 'react';
import SolarSchematic from './components/SolarSchematic';
import { computeSolarMetrics, formatCurrency } from './services/calculations';

const App: React.FC = () => {
  const [billAmount, setBillAmount] = useState<number>(350);
  const [afaRate, setAfaRate] = useState<number>(0);

  const solarData = useMemo(() => computeSolarMetrics(billAmount, afaRate), [billAmount, afaRate]);

  const handleBillChange = (val: number) => {
    if (!isNaN(val)) {
      setBillAmount(val);
    }
  };

  const handleAfaChange = (val: number) => {
    if (!isNaN(val)) {
      setAfaRate(val);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="h-2 bg-blue-600 w-full" />
      
      <header className="bg-white border-b py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">ETERNALGY</h1>
              <p className="text-[10px] text-blue-600 font-black tracking-[0.2em] uppercase mt-1">Technical Operating Principle</p>
            </div>
          </div>

          {/* Summary Cards Layout: Recommended & Panels side-by-side on mobile, Savings underneath */}
          <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full md:w-auto">
            <div className="bg-indigo-600 px-4 py-3 rounded-xl text-center shadow-md shadow-indigo-100 text-white flex flex-col justify-center min-w-[120px]">
              <p className="text-[9px] font-black text-indigo-100 uppercase tracking-widest opacity-90">Recommended</p>
              <p className="text-lg font-black leading-tight">{solarData.systemSize.toFixed(2)} kWp</p>
            </div>
            
            <div className="bg-orange-600 px-4 py-3 rounded-xl text-center shadow-md shadow-orange-100 text-white flex flex-col justify-center min-w-[100px]">
              <p className="text-[9px] font-black text-orange-100 uppercase tracking-widest opacity-90">Panels</p>
              <p className="text-lg font-black leading-tight">{solarData.panelCount} units</p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-emerald-600 px-6 py-3 rounded-xl text-center shadow-md shadow-emerald-100 text-white flex flex-col justify-center min-w-[180px]">
              <p className="text-[9px] font-black text-emerald-100 uppercase tracking-widest opacity-90">Est. Total Saving</p>
              <p className="text-xl font-black leading-tight">{formatCurrency(solarData.totalSaving)} /mth</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-12">
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Real-Time Energy Distribution</h2>
            <p className="text-slate-500 text-sm font-medium max-w-2xl mx-auto">
              Visualizing the seamless transition between solar generation, internal consumption, and grid interaction. 
              Edit the TNB bill and <span className="text-orange-500 font-bold">AFA Rate</span> in <span className="text-blue-600 font-bold">Box A</span> to simulate scenarios.
            </p>
          </div>

          <div className="w-full">
            <SolarSchematic 
              data={solarData} 
              onBillChange={handleBillChange} 
              onAfaChange={handleAfaChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { label: 'A: INPUT', desc: 'Monthly Bill & AFA Rate' },
               { label: 'C: SOURCE', desc: 'Raw Solar Generation' },
               { label: 'E: SURPLUS', desc: 'Clean Energy to Grid' },
               { label: 'F: BALANCE', desc: 'Supplement from TNB' }
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.1em] mb-1">{item.label}</span>
                 <span className="text-xs font-bold text-slate-600">{item.desc}</span>
               </div>
             ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-black text-slate-800 tracking-widest uppercase">ETERNALGY SDN BHD (1523087-A)</p>
          <p className="text-[10px] text-slate-400 mt-2 font-bold">SOLAR SIMULATOR ENGINE v7.0 • AUTHORIZED DISTRIBUTOR</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
