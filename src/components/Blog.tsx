import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const posts = [
  {
    title: 'El futuro del marketing digital en 2025',
    excerpt: 'Descubre las tendencias que están revolucionando la industria y cómo prepararte para el futuro.',
    image: 'https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?w=800',
    date: '15 Octubre, 2025',
    readTime: '5 min',
    category: 'Tendencias',
  },
  {
    title: 'Cómo crear una identidad de marca memorable',
    excerpt: 'Los elementos clave que hacen que una marca sea inolvidable y genere conexión emocional.',
    image: 'https://images.unsplash.com/photo-1759884247134-89b8fc25f726?w=800',
    date: '12 Octubre, 2025',
    readTime: '7 min',
    category: 'Branding',
  },
  {
    title: 'Estrategias de SEO que realmente funcionan',
    excerpt: 'Técnicas probadas para mejorar tu posicionamiento orgánico y aumentar tu visibilidad online.',
    image: 'https://images.unsplash.com/photo-1598201116904-9613ee826e9a?w=800',
    date: '8 Octubre, 2025',
    readTime: '6 min',
    category: 'SEO',
  },
];

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full mb-6 text-sm">
            Blog & Recursos
          </span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl mb-6">
            Insights y{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              conocimiento
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Mantente actualizado con las últimas tendencias, tips y estrategias de marketing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-lg dark:shadow-slate-950/50 hover:shadow-2xl dark:hover:shadow-slate-950 transition-all duration-300 border border-gray-100 dark:border-slate-800 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
                    whileHover={{ x: 5 }}
                  >
                    <span>Leer más</span>
                    <ArrowRight size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver todos los artículos
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
