import React from 'react';
import { Flag } from 'lucide-react';

const countryColors = {
  'US': { primary: '#B22234', secondary: '#FFFFFF', accent: '#3C3B6E' },
  'IN': { primary: '#FF9933', secondary: '#FFFFFF', accent: '#138808' },
  'BD': { primary: '#006A4E', secondary: '#F42A41', accent: '#006A4E' }
};

const FlagIcon = ({ 
  countryCode = 'US', 
  size = 20, 
  className = '', 
  animate = true 
}) => {
  const colors = countryColors[countryCode] || countryColors.US;
  
  const animationClass = animate ? 'hover:scale-110 transition-all duration-300' : '';
  
  return (
    <div className={`relative inline-block ${className} ${animationClass}`}>
      <Flag 
        size={size} 
        color={colors.primary}
        fill={colors.secondary}
        className="drop-shadow-sm"
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.accent} 100%)`
        }}
      />
    </div>
  );
};

export default FlagIcon;
