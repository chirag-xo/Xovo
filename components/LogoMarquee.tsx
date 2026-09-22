'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const logos = [
  { id: 'logo-1', src: '/1.png', alt: 'Brand Partner 1', className: 'logo-scale-1' },
  { id: 'logo-2', src: '/2.png', alt: 'Brand Partner 2', className: 'logo-scale-2' },
  { id: 'logo-3', src: '/3.png', alt: 'Brand Partner 3', className: 'logo-scale-3' },
  { id: 'logo-4', src: '/4.png', alt: 'Brand Partner 4', className: 'logo-scale-4' },
  { id: 'logo-5', src: '/5.png', alt: 'Brand Partner 5', className: 'logo-scale-5' },
  { id: 'logo-6', src: '/6.png', alt: 'Brand Partner 6', className: 'logo-scale-6' },
];

export default function LogoMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Continuous right-to-left linear animation
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: prefersReducedMotion ? 120 : 35,
      repeat: -1,
    });

    tweenRef.current = tween;

    if (prefersReducedMotion) {
      tween.timeScale(0.1);
    }
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      // Smoothly decelerate to very slow movement (never freeze completely)
      gsap.to(tweenRef.current, {
        timeScale: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      // Smoothly return to normal speed without sudden jumps
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section
      id="logo-marquee-section"
      ref={containerRef}
      className="logo-marquee-sec"
      aria-label="Client & Partner Brands"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo-marquee-viewport">
        <div ref={trackRef} className="logo-marquee-track">
          {/* First set of logos */}
          <div className="logo-marquee-group" aria-hidden="false">
            {logos.map((logo, index) => (
              <div key={`set1-${logo.id}-${index}`} className="logo-item">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`logo-img ${logo.className}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Duplicated set of logos for seamless infinite looping */}
          <div className="logo-marquee-group" aria-hidden="true">
            {logos.map((logo, index) => (
              <div key={`set2-${logo.id}-${index}`} className="logo-item">
                <img
                  src={logo.src}
                  alt=""
                  className={`logo-img ${logo.className}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
