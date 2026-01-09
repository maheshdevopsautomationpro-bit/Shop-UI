import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getProductsByCategory, getActiveFestivalOffer } from '@/lib/supabase/queries';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} - SAKTHI TEXTILES`,
        description: category.description || `Shop ${category.name} at SAKTHI TEXTILES`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const [category, festivalOffer] = await Promise.all([
        getCategoryBySlug(params.slug),
        getActiveFestivalOffer(),
    ]);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.id);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="text-gray-600 text-lg max-w-3xl">
                            {category.description}
                        </p>
                    )}

                    <div className="mt-4 text-sm text-gray-500">
                        {products.length} {products.length === 1 ? 'product' : 'products'}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                festivalOffer={festivalOffer}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">
                            No products found in this category.
                        </p>
                        <Link href="/" className="btn-primary mt-6 inline-block">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
