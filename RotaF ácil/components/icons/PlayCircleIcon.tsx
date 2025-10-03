import React from 'react';

const PlayCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.795A9 9 0 1112.21 3 9 9 0 0121 12.795z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12.75l-2.25-1.313A.938.938 0 0012 12.188v2.624c0 .414.336.75.75.75h.001c.207 0 .406-.084.544-.23l2.25-1.312a.938.938 0 000-1.282z" />
  </svg>
);
export default PlayCircleIcon;
