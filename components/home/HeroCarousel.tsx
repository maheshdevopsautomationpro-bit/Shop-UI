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
                        Welcome to SAKTHI TEXTILES
                    </h1>
                    <p className="text-xl md:text-2xl">Quality Garments in Erode</p>
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

                        {/* Overlay Content */}
                        {(banner.title || banner.subtitle) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-2xl text-white space-y-4 animate-fade-in">
                                        {banner.title && (
                                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold">
                                                {banner.title}
                                            </h2>
                                        )}
                                        {banner.subtitle && (
                                            <p className="text-lg md:text-xl lg:text-2xl">
                                                {banner.subtitle}
                                            </p>
                                        )}
                                        {banner.link && (
                                            <a
                                                href={banner.link}
                                                className="inline-block btn-primary mt-4"
                                            >
                                                Shop Now
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all z-10"
                        aria-label="Previous banner"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all z-10"
                        aria-label="Next banner"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white w-6 md:w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to banner ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
