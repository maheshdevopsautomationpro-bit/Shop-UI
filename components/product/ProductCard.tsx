'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, calculatePrice } from '@/lib/pricing';
import type { Product, FestivalOffer } from '@/types/database';

interface ProductCardProps {
    product: Product;
    festivalOffer?: FestivalOffer | null;
}

export default function ProductCard({ product, festivalOffer }: ProductCardProps) {
    const priceInfo = calculatePrice(product, festivalOffer);
    const imageUrl = product.images && product.images.length > 0
        ? product.images[0]
        : 'https://placehold.co/600x800/e5e5e5/666666?text=No+Image';

    return (
        <Link href={`/products/${product.slug}`} className="group">
            <div className="flex flex-col h-full bg-white transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-lg">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                        {priceInfo.festivalOffer && (
                            <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                {priceInfo.festivalOffer.badge}
                            </span>
                        )}
                        {!priceInfo.festivalOffer && priceInfo.hasDiscount && (
                            <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                SALE
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {product.stock_status === 'out_of_stock' && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="text-gray-900 px-4 py-2 font-bold text-sm uppercase tracking-widest border-2 border-gray-900">
                                Sold Out
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info - Centered */}
                <div className="pt-4 pb-2 text-center space-y-1">
                    {/* Category */}
                    {product.category && (
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-semibold">
                            {product.category.name}
                        </p>
                    )}

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors px-2">
                        {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-bold">
                                {formatPrice(priceInfo.finalPrice)}
                            </span>
                            {priceInfo.hasDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                    {formatPrice(priceInfo.originalPrice)}
                                </span>
                            )}
                        </div>
                        {priceInfo.hasDiscount && (
                            <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                                Save {priceInfo.savingsPercentage?.toFixed(0)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
