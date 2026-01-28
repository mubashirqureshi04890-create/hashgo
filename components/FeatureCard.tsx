
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <h3 className="text-white font-orbitron text-xs uppercase tracking-[0.3em] mb-4 relative z-10">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed relative z-10 font-light">{description}</p>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-white/10 group-hover:w-12 group-hover:h-12 transition-all duration-500" />
    </div>
  );
};

export default FeatureCard;
