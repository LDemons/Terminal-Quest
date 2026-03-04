import type { ParsedCommand } from "./types";

const tokenPattern = /"([^"]*)"|'([^']*)'|(\S+)/g;

export function parseCommand(input: string): ParsedCommand | null {
  const raw = input.trim();

  if (!raw) {
    return null;
  }

  const tokens: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(raw)) !== null) {
    const [, doubleQuoted, singleQuoted, plain] = match;
    tokens.push(doubleQuoted ?? singleQuoted ?? plain);
  }

  if (tokens.length === 0) {
    return null;
  }

  const [command, ...args] = tokens;

  return {
    raw,
    command: command.toLowerCase(),
    args,
  };
}
