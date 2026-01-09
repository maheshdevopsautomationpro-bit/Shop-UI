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
import Image from 'next/image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
    // Fetch data in parallel
    const [festivalOffer, featuredProducts, newArrivals, categories] = await Promise.all([
        getActiveFestivalOffer(),
        getFeaturedProducts(8),
        getNewArrivals(8),
        getActiveCategories(),
    ]);

    // Prepare carousel banners
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
                image: 'https://placehold.co/1920x800/ef4444/ffffff?text=SAKTHI+TEXTILES',
                title: 'Welcome to SAKTHI TEXTILES',
                subtitle: 'Quality Garments in Erode',
            },
        ];

    return (
        <div className="min-h-screen">
            {/* Hero Carousel */}
            <HeroCarousel banners={banners} />

            {/* Festival Offer Banner (if active) */}
            {festivalOffer && (
                <section className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-4">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl font-semibold">
                            🎉 {festivalOffer.banner_text || festivalOffer.offer_name} - Limited Time Offer!
                        </p>
                    </div>
                </section>
            )}

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                                    New Arrivals
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Discover our latest collection
                                </p>
                            </div>
                            <Link
                                href="/products"
                                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                View All <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newArrivals.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    festivalOffer={festivalOffer}
                                />
                            ))}
                        </div>

                        <div className="mt-8 text-center md:hidden">
                            <Link href="/products" className="btn-primary">
                                View All Products
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-12 md:py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                                    Best Sellers
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Our most popular products
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Categories */}
            {categories.length > 0 && (
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                                Shop by Category
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Explore our wide range of products
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="group"
                                >
                                    <div className="card hover:shadow-xl transition-all duration-300">
                                        <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                                            {category.image_url ? (
                                                <Image
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                                />
                                            ) : (
                                                <span className="text-4xl md:text-5xl font-display font-bold text-primary-600/20">
                                                    {category.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Visit Our Store in Erode
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Experience our quality garments in person. We&apos;re located at Brough Road, Erode.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                            Get Directions
                        </Link>
                        <a
                            href="tel:+919750996633"
                            className="btn bg-transparent border-2 border-white text-white hover:bg-white/10"
                        >
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
