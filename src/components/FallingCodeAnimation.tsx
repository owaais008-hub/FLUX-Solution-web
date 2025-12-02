import React, { useEffect, useRef } from 'react';

interface FallingCodeAnimationProps {
  className?: string;
}

const FallingCodeAnimation: React.FC<FallingCodeAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const characters = [
      '0', '1', 'console.log', 'import', 'export', 'function', 'const', 'let', 'var', 'if', 'else', 'return', 
      'class', 'extends', 'try', 'catch', 'async', 'await', '=>', '()', '{}', '[]', ';', '//', '/*', '*/', 
      'for', 'while', 'switch', 'case', 'break', 'continue', 'new', 'this', 'super', 'static', 'public', 
      'private', 'protected', 'interface', 'type', 'interface', 'enum', 'module', 'namespace', 'require', 
      'from', 'default', 'as', 'of', 'in', 'with', 'yield', 'throw', 'delete', 'typeof', 'instanceof', 
      'void', 'null', 'undefined', 'true', 'false', 'NaN', 'Infinity', 'document', 'window', 'addEventListener', 
      'getElementById', 'querySelector', 'fetch', 'Promise', 'resolve', 'reject', 'then', 'map', 'filter', 
      'reduce', 'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'concat', 'join', 'split', 'replace', 
      'match', 'test', 'exec', 'JSON', 'parse', 'stringify', 'Math', 'random', 'floor', 'ceil', 'round', 
      'Date', 'now', 'getTime', 'setState', 'useState', 'useEffect', 'render', 'componentDidMount', 'props', 
      'state', 'div', 'span', 'button', 'input', 'form', 'ul', 'li', 'h1', 'p', 'img', 'a', 'link', 'script', 
      'style', 'html', 'head', 'body', 'css', 'scss', 'sass', 'less', 'npm', 'yarn', 'webpack', 'babel', 
      'react', 'vue', 'angular', 'node', 'express', 'mongodb', 'sql', 'postgres', 'mysql', 'redis', 'docker', 
      'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github', 'bitbucket', 'gitlab', 'api', 'rest', 'graphql', 
      'json', 'xml', 'yaml', 'toml', 'config', 'env', 'process', 'env', 'port', 'host', 'url', 'path', 
      'route', 'middleware', 'controller', 'service', 'model', 'view', 'component', 'directive', 'pipe', 
      'filter', 'module', 'decorator', 'inject', 'provider', 'factory', 'singleton', 'observer', 'strategy', 
      'factory', 'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy', 'chain', 
      'command', 'interpreter', 'iterator', 'mediator', 'memento', 'prototype', 'state', 'template', 'visitor'
    ];
    
    const createFallingCode = () => {
      const codeElement = document.createElement('div');
      const isLongCode = Math.random() > 0.7;
      const fontSize = isLongCode ? 'text-xs' : Math.random() > 0.5 ? 'text-[10px]' : 'text-[8px]';
      
      codeElement.className = `absolute font-mono ${fontSize} opacity-40`;
      
      // Randomly choose between green and blue colors for variety
      const colorClass = Math.random() > 0.5 ? 'text-green-400' : 'text-cyan-400';
      codeElement.classList.add(colorClass);
      
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      codeElement.textContent = randomChar;
      
      const startX = Math.random() * 100;
      codeElement.style.left = `${startX}%`;
      codeElement.style.top = '-20px';
      
      // Random animation duration between 2-5 seconds
      const animationDuration = 2 + Math.random() * 3;
      codeElement.style.animation = `fall ${animationDuration}s linear infinite`;
      
      // Random horizontal drift for more natural movement
      const drift = (Math.random() - 0.5) * 20;
      codeElement.style.setProperty('--drift', `${drift}px`);
      
      container.appendChild(codeElement);
      
      // Remove element after animation completes to prevent memory leaks
      setTimeout(() => {
        if (codeElement.parentNode === container) {
          container.removeChild(codeElement);
        }
      }, animationDuration * 1000);
    };

    // Create elements more frequently for denser effect
    const interval = setInterval(createFallingCode, 100);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.1) 2px, rgba(34, 197, 94, 0.1) 4px)',
      }}
    >
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg) translateX(0px);
              opacity: 0.5;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(100vh) rotate(360deg) translateX(var(--drift, 0px));
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FallingCodeAnimation;