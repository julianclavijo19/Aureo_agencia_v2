import { memo, useCallback, useMemo } from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Mail, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import logo from 'figma:asset/c775651f9062a33f1afb86acff7bbb5a2f8abb08.png';

export const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const navigate = useNavigate();

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
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

  const handleNavigate = useCallback((path: string, scrollTo?: string) => {
    navigate(path, { state: scrollTo ? { scrollTo } : undefined });
  }, [navigate]);

  const socialLinks = useMemo(() => [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-700' },
  ], []);

  const links = useMemo(() => [
    { name: 'Inicio', action: () => handleNavigate('/') },
    { name: 'Sobre Nosotros', action: () => scrollToSection('about') },
    { name: 'Servicios', action: () => scrollToSection('services') },
    { name: 'Portafolio', action: () => scrollToSection('portfolio') },
    { name: 'Contacto', action: () => scrollToSection('contact') },
  ], [scrollToSection, handleNavigate]);

  const servicesLinks = useMemo(() => [
    { name: 'Marketing Digital', slug: 'marketing-digital' },
    { name: 'Branding & Diseño', slug: 'branding-diseno' },
    { name: 'Analytics & SEO', slug: 'analytics-seo' },
    { name: 'Contenido Audiovisual', slug: 'contenido-audiovisual' },
    { name: 'Social Media', slug: 'social-media' },
    { name: 'Consultoría', slug: 'consultoria' },
  ], []);

  const projectsLinks = useMemo(() => [
    { name: 'Estrategia Digital', slug: 'estrategia-digital' },
    { name: 'Rediseño de Marca', slug: 'rediseno-marca' },
    { name: 'Consultoría Estratégica', slug: 'consultoria-estrategica' },
  ], []);

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <motion.img 
              src={logo} 
              alt="Aureo" 
              className="h-12 w-auto mb-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigate('/')}
            />
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Agencia de marketing que combina creatividad y estrategia para transformar marcas. Nuevo look, misma esencia.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail size={18} />
              <a href="mailto:aureoagenciadigital@gmail.com" className="hover:text-white transition-colors">
                aureoagenciadigital@gmail.com
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="mb-4 text-white">Síguenos</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all border border-white/10 hover:border-white/20`}
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-white">Navegación</h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-left"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="mb-6 text-white">Servicios</h4>
            <ul className="space-y-3">
              {servicesLinks.map((service, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => handleNavigate(`/servicio/${service.slug}`)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-left text-sm"
                  >
                    {service.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h4 className="mb-6 text-white">Proyectos</h4>
            <ul className="space-y-3">
              {projectsLinks.map((project, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => handleNavigate(`/proyecto/${project.slug}`)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-left text-sm"
                  >
                    {project.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Aureo. Todos los derechos reservados.
            </p>
            
            <div className="flex flex-col items-center md:items-end gap-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span>Hecho con</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.div>
                <span>en la UFPSO</span>
              </div>
              <div className="flex flex-col items-center md:items-end gap-1">
                <span className="text-gray-500">Julian Clavijo</span>
                <span className="text-gray-500 flex items-center gap-1">
                  💻 estudiante de Ingeniería de sistemas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
