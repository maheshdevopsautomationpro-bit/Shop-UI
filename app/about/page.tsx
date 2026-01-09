import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us - SAKTHI TEXTILES | ARUTPERUNJOTHI JAVULI KADAI',
    description: 'Learn about SAKTHI TEXTILES - Your trusted garment store in Erode, Tamil Nadu. Quality products and excellent service since establishment.',
};

const businessInfo = {
    name: 'ARUTPERUNJOTHI JAVULI KADAI',
    brand: 'SAKTHI TEXTILES',
    address: '2ND FLOOR, NO: 19,\nELLORA COMPLEX,\nBROUGH ROAD,\nERODE – 638001,\nTAMIL NADU, INDIA',
    phone: ['+91 97509 96633', '+91 95666 09636'],
    gstin: '33DGMPS4403N1ZZ',
    email: 'info@arutperunjothijavulikadai.in',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        About SAKTHI TEXTILES
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Your Trusted Partner for Quality Garments in Erode
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Story */}
                    <section className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                            Our Story
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            <strong>ARUTPERUNJOTHI JAVULI KADAI</strong>, operating under the brand name <strong>SAKTHI TEXTILES</strong>,
                            is a trusted name in quality garments in Erode. We specialize in traditional sarees, modern clothing,
                            and kids wear, offering the best products at competitive prices.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our commitment to quality and customer satisfaction has made us a preferred choice for families
                            across Erode and Tamil Nadu. We carefully curate our collection to ensure that every piece meets
                            our high standards of craftsmanship and style.
                        </p>
                    </section>

                    {/* Values */}
                    <section>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                            Our Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                                <p className="text-gray-600 text-sm">
                                    We never compromise on the quality of our products. Every item is carefully selected and inspected.
                                </p>
                            </div>

                            <div className="card p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
                                <p className="text-gray-600 text-sm">
                                    Competitive pricing without compromising on quality. Great value for your money.
                                </p>
                            </div>

                            <div className="card p-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Customer Service</h3>
                                <p className="text-gray-600 text-sm">
                                    Dedicated to providing excellent service and ensuring complete customer satisfaction.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Business Info */}
                    <section className="bg-gray-50 rounded-xl p-8">
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                            Business Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-gray-900 text-lg">{businessInfo.name}</p>
                                <p className="text-primary-600 font-medium">Brand: {businessInfo.brand}</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Address</p>
                                    <p className="text-gray-600 whitespace-pre-line">{businessInfo.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Phone</p>
                                    <div className="space-y-1">
                                        {businessInfo.phone.map((phone) => (
                                            <a
                                                key={phone}
                                                href={`tel:${phone}`}
                                                className="block text-gray-600 hover:text-primary-600 transition-colors"
                                            >
                                                {phone}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Email</p>
                                    <a
                                        href={`mailto:${businessInfo.email}`}
                                        className="text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {businessInfo.email}
                                    </a>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">GSTIN:</span>{' '}
                                    <span className="font-mono">{businessInfo.gstin}</span>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center">
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                            Visit Our Store
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Experience our quality products in person. We&apos;re located in the heart of Erode.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="btn-primary">
                                Get Directions
                            </a>
                            <a href="tel:+919750996633" className="btn-outline">
                                Call Us Now
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
