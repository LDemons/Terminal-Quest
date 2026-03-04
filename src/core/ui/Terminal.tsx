"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  getAppCatalog,
  getCommandNames,
  TERMINAL_COLORS,
  THEME_MODES,
} from "@/core/commands/registry";
import { getThemeTokens } from "@/core/effects/theme";
import { useShellStore } from "@/core/state/shell-store";

function buildSuggestion(input: string): string | null {
  const trimmed = input.trimStart();

  if (!trimmed) {
    return null;
  }

  const tokens = trimmed.split(/\s+/);
  const commandToken = tokens[0]?.toLowerCase() ?? "";

  if (tokens.length === 1 && !input.endsWith(" ")) {
    const commands = getCommandNames();
    const match = commands.find((command) => command.startsWith(commandToken));
    return match ? match : null;
  }

  const lastToken = tokens[tokens.length - 1]?.toLowerCase() ?? "";
  const base = `${commandToken} `;

  if (commandToken === "open") {
    const apps = getAppCatalog().map((line) => line.split(" :: ")[0]);
    const match = apps.find((app) => app.startsWith(lastToken));
    return match ? `${base}${match}` : null;
  }

  if (commandToken === "theme") {
    const match = THEME_MODES.find((mode) => mode.startsWith(lastToken));
    return match ? `${base}${match}` : null;
  }

  if (commandToken === "toggle") {
    const option = "scanlines";
    return option.startsWith(lastToken) ? `${base}${option}` : null;
  }

  if (commandToken === "color") {
    const match = TERMINAL_COLORS.find((option) => option.startsWith(lastToken));
    return match ? `${base}${match}` : null;
  }

  return null;
}

export function Terminal() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const lines = useShellStore((state) => state.lines);
  const theme = useShellStore((state) => state.theme);
  const color = useShellStore((state) => state.color);
  const scanlines = useShellStore((state) => state.scanlines);
  const executeInput = useShellStore((state) => state.executeInput);
  const logContainerRef = useRef<HTMLElement | null>(null);

  const appCatalog = useMemo(() => getAppCatalog(), []);
  const themeTokens = useMemo(() => getThemeTokens(theme, color, scanlines), [theme, color, scanlines]);

  useEffect(() => {
    const element = logContainerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [lines]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    executeInput(trimmed);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistoryIndex((current) => {
        const nextIndex = current === -1 ? history.length - 1 : Math.max(0, current - 1);
        const nextValue = history[nextIndex] ?? "";
        setValue(nextValue);
        return nextIndex;
      });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (current === -1) {
          setValue("");
          return -1;
        }

        const nextIndex = current + 1;
        if (nextIndex >= history.length) {
          setValue("");
          return -1;
        }

        setValue(history[nextIndex] ?? "");
        return nextIndex;
      });
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const suggestion = buildSuggestion(value);
      if (suggestion) {
        setValue(suggestion);
      }
    }
  };

  return (
    <main className={themeTokens.className} style={themeTokens.style}>
      <section className="mx-auto flex h-full w-full max-w-5xl flex-col gap-5 p-6">
        <header className="space-y-1 border border-current/30 p-3">
          <h1 className="text-xl font-bold">TerminalQuest OS // Shell</h1>
          <p className="text-sm opacity-90">Apps registradas: {appCatalog.join(" | ")}</p>
          <p className="text-xs opacity-80">
            Tema: {theme} | Color: {color} | Atajos: ↑/↓ historial, TAB autocompletar
          </p>
        </header>

        <section
          ref={logContainerRef}
          className="min-h-0 flex-1 space-y-2 overflow-y-auto border border-current/20 p-4"
        >
          {lines.map((line) => (
            <p key={line.id} className="whitespace-pre-wrap text-sm">
              {line.text}
            </p>
          ))}
        </section>

        <form onSubmit={onSubmit} className="flex gap-2 border border-current/30 p-3">
          <span>&gt;</span>
          <input
            className="w-full bg-transparent outline-none"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Escribe un comando..."
          />
        </form>
      </section>
    </main>
  );
}
