"use client";

import { FormEvent, useMemo, useState } from "react";

import { getAppCatalog } from "@/core/commands/registry";
import { getThemeClasses } from "@/core/effects/theme";
import { useShellStore } from "@/core/state/shell-store";

export function Terminal() {
  const [value, setValue] = useState("");
  const lines = useShellStore((state) => state.lines);
  const theme = useShellStore((state) => state.theme);
  const scanlines = useShellStore((state) => state.scanlines);
  const executeInput = useShellStore((state) => state.executeInput);

  const appCatalog = useMemo(() => getAppCatalog(), []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    executeInput(value);
    setValue("");
  };

  return (
    <main className={getThemeClasses(theme, scanlines)}>
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-5 p-6">
        <header className="space-y-1 border border-current/30 p-3">
          <h1 className="text-xl font-bold">TerminalQuest OS // Shell</h1>
          <p className="text-sm opacity-90">Apps registradas: {appCatalog.join(" | ")}</p>
        </header>

        <section className="flex-1 space-y-2 overflow-auto border border-current/20 p-4">
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
            placeholder="Escribe un comando..."
          />
        </form>
      </section>
    </main>
  );
}
