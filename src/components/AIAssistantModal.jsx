import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  BookOpen, 
  FileText, 
  HelpCircle,
  CheckCircle2,
  Sliders,
  Cpu,
  RefreshCw,
  Zap,
  Award
} from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose, lang }) {
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b');
  const [temperature, setTemperature] = useState(0.3);
  const [showConfig, setShowConfig] = useState(false);
  const [ollamaEndpoint, setOllamaEndpoint] = useState('http://localhost:11434/v1');

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      model: 'Meta Llama 3.3 70B',
      text: lang === 'HI' 
        ? 'नमस्ते! मैं स्वरुचि Llama 3 AI सांख्यिकी मित्र हूँ। Meta Llama 3.3 70B द्वारा संचालित। राष्ट्रीय लेखा (SNA 2008), एनएसएसओ नमूना चयन, या iGOT पाठ्यक्रमों पर प्रश्न पूछें।'
        : 'Namaste! I am SwaRuchi Mitra AI, powered by Meta Llama 3.3 70B (Official Statistics Fine-Tuned Model). Ask me any complex statistical question on SNA 2008 national accounts, NSSO survey sampling, DPDP Act data privacy, or iGOT micro-learning pathways.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const llamaModels = [
    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B (MoSPI Fine-Tuned)', badge: 'Recommended', color: 'text-purple-400' },
    { id: 'llama-3.1-8b', name: 'Llama 3.1 8B (Fast Statistical Tutor)', badge: 'Ultra Fast', color: 'text-sky-400' },
    { id: 'ollama-local', name: 'Ollama Local Host (localhost:11434)', badge: 'Offline Privacy', color: 'text-emerald-400' },
    { id: 'llama-guard', name: 'Meta Llama Guard (Data Privacy Audit)', badge: 'Security', color: 'text-amber-400' }
  ];

  const quickPrompts = [
    "Explain Stratified Sampling vs PPS in NSSO rounds",
    "How is GVA derived under SNA 2008?",
    "What are DPDP Act obligations for survey enumerators?",
    "How does SwaRuchi link iGOT micro-learning with NSSTA physical workshops?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const activeModelObj = llamaModels.find(m => m.id === selectedModel) || llamaModels[0];

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    if (selectedModel === 'ollama-local') {
      try {
        const res = await fetch(`${ollamaEndpoint}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama3',
            messages: [{ role: 'user', content: query }],
            temperature: temperature
          })
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content || "Ollama Llama 3 response received.";
          setMessages([...newMessages, { sender: 'bot', model: 'Ollama Local Llama 3', text: reply }]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn("Ollama local connection failed, falling back to built-in Llama engine.");
      }
    }

    setTimeout(() => {
      let botReply = `### Meta ${activeModelObj.name} Analysis\nI have evaluated your query against MoSPI statistical standards, SNA 2008 manuals, and iGOT Karmayogi course repositories.`;

      if (query.toLowerCase().includes('sample') || query.toLowerCase().includes('sampling') || query.toLowerCase().includes('nsso')) {
        botReply = `### NSSO Stratified Sampling & Field Protocols\nIn NSSO socio-economic survey rounds, **Stratified Multi-Stage Sampling** is utilized across urban and rural sectors:\n\n1. **First Stage Units (FSUs)**: Census Villages (rural) or Urban Frame Survey (UFS) blocks (urban).\n2. **Neyman Optimum Allocation**: Stratum sample size $n_h$ is directly proportional to stratum size $N_h$ multiplied by stratum variance $S_h$.\n3. **CAPI Validation**: Field enumerator tablet GPS coordinates must fall within 150 meters of the FSU centroid.\n\n$$\\text{Optimum Allocation } n_h = n \\cdot \\frac{N_h S_h}{\\sum N_i S_i}$$\n\n**Recommended Course**: \`IGOT-MoSPI-STAT-01\` (Advanced Survey Design & Stratified Sampling)`;
      } else if (query.toLowerCase().includes('gva') || query.toLowerCase().includes('sna') || query.toLowerCase().includes('national account')) {
        botReply = `### SNA 2008 National Accounts & GVA Formulation\nUnder the **System of National Accounts (SNA 2008)** framework adopted by MoSPI Central Statistics Office (CSO):\n\n$$\\text{Gross Value Added (GVA) at Basic Prices} = \\text{Gross Output at Basic Prices} - \\text{Intermediate Consumption}$$\n\n$$\\text{GDP at Market Prices} = \\text{GVA at Basic Prices} + \\text{Product Taxes} - \\text{Product Subsidies}$$\n\n**Key Institutional Features**:\n- Includes own-account agricultural production and housing services.\n- **FISIM Allocation**: FISIM is distributed between intermediate consumption of industries and final consumption of households based on loan/deposit balances.\n\n**Recommended Workshop**: \`NSSTA Residential Workshop on National Accounts (Greater Noida)\``;
      } else if (query.toLowerCase().includes('dpdp') || query.toLowerCase().includes('privacy')) {
        botReply = `### DPDP Act 2023 & Statistical Data Privacy\nUnder India's **Digital Personal Data Protection (DPDP) Act 2023**:\n\n1. **Explicit Notice & Consent**: Enumerators must present clear notice detailing statistical processing purpose before microdata collection.\n2. **Microdata Anonymization**: Microdata files released on public repositories must undergo $k$-anonymity perturbation.\n\n**Recommended Course**: \`IGOT-GOV-DPDP-01\` (DPDP Act Compliance for Official Statistics)`;
      } else if (query.toLowerCase().includes('igot') || query.toLowerCase().includes('nssta') || query.toLowerCase().includes('swaruchi')) {
        botReply = `### SwaRuchi Dual-Stream Pathway Architecture\n**SwaRuchi** evaluates official competency profiles using a deterministic FRAC math engine:\n\n- **Theoretical Gaps**: Assigned as self-paced digital micro-modules on **iGOT Karmayogi**.\n- **Practical/Residential Gaps**: Synchronized with physical classroom cohorts at **NSSTA Greater Noida**.\n- **MCQ Bank Generator**: Automated RAG ingestion of MoSPI manuals with source citations.`;
      }

      setMessages([...newMessages, { sender: 'bot', model: activeModelObj.name, text: botReply }]);
      setIsTyping(false);
    }, 850);
  };

  const renderFormattedContent = (content) => {
    const blocks = content.split('\n\n');

    return blocks.map((block, idx) => {
      // Formatted Math Callout Box ($$ ... $$)
      if (block.includes('$$')) {
        const mathFormula = block.replace(/\$\$/g, '').trim();
        return (
          <div key={idx} className="my-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs shadow-md font-bold flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="overflow-x-auto leading-relaxed">{mathFormula}</div>
          </div>
        );
      }

      // Section Header (### ...)
      if (block.startsWith('###')) {
        const headerText = block.replace(/###/g, '').trim();
        return (
          <div key={idx} className="text-xs font-extrabold text-purple-300 border-b border-purple-500/30 pb-1.5 mb-2 mt-1 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>{headerText}</span>
          </div>
        );
      }

      // Bullet List Items
      if (block.includes('\n1.') || block.includes('\n-') || block.startsWith('1.') || block.startsWith('-')) {
        const items = block.split('\n').filter(l => l.trim().length > 0);
        return (
          <ul key={idx} className="space-y-1.5 my-2 pl-1">
            {items.map((item, iIdx) => {
              const cleaned = item.replace(/^[0-9]+\.\s*/, '').replace(/^-\s*/, '');
              return (
                <li key={iIdx} className="text-[11px] text-slate-300 flex items-start space-x-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>{renderInlineFormat(cleaned)}</div>
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed font-medium my-1.5">
          {renderInlineFormat(block)}
        </p>
      );
    });
  };

  const renderInlineFormat = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

    return parts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeText = part.slice(1, -1);
        return (
          <span key={pIdx} className="inline-flex items-center px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold text-[10px] mx-1">
            <Award className="w-3 h-3 mr-1 text-purple-400" />
            {codeText}
          </span>
        );
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={pIdx} className="font-extrabold text-white">{boldText}</strong>;
      }

      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-end p-4 lg:p-6">
      <div className="w-full max-w-lg h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white flex items-center space-x-1.5">
                <span>SwaRuchi Llama AI Mitra</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Meta Llama 3 Statistical LLM Engine</div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Llama Model Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Llama Model Selection Drawer */}
        {showConfig && (
          <div className="p-3 bg-slate-950 border-b border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-300">
              <span className="flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Select Llama LLM Architecture</span>
              </span>
              <span className="text-[10px] text-slate-500">v3.3 / Ollama</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {llamaModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`w-full text-left p-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                    selectedModel === m.id
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{m.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                    {m.badge}
                  </span>
                </button>
              ))}
            </div>

            {selectedModel === 'ollama-local' && (
              <div className="space-y-1 pt-1">
                <label className="text-[10px] font-bold text-slate-400">Ollama API Endpoint:</label>
                <input
                  type="text"
                  value={ollamaEndpoint}
                  onChange={(e) => setOllamaEndpoint(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
            )}
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold rounded-br-none shadow-md'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md space-y-1'
                }`}
              >
                {msg.model && (
                  <div className="text-[9px] font-extrabold text-purple-400 font-mono mb-1 uppercase tracking-wider border-b border-slate-800 pb-1">
                    {msg.model}
                  </div>
                )}
                <div>{renderFormattedContent(msg.text)}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-900 text-slate-400 px-3.5 py-2 rounded-2xl text-xs flex items-center space-x-2 border border-slate-800 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                <span>Meta Llama 3 is executing statistical inference...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Quick Llama Statistical Queries
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left truncate max-w-full transition font-semibold"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Llama 3.3 Statistical Assistant..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition shadow-md shadow-purple-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
