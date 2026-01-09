import type { Product, FestivalOffer, PriceInfo } from '@/types/database';

/**
 * Calculate final price for a product considering festival offers and sale prices
 * Priority: Festival Offer → Sale Price → Normal Price
 */
export function calculatePrice(
    product: Product,
    festivalOffer?: FestivalOffer | null
): PriceInfo {
    const originalPrice = product.price;
    let finalPrice = originalPrice;
    let discount: number | undefined;
    let discountType: 'percentage' | 'flat' | 'sale' | undefined;
    let festivalOfferInfo: { name: string; badge: string } | undefined;

    // Check if festival offer applies to this product's category
    if (festivalOffer && product.category_id) {
        const categoryIds = festivalOffer.applicable_category_ids || [];
        if (categoryIds.includes(product.category_id)) {
            // Apply festival offer
            if (festivalOffer.discount_type === 'percentage') {
                discount = festivalOffer.discount_value;
                finalPrice = originalPrice * (1 - discount / 100);
                discountType = 'percentage';
            } else if (festivalOffer.discount_type === 'flat') {
                discount = festivalOffer.discount_value;
                finalPrice = Math.max(0, originalPrice - discount);
                discountType = 'flat';
            }

            festivalOfferInfo = {
                name: festivalOffer.offer_name,
                badge: `${festivalOffer.discount_value}${festivalOffer.discount_type === 'percentage' ? '%' : '₹'} OFF`,
            };
        }
    }

    // If no festival offer applied, check for sale price
    if (!festivalOfferInfo && product.sale_price && product.sale_price < originalPrice) {
        finalPrice = product.sale_price;
        discount = ((originalPrice - finalPrice) / originalPrice) * 100;
        discountType = 'sale';
    }

    const savingsAmount = originalPrice - finalPrice;
    const savingsPercentage = (savingsAmount / originalPrice) * 100;
    const hasDiscount = finalPrice < originalPrice;

    return {
        originalPrice,
        finalPrice: Math.round(finalPrice * 100) / 100, // Round to 2 decimals
        discount,
        discountType,
        savingsAmount: hasDiscount ? Math.round(savingsAmount * 100) / 100 : undefined,
        savingsPercentage: hasDiscount ? Math.round(savingsPercentage * 100) / 100 : undefined,
        hasDiscount,
        festivalOffer: festivalOfferInfo,
    };
}

/**
 * Format price in Indian Rupees
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Check if festival offer is currently active
 */
export function isFestivalOfferActive(offer: FestivalOffer): boolean {
    const now = new Date();
    const startDate = new Date(offer.start_date);
    const endDate = new Date(offer.end_date);

    return offer.active && now >= startDate && now <= endDate;
}
