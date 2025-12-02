import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  pauseDuration?: number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  texts, 
  speed = 100, 
  pauseDuration = 1500,
  className = '',
  tag: Tag = 'span'
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentString = texts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        if (charIndex > 0) {
          setCurrentText(currentString.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing text
        if (charIndex < currentString.length) {
          setCurrentText(currentString.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, texts, currentTextIndex, speed, pauseDuration]);

  return (
    <Tag className={className}>
      {currentText}
      <span className="ml-1 inline-block w-1 h-6 bg-cyan-400 align-middle animate-pulse"></span>
    </Tag>
  );
};

export default TypingText;