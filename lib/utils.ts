import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names (utility for Tailwind)
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
}

/**
 * Format date in Indian format
 */
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

/**
 * Get WhatsApp link for product inquiry
 */
export function getWhatsAppLink(
    phoneNumber: string,
    productName?: string,
    productUrl?: string
): string {
    const message = productName
        ? `Hi, I'm interested in ${productName}. ${productUrl ? `Link: ${productUrl}` : ''}`
        : 'Hi, I would like to know more about your products.';

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
}

/**
 * Get UPI payment link
 */
export function getUPILink(
    upiId: string,
    amount?: number,
    note?: string
): string {
    const params = new URLSearchParams({
        pa: upiId,
        pn: 'SAKTHI TEXTILES',
        cu: 'INR',
    });

    if (amount) params.append('am', amount.toString());
    if (note) params.append('tn', note);

    return `upi://pay?${params.toString()}`;
}
