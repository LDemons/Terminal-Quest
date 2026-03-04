# TerminalQuest OS

Arquitectura base de un **Shell + Apps** en Next.js para construir una experiencia terminal/RPG de portafolio.

## Arquitectura propuesta

```text
src/
  app/
    layout.tsx
    page.tsx
  core/
    terminal/
      parser.ts
      types.ts
    commands/
      registry.ts
    state/
      shell-store.ts
    ui/
      BootScreen.tsx
      Terminal.tsx
    effects/
      theme.ts
  apps/
    registry.ts
  content/
    profile.ts
```

### Núcleo Shell

- **Boot Screen**: secuencia inicial con transición al shell.
- **Terminal UI**: render de historial + prompt + input.
- **Parser**: tokeniza comandos y soporta argumentos con comillas.
- **Command Registry**: define comandos, usos y ejecución.
- **Shell Store (Zustand)**: estado global del shell (tema, scanlines, historial).

### Catálogo inicial de comandos (MVP)

- `help`
- `about`
- `skills`
- `projects`
- `open <app>`
- `theme <mode>`
- `toggle scanlines`
- `clear`

### Sistema de Apps

Las apps se registran en `src/apps/registry.ts` y se abren con `open <appId>`.

## Notas de diseño senior

1. **Escalabilidad por contratos**: cada comando responde al tipo `TerminalCommand`, evitando lógica ad-hoc.
2. **Separación de responsabilidades**:
   - parseo en `parser.ts`
   - ejecución en `commands/registry.ts`
   - estado de sesión en Zustand
3. **Evolución natural**:
   - migrar el registro de comandos por app (plugin system)
   - versionar formato de comandos para telemetría o replay
   - añadir middleware de comandos (auth, logging, cooldown)
