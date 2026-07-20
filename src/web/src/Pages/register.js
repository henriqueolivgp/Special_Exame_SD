import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';

import { AuthLayout } from '../components/auth/AuthLayout';
import { FormInput } from '../components/ui/FormInput';

export function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await register({ username, password });
    setSubmitting(false);
  };

  return (
    <AuthLayout
      eyebrow="Primeira vez por aqui"
      title="Cria a tua conta"
      subtitle="Começa com o perfil Viewer, sobe de permissões com um admin."
      footer={
        <>
          Já tens conta?{' '}
          <Link to="/login" className="font-semibold text-shard hover:text-shard-dim">
            Entra aqui
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
          placeholder="escolhe um username"
          required
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-shard px-4 py-2.5 text-sm font-semibold text-white shadow-shard hover:bg-shard-dim transition-colors disabled:opacity-60"
        >
          <UserPlus size={16} />
          {submitting ? 'A criar conta...' : 'Criar conta'}
        </button>
      </form>
    </AuthLayout>
  );
}
