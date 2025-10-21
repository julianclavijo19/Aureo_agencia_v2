import { memo, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'María González',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    content: 'Aureo transformó completamente nuestra presencia digital. Su enfoque estratégico y creatividad nos ayudaron a aumentar nuestras ventas en un 300% en solo 6 meses.',
    rating: 5,
  },
  {
    name: 'Carlos Méndez',
    role: 'Director de Marketing, Fashion Co',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    content: 'El equipo de Aureo es excepcional. No solo entendieron nuestra visión, sino que la llevaron más allá de lo que imaginábamos. Altamente recomendados.',
    rating: 5,
  },
  {
    name: 'Ana Rodríguez',
    role: 'Fundadora, EcoLife',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    content: 'Profesionalismo, creatividad y resultados. Aureo nos ayudó a construir una marca sólida que resuena con nuestra audiencia y genera confianza.',
    rating: 5,
  },
];

export const Testimonials = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section className="relative py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 text-pink-600 dark:text-pink-400 rounded-full mb-6 text-sm">
            Testimonios
          </span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl mb-6">
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            La confianza y satisfacción de nuestros clientes es nuestro mayor logro
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main testimonial card */}
            <div className="relative p-12 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800">
              {/* Quote icon */}
              <div className="absolute -top-6 left-12 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg rotate-6">
                <Quote className="text-white" size={32} />
              </div>

              {/* Content */}
              <div className="mt-8 mb-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-pink-100 dark:ring-pink-900/30">
                    <ImageWithFallback
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <motion.button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-gradient-to-r from-pink-500 to-rose-500'
                          : 'w-2 bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-rose-400/20 dark:from-pink-600/20 dark:to-rose-600/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
});
