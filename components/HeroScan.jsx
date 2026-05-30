'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '@/contexts/BookingContext';

// ── Static Data ───────────────────────────────────────────────────────────────

const TOOLS = [
  { id: 'hubspot',    name: 'HubSpot',       color: '#FF7A59' },
  { id: 'salesforce', name: 'Salesforce',    color: '#00A1E0' },
  { id: 'ghl',        name: 'GoHighLevel',   color: '#FF6B35' },
  { id: 'pipedrive',  name: 'Pipedrive',     color: '#1F9562' },
  { id: 'slack',      name: 'Slack',         color: '#E01E5A' },
  { id: 'notion',     name: 'Notion',        color: '#888888' },
  { id: 'drive',      name: 'Google Drive',  color: '#34A853' },
  { id: 'asana',      name: 'Asana',         color: '#F06A6A' },
  { id: 'monday',     name: 'Monday.com',    color: '#FF3D57' },
  { id: 'clickup',    name: 'ClickUp',       color: '#7B68EE' },
  { id: 'airtable',   name: 'Airtable',      color: '#FCBA03' },
  { id: 'zapier',     name: 'Zapier',        color: '#FF4A00' },
  { id: 'zoom',       name: 'Zoom',          color: '#2D8CFF' },
  { id: 'teams',      name: 'MS Teams',      color: '#6264A7' },
  { id: 'quickbooks', name: 'QuickBooks',    color: '#2CA01C' },
  { id: 'gmail',      name: 'Gmail',         color: '#EA4335' },
  { id: 'calendly',   name: 'Calendly',      color: '#006BFF' },
  { id: 'loom',       name: 'Loom',          color: '#FF4A90' },
];

const SCATTER = [
  { x: -190, y: -185, rot: -8,  fy: 10, fd: 3.2, fd2: 0.0 },
  { x:   55, y: -205, rot:  5,  fy: 12, fd: 4.0, fd2: 0.4 },
  { x:  205, y: -135, rot: -4,  fy:  8, fd: 3.6, fd2: 0.8 },
  { x: -215, y:  -65, rot:  6,  fy: 14, fd: 4.4, fd2: 0.2 },
  { x:  170, y:  -50, rot: -6,  fy: 10, fd: 3.8, fd2: 0.6 },
  { x:  -55, y: -220, rot:  3,  fy:  9, fd: 3.2, fd2: 1.0 },
  { x:  225, y:   70, rot: -5,  fy: 13, fd: 4.2, fd2: 0.3 },
  { x: -200, y:   95, rot:  7,  fy: 11, fd: 3.6, fd2: 0.9 },
  { x:   55, y:  150, rot: -4,  fy:  8, fd: 4.0, fd2: 0.1 },
  { x: -110, y:  195, rot:  5,  fy: 12, fd: 3.4, fd2: 0.7 },
  { x:  185, y:  180, rot: -7,  fy: 10, fd: 4.6, fd2: 0.5 },
  { x:   -5, y:  215, rot:  3,  fy:  9, fd: 3.0, fd2: 1.2 },
  { x: -130, y: -130, rot:  4,  fy: 11, fd: 3.8, fd2: 0.3 },
  { x:  125, y: -170, rot: -5,  fy:  9, fd: 4.2, fd2: 0.6 },
  { x:  -80, y:   30, rot:  3,  fy: 12, fd: 3.4, fd2: 0.8 },
  { x:   95, y:   85, rot: -6,  fy: 10, fd: 4.0, fd2: 0.2 },
  { x: -155, y:  140, rot:  5,  fy:  8, fd: 3.6, fd2: 1.1 },
  { x:  145, y:  118, rot: -3,  fy: 13, fd: 4.4, fd2: 0.4 },
];

