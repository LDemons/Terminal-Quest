"use client";

import { useEffect } from "react";

type BootScreenProps = {
  onComplete: () => void;
};

const bootLines = [
  "[ OK ] Initializing TerminalQuest Kernel",
  "[ OK ] Mounting /shell",
  "[ OK ] Loading command registry",
  "[ OK ] Activating neon renderer",
  "[DONE] Boot sequence complete",
];

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black p-8 font-mono text-green-400">
      {bootLines.map((line) => (
        <p key={line} className="animate-pulse">
          {line}
        </p>
      ))}
    </div>
  );
}
