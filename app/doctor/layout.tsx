"use client"

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setting up a duplicate values for doctor authentication / authorization
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  useEffect(() => {
    toast.dismiss()
    toast.success('use default values')
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
          <h1 className='font-black text-black text-xl text-center mb-6'>Doctor Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <div className="px-10">{children}</div>;
}
