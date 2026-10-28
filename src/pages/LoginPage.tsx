import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextField } from '@/components/TextField';
import { useAuth } from '@/providers/auth-provider';
import './LoginPage.css';

const ERROR_ID = 'login-error';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Isi email dan kata sandi terlebih dahulu.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password, remember);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <Card className="login__card">
        <h1 className="login__title">Welcome back</h1>
        <p className="login__subtitle">Sign in to continue to your dashboard.</p>

        <form className="login__form" onSubmit={onSubmit}>
          <TextField
            id="email"
            label="Email address"
            placeholder="Email address"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? ERROR_ID : undefined}
          />
          <TextField
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? ERROR_ID : undefined}
          />

          <label className="login__remember">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            <span className="login__check" aria-hidden="true" />
            Remember me
          </label>
          {/* // shortcut: link "Forgot password?" dihilangkan karena alur reset belum ada; tambahkan kembali saat tersedia. */}

          {error ? (
            <p id={ERROR_ID} className="login__error" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Card>
    </main>
  );
}
