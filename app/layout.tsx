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
    title: {
        default: 'ARUTPERUNJOTHI JAVULI KADAI | Quality Garments in Erode',
        template: '%s | ARUTPERUNJOTHI JAVULI KADAI',
    },
    description: 'ARUTPERUNJOTHI JAVULI KADAI - Your destination for exquisite garments, sarees, and quality fabrics in Erode, Tamil Nadu.',
    keywords: 'sarees, textiles, garments, Erode, Tamil Nadu, kids wear, shirts, traditional wear, ARUTPERUNJOTHI JAVULI KADAI',
    authors: [{ name: 'ARUTPERUNJOTHI JAVULI KADAI' }],
    openGraph: {
        title: 'ARUTPERUNJOTHI JAVULI KADAI - Quality Garments in Erode',
        description: 'ARUTPERUNJOTHI JAVULI KADAI - Your destination for exquisite garments, sarees, and quality fabrics in Erode, Tamil Nadu.',
        url: 'https://www.arutperunjothijavulikadai.in',
        siteName: 'ARUTPERUNJOTHI JAVULI KADAI',
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
