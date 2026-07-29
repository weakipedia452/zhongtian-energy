'use client';

import { useI18n } from '@/contexts/i18n-context';

export function Footer() {
  const { t, locale } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2847] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#c9a961] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ZT</span>
              </div>
              <div>
                <div className="font-bold text-lg">ZHONGTIAN</div>
                <div className="text-xs text-white/60">
                  {locale === 'zh' ? '印尼中天新能源' : 'New Energy Indonesia'}
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              PT ZHONGTIAN NEW ENERGY INDONESIA
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {locale === 'zh' ? '快速链接' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
                  {t('nav.products')}
                </a>
              </li>
              <li>
                <a href="#mining" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
                  {t('nav.mining')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t('contact.title')}
            </h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>{t('contact.address.value')}</p>
              <p>info@zhongtian-energy.com</p>
              <p>+62 21 XXXX XXXX</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-white/60">
            © {currentYear} PT ZHONGTIAN NEW ENERGY INDONESIA. {t('footer.rights')}.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-sm text-white/60 hover:text-[#c9a961] transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
