import React, { useState } from 'react';
import { IGOT_COURSES } from '../data/igotCourses';
import { NSSTA_WORKSHOPS } from '../data/nsstaWorkshops';
import { FRAC_PILLARS } from '../data/fracFramework';
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Star, 
  Users, 
  ShieldCheck, 
  Filter,
  Sparkles,
  Zap
} from 'lucide-react';

export default function LearningPathways({ user, setUser }) {
  const [streamFilter, setStreamFilter] = useState('all');
  const [pillarFilter, setPillarFilter] = useState('all');
  const [enrolNotice, setEnrolNotice] = useState(null);

  const handleEnrolIgot = (courseId) => {
    if (!user.enrolledCourses.includes(courseId)) {
      setUser({
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      });
      setEnrolNotice(`Successfully enrolled in iGOT Course ID: ${courseId}`);
      setTimeout(() => setEnrolNotice(null), 3500);
    }
  };

  const handleBookNssta = (wsId) => {
    if (!user.bookedWorkshops.includes(wsId)) {
      setUser({
        ...user,
        bookedWorkshops: [...user.bookedWorkshops, wsId]
      });
      setEnrolNotice(`Seat reserved for NSSTA Workshop ID: ${wsId}`);
      setTimeout(() => setEnrolNotice(null), 3500);
    }
  };

  const filteredIgot = IGOT_COURSES.filter(c => pillarFilter === 'all' || c.pillar === pillarFilter);
  const filteredNssta = NSSTA_WORKSHOPS.filter(w => pillarFilter === 'all' || w.targetedPillar === pillarFilter);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Dual-Stream Roadmap
            </span>
            <span className="text-xs text-slate-400 font-medium">iGOT Karmayogi x NSSTA Integration</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            Personalized Dual-Stream Upskilling Pathways
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium">
            Bridge your identified competency gaps by combining digital micro-learning on iGOT with live physical classroom cohorts at NSSTA.
          </p>
        </div>
      </div>

      {/* Enrol Notification Toast */}
      {enrolNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{enrolNotice}</span>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setStreamFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              streamFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Streams
          </button>
          <button
            onClick={() => setStreamFilter('igot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              streamFilter === 'igot' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            iGOT Digital Micro-Courses
          </button>
          <button
            onClick={() => setStreamFilter('nssta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              streamFilter === 'nssta' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            NSSTA Physical Cohorts
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={pillarFilter}
            onChange={(e) => setPillarFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="all">All FRAC Pillars</option>
            <option value="statistical">Statistical Competencies</option>
            <option value="technical">Technical Competencies</option>
            <option value="digital_governance">Digital Governance</option>
            <option value="behavioural">Behavioural & Managerial</option>
          </select>
        </div>
      </div>

      {/* Stream Section 1: iGOT Karmayogi Courses */}
      {(streamFilter === 'all' || streamFilter === 'igot') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>iGOT Karmayogi Digital Micro-Learning Courses ({filteredIgot.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIgot.map((course) => {
              const isEnrolled = user.enrolledCourses.includes(course.id);
              return (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-950 text-sky-400 border border-slate-800">
                        {course.code}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {course.level}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{course.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{course.rating}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.skillsCovered.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={course.igotUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-sky-400 font-bold flex items-center space-x-1"
                    >
                      <span>Portal Info</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {isEnrolled ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnrolIgot(course.id)}
                        className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-extrabold text-xs shadow-md shadow-sky-500/20 transition"
                      >
                        Enrol Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stream Section 2: NSSTA Physical Cohorts */}
      {(streamFilter === 'all' || streamFilter === 'nssta') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>NSSTA TPAC Physical Classroom Workshops ({filteredNssta.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNssta.map((ws) => {
              const isBooked = user.bookedWorkshops.includes(ws.id);
              return (
                <div
                  key={ws.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {ws.mode}
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 font-mono">
                        {ws.seatsAvailable} Seats Left
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{ws.title}</h3>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{ws.venue}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Schedule:</span>
                        <span className="font-bold text-slate-200">{ws.startDate} to {ws.endDate}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Faculty Lead:</span>
                        <span className="font-bold text-amber-400 truncate max-w-[200px]">{ws.faculty}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Curriculum Highlights</div>
                      <ul className="space-y-1">
                        {ws.topics.map((t, tIdx) => (
                          <li key={tIdx} className="text-[11px] text-slate-300 flex items-start space-x-1.5 font-medium">
                            <span className="text-emerald-400 font-bold mt-0.5">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">
                      TPAC Nominated Track
                    </span>

                    {isBooked ? (
                      <span className="px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Seat Reserved</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBookNssta(ws.id)}
                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 transition"
                      >
                        Reserve Physical Seat
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
