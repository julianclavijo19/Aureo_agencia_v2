import { useEffect, useState, createContext, useContext, lazy, Suspense, memo, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ServicePage = lazy(() => import('./pages/ServicePage').then(module => ({ default: module.ServicePage })));
const ProjectPage = lazy(() => import('./pages/ProjectPage').then(module => ({ default: module.ProjectPage })));

const LenisContext = createContext<Lenis | null>(null);

// Export context hook for use in child components
export const useLenis = () => useContext(LenisContext);

// Loading fallback component
const PageLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
      <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
    </div>
  </div>
));

const ScrollToTop = memo(() => {
  const { pathname, state } = useLocation();
  const lenis = useContext(LenisContext);

  useEffect(() => {
    // Don't scroll to top if there's a scrollTo target in state
    if (state && (state as any).scrollTo) {
      return;
    }

    // Use setTimeout to ensure Lenis is ready
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { 
          immediate: true,
          force: true,
          lock: true 
        });
      }
      // Fallback to native scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' } as ScrollToOptions);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, state, lenis]);

  return null;
});

const LenisWrapper = memo(({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize Lenis with optimized settings
    const lenisInstance = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    setLenis(lenisInstance);

    // Optimized animation loop with RAF
    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
});

export default function App() {
  return (
    <BrowserRouter>
      <LenisWrapper>
        <ScrollToTop />
        <div className="min-h-screen bg-white dark:bg-slate-950">
          <Navigation />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicio/:slug" element={<ServicePage />} />
              <Route path="/proyecto/:slug" element={<ProjectPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          <Footer />
          <Toaster />
        </div>
      </LenisWrapper>
    </BrowserRouter>
  );
}
