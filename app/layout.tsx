import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'SAKTHI TEXTILES - Quality Garments in Erode | ARUTPERUNJOTHI JAVULI KADAI',
    description: 'Shop traditional sarees, shirts, t-shirts, and kids wear at SAKTHI TEXTILES. Quality garments with great prices in Erode, Tamil Nadu. GSTIN: 33DGMPS4403N1ZZ',
    keywords: 'sarees, textiles, garments, Erode, Tamil Nadu, kids wear, shirts, traditional wear, SAKTHI TEXTILES',
    authors: [{ name: 'SAKTHI TEXTILES' }],
    openGraph: {
        title: 'SAKTHI TEXTILES - Quality Garments in Erode',
        description: 'Shop traditional sarees, shirts, t-shirts, and kids wear at SAKTHI TEXTILES.',
        url: 'https://www.arutperunjothijavulikadai.in',
        siteName: 'SAKTHI TEXTILES',
        locale: 'en_IN',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
