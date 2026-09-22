'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function WebPortfolio() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const textToSplit = container.current?.querySelector('.web-heading') as HTMLElement;
    let splitText: any;
    if (textToSplit) {
      splitText = new SplitType(textToSplit, { types: 'lines,words,chars' });
        
      gsap.from(splitText.chars, {
        scrollTrigger: {
          trigger: textToSplit,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
        transformOrigin: '50% 50% -50px'
      });
    }

    gsap.utils.toArray('.sr').forEach((el: any) => {
      if (el.classList.contains('serif-h')) return; 
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
      });
    });

    return () => {
      if (splitText) splitText.revert();
    };
  }, { scope: container });

  const webProjects = [
    {
      name: "DRAW",
      subtitle: "DESIGN RESEARCH WORKSHOP",
      link: "https://draw-white.vercel.app/",
      image: "/draw.png",
      isDraw: true
    },
    {
      name: "LINEA / Studio Monolith",
      link: "https://sample2-self.vercel.app/",
      image: "/LINEA.png",
      isDraw: false
    },
    {
      name: "De Ceramica",
      link: "https://deceramica.in/",
      image: "/deceramica.png",
      isDraw: false
    },
    {
      name: "Monolith",
      link: "https://sample-showcase.vercel.app/",
      image: "/monolith.png",
      isDraw: false
    }
  ];

  return (
    <section id="web-portfolio" ref={container} className="web-portfolio-sec">
      <div className="web-header-container sr">
        <span className="web-eyebrow">WEB DEVELOPMENT</span>
        <h2 className="web-heading serif-h">
          Digital <em className="web-heading-italic">Craft</em>
        </h2>
        <p className="web-description">
          A curated selection of high-performance digital experiences built from the ground up to drive real business growth and elevate brand equity.
        </p>
      </div>

      <div className="web-cards-grid">
        {webProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="web-project-card sr"
          >
            <div className="web-project-img-wrapper">
              <img
                src={project.image}
                alt={project.name}
                className="web-project-img"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

