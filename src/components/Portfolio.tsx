import { memo, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Estrategia Digital',
    category: 'Marketing Digital',
    description: 'Campaña integral que incrementó el ROI en un 250%',
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MDU0OTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-blue-500 to-cyan-500',
    slug: 'estrategia-digital',
  },
  {
    title: 'Rediseño de Marca',
    category: 'Branding',
    description: 'Transformación completa de identidad corporativa',
    image: 'https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA2MDg3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-500 to-pink-500',
    slug: 'rediseno-marca',
  },
  {
    title: 'Consultoría Estratégica',
    category: 'Consultoría',
    description: 'Plan de crecimiento para startup tecnológica',
    image: 'https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2MDUyODcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-indigo-500 to-purple-500',
    slug: 'consultoria-estrategica',
  },
];

export const Portfolio = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  const handleProjectClick = useCallback((slug: string) => {
    navigate(`/proyecto/${slug}`);
  }, [navigate]);

  return (
    <section id="portfolio" className="py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full mb-6 text-sm">
            Nuestro Trabajo
          </span>
          <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
            Proyectos que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              transforman negocios
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Casos de éxito que demuestran nuestro compromiso con resultados excepcionales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => handleProjectClick(project.slug)}
              className="group cursor-pointer flex"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col w-full">
                {/* Image */}
                <div className="relative h-80 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Hover icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                  >
                    <ArrowUpRight className="text-gray-900 dark:text-white" size={20} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white dark:bg-slate-900 flex-grow flex flex-col">
                  <p className={`text-sm bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-2`}>
                    {project.category}
                  </p>
                  <h3 className="text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
