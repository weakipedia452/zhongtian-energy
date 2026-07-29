'use client';

import { useI18n } from '@/contexts/i18n-context';
import { Package, Truck, Zap, Award } from 'lucide-react';

export function ProductsSection() {
  const { t } = useI18n();

  const products = [
    {
      icon: Package,
      title: t('products.float.title'),
      desc: t('products.float.desc'),
      spec: t('products.float.spec'),
      color: 'from-blue-500 to-blue-600',
      image: '/images/pms_img_07_p6.jpeg',
    },
    {
      icon: Truck,
      title: t('products.export.title'),
      desc: t('products.export.desc'),
      spec: t('products.export.spec'),
      color: 'from-[#c9a961] to-[#b89950]',
      image: '/images/pms_img_08_p7.png',
    },
    {
      icon: Zap,
      title: t('products.pv.title'),
      desc: t('products.pv.desc'),
      spec: t('products.pv.spec'),
      color: 'from-[#1a365d] to-[#0f2847]',
      image: '/images/pms_img_15_p9.jpeg',
    },
  ];

  return (
    <section id="products" className="py-20 lg:py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('products.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform -mt-14 relative z-10 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1a365d] mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.desc}
                  </p>

                  {/* Spec badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-[#c9a961]/10 rounded-lg">
                    <Award className="w-4 h-4 text-[#c9a961] mr-2" />
                    <span className="text-sm font-medium text-[#1a365d]">
                      {product.spec}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key clients */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
            {t('products.clients.title')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center p-6 bg-gradient-to-br from-[#f8fafc] to-white rounded-xl border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-[#c9a961]" />
                </div>
                <p className="text-lg font-semibold text-[#1a365d]">
                  {t('products.clients.1')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-gradient-to-br from-[#f8fafc] to-white rounded-xl border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-[#c9a961]" />
                </div>
                <p className="text-lg font-semibold text-[#1a365d]">
                  {t('products.clients.2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
