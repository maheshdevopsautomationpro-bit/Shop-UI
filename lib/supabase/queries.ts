import { supabase } from './client';
import type { Category, Product, FestivalOffer, PaymentSetting, SiteSetting } from '@/types/database';

// =====================================================
// CATEGORIES
// =====================================================
export async function getActiveCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

    if (error) return null;
    return data;
}

// =====================================================
// PRODUCTS
// =====================================================
export async function getActiveProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('active', true)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('slug', slug)
        .eq('active', true)
        .single();

    if (error) return null;
    return data;
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('active', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data || [];
}

export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data || [];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('active', true)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
      *,
      category:categories(*)
    `)
        .eq('active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) throw error;
    return data || [];
}

// =====================================================
// FESTIVAL OFFERS
// =====================================================
export async function getActiveFestivalOffer(): Promise<FestivalOffer | null> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('festival_offers')
        .select('*')
        .eq('active', true)
        .lte('start_date', now)
        .gte('end_date', now)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) return null;
    return data;
}

// =====================================================
// PAYMENT SETTINGS
// =====================================================
export async function getActivePaymentMethods(): Promise<PaymentSetting[]> {
    const { data, error } = await supabase
        .from('payment_settings')
        .select('id, provider, display_name, upi_id, active')
        .eq('active', true)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
}

// =====================================================
// SITE SETTINGS
// =====================================================
export async function getSiteSetting(key: string): Promise<any> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) return null;
    return data?.value;
}

export async function getAllSiteSettings(): Promise<Record<string, any>> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

    if (error) throw error;

    const settings: Record<string, any> = {};
    data?.forEach(setting => {
        settings[setting.key] = setting.value;
    });

    return settings;
}
