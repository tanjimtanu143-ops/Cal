
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  type?: 'default' | 'operator' | 'special';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', type = 'default' }) => {
  const baseClasses = 'h-20 md:h-24 rounded-full text-3xl md:text-4xl focus:outline-none transition-colors duration-150 flex items-center justify-center active:opacity-80';

  let typeClasses = '';
  switch (type) {
    case 'operator':
      typeClasses = 'bg-btn-operator hover:bg-btn-operator-hover text-btn-operator-text';
      break;
    case 'special':
      typeClasses = 'bg-btn-special hover:bg-btn-special-hover text-btn-special-text';
      break;
    case 'default':
    default:
      typeClasses = 'bg-btn-default hover:bg-btn-default-hover text-btn-default-text';
      break;
  }

  const combinedClasses = `${baseClasses} ${typeClasses} ${className}`;

  return (
    <button onClick={onClick} className={combinedClasses} aria-label={label}>
      {label}
    </button>
  );
};

export default Button;