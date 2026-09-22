'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import SplitType from 'split-type';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Split text for animated reveal
    const textToSplit = container.current?.querySelector('.p1-name') as HTMLElement;
    let splitText: any;

    if (textToSplit) {
      splitText = new SplitType(textToSplit, { types: 'lines,words,chars' });

      const tl = gsap.timeline();
      tl.from('.p1-eyebrow', { opacity: 0, y: 20, duration: 1, delay: 0.2 })
        .from(splitText.chars, {
          opacity: 0,
          y: 40,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: 'power4.out',
          transformOrigin: '50% 50% -50px'
        }, "-=0.6")
        .from('.p1-role', { opacity: 0, y: 20, duration: 1 }, "-=0.6")
        .from('.p1-divider', { width: 0, duration: 1, ease: 'power2.out' }, "-=0.6")
        .from('.p1-headline', { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from('.p1-bio', { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from('.p1-actions', { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from('.p1-stats', { opacity: 0, y: 40, duration: 1 }, "-=0.8");

      gsap.from('.p1-right', { opacity: 0, duration: 1.5, delay: 0.5 });
      gsap.from('#founderImg', { scale: 1.2, duration: 2, delay: 0.5, ease: 'power3.out' });
    }

    return () => {
      if (splitText) splitText.revert();
    };
  }, { scope: container });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="p1" ref={container}>
      <div className="p1-left">
        <div className="p1-eyebrow">
          <span>Founder &amp; Creative Strategist</span>
        </div>
        <h1 className="p1-name">Akshita<em>  Garg</em></h1>
        <p className="p1-role">Marketing Strategist &nbsp;·&nbsp; Brand Builder &nbsp;·&nbsp; Content Creator</p>
        <div className="p1-divider"></div>
        <p className="p1-headline">"Helping Brands Grow Through Strategic Marketing, Storytelling &amp; Content."</p>
        <p className="p1-bio">
          A creative strategist and brand builder with hands-on expertise in social media management, content creation, and digital brand growth. With experience across lifestyle, fashion, hospitality, architecture, and interior design, the focus is on building engaged communities and scaling digital presence with intention. The approach blends aesthetic intuition with data-driven thinking, ensuring every campaign is not just seen, but felt, remembered, and acted upon.
        </p>
        <div className="p1-actions">
          <button onClick={() => scrollTo('web-portfolio')} className="btn">Explore Work ↓</button>
          <button onClick={() => scrollTo('p5')} className="btn btn-ghost">Get In Touch →</button>
        </div>
      </div>

      <div className="p1-right">
        <div className="p1-img-wrap">
          <img id="founderImg" src="/hero-image.png" alt="Akshita Garg - Founder & Creative Strategist" />
          <div className="p1-img-overlay"></div>
          <div className="p1-stats">
            <div>
              <div className="stat-n">53K<sup>+</sup></div>
              <div className="stat-l">Followers Built</div>
            </div>
            <div>
              <div className="stat-n">19<sup>%</sup></div>
              <div className="stat-l">Avg. Growth Rate</div>
            </div>
            <div>
              <div className="stat-n">50<sup>+</sup></div>
              <div className="stat-l">Brands Elevated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
