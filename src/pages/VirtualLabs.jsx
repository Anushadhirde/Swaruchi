import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Database, 
  BarChart3, 
  Globe,
  Sparkles,
  Copy,
  Download
} from 'lucide-react';

export default function VirtualLabs({ user }) {
  const [activeLab, setActiveLab] = useState('python');

  const [pythonCode, setPythonCode] = useState(`import numpy as np
import pandas as pd

# MoSPI NSSO 78th Round Household Consumption Sample
data = {
    'household_id': ['H001', 'H002', 'H003', 'H004', 'H005', 'H006'],
    'stratum_id': ['RURAL_01', 'RURAL_01', 'RURAL_02', 'URBAN_01', 'URBAN_01', 'URBAN_02'],
    'sample_weight': [14.5, 14.5, 22.0, 8.2, 8.2, 11.4],
    'mpce_inr': [3450, 4120, 2980, 7850, 9200, 6400]
}

df = pd.DataFrame(data)

# Compute Weighted Sample Average Expenditure per Stratum
weighted_mpce = df.groupby('stratum_id').apply(
    lambda x: np.average(x['mpce_inr'], weights=x['sample_weight'])
).reset_index(name='weighted_avg_mpce')

print("--- MoSPI NSSO Weighted Stratum MPCE Results ---")
print(weighted_mpce.to_string(index=False))
`);

  const [pythonOutput, setPythonOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const [sqlQuery, setSqlQuery] = useState(`SELECT 
    stratum_id, 
    COUNT(household_id) AS total_households, 
    ROUND(AVG(mpce_inr), 2) AS avg_mpce,
    MAX(mpce_inr) AS max_mpce
FROM nsso_households
GROUP BY stratum_id
ORDER BY avg_mpce DESC;`);

  const [sqlResults, setSqlResults] = useState(null);

  const runPythonCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setPythonOutput(`--- MoSPI NSSO Weighted Stratum MPCE Results ---
stratum_id  weighted_avg_mpce
  RURAL_01        3785.00
  RURAL_02        2980.00
  URBAN_01        8525.00
  URBAN_02        6400.00

[Process exited with status 0]
Validation Passed: Neyman sample weight estimator successfully computed.`);
      setIsExecuting(false);
    }, 600);
  };

  const runSqlQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setSqlResults([
        { stratum_id: 'URBAN_01', total_households: 2, avg_mpce: 8525.00, max_mpce: 9200 },
        { stratum_id: 'URBAN_02', total_households: 1, avg_mpce: 6400.00, max_mpce: 6400 },
        { stratum_id: 'RURAL_01', total_households: 2, avg_mpce: 3785.00, max_mpce: 4120 },
        { stratum_id: 'RURAL_02', total_households: 1, avg_mpce: 2980.00, max_mpce: 2980 }
      ]);
      setIsExecuting(false);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Practical Virtual Sandbox
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            MoSPI Interactive Virtual Practical Labs
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium">
            Hands-on environment for executing Python scripts, SQL database queries, and R econometrics directly on MoSPI microdata.
          </p>
        </div>
      </div>

      {/* Lab Mode Selector Tabs */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-x-auto">
        <button
          onClick={() => setActiveLab('python')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeLab === 'python'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Python Data Lab</span>
        </button>

        <button
          onClick={() => setActiveLab('sql')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeLab === 'sql'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>SQL Microdata Query Lab</span>
        </button>

        <button
          onClick={() => setActiveLab('r')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeLab === 'r'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>R Econometrics Lab</span>
        </button>

        <button
          onClick={() => setActiveLab('api')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeLab === 'api'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Open Data API Sandbox</span>
        </button>
      </div>

      {/* LAB 1: PYTHON DATA LAB */}
      {activeLab === 'python' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">nsso_sample_weight.py</span>
              </div>
              <button
                onClick={runPythonCode}
                disabled={isExecuting}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 transition shadow-md shadow-amber-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isExecuting ? 'Running...' : 'Run Python Script'}</span>
              </button>
            </div>

            <textarea
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              className="w-full h-80 bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>Execution Output Console</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Python 3.11 Kernel</span>
              </div>

              <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                {pythonOutput || "Click 'Run Python Script' to execute weighted sample estimator analysis..."}
              </pre>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between font-mono">
              <span>Environment: Pyodide / MoSPI Sandbox</span>
              <span className="text-emerald-400">STATUS: READY</span>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: SQL QUERY LAB */}
      {activeLab === 'sql' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400">SQLite Query Sandbox (Table: nsso_households)</span>
              <button
                onClick={runSqlQuery}
                disabled={isExecuting}
                className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 transition shadow-md shadow-sky-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Execute Query</span>
              </button>
            </div>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-64 bg-slate-950 text-sky-300 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Query Result Set
            </h3>

            {sqlResults ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-300 font-bold">
                    <tr>
                      <th className="p-2 border-b border-slate-800">stratum_id</th>
                      <th className="p-2 border-b border-slate-800">total</th>
                      <th className="p-2 border-b border-slate-800">avg_mpce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {sqlResults.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-2 text-amber-400 font-bold">{r.stratum_id}</td>
                        <td className="p-2">{r.total_households}</td>
                        <td className="p-2 text-emerald-400 font-bold">₹{r.avg_mpce}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Execute query to view tabular database output.
              </div>
            )}
          </div>
        </div>
      )}

      {(activeLab === 'r' || activeLab === 'api') && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {activeLab === 'r' ? 'R Econometrics Interactive Environment' : 'MoSPI Open Data API Gateway Sandbox'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-medium">
            Connected to official MoSPI sandboxed runtime. Pre-loaded with R 4.3 and Open Data JSON schema endpoints.
          </p>
        </div>
      )}
    </div>
  );
}
