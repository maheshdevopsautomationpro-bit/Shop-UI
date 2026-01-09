'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import type { Category } from '@/types/database';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            if (data) setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? Products in this category will be uncategorized.')) return;

        try {
            const { error } = await supabase.from('categories').delete().eq('id', id);
            if (error) throw error;

            setCategories(categories.filter(c => c.id !== id));
            alert('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('categories')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setCategories(categories.map(c =>
                c.id === id ? { ...c, active: !currentStatus } : c
            ));
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category status');
        }
    };

    const moveCategory = async (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === categories.length - 1)
        ) {
            return;
        }

        const newCategories = [...categories];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];

        // Update display_order for both categories
        try {
            await Promise.all([
                supabase.from('categories').update({ display_order: targetIndex }).eq('id', newCategories[targetIndex].id),
                supabase.from('categories').update({ display_order: index }).eq('id', newCategories[index].id),
            ]);

            setCategories(newCategories);
        } catch (error) {
            console.error('Error reordering categories:', error);
            alert('Failed to reorder categories');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-1">Manage product categories</p>
                </div>
                <a href="/admin/categories/new" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Category
                </a>
            </div>

            {/* Categories Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, index) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => moveCategory(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    title="Move up"
                                                >
                                                    <MoveUp className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => moveCategory(index, 'down')}
                                                    disabled={index === categories.length - 1}
                                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    title="Move down"
                                                >
                                                    <MoveDown className="w-4 h-4" />
                                                </button>
                                                <span className="ml-2 text-sm text-gray-500">#{category.display_order}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {category.image_url ? (
                                                    <img
                                                        src={category.image_url}
                                                        alt={category.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                                        No image
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-900">{category.name}</p>
                                                    {category.description && (
                                                        <p className="text-sm text-gray-500 truncate max-w-xs">
                                                            {category.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            {category.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(category.id, category.active)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${category.active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {category.active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/admin/categories/edit/${category.id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4">
                    <p className="text-sm text-gray-600">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-600">Active Categories</p>
                    <p className="text-2xl font-bold text-green-600">
                        {categories.filter(c => c.active).length}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-600">Inactive Categories</p>
                    <p className="text-2xl font-bold text-gray-600">
                        {categories.filter(c => !c.active).length}
                    </p>
                </div>
            </div>
        </div>
    );
}