const BIZ_TYPES   = [
  'Agency',
  'SaaS',
  'Professional Services',
  'Consulting',
  'E-commerce',
  'Healthcare',
  'Real Estate',
  'Financial Services',
  'Legal',
  'Recruiting / Staffing',
  'Construction / Contracting',
  'Other',
];
const AI_OPTIONS  = [
  { id: 'chatgpt', label: 'ChatGPT (OpenAI)'  },
  { id: 'claude',  label: 'Claude (Anthropic)' },
  { id: 'both',    label: 'Both'               },
  { id: 'neither', label: 'Not yet'            },
];
const PAIN_POINTS = [
  'Lead Follow Up',
  'Sales Report Generation',
  'Client Onboarding',
  'Proposal & Contract Writing',
  'Meeting Notes & Action Items',
  'Monthly Finance Reports',
  'Job Posting & Candidate Screening',
  'Customer Support Responses',
  'Invoice & Payment Follow Up',
  'Project Status Updates',
  'Social Media & Content Creation',
  'Employee Onboarding',
  'Other',
];

const STEP_LABELS = ['Stack', 'Business', 'AI Tool', 'Focus'];

// ── Output Logic ─────────────────────────────────────────────────────────────

const PAIN_MAP = {
  'Lead Follow Up': {
    prefer: ['hubspot', 'salesforce', 'ghl', 'pipedrive', 'gmail', 'calendly', 'slack'],
    title:  (ai, t) => `Every lead gets a follow up. Without anyone remembering to do it.`,
    body:   (ai, t) => `Right now someone on your team decides who gets a follow up and when. That means leads slip based on how busy people are. Connect your ${ai} to${t} and sends the right message at the right time after every conversation. Your team focuses on calls that matter. Nothing goes cold.`,
    tags:   (ai)    => [ai, 'Lead nurture', 'Zero drop-off'],
  },
  'Sales Report Generation': {
    prefer: ['hubspot', 'salesforce', 'ghl', 'pipedrive', 'airtable', 'drive', 'notion'],
    title:  (ai, t) => `Your sales report builds itself. Every single week.`,
    body:   (ai, t) => `Someone on your team spends hours every week pulling numbers from ${t} and formatting the same report. ${ai} does that in minutes. It pulls the data, writes the summary, and sends it to whoever needs it on schedule. That person gets their Monday morning back.`,
    tags:   (ai)    => [ai, 'Auto-reporting', 'Time saved'],
  },
  'Client Onboarding': {
    prefer: ['notion', 'asana', 'monday', 'clickup', 'airtable', 'hubspot', 'salesforce', 'ghl'],
    title:  (ai, t) => `Every client gets your best onboarding. Every time.`,
    body:   (ai, t) => `Your best onboarding experiences happen when the right person runs the process with enough time to do it well. That is not always possible. Connect your ${ai} to${t} and handles the kickoff prep, intro materials, and check-in messages automatically. Every new client gets the same great start without extra work from your team.`,
    tags:   (ai)    => [ai, 'Client retention', 'Consistent experience'],
  },
  'Proposal & Contract Writing': {
    prefer: ['notion', 'drive', 'hubspot', 'salesforce', 'ghl', 'gmail'],
    title:  (ai, t) => `Proposals go out the same day. Not three days later.`,
    body:   (ai, t) => `Right now writing a proposal takes hours. Someone has to pull the scope, find the right template, write the copy, and format it before it goes out. Connect your ${ai} to${t} and builds a first draft in minutes using what you already know about the client. Your team reviews and sends. The client hears from you fast.`,
    tags:   (ai)    => [ai, 'Faster close', 'Proposal speed'],
  },
  'Meeting Notes & Action Items': {
    prefer: ['zoom', 'teams', 'slack', 'notion', 'asana', 'clickup', 'monday'],
    title:  (ai, t) => `Every meeting ends with a clear list of what happens next.`,
    body:   (ai, t) => `Right now someone has to take notes during the meeting, write them up after, and hope the action items get assigned. Half the time they do not. Connect your ${ai} to${t} and turns every meeting into a summary with clear next steps assigned to the right people. Nothing gets lost. No one has to ask what was decided.`,
    tags:   (ai)    => [ai, 'Meeting clarity', 'Action tracking'],
  },
  'Monthly Finance Reports': {
    prefer: ['quickbooks', 'airtable', 'drive', 'notion', 'monday'],
    title:  (ai, t) => `Your monthly numbers are ready before anyone asks for them.`,
    body:   (ai, t) => `Every month someone pulls the same numbers from ${t}, formats them the same way, and sends the same report. It takes hours. ${ai} automates the whole thing. The data gets pulled, the report gets written, and it lands in the right inbox on the same day every month without anyone touching it.`,
    tags:   (ai)    => [ai, 'Finance automation', 'Time saved'],
  },
  'Job Posting & Candidate Screening': {
    prefer: ['loom', 'slack', 'teams', 'gmail', 'notion', 'calendly'],
    title:  (ai, t) => `Your best candidates hear from you before they accept another offer.`,
    body:   (ai, t) => `The best people you interview are talking to other companies at the same time. Slow responses cost you hires. Connect your ${ai} to${t} and keeps your hiring process moving. Job posts go up fast. Candidates get responses the same day. Your team only spends time on people worth a real conversation.`,
    tags:   (ai)    => [ai, 'Speed to hire', 'Talent pipeline'],
  },
  'Customer Support Responses': {
    prefer: ['gmail', 'slack', 'teams', 'hubspot', 'ghl', 'zoom'],
    title:  (ai, t) => `Common questions get answered instantly. Your team handles the hard stuff.`,
    body:   (ai, t) => `Right now your team answers the same questions over and over. Every answer takes time away from work that actually needs their skill. Connect your ${ai} to${t} and handles the questions your customers ask most. Your team gets fewer interruptions. Customers get faster answers. Nothing falls through the cracks.`,
    tags:   (ai)    => [ai, 'Support speed', 'Team focus'],
  },
  'Invoice & Payment Follow Up': {
    prefer: ['quickbooks', 'gmail', 'hubspot', 'ghl', 'pipedrive', 'slack'],
    title:  (ai, t) => `Outstanding invoices get followed up on. Without the awkward calls.`,
    body:   (ai, t) => `Chasing payments is uncomfortable and time consuming. Most businesses let invoices sit too long because no one wants to make that call. Connect your ${ai} to${t} and sends the right message at the right time after an invoice goes unpaid. Professional. Automatic. Your cash flow improves without anyone making an awkward phone call.`,
    tags:   (ai)    => [ai, 'Cash flow', 'Payment speed'],
  },
  'Project Status Updates': {
    prefer: ['asana', 'monday', 'clickup', 'airtable', 'notion', 'slack'],
    title:  (ai, t) => `Clients always know where their project stands. Without anyone writing an update.`,
    body:   (ai, t) => `Right now someone has to check ${t}, pull the latest status, and write an update for the client. It happens late or not at all when things get busy. Connect your ${ai} to${t} and sends a clear project update on a schedule. Clients feel informed. Your team does not spend time writing status emails.`,
    tags:   (ai)    => [ai, 'Client communication', 'Project visibility'],
  },
  'Social Media & Content Creation': {
    prefer: ['notion', 'drive', 'loom', 'slack', 'monday', 'airtable'],
    title:  (ai, t) => `Your team shows up online consistently. Without spending hours on it.`,
    body:   (ai, t) => `Consistent content takes time that most teams do not have. Posts get skipped. The content calendar falls behind. Connect your ${ai} to${t} and turns your ideas, calls, and updates into ready to post content. Your brand stays active without anyone staring at a blank screen trying to think of something to say.`,
    tags:   (ai)    => [ai, 'Content consistency', 'Brand presence'],
  },
  'Employee Onboarding': {
    prefer: ['notion', 'loom', 'slack', 'teams', 'asana', 'clickup', 'monday'],
    title:  (ai, t) => `New hires are productive in week one. Not week six.`,
    body:   (ai, t) => `Most employee onboarding is inconsistent. What new hires learn depends on who has time to train them that week. Connect your ${ai} to${t} and makes sure every new person gets the same materials, the same check-ins, and the same support at the right moments. Your best people spend less time training and more time doing their actual jobs.`,
    tags:   (ai)    => [ai, 'New hire speed', 'Team consistency'],
  },
};

