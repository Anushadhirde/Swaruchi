import React from 'react';
import FRACRadarChart from '../components/FRACRadarChart';
import { calculateCompetencyGap } from '../utils/fracCalculator';
import { MOSPI_ROLES, FRAC_PILLARS } from '../data/fracFramework';
import { IGOT_COURSES } from '../data/igotCourses';
import { NSSTA_WORKSHOPS } from '../data/nsstaWorkshops';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Compass, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Target, 
  Terminal, 
  TrendingUp, 
  Zap,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function LearnerDashboard({ user, setActiveTab, onStartAssessment }) {
  const roleTarget = MOSPI_ROLES.find(r => r.id === user.roleId) || MOSPI_ROLES[0];
  const gapAnalysis = calculateCompetencyGap(user.currentScores, roleTarget.targets);

  const enrolledIgot = IGOT_COURSES.filter(c => user.enrolledCourses.includes(c.id));
  const bookedNssta = NSSTA_WORKSHOPS.filter(w => user.bookedWorkshops.includes(w.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner */}
      <div className="relative p-6 lg:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                MoSPI Capacity Building
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {user.employeeId}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="gradient-text-saffron">{user.name}</span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
              Target Role Alignment: <strong className="text-amber-400">{roleTarget.title}</strong> • {user.department}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onStartAssessment}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs flex items-center space-x-2 transition shadow-xl shadow-amber-500/20"
            >
              <Zap className="w-4 h-4" />
              <span>Run Diagnostic Assessment</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall FRAC Readiness</div>
            <div className="text-2xl font-black text-amber-400 mt-0.5">{gapAnalysis.overallReadinessIndex}%</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">Based on target benchmark</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Learning Hours</div>
            <div className="text-2xl font-black text-sky-400 mt-0.5">{user.learningStats.hoursCompleted} hrs</div>
            <div className="text-[10px] text-slate-400 mt-1">iGOT Karmayogi Synced</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certificates & Badges</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">{user.learningStats.badgesEarned} Badges</div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">Verified MoSPI Credential</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority Skill Deficit</div>
            <div className="text-base font-bold text-rose-400 truncate mt-1">
              {gapAnalysis.highestDeficitPillar ? gapAnalysis.gaps[gapAnalysis.highestDeficitPillar].pillarName : "None"}
            </div>
            <div className="text-[10px] text-rose-300 font-semibold">-{gapAnalysis.maxDeficit} points gap</div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Radar Chart & Deficit Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col">
          <FRACRadarChart userScores={user.currentScores} targetScores={roleTarget.targets} />
        </div>

        <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Competency Gap Deficit Analysis</span>
            </h3>
            <button
              onClick={() => setActiveTab('assessment')}
              className="text-xs text-amber-400 hover:underline font-bold"
            >
              Recalibrate Baseline →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FRAC_PILLARS.map((pillar) => {
              const gapInfo = gapAnalysis.gaps[pillar.id];
              const isHighDeficit = gapInfo.deficit > 20;

              return (
                <div
                  key={pillar.id}
                  className={`p-4 rounded-2xl border transition-all bg-slate-900 shadow-lg ${
                    isHighDeficit
                      ? 'border-rose-500/40 shadow-rose-950/20'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-slate-100">{pillar.name}</div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isHighDeficit
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {gapInfo.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>Current: <strong className="text-amber-400">{gapInfo.userScore}</strong></span>
                      <span>Target: <strong className="text-sky-400">{gapInfo.targetScore}</strong></span>
                    </div>

                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHighDeficit ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${gapInfo.percentageAchieved}%` }}
                      ></div>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 font-medium">
                      <span>Deficit Gap: <strong>{gapInfo.deficit} points</strong></span>
                      <span>{gapInfo.percentageAchieved}% Achieved</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Dual-Stream Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-sky-400" />
              <span>Personalized Dual-Stream Pathway Recommendations</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Synchronizing iGOT Karmayogi digital micro-learning with NSSTA TPAC physical cohorts.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('pathways')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 font-bold text-xs border border-slate-800 transition"
          >
            Explore Full Roadmap →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* iGOT Micro-Learning Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center font-extrabold text-xs">
                  iGOT
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">iGOT Karmayogi Digital Micro-Courses</h3>
                  <div className="text-[10px] text-slate-400">Self-Paced Theoretical Mastery</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                2 Enrolled
              </span>
            </div>

            <div className="space-y-3">
              {enrolledIgot.map((course) => (
                <div key={course.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{course.title}</div>
                    <div className="text-[10px] text-slate-400 flex items-center space-x-2 mt-0.5">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">{course.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('pathways')}
                    className="p-2 rounded-lg bg-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-slate-950 font-bold text-xs transition border border-sky-500/30"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NSSTA Physical Cohort Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-extrabold text-xs">
                  NSSTA
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">NSSTA TPAC Physical Workshops</h3>
                  <div className="text-[10px] text-slate-400">On-Site Residential Practical Cohorts</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                1 Reserved
              </span>
            </div>

            <div className="space-y-3">
              {bookedNssta.map((ws) => (
                <div key={ws.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{ws.title}</div>
                    <div className="text-[10px] text-amber-400 font-semibold mt-0.5">
                      {ws.venue} • {ws.startDate}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Practical Labs Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Interactive Hands-on Statistical Virtual Labs</h3>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              Practice Python data analysis, SQL queries on NSSO microdata, and R statistical scripts right in your browser.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('labs')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 transition shrink-0 shadow-lg shadow-emerald-500/20"
        >
          <span>Launch Virtual Lab</span>
          <Terminal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
