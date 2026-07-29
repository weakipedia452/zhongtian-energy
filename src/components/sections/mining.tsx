'use client';

import { useI18n } from '@/contexts/i18n-context';
import { MapPin, Factory, Shield } from 'lucide-react';

export function MiningSection() {
  const { t, locale } = useI18n();

  const stats = [
    { label: t('mining.area.label'), value: t('mining.area.value'), unit: t('mining.area.unit') },
    { label: t('mining.reserve.label'), value: t('mining.reserve.value'), unit: t('mining.reserve.unit') },
    { label: t('mining.capacity.label'), value: t('mining.capacity.value'), unit: t('mining.capacity.unit') },
  ];

  const features = [
    {
      icon: MapPin,
      title: t('mining.location.title'),
      desc: t('mining.location.desc'),
      image: '/images/mine/pms_img_04_p3.jpeg',
    },
    {
      icon: Factory,
      title: t('mining.process.title'),
      desc: t('mining.process.desc'),
      image: '/images/mine/pms_img_12_p8.jpeg',
    },
    {
      icon: Shield,
      title: t('mining.qc.title'),
      desc: t('mining.qc.desc'),
      image: '/images/mine/pms_img_13_p8.jpeg',
    },
  ];

  return (
    <section id="mining" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('mining.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('mining.subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#1a365d] to-[#0f2847] rounded-2xl p-8 text-center overflow-hidden group hover:scale-105 transition-transform"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/10 rounded-full blur-2xl group-hover:bg-[#c9a961]/20 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="text-5xl lg:text-6xl font-bold text-[#c9a961] mb-2">
                  {stat.value}
                </div>
                <div className="text-xl text-white/80 mb-1">{stat.unit}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#f8fafc] rounded-2xl overflow-hidden hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Feature Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="w-14 h-14 bg-[#c9a961]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#c9a961]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a365d] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location map placeholder */}
        <div className="mt-16 bg-gradient-to-br from-[#f8fafc] to-white rounded-2xl p-8 lg:p-12 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#1a365d] mb-4">
                {locale === 'zh' ? '地理位置优势' : 'Strategic Location'}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {locale === 'zh' 
                  ? '矿区位于印尼邦加勿里洞岛，地处东南亚核心位置，靠近主要航运通道，便于产品出口至中国、东南亚及其他国际市场。'
                  : 'The mine is located in Bangka Belitung Islands, Indonesia, in the core of Southeast Asia, close to major shipping routes, facilitating product exports to China, Southeast Asia and other international markets.'
                }
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#1a365d]/10 text-[#1a365d] rounded-lg text-sm font-medium">
                  {locale === 'zh' ? '邦加勿里洞岛' : 'Bangka Belitung'}
                </span>
                <span className="px-4 py-2 bg-[#c9a961]/10 text-[#c9a961] rounded-lg text-sm font-medium">
                  {locale === 'zh' ? '印尼' : 'Indonesia'}
                </span>
                <span className="px-4 py-2 bg-[#1a365d]/10 text-[#1a365d] rounded-lg text-sm font-medium">
                  {locale === 'zh' ? '东南亚' : 'Southeast Asia'}
                </span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/mine/pms_img_02_p1.jpeg"
                alt="Mining Area Aerial View"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Equipment gallery */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
            {locale === 'zh' ? '矿区设备与运输' : 'Mining Equipment & Transportation'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/mine/pms_img_03_p2.jpeg"
                alt="Mining Trucks"
                className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/mine/pms_img_11_p8.jpeg"
                alt="Sand Stockpile"
                className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
