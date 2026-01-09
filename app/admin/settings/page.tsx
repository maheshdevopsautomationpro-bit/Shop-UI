'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Save, Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        site_name: '',
        site_description: '',
        contact_email: '',
        contact_phone: '',
        whatsapp_number: '',
        address: '',
        gstin: '',
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('key, value');

            if (error) throw error;

            if (data) {
                const settingsObj: any = {};
                data.forEach(item => {
                    settingsObj[item.key] = item.value;
                });
                setSettings(settingsObj);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Upsert each setting
            const updates = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                description: getSettingDescription(key),
            }));

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_settings')
                    .upsert(update, { onConflict: 'key' });

                if (error) throw error;
            }

            alert('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const getSettingDescription = (key: string): string => {
        const descriptions: Record<string, string> = {
            site_name: 'Website name',
            site_description: 'Website description for SEO',
            contact_email: 'Primary contact email',
            contact_phone: 'Primary contact phone',
            whatsapp_number: 'WhatsApp number for customer support',
            address: 'Business address',
            gstin: 'GST Identification Number',
            facebook_url: 'Facebook page URL',
            instagram_url: 'Instagram profile URL',
            twitter_url: 'Twitter profile URL',
        };
        return descriptions[key] || '';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900">Site Settings</h1>
                    <p className="text-gray-600 mt-1">Configure your website settings</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Settings Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <SettingsIcon className="w-5 h-5" />
                        General Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={settings.site_name}
                                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                className="input w-full"
                                placeholder="SAKTHI TEXTILES"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Site Description
                            </label>
                            <textarea
                                value={settings.site_description}
                                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                                className="input w-full"
                                rows={3}
                                placeholder="Quality garments in Erode..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                GSTIN
                            </label>
                            <input
                                type="text"
                                value={settings.gstin}
                                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                                className="input w-full font-mono"
                                placeholder="33DGMPS4403N1ZZ"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={settings.contact_email}
                                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                className="input w-full"
                                placeholder="info@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                value={settings.contact_phone}
                                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                                className="input w-full"
                                placeholder="+91 97509 96633"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                value={settings.whatsapp_number}
                                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                                className="input w-full"
                                placeholder="919750996633"
                            />
                            <p className="text-xs text-gray-500 mt-1">Without + or spaces</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <textarea
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                className="input w-full"
                                rows={3}
                                placeholder="2ND FLOOR, NO: 19, ELLORA COMPLEX..."
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="card p-6 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Social Media Links
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={settings.facebook_url}
                                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                                className="input w-full"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                value={settings.instagram_url}
                                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                className="input w-full"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Twitter URL
                            </label>
                            <input
                                type="url"
                                value={settings.twitter_url}
                                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                                className="input w-full"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button (Bottom) */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
}
