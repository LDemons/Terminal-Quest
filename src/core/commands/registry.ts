import { appRegistry } from "@/apps/registry";
import { aboutLines, projectLines, skillLines } from "@/content/profile";
import type { CommandContext, TerminalCommand, ThemeMode } from "@/core/terminal/types";

const themeModes: ThemeMode[] = ["crt", "glitch", "clean"];

export const commandRegistry: TerminalCommand[] = [
  {
    name: "help",
    description: "Muestra los comandos disponibles.",
    usage: "help",
    execute: () => ({
      output: [
        "Comandos disponibles:",
        "- help",
        "- about",
        "- skills",
        "- projects",
        "- open <app>",
        "- theme <mode>",
        "- toggle scanlines",
        "- clear",
      ],
    }),
  },
  {
    name: "about",
    description: "Muestra descripción del sistema.",
    usage: "about",
    execute: () => ({ output: aboutLines }),
  },
  {
    name: "skills",
    description: "Lista habilidades principales.",
    usage: "skills",
    execute: () => ({ output: skillLines }),
  },
  {
    name: "projects",
    description: "Lista proyectos destacados.",
    usage: "projects",
    execute: () => ({ output: projectLines }),
  },
  {
    name: "open",
    description: "Abre una app registrada dentro del shell.",
    usage: "open <app>",
    execute: (args, context: CommandContext) => {
      const appId = args[0]?.toLowerCase();

      if (!appId) {
        return { output: ["Uso: open <app>"] };
      }

      return {
        output: [context.openApp(appId)],
      };
    },
  },
  {
    name: "theme",
    description: "Cambia el modo visual del shell.",
    usage: "theme <crt|glitch|clean>",
    execute: (args, context) => {
      const selected = args[0]?.toLowerCase() as ThemeMode | undefined;

      if (!selected || !themeModes.includes(selected)) {
        return {
          output: [
            `Theme actual: ${context.currentTheme}`,
            "Uso: theme <crt|glitch|clean>",
          ],
        };
      }

      context.setTheme(selected);
      return { output: [`Tema cambiado a '${selected}'.`] };
    },
  },
  {
    name: "toggle",
    description: "Alterna opciones del shell.",
    usage: "toggle scanlines",
    execute: (args, context) => {
      const feature = args[0]?.toLowerCase();

      if (feature !== "scanlines") {
        return { output: ["Uso: toggle scanlines"] };
      }

      context.toggleScanlines();
      return {
        output: [
          `Scanlines ${context.isScanlinesEnabled ? "desactivadas" : "activadas"}.`,
        ],
      };
    },
  },
  {
    name: "clear",
    description: "Limpia la terminal.",
    usage: "clear",
    execute: (_, context) => {
      context.clearScreen();
      return { output: [], clear: true };
    },
  },
];

const commandLookup = new Map<string, TerminalCommand>();

for (const command of commandRegistry) {
  commandLookup.set(command.name, command);

  for (const alias of command.aliases ?? []) {
    commandLookup.set(alias, command);
  }
}

export function runCommand(input: string, args: string[], context: CommandContext) {
  const command = commandLookup.get(input);

  if (!command) {
    return {
      output: [
        `Comando no reconocido: '${input}'.`,
        "Escribe 'help' para ver comandos disponibles.",
      ],
    };
  }

  return command.execute(args, context);
}

export function getAppCatalog() {
  return Object.values(appRegistry).map((app) => `${app.id} :: ${app.description}`);
}
