"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('vendor');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (role === 'vendor') {
      router.push('/visualizer');
    } else if (role === 'customer') {
      router.push('/customer');
    } else if (role === 'admin') {
      router.push('/map');
    } else {
      // For now, do nothing for other roles
      alert('Only vendor login is implemented for demo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-300 to-purple-400">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-100 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-gray-900 shadow-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-gray-900 shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-gray-900 shadow-sm"
            >
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 text-white font-bold py-2.5 rounded-lg shadow-lg hover:from-purple-700 hover:via-blue-600 hover:to-green-600 transition-all text-lg tracking-wide"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 