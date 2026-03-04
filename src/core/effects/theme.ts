import type { CSSProperties } from "react";

import type { TerminalColor, ThemeMode } from "@/core/terminal/types";

type ThemeTokens = {
  className: string;
  style: CSSProperties;
};

const colorMap: Record<TerminalColor, { text: string; glow: string }> = {
  verde: { text: "#4ade80", glow: "rgba(74, 222, 128, 0.35)" },
  magenta: { text: "#e879f9", glow: "rgba(232, 121, 249, 0.35)" },
  cian: { text: "#22d3ee", glow: "rgba(34, 211, 238, 0.35)" },
  ambar: { text: "#f59e0b", glow: "rgba(245, 158, 11, 0.35)" },
};

export function getThemeTokens(
  theme: ThemeMode,
  color: TerminalColor,
  scanlinesEnabled: boolean,
): ThemeTokens {
  const base = "relative h-screen overflow-hidden bg-black font-mono";

  const mode =
    theme === "glitch"
      ? "animate-pulse"
      : theme === "clean"
        ? ""
        : "";

  const scanlines = scanlinesEnabled
    ? "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] before:bg-[size:100%_4px]"
    : "";

  const selectedColor = colorMap[color];

  const style: CSSProperties = {
    color: selectedColor.text,
    textShadow: theme === "clean" ? "none" : `0 0 8px ${selectedColor.glow}`,
    filter: theme === "glitch" ? "saturate(1.2)" : "none",
  };

  return {
    className: `${base} ${mode} ${scanlines}`.trim(),
    style,
  };
}
