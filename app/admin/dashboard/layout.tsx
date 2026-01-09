'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Gift,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Festival Offers', href: '/admin/offers', icon: Gift },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/admin');
                return;
            }

            // Verify admin status
            const { data: adminData, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('id', user.id)
                .eq('active', true)
                .single();

            if (error || !adminData) {
                await supabase.auth.signOut();
                router.push('/admin');
                return;
            }

            setUser(adminData);
        } catch (error) {
            router.push('/admin');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white font-display font-bold text-lg px-3 py-2 rounded-lg">
                                SAKTHI
                            </div>
                            <span className="text-sm text-gray-600 font-medium">Admin</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t">
                        {user && (
                            <div className="mb-3 px-4 py-2">
                                <p className="text-sm font-medium text-gray-900">{user.full_name || 'Admin'}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                View Website →
                            </a>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
