'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const businessInfo = {
    name: 'ARUTPERUNJOTHI JAVULI KADAI',
    brand: 'SAKTHI TEXTILES',
    address: '2ND FLOOR, NO: 19,\nELLORA COMPLEX,\nBROUGH ROAD,\nERODE – 638001,\nTAMIL NADU, INDIA',
    phone: ['+91 97509 96633', '+91 95666 09636'],
    gstin: '33DGMPS4403N1ZZ',
    email: 'info@arutperunjothijavulikadai.in',
    domain: 'www.arutperunjothijavulikadai.in',
};

const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
];

const categories = [
    { name: 'Sarees', href: '/category/sarees' },
    { name: 'Shirts', href: '/category/shirts' },
    { name: 'T-Shirts', href: '/category/t-shirts' },
    { name: 'Kids Wear', href: '/category/kids-wear' },
];

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex flex-col">
                            <span className="font-display font-bold text-xl tracking-tighter text-gray-900 leading-none">
                                ARUTPERUNJOTHI
                            </span>
                            <span className="text-xs text-primary-600 font-bold tracking-[0.2em] leading-none mt-1 uppercase">
                                Javuli Kadai
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your destination for exquisite garments and quality fabrics. Established in 1994, we bring you the finest collection of sarees and menswear.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Links */}
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>

                <div>
                    <p className="text-sm mb-2">Subscribe to our newsletter</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors text-sm font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>

                {/* Bottom Bar */ }
    <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} {businessInfo.brand}. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
                Website: <span className="text-primary-500">{businessInfo.domain}</span>
            </p>
        </div>
    </div>
            </div >
        </footer >
    );
}
