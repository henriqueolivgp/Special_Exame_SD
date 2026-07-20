import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "../../hooks/ThemeHook";

export function ThemeToggle({ className = "" }) {
  const { mode, toggleMode } = useThemeMode();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={mode === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-fog-2 text-ink dark:text-chalk hover:border-shard transition-colors ${className}`}
    >
      {mode === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
