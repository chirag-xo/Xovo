'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<string>('Send Inquiry →');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useGSAP(() => {
    // text split animation
    const textToSplit = container.current?.querySelector('.p5-headline') as HTMLElement;
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
      if (el.classList.contains('p5-headline')) return;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus('Sending...');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "af281a74-1ad3-4a89-ba43-666d4cb2a41c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus('Sent Successfully ✓');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('Send Inquiry →'), 4000);
      } else {
        setFormStatus('Error. Try Again.');
        setTimeout(() => setFormStatus('Send Inquiry →'), 4000);
      }
    } catch (error) {
      console.error("Form submission error", error);
      setFormStatus('Error. Try Again.');
      setTimeout(() => setFormStatus('Send Inquiry →'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="p5" ref={container}>
      <div className="p5-left">
        <h2 className="p5-headline sr">Let's build something<br /><em>remarkable.</em></h2>
        <p className="p5-sub sr">Currently accepting new projects for Q4 2026. Whether it's a full brand build or strategic content partnership, let's talk.</p>

        <div style={{ marginTop: '20px' }}>
          <a href="mailto:akshitagarg615@gmail.com" className="clink sr">
            <div className="clink-icon">@</div>
            <div>
              <div className="clink-type">Direct Email</div>
              <div className="clink-label">akshitagarg615@gmail.com</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/akshita-garg-813885191/" target="_blank" rel="noreferrer" className="clink sr">
            <div className="clink-icon">in</div>
            <div>
              <div className="clink-type">LinkedIn</div>
              <div className="clink-label">Akshita Garg</div>
            </div>
          </a>
        </div>
      </div>

      <div className="p5-right">
        <div className="p5-watermark" aria-hidden="true">
          <img src="/xovo1.png" alt="" />
        </div>

        <div className="p5-form-container">
          <h3 className="form-title sr">Project Inquiry</h3>
          <form className="form-stack sr" onSubmit={handleSubmit}>
            <div className="f-group">
              <label className="f-label">Name / Brand</label>
              <input type="text" name="name" className="f-input" placeholder="Your name or company" required />
            </div>
            <div className="f-group">
              <label className="f-label">Email Address</label>
              <input type="email" name="email" className="f-input" placeholder="hello@brand.com" required />
            </div>
            <div className="f-group">
              <label className="f-label">Project Details</label>
              <textarea name="message" className="f-input" placeholder="Tell me about your goals..." required></textarea>
            </div>
            <button type="submit" className="f-submit" disabled={isSubmitting}>{formStatus}</button>
          </form>

          <div className="xovo-socials-wrap sr">
            <span className="xovo-socials-title">Follow XOVO</span>
            <div className="xovo-socials-list">
              <a
                href="https://www.instagram.com/xovo.in/"
                target="_blank"
                rel="noreferrer"
                className="xovo-social-btn"
                aria-label="XOVO Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/in/xovo-india-554794388/"
                target="_blank"
                rel="noreferrer"
                className="xovo-social-btn"
                aria-label="XOVO LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="p5-foot sr">
          <div className="p5-foot-copy">© 2026 XOVO India. All rights reserved.</div>
        </div>
      </div>
    </section>
  );
}
