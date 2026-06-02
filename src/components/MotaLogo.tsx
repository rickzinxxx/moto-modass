import React from "react";

interface MotaLogoProps {
  className?: string;
  strokeWidth?: number;
}

export const MotaLogo: React.FC<MotaLogoProps> = ({
  className = "w-full max-w-[280px] h-auto",
  strokeWidth = 9.5,
}) => {
  return (
    <svg
      viewBox="0 0 320 250"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        className="text-white"
      >
        {/* Outer Shell M Path with bottom flat cap hooks */}
        <path d="M 103,212 L 72,212 L 102,32 L 160,192 L 218,32 L 248,212 L 217,212" />

        {/* Inner Parallel M Path */}
        <path d="M 103,212 L 126,76 L 160,148 L 194,76 L 217,212" />
      </g>
    </svg>
  );
};
