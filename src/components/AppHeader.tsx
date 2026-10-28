import { Link, useNavigate } from 'react-router-dom';

import { AvatarIcon, LogoIcon } from '@/components/dashboard-icons';
import { useAuth } from '@/providers/auth-provider';
import './AppHeader.css';

/** Header bersama halaman dalam (dashboard & perjalanan): brand + tombol keluar. */
export function AppHeader() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (err: unknown) {
      // Jangan diamkan: sesi mungkin gagal ditutup, tetapi pengguna tetap diarahkan ke halaman masuk.
      console.error('Gagal keluar:', err);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link className="app-header__brand" to="/">
          <LogoIcon />
          Langkah Hijau
        </Link>
        <button
          type="button"
          className="app-header__profile"
          onClick={onSignOut}
          aria-label={user ? `Keluar dari akun ${user.name}` : 'Keluar'}
        >
          <AvatarIcon />
          {user?.name ?? 'Admin'}
        </button>
      </div>
    </header>
  );
}
