import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import Agency from '@/components/Agency';
import Services from '@/components/Services';
import Results from '@/components/Results';
import WebPortfolio from '@/components/WebPortfolio';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <LogoMarquee />
      <Agency />
      <Services />
      <Results />
      <WebPortfolio />
      <Contact />
    </main>
  );
}

