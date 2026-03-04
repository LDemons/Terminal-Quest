"use client";

import { BootScreen } from "@/core/ui/BootScreen";
import { Terminal } from "@/core/ui/Terminal";
import { useShellStore } from "@/core/state/shell-store";

export default function HomePage() {
  const booted = useShellStore((state) => state.booted);
  const markBooted = useShellStore((state) => state.markBooted);

  if (!booted) {
    return <BootScreen onComplete={markBooted} />;
  }

  return <Terminal />;
}
