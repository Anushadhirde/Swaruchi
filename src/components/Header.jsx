import React, { useState } from 'react';
import { MOSPI_ROLES } from '../data/fracFramework';
import { 
  Award, 
  Bell, 
  Globe, 
  UserCheck, 
  ChevronDown, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function Header({ user, setUser, lang, setLang, activeTab, setActiveTab }) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRoleSelect = (role) => {
    setUser({
      ...user,
      designation: role.title,
      roleId: role.id,
      department: role.department,
      cadre: role.cadre,
      currentScores: {
        statistical: Math.max(40, role.targets.statistical - 25),
        technical: Math.max(35, role.targets.technical - 30),
        digital_governance: Math.max(50, role.targets.digital_governance - 15),
        behavioural: Math.max(55, role.targets.behavioural - 20)
      }
    });
    setShowRoleDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xl">
      {/* Brand & Emblem */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-amber-400 text-lg tracking-tighter">स्व</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-sans">
                SwaRuchi <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">AI Upskilling</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Skill Intelligence Platform • <span className="text-emerald-400 font-bold">MoSPI / NSSTA</span>
            </p>
          </div>
        </div>
      </div>

      {/* Center Role Selector */}
      <div className="relative hidden md:block">
        <button
          onClick={() => setShowRoleDropdown(!showRoleDropdown)}
          className="flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition text-left shadow-inner"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="max-w-[200px] lg:max-w-[260px] truncate">
            <div className="text-xs font-bold text-slate-100 truncate">{user.designation}</div>
            <div className="text-[10px] text-slate-400 truncate">{user.department}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>

        {showRoleDropdown && (
          <div className="absolute top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Switch MoSPI Designation Profile
            </div>
            {MOSPI_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-2.5 ${
                  user.roleId === role.id ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="mt-0.5 font-bold text-amber-400 text-xs">●</div>
                <div>
                  <div className="text-xs font-bold text-slate-100">{role.title}</div>
                  <div className="text-[11px] text-slate-400">{role.department}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right User Actions */}
      <div className="flex items-center space-x-3">
        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-bold border border-slate-700 transition"
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>{lang === 'EN' ? 'English' : 'हिंदी'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 font-semibold text-slate-200">
                <span>Notifications & iGOT Alerts</span>
                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">2 New</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-amber-500/30 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-100">NSSTA Workshop Reserved</div>
                    <div className="text-[11px] text-slate-400">National Accounts SNA 2008 Residential workshop in Greater Noida confirmed.</div>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 border border-sky-500/30 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-100">iGOT Badge Synced</div>
                    <div className="text-[11px] text-slate-400">DPDP Act 2023 compliance badge updated in your profile.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Badge */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-amber-500/60 object-cover shadow-sm"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-100">{user.name}</div>
            <div className="text-[10px] text-amber-400 font-mono font-bold">ISS / SSS Cadre</div>
          </div>
        </div>
      </div>
    </header>
  );
}
