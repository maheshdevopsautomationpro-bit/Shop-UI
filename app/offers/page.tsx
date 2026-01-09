'use client';

import { useEffect, useState } from 'react';
import { getActiveFestivalOffer, getActiveProducts } from '@/lib/supabase/queries';
import { Product, FestivalOffer } from '@/types/database';
import ProductCard from '@/components/product/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Tag, Percent } from 'lucide-react';

export default function OffersPage() {
    const [festivalOffer, setFestivalOffer] = useState<FestivalOffer | null>(null);
    const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadOffers() {
            try {
                const [offer, allProducts] = await Promise.all([
                    getActiveFestivalOffer(),
                    getActiveProducts(),
                ]);

                setFestivalOffer(offer);

                // Filter products that have a sale price or are part of the active category
                const discounted = allProducts.filter(product => {
                    const hasSalePrice = product.sale_price && product.sale_price < product.price;
                    const isInCategory = offer?.applicable_category_ids?.includes(product.category_id || '');
                    return hasSalePrice || isInCategory;
                });

                setDiscountedProducts(discounted);
            } catch (error) {
                console.error('Error loading offers:', error);
            } finally {
                setLoading(false);
            }
        }

        loadOffers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                        Special Offers
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg max-w-2xl">
                        Discover amazing deals and festival collections at Sakthi Textiles.
                    </p>
                </div>

                {/* Festival Offer Banner */}
                {festivalOffer && (
                    <div className="mb-16">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-2xl">
                            <div className="absolute inset-0 opacity-10">
                                <Image
                                    src={festivalOffer.banner_image_url || 'https://placehold.co/1200x400/000000/ffffff?text=Offer+Banner'}
                                    alt="Pattern"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-xl text-center md:text-left">
                                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold mb-4">
                                        <Percent className="w-4 h-4 mr-2" />
                                        {festivalOffer.discount_type === 'percentage'
                                            ? `${festivalOffer.discount_value}% OFF`
                                            : `₹${festivalOffer.discount_value} OFF`}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase tracking-tight">
                                        {festivalOffer.offer_name}
                                    </h2>
                                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                                        {festivalOffer.description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                                    <p className="text-white/80 text-sm uppercase tracking-widest mb-1 font-bold">Valid Until</p>
                                    <p className="text-2xl font-display font-bold">
                                        {new Date(festivalOffer.end_date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Discounted Products Grid */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Tag className="w-8 h-8 text-primary-600" />
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                            Discounted Products
                        </h3>
                    </div>

                    {discountedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {discountedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    festivalOffer={festivalOffer}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-lg">
                                No products are currently on offer. Check back later!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
