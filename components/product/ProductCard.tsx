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
            <div className="card h-full">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {priceInfo.festivalOffer && (
                            <span className="badge-festival shadow-lg">
                                {priceInfo.festivalOffer.badge}
                            </span>
                        )}
                        {!priceInfo.festivalOffer && priceInfo.hasDiscount && (
                            <span className="badge-sale shadow-lg">
                                SALE
                            </span>
                        )}
                        {product.featured && (
                            <span className="badge bg-blue-100 text-blue-800 shadow-lg">
                                FEATURED
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {product.stock_status === 'out_of_stock' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                    {/* Category */}
                    {product.category && (
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            {product.category.name}
                        </p>
                    )}

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="price-final text-xl">
                            {formatPrice(priceInfo.finalPrice)}
                        </span>
                        {priceInfo.hasDiscount && (
                            <>
                                <span className="price-original">
                                    {formatPrice(priceInfo.originalPrice)}
                                </span>
                                <span className="price-savings">
                                    Save {priceInfo.savingsPercentage?.toFixed(0)}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Festival Offer Text */}
                    {priceInfo.festivalOffer && (
                        <p className="text-xs text-primary-600 font-medium">
                            🎉 {priceInfo.festivalOffer.name}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
