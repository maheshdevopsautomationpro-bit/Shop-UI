'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Check if user is admin
                const { data: adminData, error: adminError } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('id', data.user.id)
                    .eq('active', true)
                    .single();

                if (adminError || !adminData) {
                    await supabase.auth.signOut();
                    throw new Error('Unauthorized: Not an admin user');
                }

                router.push('/admin/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-gradient-to-br from-primary-600 to-primary-700 text-white font-display font-bold text-2xl px-6 py-3 rounded-lg shadow-lg mb-4">
                            SAKTHI
                        </div>
                        <h1 className="text-2xl font-display font-bold text-gray-900">
                            Admin Login
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Sign in to manage your store
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input pl-10"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 text-center">
                            Admin access only. Contact system administrator for credentials.
                        </p>
                    </div>
                </div>

                {/* Back to Site */}
                <div className="text-center mt-6">
                    <a href="/" className="text-white hover:text-gray-200 text-sm transition-colors">
                        ← Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
}
