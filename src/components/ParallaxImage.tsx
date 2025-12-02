import React, { useEffect, useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = '',
  speed = 0.5 
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      
      imgRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <img 
      ref={imgRef}
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
};

export default ParallaxImage;