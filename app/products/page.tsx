import { getActiveProducts, getActiveFestivalOffer, getActiveCategories } from '@/lib/supabase/queries';
import ProductCard from '@/components/product/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Products - SAKTHI TEXTILES',
    description: 'Browse our complete collection of quality garments including sarees, shirts, t-shirts, and kids wear at SAKTHI TEXTILES.',
};

export const revalidate = 60;

export default async function ProductsPage() {
    const [products, festivalOffer, categories] = await Promise.all([
        getActiveProducts(),
        getActiveFestivalOffer(),
        getActiveCategories(),
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        All Products
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Explore our complete collection of quality garments
                    </p>

                    <div className="mt-4 text-sm text-gray-500">
                        {products.length} {products.length === 1 ? 'product' : 'products'}
                    </div>
                </div>
            </div>

            {/* Festival Offer Banner */}
            {festivalOffer && (
                <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm md:text-base font-semibold">
                            🎉 {festivalOffer.banner_text || festivalOffer.offer_name} - Limited Time Offer!
                        </p>
                    </div>
                </div>
            )}

            {/* Filters and Products */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Categories */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="card p-6 sticky top-4">
                            <h2 className="font-semibold text-lg mb-4">Categories</h2>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/products"
                                        className="block py-2 px-3 rounded-lg bg-primary-50 text-primary-700 font-medium"
                                    >
                                        All Products ({products.length})
                                    </a>
                                </li>
                                {categories.map((category) => {
                                    const count = products.filter(p => p.category_id === category.id).length;
                                    return (
                                        <li key={category.id}>
                                            <a
                                                href={`/category/${category.slug}`}
                                                className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors"
                                            >
                                                {category.name} ({count})
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <p className="text-gray-500 text-lg mb-4">
                                    No products available at the moment.
                                </p>
                                <a href="/" className="btn-primary inline-block">
                                    Back to Home
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
