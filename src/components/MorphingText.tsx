import React, { useState, useEffect } from "react";

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className={cn("relative flex items-center justify-center font-mono text-center tracking-widest uppercase text-white font-black select-none", className)}>
      {texts.map((txt, i) => {
        const isActive = i === index;
        return (
          <span
            key={i}
            className="absolute transition-all duration-700 ease-in-out uppercase"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0px) scale(1)" : "translateY(-4px) scale(0.92)",
              filter: isActive ? "blur(0px)" : "blur(4px)",
            }}
          >
            {txt}
          </span>
        );
      })}
    </div>
  );
};
