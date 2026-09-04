import React, { useState } from 'react';
import QuizRunner from '../components/QuizRunner';
import { MOSPI_ROLES, DIAGNOSTIC_QUESTIONS, FRAC_PILLARS } from '../data/fracFramework';
import { calculateCompetencyGap } from '../utils/fracCalculator';
import { 
  Target, 
  Zap, 
  CheckCircle2, 
  Award, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function SkillGapAssessment({ user, setUser, setActiveTab }) {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const roleTarget = MOSPI_ROLES.find(r => r.id === user.roleId) || MOSPI_ROLES[0];
  const gapAnalysis = calculateCompetencyGap(user.currentScores, roleTarget.targets);

  const handleRoleChange = (roleId) => {
    const selected = MOSPI_ROLES.find(r => r.id === roleId);
    if (!selected) return;
    setUser({
      ...user,
      designation: selected.title,
      roleId: selected.id,
      department: selected.department,
      cadre: selected.cadre,
      currentScores: {
        statistical: Math.max(40, selected.targets.statistical - 25),
        technical: Math.max(35, selected.targets.technical - 30),
        digital_governance: Math.max(50, selected.targets.digital_governance - 15),
        behavioural: Math.max(55, selected.targets.behavioural - 20)
      }
    });
    setTestResult(null);
  };

  const handleQuizComplete = (result) => {
    setTestResult(result);
    const bonus = Math.round(result.scorePercentage * 0.15);
    setUser({
      ...user,
      currentScores: {
        statistical: Math.min(100, user.currentScores.statistical + bonus),
        technical: Math.min(100, user.currentScores.technical + bonus),
        digital_governance: Math.min(100, user.currentScores.digital_governance + Math.round(bonus * 0.8)),
        behavioural: Math.min(100, user.currentScores.behavioural + Math.round(bonus * 0.7))
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
              FRAC Pillar Diagnostics
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            MoSPI Skill-Gap Assessment & Role Profiler
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium">
            Evaluate existing competencies against official MoSPI target vectors to compute exact skill deficits.
          </p>
        </div>

        <button
          onClick={() => setIsQuizActive(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs flex items-center space-x-2 transition shadow-xl shadow-amber-500/20 shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Launch Diagnostic Test</span>
        </button>
      </div>

      {/* Target Role Selector Strip */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          1. Select Target MoSPI Role Benchmark
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOSPI_ROLES.map((role) => {
            const isSelected = role.id === user.roleId;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className={`p-3.5 rounded-xl text-left border transition ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-100">{role.title}</div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{role.department}</div>
                <div className="flex items-center space-x-2 text-[10px] text-amber-400 mt-2 font-mono font-bold">
                  <span>Target Stat: {role.targets.statistical}</span>
                  <span>•</span>
                  <span>Tech: {role.targets.technical}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FRAC Deficit Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          2. FRAC Competency Deficit Matrix vs Target Role
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FRAC_PILLARS.map((pillar) => {
            const gapInfo = gapAnalysis.gaps[pillar.id];
            const isHighDeficit = gapInfo.deficit > 20;

            return (
              <div key={pillar.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <div className="text-xs font-bold text-slate-100">{pillar.name}</div>
                    <div className="text-[10px] text-slate-400">{pillar.description}</div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    isHighDeficit
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {gapInfo.deficit === 0 ? 'Achieved' : `-${gapInfo.deficit} Gap`}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Subdomain Verification</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {pillar.subdomains.map((sub, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-medium">
                    <span>Actual: <strong className="text-amber-400">{gapInfo.userScore}</strong> / 100</span>
                    <span>Target: <strong className="text-sky-400">{gapInfo.targetScore}</strong> / 100</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isHighDeficit ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${gapInfo.percentageAchieved}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Test Runner Modal */}
      {isQuizActive && (
        <QuizRunner
          title={`FRAC Baseline Diagnostic Test - ${roleTarget.title}`}
          questions={DIAGNOSTIC_QUESTIONS}
          onClose={() => setIsQuizActive(false)}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Pathway Redirect Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between shadow-xl">
        <div>
          <h4 className="text-xs font-extrabold text-amber-300">Ready to bridge identified skill gaps?</h4>
          <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
            SwaRuchi has mapped targeted iGOT Karmayogi micro-courses and NSSTA physical workshops for your deficits.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('pathways')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 shrink-0"
        >
          <span>View Recommended Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
