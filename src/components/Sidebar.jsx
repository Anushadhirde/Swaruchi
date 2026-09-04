import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Compass, 
  Terminal, 
  FileQuestion, 
  BarChart2, 
  Bot, 
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, setIsAiOpen }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Learner Dashboard',
      subLabel: 'Overview & Competencies',
      icon: LayoutDashboard,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      id: 'assessment',
      label: 'FRAC Skill Diagnostic',
      subLabel: 'Baseline & Deficit Analysis',
      icon: Target,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 'pathways',
      label: 'Learning Pathways',
      subLabel: 'iGOT + NSSTA Dual Stream',
      icon: Compass,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10'
    },
    {
      id: 'labs',
      label: 'Virtual Practical Labs',
      subLabel: 'Python, SQL, R Sandbox',
      icon: Terminal,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      id: 'quizgen',
      label: 'Multimodal MCQ RAG',
      subLabel: 'Auto Question Generator',
      icon: FileQuestion,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'admin',
      label: 'Workforce Admin Matrix',
      subLabel: 'MoSPI National Analytics',
      icon: BarChart2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-65px)] p-3">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          Skill Intelligence Modules
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left p-2.5 rounded-xl transition flex items-center space-x-3 group relative ${
                isActive
                  ? 'bg-slate-800 border border-slate-700/80 text-white font-bold shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-amber-500 rounded-r-full shadow-glow"></div>
              )}
              <div
                className={`p-2 rounded-lg ${item.bgColor} ${item.color} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{item.label}</div>
                <div className="text-[10px] text-slate-500 leading-tight font-medium">{item.subLabel}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Assistant Launcher Widget */}
      <div className="pt-4 border-t border-slate-800">
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-purple-500/5 to-slate-950 border border-amber-500/30 text-left relative overflow-hidden shadow-xl">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 font-extrabold">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 flex items-center space-x-1">
                <span>SwaRuchi Mitra AI</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Llama 3</span>
              </div>
              <div className="text-[10px] text-slate-400">Statistical Llama LLM Tutor</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug mb-3 font-medium">
            Powered by <strong>Meta Llama 3.3 70B</strong>. Ask SNA 2008 & NSSO survey questions.
          </p>
          <button
            onClick={() => setIsAiOpen(true)}
            className="w-full py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-1.5 transition shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Llama Assistant</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
