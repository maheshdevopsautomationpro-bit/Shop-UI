'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';
import type { FestivalOffer } from '@/types/database';
import { formatDate } from '@/lib/utils';

export default function AdminOffersPage() {
    const [offers, setOffers] = useState<FestivalOffer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const { data, error } = await supabase
                .from('festival_offers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setOffers(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this offer?')) return;

        try {
            const { error } = await supabase.from('festival_offers').delete().eq('id', id);
            if (error) throw error;

            setOffers(offers.filter(o => o.id !== id));
            alert('Offer deleted successfully');
        } catch (error) {
            console.error('Error deleting offer:', error);
            alert('Failed to delete offer');
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('festival_offers')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setOffers(offers.map(o =>
                o.id === id ? { ...o, active: !currentStatus } : o
            ));
        } catch (error) {
            console.error('Error updating offer:', error);
            alert('Failed to update offer status');
        }
    };

    const isOfferActive = (offer: FestivalOffer) => {
        const now = new Date();
        const start = new Date(offer.start_date);
        const end = new Date(offer.end_date);
        return offer.active && now >= start && now <= end;
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
                    <h1 className="text-3xl font-display font-bold text-gray-900">Festival Offers</h1>
                    <p className="text-gray-600 mt-1">Manage promotional offers and discounts</p>
                </div>
                <a href="/admin/offers/new" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Offer
                </a>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {offers.length === 0 ? (
                    <div className="col-span-2 card p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg mb-4">No offers created yet</p>
                        <a href="/admin/offers/new" className="btn-primary inline-flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Create Your First Offer
                        </a>
                    </div>
                ) : (
                    offers.map((offer) => {
                        const isActive = isOfferActive(offer);
                        const hasEnded = new Date(offer.end_date) < new Date();

                        return (
                            <div key={offer.id} className="card overflow-hidden">
                                {/* Banner Image */}
                                {offer.banner_image_url && (
                                    <div className="aspect-[3/1] bg-gray-100 relative">
                                        <Image
                                            src={offer.banner_image_url}
                                            alt={offer.offer_name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Status Badges */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <button
                                            onClick={() => toggleActive(offer.id, offer.active)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${offer.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {offer.active ? 'Active' : 'Inactive'}
                                        </button>
                                        {isActive && (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Live Now
                                            </span>
                                        )}
                                        {hasEnded && (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                Ended
                                            </span>
                                        )}
                                    </div>

                                    {/* Offer Details */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {offer.offer_name}
                                    </h3>
                                    {offer.description && (
                                        <p className="text-gray-600 text-sm mb-4">
                                            {offer.description}
                                        </p>
                                    )}

                                    {/* Discount Info */}
                                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-gray-600 mb-1">Discount</p>
                                        <p className="text-2xl font-bold text-primary-700">
                                            {offer.discount_value}
                                            {offer.discount_type === 'percentage' ? '%' : '₹'} OFF
                                        </p>
                                    </div>

                                    {/* Date Range */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">
                                                {formatDate(offer.start_date)} - {formatDate(offer.end_date)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-4 border-t">
                                        <a
                                            href={`/admin/offers/edit/${offer.id}`}
                                            className="flex-1 btn-outline text-center flex items-center justify-center gap-2"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => handleDelete(offer.id)}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Stats */}
            {offers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="card p-4">
                        <p className="text-sm text-gray-600">Total Offers</p>
                        <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
                    </div>
                    <div className="card p-4">
                        <p className="text-sm text-gray-600">Active Offers</p>
                        <p className="text-2xl font-bold text-green-600">
                            {offers.filter(o => isOfferActive(o)).length}
                        </p>
                    </div>
                    <div className="card p-4">
                        <p className="text-sm text-gray-600">Scheduled</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {offers.filter(o => new Date(o.start_date) > new Date()).length}
                        </p>
                    </div>
                    <div className="card p-4">
                        <p className="text-sm text-gray-600">Ended</p>
                        <p className="text-2xl font-bold text-gray-600">
                            {offers.filter(o => new Date(o.end_date) < new Date()).length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