function buildSolutions(tools, aiToolId, painPoint) {
  const aiName = {
    claude:  'Claude',
    chatgpt: 'ChatGPT',
    both:    'Claude + ChatGPT',
    neither: 'AI',
  }[aiToolId] || 'AI';

  const crmName = tools.includes('hubspot')    ? 'HubSpot'
                : tools.includes('salesforce') ? 'Salesforce'
                : tools.includes('ghl')        ? 'GoHighLevel'
                : tools.includes('pipedrive')  ? 'Pipedrive'
                : null;

  const solutions = [];

  // Solution 1: CRM always first if selected
  if (crmName) {
    solutions.push({
      title:      `Your reps close deals. ${aiName} handles the rest.`,
      connection: `${aiName} × ${crmName}`,
      body:       `Right now someone on your team is manually logging calls and updating contact records. That stops. Connect your ${aiName} to ${crmName} and every conversation gets logged automatically. Your reps stay focused on selling. Your CRM stays accurate without anyone babysitting it.`,
      tags:       [aiName, crmName, 'Pipeline accuracy'],
    });
  }

  // Solution 2: Pain-point based
  const painCfg = PAIN_MAP[painPoint];
  if (painCfg) {
    const crmIds    = ['hubspot','salesforce','ghl','pipedrive'];
    const skipForCRM = crmName && painPoint === 'Sales follow-up';
    if (!skipForCRM) {
      const matchedId   = painCfg.prefer.find(id => tools.includes(id) && (!crmName || !crmIds.includes(id)));
      const matchedName = matchedId ? TOOLS.find(t => t.id === matchedId)?.name ?? 'your stack' : 'your stack';
      solutions.push({
        title:      painCfg.title(aiName, matchedName),
        connection: `${aiName} × ${matchedName}`,
        body:       painCfg.body(aiName, matchedName),
        tags:       painCfg.tags(aiName),
      });
    } else {
      // CRM + sales overlap → fall back to reporting/ops
      const fallKey  = tools.some(t => ['drive','airtable','notion','monday','asana','clickup'].includes(t)) ? 'Reporting & dashboards' : 'Operations';
      const fallCfg  = PAIN_MAP[fallKey];
      const fallId   = fallCfg.prefer.find(id => tools.includes(id));
      const fallName = fallId ? TOOLS.find(t => t.id === fallId)?.name ?? 'your stack' : 'your stack';
      solutions.push({
        title:      fallCfg.title(aiName, fallName),
        connection: `${aiName} × ${fallName}`,
        body:       fallCfg.body(aiName, fallName),
        tags:       fallCfg.tags(aiName),
      });
    }
  }

  // Final fallback
  while (solutions.length < 2) {
    solutions.push({
      title:      `${aiName} becomes the connective layer across your entire stack.`,
      connection: `${aiName} × Your Stack`,
      body:       `Your tools operate in silos. ${aiName} changes that — every process requiring a person to move information between systems gets automated, and your team gets back the focus they need for work that actually moves the needle.`,
      tags:       [aiName, 'Integration', 'Stack intelligence'],
    });
  }

  return solutions.slice(0, 2);
}

