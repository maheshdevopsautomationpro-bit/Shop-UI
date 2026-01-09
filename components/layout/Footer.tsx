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
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand & Contact */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-white font-display font-bold text-xl mb-2">
                                {businessInfo.brand}
                            </h3>
                            <p className="text-sm text-gray-400">{businessInfo.name}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary-500" />
                                <p className="text-sm whitespace-pre-line">{businessInfo.address}</p>
                            </div>

                            <div className="space-y-1">
                                {businessInfo.phone.map((phone) => (
                                    <a
                                        key={phone}
                                        href={`tel:${phone}`}
                                        className="flex items-center space-x-2 text-sm hover:text-primary-500 transition-colors"
                                    >
                                        <Phone className="w-4 h-4 text-primary-500" />
                                        <span>{phone}</span>
                                    </a>
                                ))}
                            </div>

                            <a
                                href={`mailto:${businessInfo.email}`}
                                className="flex items-center space-x-2 text-sm hover:text-primary-500 transition-colors"
                            >
                                <Mail className="w-4 h-4 text-primary-500" />
                                <span>{businessInfo.email}</span>
                            </a>

                            <p className="text-sm pt-2">
                                <span className="text-gray-400">GSTIN:</span>{' '}
                                <span className="font-mono">{businessInfo.gstin}</span>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <Link
                                        href={category.href}
                                        className="text-sm hover:text-primary-500 transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <a
                                href="#"
                                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
                                aria-label="Twitter"
                            >
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

                {/* Bottom Bar */}
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
            </div>
        </footer>
    );
}
