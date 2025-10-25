import { memo, useCallback, useMemo } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import logo from 'figma:asset/c30b11fbcf925ad453cd5748a695af7b59adbc19.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Optimized animation variants - reduced motion for better performance
const getOrbAnimationVariants = (prefersReducedMotion: boolean) => ({
  blue: prefersReducedMotion ? {} : {
    scale: [1, 1.1, 1],
    x: [0, 50, 0],
    y: [0, 25, 0],
  },
  indigo: prefersReducedMotion ? {} : {
    scale: [1, 1.15, 1],
    x: [0, -50, 0],
    y: [0, -25, 0],
  }
});

const getLogoGlowVariants = (prefersReducedMotion: boolean) => 
  prefersReducedMotion ? {} : { scale: [1, 1.1, 1] };

const getLogoFloatVariants = (prefersReducedMotion: boolean) => 
  prefersReducedMotion ? {} : { y: [0, -6, 0] };

export const Hero = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants
  const orbVariants = useMemo(() => getOrbAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);
  const logoGlow = useMemo(() => getLogoGlowVariants(prefersReducedMotion), [prefersReducedMotion]);
  const logoFloat = useMemo(() => getLogoFloatVariants(prefersReducedMotion), [prefersReducedMotion]);
  
  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToPortfolio = useCallback(() => {
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      style={{ contain: 'paint' }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjA2MDkwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/90 to-indigo-950/90" />
      </div>

      {/* Animated gradient orbs - optimized with will-change */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            animate={orbVariants.blue}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            animate={orbVariants.indigo}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-50"
                style={{ willChange: 'transform' }}
                animate={logoGlow}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
              />
            )}
            <motion.img 
              src={logo} 
              alt="Aureo" 
              className="relative h-20 md:h-28 w-auto"
              style={!prefersReducedMotion ? { willChange: 'transform' } : undefined}
              animate={logoFloat}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Agencia líder en marketing digital
            </span>
          </motion.div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl mx-auto font-[Inter] text-[64px]">
            Transformamos marcas en{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                experiencias
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-blue-100 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Estrategia clara, marcas que crecen.<br />
          Creamos marcas con ADN, contenido con intención, expansión y ventas
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            onClick={scrollToContact}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full overflow-hidden shadow-lg shadow-blue-500/30"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Empieza tu proyecto
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={scrollToPortfolio}
            className="group px-6 py-3 border-2 border-white/20 text-white rounded-full hover:bg-white/5 backdrop-blur-sm transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play size={16} className="ml-0.5" />
            </div>
            Ver proyectos
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-blue-200"
          >
            <span className="text-sm">Descubre más</span>
            <div className="w-6 h-10 border-2 border-blue-300/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-blue-300 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
