import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ProductsSection } from '@/components/sections/products';
import { MiningSection } from '@/components/sections/mining';
import { QualitySection } from '@/components/sections/quality';
import { EnvironmentSection } from '@/components/sections/environment';
import { CareersSection } from '@/components/sections/careers';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <MiningSection />
      <QualitySection />
      <EnvironmentSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
