'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
    id: string;
    image: string;
    title: string;
    subtitle?: string;
    link?: string;
}

interface HeroCarouselProps {
    banners: Banner[];
    autoPlayInterval?: number;
}

export default function HeroCarousel({
    banners,
    autoPlayInterval = 5000
}: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [banners.length, autoPlayInterval]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    if (banners.length === 0) {
        return (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        Welcome to ARUTPERUNJOTHI
                    </h1>
                    <p className="text-xl md:text-2xl">Quality Garments since 1994</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100">
            {/* Banners */}
            <div className="relative w-full h-full">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="100vw"
                        />

                        {/* Overlay Content - Nithitex Style */}
                        {(banner.title || banner.subtitle) && (
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                                    <div className="max-w-3xl animate-fade-in space-y-2 md:space-y-4">
                                        <div className="overflow-hidden">
                                            {banner.title && (
                                                <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-black text-gray-900 leading-tight uppercase tracking-tight transform transition-transform duration-1000 translate-y-0">
                                                    {banner.title}
                                                </h2>
                                            )}
                                        </div>

                                        {banner.subtitle && (
                                            <div className="flex flex-col space-y-4">
                                                <p className="text-lg md:text-3xl lg:text-4xl font-sans font-bold text-gray-800 uppercase tracking-[0.3em] leading-none">
                                                    {banner.subtitle}
                                                </p>

                                                {/* Details line replication */}
                                                <div className="h-[1px] w-24 bg-gray-900 my-4"></div>

                                                <p className="text-[10px] md:text-base font-bold text-gray-600 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                                                    Crafting Elegance Since 1994 || Traditional Outlook || Premier Quality
                                                </p>
                                            </div>
                                        )}

                                        {banner.link && (
                                            <div className="pt-6">
                                                <Link
                                                    href={banner.link}
                                                    className="inline-flex items-center gap-2 group text-xs font-black uppercase tracking-[0.4em] text-gray-900 hover:text-primary-600 transition-colors border-b-2 border-gray-900 hover:border-primary-600 pb-2"
                                                >
                                                    EXPLORE COLLECTION
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows - Compact & Elegant */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-2 group hover:bg-white rounded-full transition-all z-10 hidden md:block border border-gray-200/50"
                        aria-label="Previous banner"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 group hover:bg-white rounded-full transition-all z-10 hidden md:block border border-gray-200/50"
                        aria-label="Next banner"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
                    </button>
                </>
            )}

            {/* Bottom Indicators - Pill Style */}
            {banners.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex
                                ? 'bg-gray-900 w-12'
                                : 'bg-gray-300 w-4 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
