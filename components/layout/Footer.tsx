'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 text-gray-600">
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
                        <p className="text-sm leading-relaxed text-gray-500">
                            Your destination for exquisite garments and quality fabrics. Established in 1994, we bring you the finest collection of sarees and menswear in Erode.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all shadow-sm">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-all shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
                            Shop
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href="/category/sarees" className="text-sm hover:text-primary-600 transition-colors">Women&apos;s Wear</Link></li>
                            <li><Link href="/category/shirts" className="text-sm hover:text-primary-600 transition-colors">Men&apos;s Wear</Link></li>
                            <li><Link href="/category/kids-wear" className="text-sm hover:text-primary-600 transition-colors">Kids Wear</Link></li>
                            <li><Link href="/offers" className="text-sm hover:text-primary-600 transition-colors">Special Offers</Link></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
                            Information
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm hover:text-primary-600 transition-colors">Our Story</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-primary-600 transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm hover:text-primary-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
                            Visit Us
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <span>
                                    2ND FLOOR, NO: 19, ELLORA COMPLEX,<br />
                                    BROUGH ROAD, ERODE - 638001
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                                <span>+91 97509 96633</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                                <span className="lowercase">info@arutperunjothi.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                            &copy; {new Date().getFullYear()} ARUTPERUNJOTHI JAVULI KADAI. All rights reserved.
                        </p>
                        <div className="flex space-x-8">
                            <span className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-bold">Quality</span>
                            <span className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-bold">Tradition</span>
                            <span className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-bold">Erode</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
