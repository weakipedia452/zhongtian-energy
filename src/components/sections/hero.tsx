'use client';

import { useI18n } from '@/contexts/i18n-context';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const { t } = useI18n();

  const handleScrollDown = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/pms_img_02_p1.jpeg"
          alt="Mining Area"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/85 via-[#1e3a5f]/75 to-[#0f2847]/90"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a961] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9a961] rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Company name */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight">
              PT ZHONGTIAN
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#c9a961]">
              NEW ENERGY INDONESIA
            </h2>
          </div>

          {/* Slogan */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium max-w-4xl mx-auto leading-relaxed">
            {t('hero.slogan')}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={handleScrollDown}
              className="bg-[#c9a961] hover:bg-[#b89950] text-white px-8 py-6 text-lg font-medium rounded-lg transition-all hover:scale-105"
            >
              {t('hero.cta')}
            </Button>
            <Button
              size="lg"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#c9a961] hover:bg-[#b8944f] text-[#1a365d] border-2 border-[#c9a961] px-8 py-6 text-lg font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              {t('hero.cta.contact')}
            </Button>
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#c9a961]">94.29</div>
              <div className="text-sm text-white/60 mt-2">
                {t('mining.area.unit')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#c9a961]">8000</div>
              <div className="text-sm text-white/60 mt-2">
                {t('mining.reserve.unit')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#c9a961]">100</div>
              <div className="text-sm text-white/60 mt-2">
                {t('mining.capacity.unit')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
