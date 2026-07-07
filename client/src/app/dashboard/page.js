'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        {user ? (
          <p className="text-gray-600">
            Logged in as <span className="font-semibold">{user.email}</span> (role: {user.role})
          </p>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </main>
  );
}