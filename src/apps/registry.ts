export type AppModule = {
  id: string;
  title: string;
  description: string;
  launchMessage: string;
};

export const appRegistry: Record<string, AppModule> = {
  "spotify-dungeon": {
    id: "spotify-dungeon",
    title: "Spotify Dungeon",
    description: "Roguelike musical command app (en construcción).",
    launchMessage:
      "Launching Spotify Dungeon... módulo todavía en desarrollo en otro chat.",
  },
};
