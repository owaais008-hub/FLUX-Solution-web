import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px) scale(0.95)';
      case 'down':
        return 'translateY(-30px) scale(0.95)';
      case 'left':
        return 'translateX(30px) scale(0.95)';
      case 'right':
        return 'translateX(-30px) scale(0.95)';
      case 'fade':
        return 'scale(0.95)';
      default:
        return 'translateY(30px) scale(0.95)';
    }
  };

  const transformValue = isVisible ? 'translateY(0) translateX(0) scale(1)' : getTransform();

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transformValue,
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

