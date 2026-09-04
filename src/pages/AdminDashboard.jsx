import React, { useState } from 'react';
import { MOSPI_ROLES, FRAC_PILLARS } from '../data/fracFramework';
import { NSSTA_WORKSHOPS } from '../data/nsstaWorkshops';
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  Award, 
  Building2, 
  Calendar, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  PieChart
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeAdminTab, setActiveAdminTab] = useState('analytics');
  const [workshops, setWorkshops] = useState(NSSTA_WORKSHOPS);

  const [newWsTitle, setNewWsTitle] = useState('');
  const [newWsVenue, setNewWsVenue] = useState('NSSTA Complex, Greater Noida');

  const handleAddWorkshop = (e) => {
    e.preventDefault();
    if (!newWsTitle) return;
    const created = {
      id: `nssta-ws-new-${Date.now()}`,
      title: newWsTitle,
      organizer: "National Statistical Systems Training Academy (NSSTA)",
      venue: newWsVenue,
      mode: "Physical Residential",
      startDate: "2026-12-10",
      endDate: "2026-12-14",
      durationDays: 5,
      seatsTotal: 40,
      seatsAvailable: 40,
      faculty: "ISS Senior Directorate",
      targetedPillar: "statistical",
      topics: ["Custom MoSPI Capacity Building Module"],
      status: "Enrollment Open"
    };
    setWorkshops([created, ...workshops]);
    setNewWsTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              MoSPI Executive Intelligence
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            Workforce Competency & HR Analytics Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium">
            Macro-level dashboard monitoring skill distribution, iGOT Karmayogi utilization, and NSSTA cohort capacity building.
          </p>
        </div>
      </div>

      {/* Admin Sub-tabs */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeAdminTab === 'analytics'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Workforce Skill Deficit Heatmap</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cohorts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeAdminTab === 'cohorts'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>NSSTA Cohort Scheduling Workbench</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('predictive')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeAdminTab === 'predictive'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Predictive Capacity Building</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Statistical Workforce</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">24,850</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Central + 28 States/UTs</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">iGOT Enrolment Rate</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">91.4%</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">+14.2% YoY Increase</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NSSTA Cohorts Conducted</div>
          <div className="text-2xl font-black text-amber-400 mt-1">142</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">5,680 Officers Trained</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Deficit Reduction</div>
          <div className="text-2xl font-black text-purple-400 mt-1">22.8%</div>
          <div className="text-[10px] text-purple-300 font-bold mt-0.5">Deficit Gap Closed</div>
        </div>
      </div>

      {/* TAB 1: WORKFORCE SKILL DEFICIT HEATMAP */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Department-Wise FRAC Competency Heatmap (MoSPI Cadres)
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 border-b border-slate-800">Division / Cadre</th>
                    <th className="p-3 border-b border-slate-800">Statistical</th>
                    <th className="p-3 border-b border-slate-800">Technical</th>
                    <th className="p-3 border-b border-slate-800">Digital Governance</th>
                    <th className="p-3 border-b border-slate-800">Behavioural</th>
                    <th className="p-3 border-b border-slate-800">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-100">National Accounts Division (CSO)</td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">88 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">64 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">82 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">85 / 100</span></td>
                    <td className="p-3 text-emerald-400 font-bold">Optimal</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-100">Field Operations Division (NSSO)</td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">76 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold">45 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">68 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">62 / 100</span></td>
                    <td className="p-3 text-rose-400 font-bold">Tech Deficit Alert</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-100">Economic Statistics Division (CPI/WPI)</td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">84 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">80 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">72 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">66 / 100</span></td>
                    <td className="p-3 text-emerald-400 font-bold">Stable</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-100">State Statistical Bureaus (DES)</td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">62 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold">38 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">58 / 100</span></td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">55 / 100</span></td>
                    <td className="p-3 text-rose-400 font-bold">Priority Target</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NSSTA COHORT SCHEDULING WORKBENCH */}
      {activeAdminTab === 'cohorts' && (
        <div className="space-y-6">
          <form onSubmit={handleAddWorkshop} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Schedule New NSSTA Residential Workshop</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Workshop Title (e.g. Advanced Big Data Analytics in Census)"
                value={newWsTitle}
                onChange={(e) => setNewWsTitle(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
              />
              <input
                type="text"
                placeholder="Venue (e.g. NSSTA Greater Noida / RTC Kolkata)"
                value={newWsVenue}
                onChange={(e) => setNewWsVenue(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition"
            >
              Publish NSSTA Cohort
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Published Cohorts ({workshops.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workshops.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-xs space-y-2">
                  <div className="font-bold text-slate-100">{w.title}</div>
                  <div className="text-[11px] text-amber-400 font-semibold">{w.venue} • {w.startDate}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Available Seats: {w.seatsAvailable} / {w.seatsTotal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PREDICTIVE CAPACITY BUILDING */}
      {activeAdminTab === 'predictive' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            AI Predictive Capacity-Building Forecast (2026 - 2028)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Based on upcoming MoSPI digital initiatives (Automated CPI web scrapers, satellite crop estimation, DPDP Act 2023 compliance), SwaRuchi AI forecasts a <strong>42% increase in demand for Python microdata processing</strong> and <strong>35% surge in spatial GIS analytics</strong> across state statistical bureaus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-amber-400">1. Web Scraping & NLP for Price Indices</div>
              <div className="text-[11px] text-slate-300 font-medium">Projected Officers Needing Training: 4,200</div>
              <div className="text-[10px] text-emerald-400 font-bold">Recommended Course: IGOT-DS-PY-01</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-sky-400">2. GeoPandas & GIS Spatial Frame Mapping</div>
              <div className="text-[11px] text-slate-300 font-medium">Projected Officers Needing Training: 6,800</div>
              <div className="text-[10px] text-emerald-400 font-bold">Recommended Course: IGOT-DS-GIS-03</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-emerald-400">3. Anonymization & DPDP Microdata Security</div>
              <div className="text-[11px] text-slate-300 font-medium">Projected Officers Needing Training: 14,000</div>
              <div className="text-[10px] text-emerald-400 font-bold">Recommended Course: IGOT-GOV-DPDP-01</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
