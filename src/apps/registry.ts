export type AppModule = {
  id: string;
  title: string;
  description: string;
  getLaunchMessage: () => string[];
};

const ROOM_VARIANTS = [
  ["┌───┐", "│ @ │", "└─┬─┘"],
  ["┌───┐", "│ ⚔ │", "└─┬─┘"],
  ["┌───┐", "│ ✦ │", "└─┬─┘"],
  ["┌───┐", "│ ☠ │", "└─┬─┘"],
  ["┌───┐", "│ ♫ │", "└─┬─┘"],
] as const;

const randomFrom = <T>(options: readonly T[]) =>
  options[Math.floor(Math.random() * options.length)];

function buildDungeonPreview() {
  const roomA = randomFrom(ROOM_VARIANTS);
  const roomB = randomFrom(ROOM_VARIANTS);
  const roomC = randomFrom(ROOM_VARIANTS);
  const roomD = randomFrom(ROOM_VARIANTS);

  return [
    "      Spotify Dungeon // Vista ASCII",
    "",
    `${roomA[0]}   ${roomB[0]}`,
    `${roomA[1]}═╦═${roomB[1]}`,
    `${roomA[2]} ║ ${roomB[2]}`,
    "  ║      ║",
    `${roomC[0]}══╩══${roomD[0]}`,
    `${roomC[1]}   ${roomD[1]}`,
    `${roomC[2]}   ${roomD[2]}`,
  ];
}

export const appRegistry: Record<string, AppModule> = {
  "spotify-dungeon": {
    id: "spotify-dungeon",
    title: "Spotify Dungeon",
    description: "Roguelike musical command app (en construcción).",
    getLaunchMessage: () => [
      "Launching Spotify Dungeon...",
      ...buildDungeonPreview(),
      "",
      "Tip: cada apertura muestra variaciones de salas ASCII.",
      "Módulo completo todavía en desarrollo en otro chat.",
    ],
  },
};
