'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');

    if (!token || !stored) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(stored));
    setChecking(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">Checking authentication...</p>
      </main>
    );
  }

  return (
  <main className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Logged in as <span className="font-semibold">{user.email}</span> (role: {user.role})
      </p>

      {user.role === 'admin' && (
        <button
          onClick={() => alert('Welcome to Admin Settings!')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition mb-4 w-full"
        >
          ⚙️ Admin Settings
        </button>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
      >
        Log Out
      </button>
    </div>
  </main>
);
}