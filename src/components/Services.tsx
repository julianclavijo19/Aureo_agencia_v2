import React, { memo, useRef, useCallback, useMemo } from 'react';
import { Megaphone, Palette, BarChart3, Video, Globe, MessageCircle } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description: 'Estrategias integrales para aumentar tu presencia digital y alcanzar a tu audiencia objetivo en todos los canales.',
    gradient: 'from-blue-500 to-cyan-500',
    slug: 'marketing-digital',
  },
  {
    icon: Palette,
    title: 'Branding & Diseño',
    description: 'Creamos identidades visuales únicas que capturan la esencia de tu marca y conectan emocionalmente con tu audiencia.',
    gradient: 'from-purple-500 to-pink-500',
    slug: 'branding-diseno',
  },
  {
    icon: BarChart3,
    title: 'Analytics & SEO',
    description: 'Optimizamos tu visibilidad en buscadores y analizamos datos para tomar decisiones estratégicas informadas.',
    gradient: 'from-green-500 to-teal-500',
    slug: 'analytics-seo',
  },
  {
    icon: Video,
    title: 'Contenido Audiovisual',
    description: 'Producción de contenido visual de alta calidad que cuenta historias impactantes y genera engagement.',
    gradient: 'from-orange-500 to-red-500',
    slug: 'contenido-audiovisual',
  },
  {
    icon: Globe,
    title: 'Social Media',
    description: 'Gestión completa de redes sociales con contenido creativo que construye comunidades activas y leales.',
    gradient: 'from-indigo-500 to-purple-500',
    slug: 'social-media',
  },
  {
    icon: MessageCircle,
    title: 'Consultoría',
    description: 'Asesoramiento estratégico personalizado para llevar tu negocio al siguiente nivel con planes de acción concretos.',
    gradient: 'from-pink-500 to-rose-500',
    slug: 'consultoria',
  },
];

export const Services = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleServiceClick = useCallback((slug: string) => {
    navigate(`/servicio/${slug}`);
  }, [navigate]);

  // Memoize animations configuration
  const orbAnimation1 = useMemo(() => prefersReducedMotion ? {} : {
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.4, 0.2],
  }, [prefersReducedMotion]);

  const orbAnimation2 = useMemo(() => prefersReducedMotion ? {} : {
    scale: [1, 1.15, 1],
    opacity: [0.2, 0.4, 0.2],
  }, [prefersReducedMotion]);

  return (
    <section id="services" className="relative py-32 overflow-hidden bg-white dark:bg-slate-950" style={{ contain: 'paint' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:from-transparent dark:via-blue-900/10 dark:to-transparent" />
      
      {/* Decorative elements - optimized */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/15 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
            animate={orbAnimation1}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/15 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
            animate={orbAnimation2}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full mb-6 text-sm">
            Lo Que Hacemos
          </span>
          <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
            Servicios que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              impulsan tu marca
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Soluciones completas de marketing diseñadas para llevar tu negocio al siguiente nivel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleServiceClick(service.slug)}
                className="group relative cursor-pointer"
                style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
              >
                {/* Card with glassmorphism effect */}
                <div className="relative h-full p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl shadow-lg dark:shadow-slate-950/50 hover:shadow-2xl dark:hover:shadow-slate-950 transition-all duration-300 border border-white/50 dark:border-slate-800/50 hover:-translate-y-2">
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div
                    className={`relative w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-gray-900 dark:text-white mb-4 relative text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative">
                    {service.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center`}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
