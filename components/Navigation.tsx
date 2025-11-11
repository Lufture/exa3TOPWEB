'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/app/lib/api';

export default function Navigation() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="font-bold text-xl">SII ITC</Link>
          <ul className="flex space-x-6">
            <li><Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>
            <li><Link href="/dashboard/calificaciones" className="hover:text-blue-200">Calificaciones</Link></li>
            <li><Link href="/dashboard/kardex" className="hover:text-blue-200">Kardex</Link></li>
            <li><Link href="/dashboard/horario" className="hover:text-blue-200">Horario</Link></li>
            <li>
              <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}