// Database Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    display_order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    sale_price?: number;
    category_id?: string;
    images: string[];
    featured: boolean;
    active: boolean;
    stock_status: 'in_stock' | 'out_of_stock' | 'pre_order';
    sku?: string;
    tags?: string[];
    created_at: string;
    updated_at: string;
    category?: Category;
}

export interface FestivalOffer {
    id: string;
    offer_name: string;
    description?: string;
    discount_type: 'percentage' | 'flat';
    discount_value: number;
    start_date: string;
    end_date: string;
    active: boolean;
    applicable_category_ids: string[];
    banner_text?: string;
    banner_image_url?: string;
    banner_mobile_image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface PaymentSetting {
    id: string;
    provider: string;
    display_name: string;
    upi_id?: string;
    merchant_id?: string;
    api_key?: string;
    api_secret?: string;
    active: boolean;
    config: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface SiteSetting {
    key: string;
    value: any;
    description?: string;
    updated_at: string;
}

export interface AdminUser {
    id: string;
    email: string;
    full_name?: string;
    role: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

// Business Info Type
export interface BusinessInfo {
    name: string;
    brand: string;
    address: string;
    phone: string[];
    gstin: string;
    email: string;
    domain: string;
}

// Pricing Calculation Result
export interface PriceInfo {
    originalPrice: number;
    finalPrice: number;
    discount?: number;
    discountType?: 'percentage' | 'flat' | 'sale';
    savingsAmount?: number;
    savingsPercentage?: number;
    hasDiscount: boolean;
    festivalOffer?: {
        name: string;
        badge: string;
    };
}
