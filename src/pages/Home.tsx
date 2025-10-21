import { lazy, Suspense, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionDivider } from '../components/SectionDivider';
import { useLenis } from '../App';

// Lazy load sections below the fold for better initial page load
const Stats = lazy(() => import('../components/Stats').then(m => ({ default: m.Stats })));
const About = lazy(() => import('../components/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('../components/Services').then(m => ({ default: m.Services })));
const Process = lazy(() => import('../components/Process').then(m => ({ default: m.Process })));
const Portfolio = lazy(() => import('../components/Portfolio').then(m => ({ default: m.Portfolio })));
const Testimonials = lazy(() => import('../components/Testimonials').then(m => ({ default: m.Testimonials })));
const CTA = lazy(() => import('../components/CTA').then(m => ({ default: m.CTA })));
const Contact = lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })));

// Lightweight loading placeholder
const SectionLoader = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-slate-200 dark:border-slate-700 border-t-slate-400 dark:border-t-slate-500 rounded-full animate-spin" />
  </div>
));

export const Home = memo(() => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Check if there's a scrollTo target in navigation state
    const state = location.state as { scrollTo?: string } | null;
    
    if (state?.scrollTo) {
      // Wait for components to load and render
      const timer = setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          const offset = 80; // Navigation height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          if (lenis) {
            lenis.scrollTo(offsetPosition, { 
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 600); // Wait for lazy-loaded components

      return () => clearTimeout(timer);
    }
  }, [location, lenis]);

  return (
    <>
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <Stats />
      </Suspense>

      <SectionDivider variant="wave" />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <SectionDivider variant="gradient" />
      
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>

      <SectionDivider variant="curve" />
      
      <Suspense fallback={<SectionLoader />}>
        <Process />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>

      <SectionDivider variant="wave" flip />
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>

      <SectionDivider variant="gradient" />
      
      <Suspense fallback={<SectionLoader />}>
        <CTA />
      </Suspense>

      <SectionDivider variant="curve" flip />
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
});
