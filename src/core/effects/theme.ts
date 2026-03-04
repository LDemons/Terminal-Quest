import type { ThemeMode } from "@/core/terminal/types";

export function getThemeClasses(theme: ThemeMode, scanlinesEnabled: boolean) {
  const base = "min-h-screen bg-black text-green-400 font-mono";
  const mode =
    theme === "glitch"
      ? "text-fuchsia-400"
      : theme === "clean"
        ? "text-emerald-300"
        : "text-green-400";

  const scanlines = scanlinesEnabled
    ? "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[size:100%_4px]"
    : "";

  return `${base} ${mode} relative ${scanlines}`.trim();
}
