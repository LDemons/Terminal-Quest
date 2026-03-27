export type ThemeMode = "crt" | "glitch" | "clean";

export type TerminalColor = "verde" | "magenta" | "cian" | "ambar";

export type CommandContext = {
  currentTheme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  currentColor: TerminalColor;
  setColor: (color: TerminalColor) => void;
  isScanlinesEnabled: boolean;
  toggleScanlines: () => void;
  clearScreen: () => void;
  openApp: (appId: string) => string[];
};

export type CommandResult = {
  output: string[];
  clear?: boolean;
};

export type TerminalCommand = {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  execute: (args: string[], context: CommandContext) => CommandResult;
};

export type ParsedCommand = {
  raw: string;
  command: string;
  args: string[];
};
