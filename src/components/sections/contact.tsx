'use client';

import { useState } from 'react';
import { useI18n } from '@/contexts/i18n-context';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const { t, locale } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.address.label'),
      value: t('contact.address.value'),
    },
    {
      icon: Phone,
      label: t('contact.phone.label'),
      value: '+86 186 2176 6995',
    },
    {
      icon: Mail,
      label: t('contact.email.label'),
      value: 'wenjiangxin@vip.126.com',
    },
    {
      icon: Clock,
      label: t('contact.hours.label'),
      value: t('contact.hours.value'),
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="bg-gradient-to-br from-[#1a365d] to-[#0f2847] rounded-2xl p-8 lg:p-12 text-white mb-8">
              <h3 className="text-2xl font-bold mb-8">
                {locale === 'zh' ? '联系方式' : 'Contact Information'}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#c9a961]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#c9a961]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">{item.label}</p>
                        <p className="text-lg font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OpenStreetMap */}
            <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8911%2C-6.1375%2C106.9111%2C-6.1175&amp;layer=mapnik&amp;marker=-6.1275%2C106.9011"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Jakarta Office Location - Apartemen Gading Mediterania"
                className="w-full"
              ></iframe>
              <div className="p-4 bg-white">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#c9a961]" />
                  <p className="text-[#1a365d] font-semibold text-sm">
                    {locale === 'zh' ? '雅加达办公室' : 'Jakarta Office'}
                  </p>
                </div>
                <p className="text-gray-500 text-xs mt-1 ml-7">
                  {locale === 'zh'
                    ? '印度尼西亚雅加达 · Kelapa Gading'
                    : 'Jakarta, Indonesia · Kelapa Gading'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-[#f8fafc] rounded-2xl p-8 lg:p-12 border border-gray-200">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-8">
              {locale === 'zh' ? '发送消息' : 'Send us a Message'}
            </h3>
            
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#1a365d] mb-2">
                  {locale === 'zh' ? '发送成功！' : 'Message Sent!'}
                </h4>
                <p className="text-gray-600">
                  {locale === 'zh' ? '我们会尽快与您联系' : 'We will get back to you soon'}
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: 'contact',
                      ...formData,
                    }),
                  });
                  const data = await response.json();
                  if (data.success) {
                    setSubmitStatus('success');
                    setFormData({ name: '', email: '', company: '', message: '' });
                  } else {
                    setSubmitStatus('error');
                  }
                } catch (error) {
                  setSubmitStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('contact.form.name')}
                    className="w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('contact.form.email')}
                    className="w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.company')}
                  </label>
                  <Input
                    type="text"
                    placeholder={t('contact.form.company')}
                    className="w-full"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    placeholder={t('contact.form.message')}
                    rows={5}
                    className="w-full"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm">
                    {locale === 'zh' ? '发送失败，请重试' : 'Failed to send, please try again'}
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a365d] hover:bg-[#0f2847] text-white py-6 text-lg font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting 
                    ? (locale === 'zh' ? '发送中...' : 'Sending...') 
                    : t('contact.form.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
