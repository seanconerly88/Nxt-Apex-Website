'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tools = [
  {
    name: 'Claude Cowork',
    by: 'by Anthropic',
    description:
      'The most capable AI for business workflows. We train your team to use Claude Cowork for writing, analysis, research, document creation, and automating repetitive tasks — directly in their desktop environment.',
    capabilities: [
      'Document & report creation',
      'Workflow automation',
      'Research & deep analysis',
      'Team-wide collaboration',
    ],
    bgFrom: '#FFF9EC',
    bgTo: '#FFFBF0',
    borderColor: 'rgba(198,166,44,0.18)',
    dotColor: '#C6A62C',
  },
  {
    name: 'OpenAI for Business',
    by: 'by OpenAI',
    description:
      'ChatGPT with enterprise-grade privacy and team management. We configure it for your business and train every team member to get real output — not just experimentation.',
    capabilities: [
      'Custom GPTs for your workflows',
      'Data analysis & synthesis',
      'Content & copy generation',
      'Code assistance',
    ],
    bgFrom: '#F0FAF7',
    bgTo: '#F3FCF9',
    borderColor: 'rgba(16,185,129,0.18)',
    dotColor: '#10b981',
  },
  {
    name: 'Custom Workflows',
    by: 'built for you',
    description:
      'Beyond off-the-shelf tools. We build custom AI workflows that connect your existing software, automate your specific processes, and deliver ROI that generic tools can\'t touch.',
    capabilities: [
      'CRM & tool integration',
      'Process automation',
      'Custom AI agents',
      'Ongoing optimization',
    ],
    bgFrom: '#F0F4FF',
    bgTo: '#F3F6FF',
    borderColor: 'rgba(99,102,241,0.18)',
    dotColor: '#6366f1',
  },
];

export default function TrainingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="training" className="py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-500 tracking-[0.14em] uppercase mb-5">
            What We Train On
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            The tools that move businesses.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Not every AI tool belongs in every business. We train you on the ones that do.
          </p>
        </motion.div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
              className="rounded-2xl p-9 border hover:-translate-y-2 transition-all duration-300"
              style={{
                background: `linear-gradient(145deg, ${tool.bgFrom} 0%, ${tool.bgTo} 100%)`,
                borderColor: tool.borderColor,
              }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                <div className="text-sm text-gray-500 font-medium mt-1">{tool.by}</div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{tool.description}</p>
              <div className="space-y-3">
                {tool.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tool.dotColor }}
                    />
                    <span className="text-sm font-medium text-gray-700">{cap}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
