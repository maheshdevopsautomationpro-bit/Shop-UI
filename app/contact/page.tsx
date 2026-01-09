import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us - SAKTHI TEXTILES | ARUTPERUNJOTHI JAVULI KADAI',
    description: 'Get in touch with SAKTHI TEXTILES. Visit our store in Erode or contact us via phone, email, or WhatsApp. GSTIN: 33DGMPS4403N1ZZ',
};

const businessInfo = {
    name: 'ARUTPERUNJOTHI JAVULI KADAI',
    brand: 'SAKTHI TEXTILES',
    address: '2ND FLOOR, NO: 19,\nELLORA COMPLEX,\nBROUGH ROAD,\nERODE – 638001,\nTAMIL NADU, INDIA',
    phone: ['+91 97509 96633', '+91 95666 09636'],
    gstin: '33DGMPS4403N1ZZ',
    email: 'info@arutperunjothijavulikadai.in',
    whatsapp: '919750996633',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Visit our store or get in touch with us.
                    </p>
                </div>
            </div>

            {/* Contact Info */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Contact Cards */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Visit Our Store</h3>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {businessInfo.address}
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=Ellora+Complex+Brough+Road+Erode"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Get Directions →
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                                    <div className="space-y-2">
                                        {businessInfo.phone.map((phone) => (
                                            <a
                                                key={phone}
                                                href={`tel:${phone}`}
                                                className="block text-gray-600 hover:text-primary-600 transition-colors text-lg"
                                            >
                                                {phone}
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Available during business hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                                    <a
                                        href={`https://wa.me/${businessInfo.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary-600 transition-colors text-lg"
                                    >
                                        +91 97509 96633
                                    </a>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Chat with us on WhatsApp
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                                    <a
                                        href={`mailto:${businessInfo.email}`}
                                        className="text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {businessInfo.email}
                                    </a>
                                    <p className="text-sm text-gray-500 mt-2">
                                        We'll respond within 24 hours
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Info & Map */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-semibold text-xl mb-4">Business Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Business Name</p>
                                    <p className="font-medium text-gray-900">{businessInfo.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Brand</p>
                                    <p className="font-medium text-primary-600">{businessInfo.brand}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">GSTIN</p>
                                    <p className="font-mono text-gray-900">{businessInfo.gstin}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="card overflow-hidden">
                            <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 font-medium">Store Location</p>
                                    <p className="text-sm text-gray-500 mt-1">Brough Road, Erode</p>
                                    <a
                                        href="https://maps.google.com/?q=Ellora+Complex+Brough+Road+Erode"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 btn-primary text-sm"
                                    >
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
                            <h3 className="font-semibold text-xl mb-3">Quick Contact</h3>
                            <p className="mb-4 text-primary-50">
                                Need immediate assistance? Reach out to us now!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="tel:+919750996633"
                                    className="btn bg-white text-primary-600 hover:bg-gray-100 flex-1 justify-center"
                                >
                                    Call Now
                                </a>
                                <a
                                    href={`https://wa.me/${businessInfo.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn bg-green-500 text-white hover:bg-green-600 flex-1 justify-center"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
