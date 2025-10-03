import React from 'react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer border border-transparent hover:border-amber-400 group">
      <div className="flex items-center">
        <div className="bg-zinc-800 p-3 rounded-lg mr-4">
           <Icon className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300">{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCard;