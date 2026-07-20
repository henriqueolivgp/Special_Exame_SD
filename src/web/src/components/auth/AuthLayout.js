import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex bg-chalk dark:bg-ink">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(110,91,255,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(231,167,62,0.25), transparent 50%)",
          }}
        />
        <svg className="absolute -bottom-10 -right-16 w-[420px] opacity-90" viewBox="0 0 400 400">
          <polygon points="200,20 360,140 260,220 120,150" fill="#6E5BFF" opacity=".9" />
          <polygon points="360,140 380,300 260,220 260,220" fill="#6E5BFF" opacity=".5" />
          <polygon points="260,220 380,300 220,380 120,300" fill="#E7A73E" opacity=".8" />
          <polygon points="120,150 260,220 120,300 40,220" fill="#E7A73E" opacity=".45" />
        </svg>
        <div className="relative z-10 flex flex-col justify-between p-12 text-chalk">
          <Link className="flex items-center gap-2.5" to="/">
            <span className="w-8 h-8 rounded-md bg-shard flex items-center justify-center shard-mark">
              <Clapperboard size={16} className="text-white" />
            </span>
            <span className="font-display font-bold text-xl">CineShard</span>
          </Link>
          <div className="max-w-sm">
            <p className="font-display text-2xl leading-snug mb-3">
              Um catálogo de filmes, partido em serviços independentes.
            </p>
            <p className="text-chalk/60 text-sm leading-relaxed">
              Autenticação, catálogo e permissões — cada peça faz uma coisa bem feita.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-5 lg:justify-end">
          <Link className="flex items-center gap-2.5 lg:hidden" to="/">
            <span className="w-7 h-7 rounded-md bg-shard flex items-center justify-center shard-mark">
              <Clapperboard size={14} className="text-white" />
            </span>
            <span className="font-display font-bold text-lg">CineShard</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">
            {eyebrow && (
              <span className="font-mono text-xs tracking-wide text-shard uppercase mb-3 inline-block">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display text-2xl font-bold mb-2 text-ink dark:text-chalk">{title}</h1>
            {subtitle && <p className="text-sm text-ink/60 dark:text-chalk/60 mb-8">{subtitle}</p>}

            {children}

            {footer && <div className="mt-8 text-center text-sm text-ink/60 dark:text-chalk/60">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
