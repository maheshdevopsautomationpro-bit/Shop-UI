'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingBag, Heart, Store } from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Women', href: '/category/sarees' },
    { name: 'Men', href: '/category/shirts' },
    { name: 'Kids', href: '/category/kids-wear' },
    { name: 'Combo', href: '/category/combo-offers' },
    { name: 'Offers', href: '/offers' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm'
                : 'bg-white border-transparent'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex flex-col">
                            <span className="font-display font-bold text-lg lg:text-xl tracking-tighter text-gray-900 leading-none">
                                ARUTPERUNJOTHI
                            </span>
                            <span className="text-[10px] lg:text-xs text-primary-600 font-bold tracking-[0.2em] leading-none mt-1">
                                JAVULI KADAI
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[13px] text-gray-800 hover:text-primary-600 font-bold uppercase tracking-wider transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar - Persistent Pill */}
                    <div className="hidden xl:flex items-center flex-1 max-w-xs mx-8">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                placeholder="Search product"
                                className="w-full bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all placeholder:text-gray-400"
                            />
                            <button className="absolute right-1 top-1 bottom-1 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Action Icons */}
                    <div className="flex items-center space-x-3 lg:space-x-5">
                        {/* Mobile Search Icon */}
                        <button className="xl:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Login */}
                        <Link href="/admin" className="flex items-center space-x-1 px-2 py-1 text-gray-700 hover:text-primary-600 transition-colors">
                            <User className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm font-bold">Login</span>
                        </Link>

                        {/* Wishlist */}
                        <Link href="#" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                        </Link>

                        {/* Cart */}
                        <Link href="#" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                        </Link>

                        {/* Become Reseller */}
                        <Link
                            href="#"
                            className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-primary-600 transition-all border border-gray-100"
                        >
                            <Store className="w-4 h-4" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Become Reseller</span>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="py-4 animate-slide-up">
                        <input
                            type="search"
                            placeholder="Search for products..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>
                )}

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 space-y-2 animate-slide-up">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin"
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin Login
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