// ── Small Components ──────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-[#C6A62C] flex-shrink-0"
      style={{ backgroundColor: 'rgba(198,166,44,0.12)', border: '1px solid rgba(198,166,44,0.2)' }}
    >
      NA
    </div>
  );
}

function Chip({ label, selected, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-all duration-200"
      style={{
        backgroundColor: selected ? 'rgba(198,166,44,0.14)' : 'rgba(255,255,255,0.04)',
        borderColor:     selected ? 'rgba(198,166,44,0.5)'  : 'rgba(255,255,255,0.09)',
        color:           selected ? '#C6A62C'                : 'rgba(255,255,255,0.5)',
        transform:       selected ? 'scale(1.04)'            : 'scale(1)',
        boxShadow:       selected ? '0 0 12px rgba(198,166,44,0.15)' : 'none',
      }}
    >
      {color && (
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      )}
      {label}
    </button>
  );
}

function ChatOppCard({ sol, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.18 }}
      className="rounded-xl border p-4"
      style={{
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderLeft: '3px solid #C6A62C',
      }}
    >
      <div className="flex items-start gap-3 mb-2.5">
        <div
          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
          style={{ backgroundColor: '#1a1f3a' }}
        >
          {index + 1}
        </div>
        <div>
          <p className="text-white/90 text-[13px] font-semibold leading-snug">{sol.title}</p>
          <p className="text-[#C6A62C] text-[11px] font-semibold mt-0.5">{sol.connection}</p>
        </div>
      </div>
      <p className="text-white/85 text-[12px] leading-relaxed mb-3">{sol.body}</p>
      <div className="flex flex-wrap gap-1.5">
        {sol.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-[10px] font-semibold"
            style={{ backgroundColor: 'rgba(198,166,44,0.1)', color: 'rgba(198,166,44,0.7)', border: '1px solid rgba(198,166,44,0.18)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-0 mb-5">
      {STEP_LABELS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                backgroundColor: i <= step ? '#C6A62C' : 'rgba(255,255,255,0.12)',
                scale: i === step ? 1.25 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
            <span
              className="text-[9px] font-semibold whitespace-nowrap transition-colors duration-300"
              style={{ color: i <= step ? 'rgba(198,166,44,0.75)' : 'rgba(255,255,255,0.2)' }}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <motion.div
              animate={{ backgroundColor: i < step ? '#C6A62C' : 'rgba(255,255,255,0.08)' }}
              transition={{ duration: 0.4 }}
              className="flex-1 h-px mx-2 mb-3"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d) => ({ x: d > 0 ? -36 : 36, opacity: 0 }),
};

export default function HeroScan() {
  const { openModal } = useBooking();

  // Left animation
  const [animPhase, setAnimPhase] = useState('floating');

  // Right chat
  const [step, setStep]             = useState(0);   // 0-3 questions, 4 scanning, 5 results
  const [direction, setDirection]   = useState(1);
  const [selectedTools, setSelectedTools] = useState([]);
  const [bizType, setBizType]       = useState(null);
  const [showOther, setShowOther]   = useState(false);
  const [bizCustom, setBizCustom]   = useState('');
  const [aiTool, setAiTool]         = useState(null);
  const [painPoint, setPainPoint]   = useState(null);
  const [solutions, setSolutions]   = useState([]);
  const [email, setEmail]           = useState('');
  const [sending, setSending]         = useState(false);
  const [sent, setSent]               = useState(false);
  const [sendError, setSendError]     = useState(false);
  const [painCustom, setPainCustom]   = useState('');
  const [showPainOther, setShowPainOther] = useState(false);

  const otherInputRef   = useRef(null);
  const painOtherRef    = useRef(null);

  // Auto-play left animation
  useEffect(() => {
    const t1 = setTimeout(() => setAnimPhase('converging'), 2800);
    const t2 = setTimeout(() => setAnimPhase('burst'),      3700);
    const t3 = setTimeout(() => setAnimPhase('revealed'),   4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Focus other inputs when shown
  useEffect(() => {
    if (showOther) otherInputRef.current?.focus();
  }, [showOther]);

  useEffect(() => {
    if (showPainOther) painOtherRef.current?.focus();
  }, [showPainOther]);

  const advance = (nextStep) => {
    setDirection(1);
    setStep(nextStep);
  };

  const toggleTool = (id) =>
    setSelectedTools(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selectBiz = (biz) => {
    if (biz === 'Other') { setShowOther(true); return; }
    setBizType(biz);
    setTimeout(() => advance(2), 300);
  };

  const submitOther = () => {
    const val = bizCustom.trim();
    if (!val) return;
    setBizType(val);
    setShowOther(false);
    setTimeout(() => advance(2), 300);
  };

  const selectAI = (id) => {
    setAiTool(id);
    setTimeout(() => advance(3), 300);
  };

  const selectPain = (pp) => {
    if (pp === 'Other') { setShowPainOther(true); return; }
    setPainPoint(pp);
    setTimeout(() => {
      advance(4);
      setTimeout(() => {
        setSolutions(buildSolutions(selectedTools, aiTool, pp));
        advance(5);
      }, 2400);
    }, 300);
  };

  const submitPainOther = () => {
    const val = painCustom.trim();
    if (!val) return;
    setPainPoint(val);
    setShowPainOther(false);
    setTimeout(() => {
      advance(4);
      setTimeout(() => {
        setSolutions(buildSolutions(selectedTools, aiTool, val));
        advance(5);
      }, 2400);
    }, 300);
  };

  const handleSendReport = async () => {
    if (!email || sending || sent) return;
    setSending(true);

    // Fire API in background — user always sees success after 2s
    fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, solutions, bizType, aiTool, selectedTools, painPoint }),
    }).catch(err => console.error('send-report:', err));

    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
  };

  const isFloating   = animPhase === 'floating';
  const isConverging = animPhase === 'converging';
  const isBurst      = animPhase === 'burst';
  const isRevealed   = animPhase === 'revealed';

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#060A18' }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(198,166,44,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '25%', top: '50%', transform: 'translate(-50%,-50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(198,166,44,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center pt-20 pb-16">
        <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-20 items-start pt-8">

          {/* ── LEFT: Animation → Headline ─────────────────────────────── */}
          <div className="relative lg:sticky lg:top-24" style={{ minHeight: 560 }}>

            <AnimatePresence>
              {!isRevealed && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Floating cards */}
                  {TOOLS.map((tool, i) => {
                    const sc = SCATTER[i];
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ x: sc.x, y: sc.y + 24, rotate: sc.rot, opacity: 0, scale: 0.82 }}
                        animate={
                          isFloating ? {
                            x: sc.x,
                            y: [sc.y, sc.y - sc.fy, sc.y],
                            rotate: [sc.rot, sc.rot + 2, sc.rot],
                            opacity: 1, scale: 1,
                          } : isConverging ? {
                            x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.88,
                          } : {
                            x: 0, y: 0, opacity: 0, scale: 0,
                          }
                        }
                        transition={
                          isFloating ? {
                            opacity: { duration: 0.55, delay: i * 0.07 },
                            scale:   { duration: 0.55, delay: i * 0.07 },
                            x:       { duration: 0.01 },
                            y:       { duration: sc.fd, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: sc.fd2 + 0.6 },
                            rotate:  { duration: sc.fd * 1.3, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: sc.fd2 + 0.6 },
                          } : isConverging ? {
                            duration: 0.72, delay: i * 0.04, ease: [0.23, 0.86, 0.39, 0.96],
                          } : {
                            duration: 0.28, ease: 'easeIn',
                          }
                        }
                        className="absolute flex items-center gap-2.5 rounded-xl border pointer-events-none select-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.97)',
                          borderColor: 'rgba(210,210,210,0.7)',
                          boxShadow: '0 4px 22px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.25)',
                          padding: '9px 15px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                        <span className="text-[13px] font-semibold text-gray-900">{tool.name}</span>
                      </motion.div>
                    );
                  })}

                  {/* Burst rings */}
                  <AnimatePresence>
                    {isBurst && [0,1,2,3].map(i => (
                      <motion.div
                        key={i}
                        initial={{ width: 16, height: 16, x: -8, y: -8, opacity: 0.85 }}
                        animate={{ width: 480 + i * 110, height: 480 + i * 110, x: -(240 + i * 55), y: -(240 + i * 55), opacity: 0 }}
                        transition={{ duration: 0.85, delay: i * 0.1, ease: [0, 0.4, 0.5, 1] }}
                        className="absolute rounded-full"
                        style={{ border: `${2 - i * 0.3}px solid rgba(198,166,44,${0.65 - i * 0.12})`, pointerEvents: 'none' }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Revealed headline */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] mb-7 w-fit"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C6A62C]" style={{ boxShadow: '0 0 8px rgba(198,166,44,0.9)' }} />
                    <span className="text-[11px] font-bold text-white/40 tracking-[0.15em] uppercase">
                      Your AI &amp; Automation Partner
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.75, ease: [0.23, 0.86, 0.39, 0.96] }}
                    className="font-extrabold tracking-tight leading-[1.04] mb-5"
                    style={{ fontSize: 'clamp(36px,4.2vw,66px)' }}
                  >
                    <span className="block text-white">You Bought the Tools.</span>
                    <span
                      className="block"
                      style={{
                        backgroundImage: 'linear-gradient(92deg, #C6A62C 0%, #e8c84a 45%, #a08020 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      We'll Make Them Work.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-white/45 font-light leading-relaxed max-w-lg mb-9"
                    style={{ fontSize: 'clamp(16px,1.3vw,19px)' }}
                  >
                    AI connects your existing tools to eliminate the work slowing your team down —
                    see exactly where in 60 seconds.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex flex-wrap items-center gap-4 mb-10"
                  >
                    <button
                      onClick={openModal}
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-base text-black transition-all duration-300 hover:-translate-y-0.5"
                      style={{ backgroundColor: '#C6A62C', boxShadow: '0 6px 28px rgba(198,166,44,0.38)' }}
                    >
                      Book Your Assessment →
                    </button>
                    <a href="#process" className="text-sm font-medium text-white/35 hover:text-white/60 transition-colors duration-200">
                      See how it works ↓
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="flex gap-8 pt-7 border-t border-white/[0.07]"
                  >
                    {[
                      { value: '48 hrs', label: 'Report delivered'        },
                      { value: '100%',   label: 'Custom to your business' },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="text-2xl font-extrabold text-white">{s.value}</div>
                        <div className="text-xs text-white/30 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Swipe Chat ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
          >
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'rgba(8,13,32,0.88)',
                borderColor: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#C6A62C] flex-shrink-0"
                  style={{ backgroundColor: 'rgba(198,166,44,0.12)', border: '1px solid rgba(198,166,44,0.22)' }}
                >
                  NA
                </div>
                <div className="flex-1">
                  <div className="text-white/80 text-sm font-semibold">NXT APEX AI</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }} />
                    <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>Online now</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {['rgba(255,95,86,0.45)','rgba(255,189,46,0.45)','rgba(39,201,63,0.45)'].map((c,i) => (
                    <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              {/* Chat body */}
              <div className="px-5 pt-5 pb-5">

                {/* Progress (steps 0-3 only) */}
                {step < 4 && <ProgressBar step={step} />}

                {/* Scanning */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 py-8"
                  >
                    <BotAvatar />
                    <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-1.5">
                        {[0,1,2].map(i => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#C6A62C]"
                            animate={{ opacity: [0.3,1,0.3] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {step === 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-start gap-2.5 mb-4">
                      <BotAvatar />
                      <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Here's where <strong className="text-[#C6A62C]">{
                            {claude:'Claude',chatgpt:'ChatGPT',both:'Claude + ChatGPT',neither:'AI'}[aiTool] || 'AI'
                          }</strong> creates the most immediate impact in your stack:
                        </p>
                      </div>
                    </div>

                    {solutions.map((sol, i) => <ChatOppCard key={i} sol={sol} index={i} />)}

                    {/* Email capture */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="rounded-xl border p-4 mt-1"
                      style={{ backgroundColor: 'rgba(198,166,44,0.07)', borderColor: 'rgba(198,166,44,0.2)' }}
                    >
                      <p className="text-white/80 text-sm font-semibold mb-1">Get your full AI Readiness Report — free</p>
                      <p className="text-white/38 text-[12px] mb-3 leading-relaxed">
                        A complete breakdown of every opportunity in your stack, ranked by impact.
                      </p>
                      {sent ? (
                        <div className="py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#C6A62C] text-lg">✓</span>
                            <span className="text-sm font-bold" style={{ color: '#C6A62C' }}>
                              Your report is on the way.
                            </span>
                          </div>
                          <p className="text-[11px] pl-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            Check your inbox — it should be there in the next minute.
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendReport()}
                            placeholder="your@email.com"
                            className="flex-1 px-3 py-2 rounded-lg text-sm text-white/80 outline-none border transition-colors min-w-0"
                            style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                          />
                          <button
                            onClick={handleSendReport}
                            disabled={sending || !email}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-black whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                            style={{ backgroundColor: '#C6A62C', boxShadow: '0 3px 14px rgba(198,166,44,0.35)' }}
                          >
                            {sending ? 'Sending...' : 'Send Report'}
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>or</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                      </div>
                      <button
                        onClick={openModal}
                        className={`w-full mt-3 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-500 hover:border-white/20 ${sent ? 'book-call-active' : ''}`}
                        style={!sent ? {
                          borderColor: 'rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.65)',
                        } : {}}
                      >
                        <span>Book a call — we'll walk through it live →</span>
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Steps 0-3: Swipe container */}
                {step < 4 && (
                  <div style={{ minHeight: 280 }}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.23, 0.86, 0.39, 0.96] }}
                        className="space-y-4"
                      >

                        {/* ── Step 0: Tools ── */}
                        {step === 0 && (
                          <>
                            <div className="flex items-start gap-2.5">
                              <BotAvatar />
                              <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                                <p className="text-white/80 text-sm leading-relaxed">
                                  What tools is your team already paying for? Pick everything in your stack.
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {TOOLS.map(tool => (
                                <Chip
                                  key={tool.id}
                                  label={tool.name}
                                  color={tool.color}
                                  selected={selectedTools.includes(tool.id)}
                                  onClick={() => toggleTool(tool.id)}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => advance(1)}
                              disabled={selectedTools.length === 0}
                              className="w-full py-3 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
                              style={{
                                backgroundColor: '#C6A62C',
                                boxShadow: selectedTools.length > 0 ? '0 4px 22px rgba(198,166,44,0.4)' : 'none',
                              }}
                            >
                              {selectedTools.length === 0 ? 'Select tools above' : 'Start my AI Readiness Report →'}
                            </button>
                          </>
                        )}

                        {/* ── Step 1: Business Type ── */}
                        {step === 1 && (
                          <>
                            <div className="flex items-start gap-2.5">
                              <BotAvatar />
                              <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                                <p className="text-white/80 text-sm leading-relaxed">
                                  What best describes your business?
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {BIZ_TYPES.map(biz => (
                                <Chip
                                  key={biz}
                                  label={biz}
                                  selected={bizType === biz || (biz === 'Other' && showOther)}
                                  onClick={() => selectBiz(biz)}
                                />
                              ))}
                            </div>
                            <AnimatePresence>
                              {showOther && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="flex gap-2 overflow-hidden"
                                >
                                  <input
                                    ref={otherInputRef}
                                    type="text"
                                    value={bizCustom}
                                    onChange={e => setBizCustom(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && submitOther()}
                                    placeholder="Describe your business..."
                                    className="flex-1 px-3 py-2 rounded-lg text-sm text-white/80 outline-none border transition-colors"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
                                  />
                                  <button
                                    onClick={submitOther}
                                    disabled={!bizCustom.trim()}
                                    className="px-4 py-2 rounded-lg text-sm font-semibold text-black disabled:opacity-30"
                                    style={{ backgroundColor: '#C6A62C' }}
                                  >
                                    Go →
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}

                        {/* ── Step 2: AI Tool ── */}
                        {step === 2 && (
                          <>
                            <div className="flex items-start gap-2.5">
                              <BotAvatar />
                              <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                                <p className="text-white/80 text-sm leading-relaxed">
                                  Which AI assistant is your team already working with?
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {AI_OPTIONS.map(opt => (
                                <Chip
                                  key={opt.id}
                                  label={opt.label}
                                  selected={aiTool === opt.id}
                                  onClick={() => selectAI(opt.id)}
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {/* ── Step 3: Focus Activity ── */}
                        {step === 3 && (
                          <>
                            <div className="flex items-start gap-2.5">
                              <BotAvatar />
                              <div className="rounded-xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                                <p className="text-white/80 text-sm leading-relaxed">
                                  What's your team spending the most hours on manually each week?
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PAIN_POINTS.map(pp => (
                                <Chip
                                  key={pp}
                                  label={pp}
                                  selected={painPoint === pp || (pp === 'Other' && showPainOther)}
                                  onClick={() => selectPain(pp)}
                                />
                              ))}
                            </div>
                            <AnimatePresence>
                              {showPainOther && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="flex gap-2 overflow-hidden"
                                >
                                  <input
                                    ref={painOtherRef}
                                    type="text"
                                    value={painCustom}
                                    onChange={e => setPainCustom(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && submitPainOther()}
                                    placeholder="Describe the activity..."
                                    className="flex-1 px-3 py-2 rounded-lg text-sm text-white/80 outline-none border transition-colors"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
                                  />
                                  <button
                                    onClick={submitPainOther}
                                    disabled={!painCustom.trim()}
                                    className="px-4 py-2 rounded-lg text-sm font-semibold text-black disabled:opacity-30"
                                    style={{ backgroundColor: '#C6A62C' }}
                                  >
                                    Go →
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {step < 4 && (
                  <p className="text-center text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    60 seconds · Free · No commitment
                  </p>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
