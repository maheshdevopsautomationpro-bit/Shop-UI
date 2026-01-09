import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getActiveFestivalOffer, getProductsByCategory } from '@/lib/supabase/queries';
import { calculatePrice, formatPrice } from '@/lib/pricing';
import { getWhatsAppLink, getUPILink } from '@/lib/utils';
import { ArrowLeft, Phone, MessageCircle, Share2 } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

export const revalidate = 60;

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.name} - SAKTHI TEXTILES`,
        description: product.description || `Buy ${product.name} at SAKTHI TEXTILES`,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images || [],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const [product, festivalOffer] = await Promise.all([
        getProductBySlug(params.slug),
        getActiveFestivalOffer(),
    ]);

    if (!product) {
        notFound();
    }

    const priceInfo = calculatePrice(product, festivalOffer);

    // Get related products
    const relatedProducts = product.category_id
        ? await getProductsByCategory(product.category_id)
        : [];
    const filteredRelated = relatedProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4);

    const whatsappLink = getWhatsAppLink(
        '919750996633',
        product.name,
        typeof window !== 'undefined' ? window.location.href : undefined
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary-600">Home</Link>
                        <span>/</span>
                        {product.category && (
                            <>
                                <Link href={`/category/${product.category.slug}`} className="hover:text-primary-600">
                                    {product.category.name}
                                </Link>
                                <span>/</span>
                            </>
                        )}
                        <span className="text-gray-900">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                src={product.images?.[0] || 'https://placehold.co/600x800/e5e5e5/666666?text=No+Image'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {priceInfo.festivalOffer && (
                                    <span className="badge-festival shadow-lg text-base px-3 py-1">
                                        {priceInfo.festivalOffer.badge}
                                    </span>
                                )}
                                {!priceInfo.festivalOffer && priceInfo.hasDiscount && (
                                    <span className="badge-sale shadow-lg text-base px-3 py-1">
                                        SALE
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Gallery (if multiple images) */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.slice(0, 4).map((image, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity">
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 25vw, 12vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category */}
                        {product.category && (
                            <Link
                                href={`/category/${product.category.slug}`}
                                className="inline-block text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                {product.category.name}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Pricing */}
                        <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    {formatPrice(priceInfo.finalPrice)}
                                </span>
                                {priceInfo.hasDiscount && (
                                    <span className="text-2xl text-gray-400 line-through">
                                        {formatPrice(priceInfo.originalPrice)}
                                    </span>
                                )}
                            </div>
                            {priceInfo.hasDiscount && (
                                <p className="text-green-600 font-medium">
                                    You save {formatPrice(priceInfo.savingsAmount!)} ({priceInfo.savingsPercentage?.toFixed(0)}% off)
                                </p>
                            )}
                            {priceInfo.festivalOffer && (
                                <p className="text-primary-600 font-medium">
                                    🎉 {priceInfo.festivalOffer.name}
                                </p>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div>
                            {product.stock_status === 'in_stock' && (
                                <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    In Stock
                                </span>
                            )}
                            {product.stock_status === 'out_of_stock' && (
                                <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Order via WhatsApp
                            </a>

                            <a
                                href="tel:+919750996633"
                                className="btn-outline w-full flex items-center justify-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Call to Enquire
                            </a>

                            <button className="btn-secondary w-full flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Share Product
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                            {product.sku && (
                                <p><span className="font-medium">SKU:</span> {product.sku}</p>
                            )}
                            <p><span className="font-medium">Category:</span> {product.category?.name || 'Uncategorized'}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {filteredRelated.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredRelated.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                    festivalOffer={festivalOffer}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
