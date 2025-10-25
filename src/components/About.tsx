import { memo, useRef, useMemo } from 'react';
import { Sparkles, Target, Users, TrendingUp } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import sloganImg from 'figma:asset/09598a89c19f8163269f1b19c45abbf0f0a48602.png';

export const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const values = useMemo(() => [
    {
      icon: Sparkles,
      title: 'Innovación',
      description: 'Adoptamos las últimas tendencias y tecnologías para mantener tu marca siempre relevante y competitiva en el mercado digital.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Estrategia',
      description: 'Cada acción está respaldada por datos y análisis profundos para asegurar el máximo impacto y ROI en tus campañas.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajamos codo a codo contigo para entender tu visión y convertirla en realidad con soluciones personalizadas.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Resultados',
      description: 'Nos enfocamos en generar resultados medibles y sostenibles que impulsen el crecimiento de tu negocio.',
      color: 'from-pink-500 to-rose-500'
    },
  ], []);

  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden" style={{ contain: 'paint' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full mb-6 text-sm">
                Quiénes Somos
              </span>
              <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
                Transformamos marcas en{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  experiencias memorables
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                En Aureo, somos una agencia de marketing que combina creatividad y estrategia para transformar marcas. Nuestro enfoque minimalista y moderno refleja la esencia de cada proyecto que tocamos.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Creemos en la evolución constante, manteniendo siempre nuestra esencia: crear experiencias memorables que conectan con las personas y generan resultados reales.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={sloganImg} 
                alt="Somos au" 
                className="w-full h-auto"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent" />
            </div>
            
            {/* Decorative elements - optimized */}
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-50"
                  style={{ willChange: 'transform' }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-2xl opacity-50"
                  style={{ willChange: 'transform' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                className="group relative p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-slate-950/50 hover:shadow-2xl dark:hover:shadow-slate-950 transition-all duration-300 border border-gray-100 dark:border-slate-800 hover:-translate-y-2"
                style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className={`relative w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-3 relative text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
