
import React, { useState } from 'react';

interface HookCardProps {
  hook: string;
  index: number;
}

export const HookCard: React.FC<HookCardProps> = ({ hook, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="group relative bg-[#1A1A1A] border border-[#2A2A2A] p-8 mb-6 transition-all duration-200 hover:border-[#2E5CFF] hover:bg-[#1F1F1F] animate-slide-up"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'backwards'
      }}
    >
      <p className="text-[#FAFAFA] text-[0.95rem] leading-relaxed pr-24 font-sans">
        {hook}
      </p>

      <button
        onClick={handleCopy}
        className={`
          absolute top-8 right-8 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.1em]
          transition-all duration-200 border sharp-edge
          ${copied
            ? 'bg-[#2E5CFF] border-[#2E5CFF] text-white'
            : 'bg-transparent border-[#4A4A4A] text-[#A0A0A0] hover:border-[#2E5CFF] hover:text-[#2E5CFF]'
          }
        `}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};
