import React, { useState, useRef, useEffect } from 'react';

interface LazyRenderProps {
  children: React.ReactNode;
  placeholderHeight?: string;
}

export const LazyRender: React.FC<LazyRenderProps> = ({ children, placeholderHeight = '180px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? undefined : placeholderHeight }}>
      {isVisible ? (
        children
      ) : (
        <div
          style={{ height: placeholderHeight }}
          className="w-full bg-white rounded-2xl border border-slate-100 animate-pulse flex items-center justify-center text-slate-300"
        >
          <span className="text-[10px] uppercase tracking-wider font-semibold">Loading Card...</span>
        </div>
      )}
    </div>
  );
};

export default LazyRender;
