'use client';

import { useI18n } from '@/contexts/i18n-context';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function QualitySection() {
  const { t, locale } = useI18n();

  const processSteps = [
    t('quality.process.1'),
    t('quality.process.2'),
    t('quality.process.3'),
    t('quality.process.4'),
    t('quality.process.5'),
    t('quality.process.6'),
  ];

  return (
    <section id="quality" className="py-20 lg:py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('quality.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('quality.subtitle')}
          </p>
        </div>

        {/* Quality indicators */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* SiO2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1a365d]">
                {t('quality.sio2.label')}
              </h3>
              <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#c9a961]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-5xl lg:text-6xl font-bold text-[#1a365d]">
                {t('quality.sio2.value')}
              </span>
              <span className="text-2xl text-gray-500">{t('quality.sio2.unit')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#c9a961] to-[#1a365d] h-full rounded-full transition-all duration-1000"
                style={{ width: '99.59%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {locale === 'zh' ? '高纯度石英砂标准' : 'High-purity quartz sand standard'}
            </p>
          </div>

          {/* Fe2O3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1a365d]">
                {t('quality.fe2o3.label')}
              </h3>
              <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#c9a961]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-[#1a365d]">
                {t('quality.fe2o3.value')}
              </span>
              <span className="text-2xl text-gray-500">{t('quality.fe2o3.unit')}</span>
            </div>
            <p className="text-lg font-semibold text-[#c9a961] mb-4">
              {t('quality.fe2o3.final')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
              <span>{locale === 'zh' ? '磁选除铁工艺' : 'Magnetic separation process'}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <div className="w-2 h-2 bg-[#1a365d] rounded-full"></div>
              <span>{locale === 'zh' ? '光伏级品质保证' : 'PV-grade quality assurance'}</span>
            </div>
          </div>
        </div>

        {/* Process flow */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-12">
            {t('quality.process.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-xl p-4 text-center border border-gray-200 hover:border-[#c9a961] hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1a365d]">{step}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 text-[#c9a961] transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quality standard */}
        <div className="bg-gradient-to-br from-[#1a365d] to-[#0f2847] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image side */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="/images/pms_img_10_p7.jpeg"
                alt="Quality Control"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1a365d]"></div>
            </div>
            
            {/* Content side */}
            <div className="p-8 lg:p-12 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                {t('quality.standard.title')}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {t('quality.standard.desc')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">99.59%</div>
                  <div className="text-sm text-white/70">SiO₂</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">≤93ppm</div>
                  <div className="text-sm text-white/70">Fe₂O₃</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">PV</div>
                  <div className="text-sm text-white/70">{locale === 'zh' ? '光伏级' : 'Grade'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">100%</div>
                  <div className="text-sm text-white/70">{locale === 'zh' ? '品质保证' : 'Quality'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
