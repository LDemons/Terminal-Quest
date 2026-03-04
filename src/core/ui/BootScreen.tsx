"use client";

import { useEffect } from "react";

type BootScreenProps = {
  onComplete: () => void;
};

const bootLines = [
  "[ OK ] Inicializando kernel de TerminalQuest",
  "[ OK ] Montando /shell",
  "[ OK ] Cargando registro de comandos",
  "[ OK ] Activando renderizador neón",
  "[DONE] Secuencia de arranque completada",
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
