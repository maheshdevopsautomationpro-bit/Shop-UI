'use client';

import HeroCarousel from '@/components/home/HeroCarousel';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import {
    getActiveFestivalOffer,
    getFeaturedProducts,
    getNewArrivals,
    getActiveCategories
} from '@/lib/supabase/queries';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product, Category, FestivalOffer } from '@/types/database';
import Image from 'next/image';

export default function HomePage() {
    const [festivalOffer, setFestivalOffer] = useState<FestivalOffer | null>(null);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [offer, featured, arrivals, cats] = await Promise.all([
                    getActiveFestivalOffer(),
                    getFeaturedProducts(8),
                    getNewArrivals(8),
                    getActiveCategories(),
                ]);
                setFestivalOffer(offer);
                setFeaturedProducts(featured);
                setNewArrivals(arrivals);
                setCategories(cats);
            } catch (error) {
                console.error('Error loading homepage data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const banners = festivalOffer && festivalOffer.banner_image_url
        ? [
            {
                id: festivalOffer.id,
                image: festivalOffer.banner_image_url,
                title: festivalOffer.banner_text || festivalOffer.offer_name,
                subtitle: festivalOffer.description,
                link: '/offers',
            },
        ]
        : [
            {
                id: 'default',
                image: 'https://placehold.co/1920x800/f3f4f6/374151',
                title: 'Welcome to ARUTPERUNJOTHI',
                subtitle: 'Exquisite Garments & Quality Fabrics since 1994',
            },
        ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Carousel */}
            <HeroCarousel banners={banners} />

            {/* Categories - Circular List (Nithitex Style) */}
            {categories.length > 0 && (
                <section className="py-12 md:py-16 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-xl md:text-2xl font-display font-medium text-gray-900 uppercase tracking-[0.2em]">
                                Featured Categories
                            </h2>
                            <div className="h-0.5 w-12 bg-primary-600 mx-auto mt-4"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="group flex flex-col items-center w-24 md:w-32"
                                >
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:border-primary-600 group-hover:shadow-md transition-all duration-500 bg-gray-50">
                                        {category.image_url ? (
                                            <Image
                                                src={category.image_url}
                                                alt={category.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-primary-600/30 text-2xl font-bold">
                                                {category.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="mt-4 text-xs font-bold text-gray-800 text-center uppercase tracking-widest group-hover:text-primary-600 transition-colors px-2">
                                        {category.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-tight">
                                New Arrivals
                            </h2>
                            <p className="text-gray-500 mt-3 tracking-[0.3em] uppercase text-[10px] font-bold">
                                Discover our latest collection
                            </p>
                            <div className="h-0.5 w-10 bg-primary-600 mx-auto mt-6"></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
                            {newArrivals.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    festivalOffer={festivalOffer}
                                />
                            ))}
                        </div>

                        <div className="mt-20 text-center">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 group text-xs font-bold uppercase tracking-[0.3em] text-gray-900 hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-600 pb-1"
                            >
                                View All Products
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Products / Best Sellers */}
            {featuredProducts.length > 0 && (
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-tight">
                                Best Sellers
                            </h2>
                            <p className="text-gray-500 mt-3 tracking-[0.3em] uppercase text-[10px] font-bold">
                                Our most popular choices
                            </p>
                            <div className="h-0.5 w-10 bg-primary-600 mx-auto mt-6"></div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-20">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    festivalOffer={festivalOffer}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Visit Store Section - Minimalist */}
            <section className="py-20 md:py-32 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 text-gray-900 uppercase tracking-[0.2em]">
                        Experience Arutperunjothi
                    </h2>
                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto leading-loose text-sm italic">
                        Since 1994, bringing you the finest garments at Brough Road, Erode.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/contact" className="bg-gray-900 text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary-600 transition-colors shadow-lg">
                            Get Directions
                        </Link>
                        <a
                            href="tel:+919750996633"
                            className="text-gray-900 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] group flex items-center gap-2"
                        >
                            Call Us Now
                            <span className="w-8 h-[1px] bg-gray-900 group-hover:w-12 transition-all"></span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
