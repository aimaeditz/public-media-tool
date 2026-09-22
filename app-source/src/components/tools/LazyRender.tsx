import React, { useState, useEffect, useRef } from 'react';

interface LazyRenderProps {
  children: React.ReactNode;
  placeholderHeight?: string;
}

export const LazyRender: React.FC<LazyRenderProps> = ({
  children,
  placeholderHeight = '180px',
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before coming into view
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isIntersecting ? undefined : placeholderHeight }}>
      {isIntersecting ? (
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
