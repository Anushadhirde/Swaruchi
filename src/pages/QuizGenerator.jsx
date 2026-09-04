import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';
import { generateMCQsFromText } from '../utils/ragQuizEngine';
import QuizRunner from '../components/QuizRunner';
import { 
  FileQuestion, 
  Upload, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Play, 
  RotateCcw,
  Sliders,
  Award
} from 'lucide-react';

export default function QuizGenerator({ user }) {
  const [selectedDocId, setSelectedDocId] = useState(MOCK_DOCUMENTS[0].id);
  const [customText, setCustomText] = useState('');
  const [numQuestions, setNumQuestions] = useState(4);
  const [difficulty, setDifficulty] = useState('Intermediate');
  
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isQuizRunnerOpen, setIsQuizRunnerOpen] = useState(false);

  const selectedDoc = MOCK_DOCUMENTS.find(d => d.id === selectedDocId) || MOCK_DOCUMENTS[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedQuiz(null);

    setTimeout(() => {
      const textToParse = customText.trim().length > 0 ? customText : selectedDoc.content;
      const title = customText.trim().length > 0 ? "Uploaded Custom Manual" : selectedDoc.title;
      
      const questions = generateMCQsFromText(textToParse, title, numQuestions);
      setGeneratedQuiz({
        title: `AI RAG Generated Quiz - ${title}`,
        questions
      });
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Multimodal RAG Assessment Engine
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            AI-Powered Question Bank & MCQ Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium">
            Ingest official MoSPI PDFs, manuals, and transcripts to instantly generate structured MCQs with deep-linked source citations.
          </p>
        </div>
      </div>

      {/* RAG Workbench Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Learning Material or Upload Manual
          </h3>

          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400">Pre-loaded MoSPI Manuals:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MOCK_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setCustomText('');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedDocId === doc.id && !customText
                      ? 'bg-purple-500/20 border-purple-500 text-white font-bold shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{doc.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{doc.category} • {doc.pages} Pages</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>Or Paste Manual / Transcript Text:</span>
              {customText && (
                <button onClick={() => setCustomText('')} className="text-rose-400 hover:underline">
                  Clear Text
                </button>
              )}
            </div>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste custom MoSPI survey instructions, circulars, or lecture transcripts here..."
              className="w-full h-36 bg-slate-950 text-slate-200 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 leading-relaxed font-medium"
            />
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>2. Customize Assessment Parameters</span>
            </h3>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Number of MCQs to Generate:
              </label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium"
              >
                <option value={3}>3 Questions</option>
                <option value={4}>4 Questions</option>
                <option value={6}>6 Questions</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Difficulty Calibration:
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium"
              >
                <option value="Basic">Basic (Conceptual Definitions)</option>
                <option value="Intermediate">Intermediate (Field & Calculation Protocols)</option>
                <option value="Advanced">Advanced (SNA 2008 & Anomaly Edge Cases)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-purple-500/25"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGenerating ? 'Analyzing Document Vectors...' : 'Generate AI Source-Cited MCQs'}</span>
          </button>
        </div>
      </div>

      {generatedQuiz && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                RAG Engine Output Ready
              </span>
              <h2 className="text-base font-bold text-white mt-1">{generatedQuiz.title}</h2>
            </div>

            <button
              onClick={() => setIsQuizRunnerOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Take Generated Quiz Now</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedQuiz.questions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="font-bold text-slate-100">
                  Q{idx + 1}. {q.question}
                </div>
                <div className="space-y-1 text-slate-400 pl-2">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className={oIdx === q.correct ? 'text-emerald-400 font-bold' : ''}>
                      • {opt} {oIdx === q.correct && '✓ (Correct)'}
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-sky-400 font-semibold">
                  Citation: <strong>{q.sourceCitation}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isQuizRunnerOpen && generatedQuiz && (
        <QuizRunner
          title={generatedQuiz.title}
          questions={generatedQuiz.questions}
          onClose={() => setIsQuizRunnerOpen(false)}
        />
      )}
    </div>
  );
}
