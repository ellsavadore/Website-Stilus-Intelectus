import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options?: { y?: number; duration?: number; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { y = 24, duration = 0.8, delay = 0, stagger = 0.1 } = options || {};

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const children = ref.current!.querySelectorAll('[data-reveal]');
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [y, duration, delay, stagger]);

  return ref;
}
