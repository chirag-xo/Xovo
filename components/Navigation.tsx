'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from('.nav-brand-center', { opacity: 0, y: -20, duration: 0.8, delay: 0.3 });
    gsap.from('.nav-group', { opacity: 0, y: -20, duration: 0.8, delay: 0.5 });
  }, { scope: navRef });

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (navRef.current) {
      const navTrigger = ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1) {
            navRef.current?.classList.add('scrolled');
          } else if (self.progress === 0) {
            navRef.current?.classList.remove('scrolled');
          }
        },
      });
      triggers.push(navTrigger);
    }

    const sections = ['p1', 'p2', 'p3', 'p4', 'web-portfolio', 'p5'];
    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el) {
        const secTrigger = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              document.querySelectorAll('.dot').forEach((d) => d.classList.remove('on'));
              document.querySelector(`.dot[data-sec="${sec}"]`)?.classList.add('on');
            }
          },
        });
        triggers.push(secTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav id="nav" ref={navRef}>
        <div className="nav-container">
          <ul className="nav-group nav-group-left">
            <li><a href="#p3" onClick={(e) => { e.preventDefault(); scrollTo('p3'); }}>Services</a></li>
          </ul>

          <a href="#p1" onClick={(e) => { e.preventDefault(); scrollTo('p1'); }} className="nav-brand-center">
            <img src="/xovo1.png" alt="XOVO Logo" className="nav-logo" />
          </a>

          <ul className="nav-group nav-group-right">
            <li><a href="#p5" onClick={(e) => { e.preventDefault(); scrollTo('p5'); }}>Connect</a></li>
          </ul>

          <button
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#p1" onClick={(e) => { e.preventDefault(); scrollTo('p1'); setMenuOpen(false); }}>Profile</a></li>
          <li><a href="#p2" onClick={(e) => { e.preventDefault(); scrollTo('p2'); setMenuOpen(false); }}>Agency</a></li>
          <li><a href="#p3" onClick={(e) => { e.preventDefault(); scrollTo('p3'); setMenuOpen(false); }}>Services</a></li>
          <li><a href="#p4" onClick={(e) => { e.preventDefault(); scrollTo('p4'); setMenuOpen(false); }}>Results</a></li>
          <li><a href="#web-portfolio" onClick={(e) => { e.preventDefault(); scrollTo('web-portfolio'); setMenuOpen(false); }}>Web Dev</a></li>
          <li><a href="#p5" onClick={(e) => { e.preventDefault(); scrollTo('p5'); setMenuOpen(false); }}>Connect</a></li>
        </ul>
      </div>

      <div className="side-dots" id="dots">
        <div className="dot on" data-sec="p1" onClick={() => scrollTo('p1')}></div>
        <div className="dot" data-sec="p2" onClick={() => scrollTo('p2')}></div>
        <div className="dot" data-sec="p3" onClick={() => scrollTo('p3')}></div>
        <div className="dot" data-sec="p4" onClick={() => scrollTo('p4')}></div>
        <div className="dot" data-sec="web-portfolio" onClick={() => scrollTo('web-portfolio')}></div>
        <div className="dot" data-sec="p5" onClick={() => scrollTo('p5')}></div>
      </div>
    </>
  );
}

