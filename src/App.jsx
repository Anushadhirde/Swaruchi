import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AIAssistantModal from './components/AIAssistantModal';

import LearnerDashboard from './pages/LearnerDashboard';
import SkillGapAssessment from './pages/SkillGapAssessment';
import LearningPathways from './pages/LearningPathways';
import VirtualLabs from './pages/VirtualLabs';
import QuizGenerator from './pages/QuizGenerator';
import AdminDashboard from './pages/AdminDashboard';

import { DEFAULT_USER } from './data/defaultProfiles';

export default function App() {
  const [user, setUser] = useState(DEFAULT_USER);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('EN');
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        user={user}
        setUser={setUser}
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsAiOpen={setIsAiOpen}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <LearnerDashboard
              user={user}
              setActiveTab={setActiveTab}
              onStartAssessment={() => setActiveTab('assessment')}
            />
          )}

          {activeTab === 'assessment' && (
            <SkillGapAssessment
              user={user}
              setUser={setUser}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'pathways' && (
            <LearningPathways
              user={user}
              setUser={setUser}
            />
          )}

          {activeTab === 'labs' && (
            <VirtualLabs
              user={user}
            />
          )}

          {activeTab === 'quizgen' && (
            <QuizGenerator
              user={user}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard />
          )}
        </main>
      </div>

      {/* SwaRuchi Mitra AI Assistant Floating Modal */}
      <AIAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        lang={lang}
      />
    </div>
  );
}
