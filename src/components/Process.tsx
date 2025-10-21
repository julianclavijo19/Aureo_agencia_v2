import { memo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Lightbulb, Target, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Descubrimiento',
    description: 'Analizamos tu marca, audiencia y competencia para entender tus necesidades únicas y objetivos de negocio.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: Target,
    title: 'Estrategia',
    description: 'Creamos un plan personalizado basado en datos, tendencias del mercado y las mejores prácticas de la industria.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Ejecución',
    description: 'Implementamos soluciones creativas con tecnología de vanguardia, asegurando calidad en cada detalle.',
    color: 'from-orange-500 to-red-500',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimización',
    description: 'Monitoreamos resultados continuamente y optimizamos estrategias para maximizar el ROI y crecimiento.',
    color: 'from-green-500 to-teal-500',
  },
];

export const Process = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="process" className="relative py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <svg className="absolute left-0 top-0 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(99, 102, 241)', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          <path d="M0,0 L100,0 L100,50 Q75,60 50,50 T0,50 Z" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full mb-6 text-sm">
            Nuestro Proceso
          </span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl mb-6">
            De la idea a la{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              realidad
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Un enfoque metódico y probado que garantiza resultados excepcionales en cada proyecto
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-slate-950/50 hover:shadow-2xl dark:hover:shadow-slate-950 transition-all duration-300 border border-gray-100 dark:border-slate-800 h-full">
                    {/* Number badge */}
                    <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-lg font-display">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 mt-6 shadow-lg`}>
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3 className="text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative corner */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${step.color} opacity-5 rounded-2xl`} />
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-full border-2 border-purple-300 dark:border-purple-700 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
