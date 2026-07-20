import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

import { AuthLayout } from '../components/auth/AuthLayout';
import { FormInput } from '../components/ui/FormInput';

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await login({ username, password });
    setSubmitting(false);
  };

  return (
    <AuthLayout
      eyebrow="Bem-vindo de volta"
      title="Entrar na tua conta"
      subtitle="Acede ao catálogo e às tuas permissões."
      footer={
        <>
          Ainda não tens conta?{' '}
          <Link to="/register" className="font-semibold text-shard hover:text-shard-dim">
            Cria uma aqui
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="o-teu-username"
          required
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-shard px-4 py-2.5 text-sm font-semibold text-white shadow-shard hover:bg-shard-dim transition-colors disabled:opacity-60"
        >
          <LogIn size={16} />
          {submitting ? 'A entrar...' : 'Entrar'}
        </button>
      </form>
    </AuthLayout>
  );
}
