'use client';

import { useState } from 'react';
import { useI18n } from '@/contexts/i18n-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Droplets,
  Wind,
  Recycle,
  Sprout,
  Leaf,
  Sun,
  Target,
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const measureIcons = [
  { key: 'water', icon: Droplets },
  { key: 'dust', icon: Wind },
  { key: 'waste', icon: Recycle },
  { key: 'reclamation', icon: Sprout },
  { key: 'biodiversity', icon: Leaf },
  { key: 'carbon', icon: Sun },
];

const statsKeys = ['water', 'reclaimed', 'trees', 'compliance'] as const;

const galleryImages = [
  { src: '/images/mine/pms_img_01_p1.png', alt: 'Mine reclamation site' },
  { src: '/images/mine/pms_img_03_p2.jpeg', alt: 'Vegetation restoration' },
  { src: '/images/mine/pms_img_05_p4.jpeg', alt: 'Mining area greenery' },
  { src: '/images/mine/pms_img_07_p6.jpeg', alt: 'Ecological pond' },
  { src: '/images/mine/pms_img_10_p7.jpeg', alt: 'Reclaimed land' },
  { src: '/images/mine/pms_img_15_p9.jpeg', alt: 'Water management facility' },
];

const goalKeys = ['1', '2', '3', '4'] as const;

export function EnvironmentSection() {
  const { t } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );

  return (
    <section id="environment" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-[#c9a961] uppercase mb-3">
            {t('environment.subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">
            {t('environment.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-[#334155] leading-relaxed">
            {t('environment.intro')}
          </p>
        </div>

        {/* Policy */}
        <Card className="mb-12 border-l-4 border-l-[#1a365d] shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-[#1a365d]">
              {t('environment.policy.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#334155] leading-relaxed">
              {t('environment.policy.content')}
            </p>
          </CardContent>
        </Card>

        {/* Core Measures */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-2">
              {t('environment.measures.title')}
            </h3>
            <p className="text-[#334155]">
              {t('environment.measures.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {measureIcons.map(({ key, icon: Icon }) => (
              <Card
                key={key}
                className="group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#1a365d]/10 flex items-center justify-center mb-3 group-hover:bg-[#c9a961]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#1a365d] group-hover:text-[#c9a961] transition-colors" />
                  </div>
                  <CardTitle className="text-lg text-[#1a365d]">
                    {t(`environment.measures.${key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] leading-relaxed">
                    {t(`environment.measures.${key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12 bg-[#1a365d] rounded-2xl py-12 px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t('environment.stats.title')}
            </h3>
            <p className="text-white/70">
              {t('environment.stats.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {statsKeys.map((key) => (
              <div key={key} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#c9a961] mb-2">
                  {t(`environment.stats.${key}`)}
                </div>
                <div className="text-sm text-white/80">
                  {t(`environment.stats.${key}Label`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-2">
              {t('environment.gallery.title')}
            </h3>
            <p className="text-[#334155]">
              {t('environment.gallery.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#1a365d]/0 group-hover:bg-[#1a365d]/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-2 flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-[#c9a961]" />
              {t('environment.goals.title')}
            </h3>
            <p className="text-[#334155]">
              {t('environment.goals.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {goalKeys.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <CheckCircle2 className="w-5 h-5 text-[#c9a961] mt-0.5 shrink-0" />
                <p className="text-[#334155]">{t(`environment.goals.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment */}
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-10 h-10 text-[#c9a961] mx-auto mb-4" />
          <p className="text-lg md:text-xl text-[#1a365d] font-medium leading-relaxed italic">
            {t('environment.commitment')}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white/80 hover:text-white p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white/80 hover:text-white p-2"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
}
