import * as React from "react";

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  className,
  textClassName
}: GooeyTextProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!texts || texts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className={cn("relative flex items-center justify-center select-none uppercase", className)}>
      {texts.map((txt, i) => {
        const isActive = i === index;
        return (
          <span
            key={i}
            className={cn(
              "absolute transition-all duration-1000 ease-in-out text-center text-white",
              textClassName
            )}
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(0.85)",
              filter: isActive ? "blur(0px)" : "blur(6px)",
            }}
          >
            {txt}
          </span>
        );
      })}
    </div>
  );
}
