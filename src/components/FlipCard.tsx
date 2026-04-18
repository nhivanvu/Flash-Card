'use client';

import { useState, useEffect } from 'react';

export function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center lg:justify-end relative z-10">
      <div className="perspective-1000">
        <div className="flashcard-container transition-transform duration-700" 
             style={{ 
               transform: `skewY(${isFlipped ? '6deg' : '-6deg'})` 
             }}>
          <div className={`flashcard-inner relative w-80 h-48 transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front of card */}
            <div className="flashcard-face absolute inset-0 w-full h-full backface-hidden rounded-xl flex items-center justify-center"
                 style={{
                   background: 'rgba(255, 255, 255, 0.2)',
                   backdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                 }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Ciao</div>
              </div>
            </div>
            
            {/* Back of card */}
            <div className="flashcard-face absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl flex items-center justify-center"
                 style={{
                   background: 'rgba(255, 255, 255, 0.2)',
                   backdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                 }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Hello</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}