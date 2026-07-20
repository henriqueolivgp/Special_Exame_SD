import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from "../../hooks/AuthHook"
import { ThemeToggle } from '../ui/ThemeToggle'
import { ShieldMinus, Power, Home as HomeIcon, LogIn, UserPlus, Menu, X, Clapperboard } from 'lucide-react'

function NavItem({ to, active, icon, children }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium transition-colors group
          ${active
            ? 'bg-shard/15 text-shard'
            : 'text-ink/70 dark:text-chalk/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-chalk'}`}
      >
        <span className={active ? 'text-shard' : 'text-ink/40 dark:text-chalk/40 group-hover:text-shard'}>
          {icon}
        </span>
        {children}
      </Link>
    </li>
  )
}

export function Sidebar() {
  const { logout, signed, role } = useAuth()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Abrir menu"
        className="fixed z-50 top-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-lg sm:hidden bg-bone dark:bg-fog border border-black/10 dark:border-white/10 text-ink dark:text-chalk"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div className="flex flex-col h-full bg-bone dark:bg-fog border-r border-black/10 dark:border-white/10">

          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <span className="w-7 h-7 rounded-md bg-shard flex items-center justify-center shard-mark">
                <Clapperboard size={15} className="text-white" />
              </span>
              <span className="font-display font-bold text-lg tracking-tight">CineShard</span>
            </Link>
            <ThemeToggle className="hidden sm:inline-flex" />
          </div>

          <div className="h-px bg-black/10 dark:bg-white/10 mx-4" />

          <nav className="flex-1 flex flex-col justify-between px-3 py-4 overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {signed && (
                <NavItem to="/" active={pathname === '/'} icon={<HomeIcon size={18} />}>
                  Início
                </NavItem>
              )}
              {!signed && (
                <>
                  <NavItem to="/login" active={pathname === '/login'} icon={<LogIn size={18} />}>
                    Entrar
                  </NavItem>
                  <NavItem to="/register" active={pathname === '/register'} icon={<UserPlus size={18} />}>
                    Criar conta
                  </NavItem>
                </>
              )}
              {signed && role === 'admin' && (
                <NavItem to="/admin-panel" active={pathname === '/admin-panel'} icon={<ShieldMinus size={18} />}>
                  Utilizadores
                </NavItem>
              )}
            </ul>

            <div className="flex items-center justify-between gap-2 pt-4">
              <ThemeToggle className="sm:hidden" />
              {signed && (
                <button
                  onClick={logout}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-ink/70 dark:text-chalk/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-chalk transition-colors w-full"
                >
                  <Power size={18} className="text-ink/40 dark:text-chalk/40" />
                  Sair
                </button>
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
