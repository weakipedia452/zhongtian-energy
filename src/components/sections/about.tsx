'use client';

import { useI18n } from '@/contexts/i18n-context';
import { User, Building2, Calendar } from 'lucide-react';

export function AboutSection() {
  const { t } = useI18n();

  const timeline = [
    { year: t('about.timeline.1980s'), desc: t('about.timeline.1980s.desc'), icon: Building2 },
    { year: t('about.timeline.1999'), desc: t('about.timeline.1999.desc'), icon: Calendar },
    { year: t('about.timeline.2018'), desc: t('about.timeline.2018.desc'), icon: Building2 },
    { year: t('about.timeline.2022'), desc: t('about.timeline.2022.desc'), icon: Calendar },
    { year: t('about.timeline.now'), desc: t('about.timeline.now.desc'), icon: Calendar },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Company intro */}
        <div className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('about.intro')}
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/pms_img_11_p8.jpeg"
                  alt="Company Overview"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Founder section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Founder card */}
          <div className="bg-gradient-to-br from-[#f8fafc] to-white p-8 rounded-2xl border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#1a365d]/10">
                <img
                  src="/images/pms_img_17_p10.jpeg"
                  alt="Xianlu Wen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a365d] mb-1">
                  {t('about.founder.title')}
                </h3>
                <p className="text-lg font-semibold text-[#c9a961]">
                  {t('about.founder.name')}
                </p>
                <p className="text-sm text-gray-500">{t('about.founder.role')}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('about.founder.story')}
            </p>
          </div>

          {/* General Manager card */}
          <div className="bg-gradient-to-br from-[#f8fafc] to-white p-8 rounded-2xl border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#c9a961]/20">
                <img
                  src="/images/pms_img_18_p10.jpeg"
                  alt="Jiangxin Wen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a365d] mb-1">
                  {t('about.gm.name')}
                </h3>
                <p className="text-lg font-semibold text-[#c9a961]">
                  {t('about.gm.role')}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                2018年与陕西省物流集团混合改制后出任陕西省物流集团盛久实业有限公司总经理，主导大宗商品贸易业务，年贸易额达10亿人民币。2022年起负责印尼石英砂项目的全面运营管理。
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1a365d] text-center mb-12">
            {t('about.timeline.title')}
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[#c9a961]/30 transform lg:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'} pl-12 lg:pl-0`}>
                      <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${
                        index % 2 === 0 ? 'lg:ml-auto' : ''
                      } max-w-lg`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-[#c9a961]/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#c9a961]" />
                          </div>
                          <h4 className="text-xl font-bold text-[#1a365d]">
                            {item.year}
                          </h4>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-[#c9a961] rounded-full border-4 border-white shadow-md transform -translate-x-1/2 lg:-translate-x-1/2"></div>

                    {/* Spacer for the other side */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
