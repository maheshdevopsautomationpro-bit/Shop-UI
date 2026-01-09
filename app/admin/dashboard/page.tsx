'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Package, FolderTree, Gift, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        totalCategories: 0,
        activeFestivalOffers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [products, categories, offers] = await Promise.all([
                supabase.from('products').select('id, active', { count: 'exact' }),
                supabase.from('categories').select('id', { count: 'exact' }).eq('active', true),
                supabase.from('festival_offers').select('id', { count: 'exact' }).eq('active', true),
            ]);

            setStats({
                totalProducts: products.count || 0,
                activeProducts: products.data?.filter(p => p.active).length || 0,
                totalCategories: categories.count || 0,
                activeFestivalOffers: offers.count || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Products',
            value: stats.totalProducts,
            active: stats.activeProducts,
            icon: Package,
            color: 'bg-blue-500',
        },
        {
            name: 'Categories',
            value: stats.totalCategories,
            icon: FolderTree,
            color: 'bg-green-500',
        },
        {
            name: 'Active Offers',
            value: stats.activeFestivalOffers,
            icon: Gift,
            color: 'bg-purple-500',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to SAKTHI TEXTILES Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    {stat.active !== undefined && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {stat.active} active
                                        </p>
                                    )}
                                </div>
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/admin/products" className="btn-primary text-center">
                        Manage Products
                    </a>
                    <a href="/admin/categories" className="btn-outline text-center">
                        Manage Categories
                    </a>
                    <a href="/admin/offers" className="btn-outline text-center">
                        Festival Offers
                    </a>
                    <a href="/admin/settings" className="btn-outline text-center">
                        Site Settings
                    </a>
                </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Getting Started</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Add products and categories to populate your store</li>
                    <li>• Create festival offers to boost sales</li>
                    <li>• Configure payment settings for customer convenience</li>
                    <li>• Update site settings with your business information</li>
                </ul>
            </div>
        </div>
    );
}
