import { create } from "zustand";

import { appRegistry } from "@/apps/registry";
import { runCommand } from "@/core/commands/registry";
import { parseCommand } from "@/core/terminal/parser";
import type { CommandContext, TerminalColor, ThemeMode } from "@/core/terminal/types";

type TerminalLine = {
  id: string;
  text: string;
  kind: "system" | "input" | "output";
};

type ShellState = {
  booted: boolean;
  theme: ThemeMode;
  color: TerminalColor;
  scanlines: boolean;
  lines: TerminalLine[];
  markBooted: () => void;
  setTheme: (theme: ThemeMode) => void;
  setColor: (color: TerminalColor) => void;
  toggleScanlines: () => void;
  clear: () => void;
  pushInput: (value: string) => void;
  pushOutput: (lines: string[]) => void;
  executeInput: (value: string) => void;
};

const initialLines: TerminalLine[] = [
  { id: "welcome-1", text: "TerminalQuest OS v0.1", kind: "system" },
  { id: "welcome-2", text: "Escribe 'help' para comenzar tu quest.", kind: "system" },
];

const lineId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useShellStore = create<ShellState>((set, get) => ({
  booted: false,
  theme: "crt",
  color: "verde",
  scanlines: true,
  lines: initialLines,
  markBooted: () => set({ booted: true }),
  setTheme: (theme) => set({ theme }),
  setColor: (color) => set({ color }),
  toggleScanlines: () => set((state) => ({ scanlines: !state.scanlines })),
  clear: () => set({ lines: [] }),
  pushInput: (value) =>
    set((state) => ({
      lines: [...state.lines, { id: lineId(), text: `> ${value}`, kind: "input" }],
    })),
  pushOutput: (outputLines) =>
    set((state) => ({
      lines: [
        ...state.lines,
        ...outputLines.map((line) => ({ id: lineId(), text: line, kind: "output" as const })),
      ],
    })),
  executeInput: (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    get().pushInput(trimmed);

    const parsed = parseCommand(trimmed);
    if (!parsed) {
      return;
    }

    const context: CommandContext = {
      currentTheme: get().theme,
      setTheme: get().setTheme,
      currentColor: get().color,
      setColor: get().setColor,
      isScanlinesEnabled: get().scanlines,
      toggleScanlines: get().toggleScanlines,
      clearScreen: get().clear,
      openApp: (appId: string) => {
        const app = appRegistry[appId];
        if (!app) {
          return [`App '${appId}' no encontrada.`];
        }
        return app.getLaunchMessage();
      },
    };

    const result = runCommand(parsed.command, parsed.args, context);

    if (result.clear) {
      get().clear();
    }

    if (result.output.length) {
      get().pushOutput(result.output);
    }
  },
}));
