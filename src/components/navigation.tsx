'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/i18n-context';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';

export function Navigation() {
  const { locale, setLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'products', href: '#products' },
    { key: 'mining', href: '#mining' },
    { key: 'quality', href: '#quality' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Zhongtian Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className={`font-bold text-lg ${isScrolled ? 'text-[#1a365d]' : 'text-white'}`}>
                ZHONGTIAN
              </div>
              <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                {locale === 'zh' ? '印尼中天新能源' : 'New Energy Indonesia'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#1a365d] hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Language Switch & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:bg-white/10`}
            >
              <Globe className="w-4 h-4 mr-1" />
              {locale === 'zh' ? 'EN' : '中文'}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1a365d] transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
