import React, { useEffect, useRef } from 'react';

interface AnimatedCodeDisplayProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  colorScheme?: 'matrix' | 'rainbow' | 'blue' | 'green' | 'flux';
  trailEffect?: boolean;
  glowEffect?: boolean;
}

const AnimatedCodeDisplay: React.FC<AnimatedCodeDisplayProps> = ({ 
  className = '', 
  density = 'medium',
  speed = 'medium',
  colorScheme = 'matrix',
  trailEffect = false,
  glowEffect = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Real code snippets that will be displayed in the animation
  const codeSnippets = [
    // JavaScript/React snippets
    'const [state, setState] = useState(initialValue);',
    'useEffect(() => { fetchData(); }, []);',
    'const handleClick = async () => { await api.call(); };',
    'return <Component prop={value} />;',
    'import { useState, useEffect } from "react";',
    'export default function Component() { return <div />; }',
    'const data = await fetch("/api/data").then(res => res.json());',
    'const filtered = items.filter(item => item.active);',
    
    // HTML/CSS snippets
    '<div className="container">Content</div>',
    '<button onClick={handler}>Click me</button>',
    '.className { display: flex; justify-content: center; }',
    '<form onSubmit={handleSubmit}>Input: <input type="text" /></form>',
    
    // Backend/API snippets
    'app.get("/api/data", async (req, res) => { res.json(data); });',
    'const user = await db.collection("users").findOne({ id });',
    'router.post("/submit", validate, controller);',
    'const token = jwt.sign(payload, secret, { expiresIn: "1h" });',
    
    // Database/Query snippets
    'SELECT * FROM users WHERE active = true;',
    'db.collection("posts").find({ author: userId });',
    'INSERT INTO logs (event, timestamp) VALUES (?, ?);',
    'User.findById(id).populate("profile");',
    
    // Utility snippets
    'const debounce = (func, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => func(...args), delay); }; };',
    'const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);',
    'const deepClone = (obj) => JSON.parse(JSON.stringify(obj));',
    'const groupBy = (array, key) => array.reduce((result, item) => ({ ...result, [item[key]]: [...(result[item[key]] || []), item] }), {});',
    
    // Flux Solutions specific snippets
    'class FluxSolutions { constructor() { this.innovation = true; } }',
    'const fluxTechStack = ["HTML5", "MERN", "Figma", "Flutter", "Java", "WordPress"];',
    'function buildDigitalExperience() { return "Transforming Ideas Into Reality"; }',
    'const fluxMission = "Empowering Businesses Through Technology";'
  ];

  // Color schemes for the code snippets
  const colorSchemes = {
    matrix: [
      'text-green-400',
      'text-green-300',
      'text-green-500'
    ],
    rainbow: [
      'text-green-400',
      'text-cyan-400', 
      'text-blue-400',
      'text-purple-400',
      'text-pink-400',
      'text-red-400',
      'text-orange-400',
      'text-yellow-400'
    ],
    blue: [
      'text-blue-400',
      'text-cyan-400',
      'text-sky-400'
    ],
    green: [
      'text-green-400',
      'text-emerald-400',
      'text-lime-400'
    ],
    flux: [
      'text-cyan-400',
      'text-blue-400',
      'text-purple-400'
    ]
  };

  // Density settings
  const densitySettings = {
    low: { interval: 500, initialCount: 5 },
    medium: { interval: 300, initialCount: 10 },
    high: { interval: 150, initialCount: 15 }
  };

  // Speed settings
  const speedSettings = {
    slow: { min: 10, max: 15 },
    medium: { min: 8, max: 12 },
    fast: { min: 5, max: 8 }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const colors = colorSchemes[colorScheme];
    const { interval, initialCount } = densitySettings[density];
    const { min, max } = speedSettings[speed];
    
    const createFallingCodeSnippet = () => {
      const snippetElement = document.createElement('div');
      const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      
      snippetElement.className = 'absolute font-mono whitespace-nowrap opacity-70';
      
      // Add glow effect if enabled
      if (glowEffect) {
        snippetElement.classList.add('drop-shadow-glow');
      }
      
      // Randomly choose color
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      snippetElement.classList.add(randomColor);
      
      snippetElement.textContent = randomSnippet;
      
      // Random horizontal position
      const startX = Math.random() * 100;
      snippetElement.style.left = `${startX}%`;
      snippetElement.style.top = '-30px';
      
      // Random animation duration based on speed setting
      const animationDuration = min + Math.random() * (max - min);
      snippetElement.style.animation = `fallCode ${animationDuration}s linear forwards`;
      
      // Add trail effect if enabled
      if (trailEffect) {
        snippetElement.style.animation = `fallCodeWithTrail ${animationDuration}s linear forwards`;
      }
      
      // Random font size for variety
      const fontSizes = ['text-[8px]', 'text-[9px]', 'text-[10px]', 'text-xs'];
      const randomFontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      snippetElement.classList.add(randomFontSize);
      
      // Random opacity for depth effect
      const opacity = 0.3 + Math.random() * 0.4;
      snippetElement.style.opacity = opacity.toString();
      
      container.appendChild(snippetElement);
      
      // Remove element after animation completes to prevent memory leaks
      setTimeout(() => {
        if (snippetElement.parentNode === container) {
          container.removeChild(snippetElement);
        }
      }, animationDuration * 1000);
    };

    // Create elements at the specified interval
    const intervalId = setInterval(createFallingCodeSnippet, interval);
    
    // Initial burst of elements for immediate visual impact
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createFallingCodeSnippet(), i * 100);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [density, speed, colorScheme, trailEffect, glowEffect]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <style>
        {`
          @keyframes fallCode {
            0% {
              transform: translateY(-30px) rotate(0deg) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(100vh) rotate(5deg) translateX(0px);
              opacity: 0;
            }
          }
          
          @keyframes fallCodeWithTrail {
            0% {
              transform: translateY(-30px) rotate(0deg) translateX(0px);
              opacity: 0;
              text-shadow: 0 0 0 currentColor;
            }
            10% {
              opacity: 0.7;
              text-shadow: 0 0 5px currentColor;
            }
            50% {
              text-shadow: 0 0 10px currentColor;
            }
            90% {
              opacity: 0.7;
              text-shadow: 0 0 5px currentColor;
            }
            100% {
              transform: translateY(100vh) rotate(5deg) translateX(0px);
              opacity: 0;
              text-shadow: 0 0 0 currentColor;
            }
          }
          
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px currentColor);
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedCodeDisplay;