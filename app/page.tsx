```
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
                image: 'https://placehold.co/1920x800/f3f4f6/374151?text=ARUTPERUNJOTHI+JAVULI+KADAI',
                title: 'Welcome to ARUTPERUNJOTHI',
                subtitle: 'Exquisite Garments & Quality Fabrics since 1994',
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

            {/* Categories - Circular List */}
            {categories.length > 0 && (
                <section className="py-12 md:py-16 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 uppercase tracking-tight">
                                ARUTPERUNJOTHI Featured Categories
                            </h2>
                            <div className="h-1 w-20 bg-primary-600 mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/ category / ${ category.slug } `}
                                    className="group flex flex-col items-center w-24 md:w-32"
                                >
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary-600 transition-all duration-300 shadow-md">
                                        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
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
