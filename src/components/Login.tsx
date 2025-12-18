import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'salesperson' | 'manager' | 'admin') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'salesperson' | 'manager' | 'admin'>('salesperson');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-white text-2xl mb-2">MT-RSR Sales Portal</h1>
          <p className="text-blue-100">Sales Ordering & Lead Management</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
                placeholder="your.email@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-gray-700 mb-2 text-sm">
                Login As (Demo)
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
              >
                <option value="salesperson">Sales Person</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg transition shadow-lg hover:shadow-xl text-base"
            >
              Sign In to Portal
            </button>

            <div className="flex items-center justify-between pt-2">
              <a href="#" className="text-blue-600 hover:text-blue-700 transition text-sm">
                Forgot Password?
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-700 transition text-sm">
                Need Help?
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-b-2xl px-8 py-4 text-center border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            © 2025 MT-RSR. Tablet-optimized enterprise portal.
          </p>
        </div>
      </div>
    </div>
  );
}