import { memo, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, TrendingUp, Search, Target, Users, Camera, MessageCircle, BarChart3, Palette, Zap, Star, Award, Globe, Code, Layers, PenTool, Eye, Link, Lightbulb, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLenis } from '../App';

const servicesData: Record<string, any> = {
  'marketing-digital': {
    title: 'Marketing Digital',
    subtitle: 'Estrategias integrales para el mundo digital',
    description: 'Potencia tu presencia online con estrategias de marketing digital personalizadas que generan resultados medibles y sostenibles.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
  },
  'branding-diseno': {
    title: 'Branding & Diseño',
    subtitle: 'Identidades visuales que conectan',
    description: 'Creamos identidades de marca únicas y memorables que capturan la esencia de tu negocio y generan conexiones emocionales con tu audiencia.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
  },
  'analytics-seo': {
    title: 'Analytics & SEO',
    subtitle: 'Datos que impulsan decisiones',
    description: 'Optimiza tu visibilidad en buscadores y toma decisiones informadas basadas en análisis profundo de datos y comportamiento de usuarios.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
  },
  'contenido-audiovisual': {
    title: 'Contenido Audiovisual',
    subtitle: 'Historias que inspiran',
    description: 'Producción de contenido visual de alta calidad que cuenta historias impactantes, genera engagement y conecta con tu audiencia.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
  },
  'social-media': {
    title: 'Social Media',
    subtitle: 'Comunidades que crecen',
    description: 'Gestión completa de redes sociales con contenido creativo que construye comunidades activas, leales y comprometidas con tu marca.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200',
    gradient: 'from-teal-400 via-green-400 to-emerald-400',
  },
  'consultoria': {
    title: 'Consultoría',
    subtitle: 'Estrategia que transforma',
    description: 'Asesoramiento estratégico personalizado para llevar tu negocio al siguiente nivel con planes de acción concretos y medibles.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
    gradient: 'from-indigo-400 via-violet-400 to-purple-400',
  },
};

// Marketing Digital Content
const MarketingDigitalContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* Grid asimétrico con herramientas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Stack de <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>herramientas</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Utilizamos las mejores plataformas para maximizar tu ROI
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: BarChart3, title: 'Google Analytics 4', desc: 'Análisis avanzado de comportamiento', color: 'orange' },
          { icon: Target, title: 'Google Ads', desc: 'Campañas PPC optimizadas', color: 'green' },
          { icon: Users, title: 'Meta Business', desc: 'Publicidad en Facebook e Instagram', color: 'blue' },
          { icon: Search, title: 'SEMrush', desc: 'SEO y análisis competitivo', color: 'purple' },
          { icon: Zap, title: 'HubSpot', desc: 'Marketing automation', color: 'yellow' },
          { icon: MessageCircle, title: 'Mailchimp', desc: 'Email marketing efectivo', color: 'cyan' },
        ].map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 bg-${tool.color}-100 dark:bg-${tool.color}-500/10 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`text-${tool.color}-600 dark:text-${tool.color}-400`} size={24} />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">{tool.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Proceso simple sin animaciones 360 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20 rounded-3xl p-12"
      >
        <h3 className="text-gray-900 dark:text-white text-3xl mb-12 text-center">Nuestro proceso</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { title: 'Auditoría', desc: 'Análisis completo de tu presencia actual', icon: Search },
            { title: 'Estrategia', desc: 'Plan personalizado con objetivos claros', icon: Target },
            { title: 'Implementación', desc: 'Ejecución de campañas optimizadas', icon: Zap },
            { title: 'Optimización', desc: 'Mejora continua basada en datos', icon: TrendingUp },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h4 className="text-gray-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </div>
));

// Branding & Diseño Content
const BrandingContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Elementos de <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>identidad</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Cada elemento diseñado para comunicar tu esencia
        </p>
      </motion.div>

      {/* Layout tipo magazine */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Bloque grande */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:row-span-2 bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-800"
        >
          <Palette className={`text-purple-500 mb-6`} size={48} />
          <h3 className="text-gray-900 dark:text-white text-3xl mb-4">Identidad Visual</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Diseñamos logotipos, paletas de colores y tipografías que capturan la personalidad única de tu marca.
          </p>
          <ul className="space-y-3">
            {['Logotipo principal', 'Versiones alternativas', 'Paleta de colores', 'Tipografía corporativa'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Check className="text-purple-500 flex-shrink-0" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bloques pequeños */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-lg"
        >
          <PenTool className="text-pink-600 dark:text-pink-400 mb-4" size={32} />
          <h4 className="text-gray-900 dark:text-white text-xl mb-2">Manual de Marca</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Guías completas para mantener consistencia en todas las aplicaciones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/20 dark:to-orange-900/20 rounded-3xl p-8 shadow-lg"
        >
          <Layers className="text-orange-600 dark:text-orange-400 mb-4" size={32} />
          <h4 className="text-gray-900 dark:text-white text-xl mb-2">Aplicaciones</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Papelería, packaging, merchandising y más.
          </p>
        </motion.div>
      </div>

      {/* Psicología del color */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-800"
      >
        <h3 className="text-gray-900 dark:text-white text-2xl mb-8 text-center">Psicología del Color</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Confianza', colors: ['#3B82F6', '#2563EB', '#1D4ED8'], emotion: 'Profesional y seguro' },
            { name: 'Energía', colors: ['#EF4444', '#F97316', '#FBBF24'], emotion: 'Acción y pasión' },
            { name: 'Naturaleza', colors: ['#10B981', '#059669', '#047857'], emotion: 'Sostenible y fresco' },
          ].map((palette, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="flex gap-2 justify-center mb-4">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-xl shadow-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <h4 className="text-gray-900 dark:text-white mb-2">{palette.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{palette.emotion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
));

// Analytics & SEO Content
const AnalyticsContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-slate-50 dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Métricas que <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>importan</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Dashboard completo de tu rendimiento digital
        </p>
      </motion.div>

      {/* Dashboard style */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { metric: '+250%', label: 'Tráfico Orgánico', icon: TrendingUp, color: 'green' },
          { metric: 'Top 3', label: 'Keywords Ranking', icon: Target, color: 'blue' },
          { metric: '65+', label: 'Domain Authority', icon: Award, color: 'purple' },
          { metric: '8.5%', label: 'Conversion Rate', icon: Zap, color: 'yellow' },
          { metric: '95+', label: 'Page Speed Score', icon: Star, color: 'orange' },
          { metric: '500+', label: 'Quality Backlinks', icon: Link, color: 'cyan' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} size={24} />
                <div className={`text-3xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {stat.metric}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* SEO Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-800"
      >
        <h3 className="text-gray-900 dark:text-white text-3xl mb-10 text-center">Estrategia SEO Integral</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Search className="text-blue-500" size={24} />
              SEO On-Page
            </h4>
            <ul className="space-y-3">
              {['Optimización de contenido', 'Meta tags estratégicos', 'Estructura de URLs', 'Internal linking'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="text-indigo-500" size={24} />
              SEO Off-Page
            </h4>
            <ul className="space-y-3">
              {['Link building de calidad', 'Guest posting', 'PR digital', 'Menciones de marca'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="text-indigo-500 flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
));

// Contenido Audiovisual Content
const AudiovisualContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Formatos de <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>contenido</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Del concepto a la producción final
        </p>
      </motion.div>

      {/* Galería visual */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {[
          { type: 'Video Corporativo', duration: '2-5 min', icon: Camera, desc: 'Presentación profesional de tu empresa' },
          { type: 'Reels & TikTok', duration: '15-60 seg', icon: Zap, desc: 'Contenido viral para redes sociales' },
          { type: 'Product Video', duration: '30-90 seg', icon: Star, desc: 'Showcases de producto atractivos' },
          { type: 'Testimoniales', duration: '1-3 min', icon: Users, desc: 'Casos de éxito de clientes reales' },
          { type: 'Motion Graphics', duration: 'Variable', icon: Eye, desc: 'Animaciones explicativas' },
          { type: 'Fotografía Pro', duration: 'Sessions', icon: Camera, desc: 'Sesiones fotográficas profesionales' },
        ].map((format, idx) => {
          const Icon = format.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">{format.type}</h3>
              <p className={`text-sm bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
                {format.duration}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{format.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Proceso de producción */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-3xl p-12"
      >
        <h3 className="text-gray-900 dark:text-white text-3xl mb-10 text-center">Proceso de Producción</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Briefing', desc: 'Definimos objetivos y visión creativa' },
            { step: '02', title: 'Pre-producción', desc: 'Planificación y desarrollo de guión' },
            { step: '03', title: 'Producción', desc: 'Grabación y captura profesional' },
            { step: '04', title: 'Post-producción', desc: 'Edición, color grading y entrega' },
          ].map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative"
            >
              <div className={`text-6xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4 opacity-30`}>
                {phase.step}
              </div>
              <h4 className="text-gray-900 dark:text-white mb-2">{phase.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
));

// Social Media Content
const SocialMediaContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Plataformas que <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>dominamos</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Presencia estratégica en las redes que importan
        </p>
      </motion.div>

      {/* Timeline/Feed style */}
      <div className="space-y-6 mb-16">
        {[
          { platform: 'Instagram', users: '1B+ usuarios', icon: Camera, focus: 'Visual storytelling y engagement', color: 'pink' },
          { platform: 'TikTok', users: '1B+ usuarios', icon: Zap, focus: 'Contenido viral y trends', color: 'purple' },
          { platform: 'LinkedIn', users: '900M+ usuarios', icon: Briefcase, focus: 'B2B y networking profesional', color: 'blue' },
          { platform: 'Facebook', users: '2.9B+ usuarios', icon: Users, focus: 'Community building y ads', color: 'indigo' },
          { platform: 'YouTube', users: '2.5B+ usuarios', icon: Eye, focus: 'Video long-form y SEO', color: 'red' },
        ].map((platform, idx) => {
          const Icon = platform.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-800 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 bg-${platform.color}-100 dark:bg-${platform.color}-500/10 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`text-${platform.color}-600 dark:text-${platform.color}-400`} size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-gray-900 dark:text-white text-2xl">{platform.platform}</h3>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{platform.users}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{platform.focus}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Servicios de gestión */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { title: 'Estrategia', desc: 'Plan de contenido personalizado', icon: Target },
          { title: 'Community', desc: 'Gestión de comunidad 24/7', icon: MessageCircle },
          { title: 'Analytics', desc: 'Reporting y optimización', icon: BarChart3 },
        ].map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20 rounded-2xl p-8 text-center"
            >
              <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="text-white" size={24} />
              </div>
              <h4 className="text-gray-900 dark:text-white mb-2">{service.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{service.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </div>
));

// Consultoría Content
const ConsultoriaContent = memo(({ gradient }: { gradient: string }) => (
  <div className="py-32 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
          Frameworks <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>estratégicos</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
          Metodologías probadas para transformar tu negocio
        </p>
      </motion.div>

      {/* Framework cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {[
          { name: 'SWOT Analysis', icon: Target, desc: 'Análisis de fortalezas, debilidades, oportunidades y amenazas' },
          { name: 'OKRs', icon: TrendingUp, desc: 'Objectives & Key Results para alineación de equipos' },
          { name: 'Growth Hacking', icon: Zap, desc: 'Crecimiento exponencial con recursos optimizados' },
          { name: 'Lean Startup', icon: Lightbulb, desc: 'Validación rápida de hipótesis de negocio' },
          { name: 'Blue Ocean', icon: Star, desc: 'Creación de mercados sin competencia directa' },
          { name: 'Jobs To Be Done', icon: Users, desc: 'Entendimiento profundo de necesidades del cliente' },
        ].map((framework, idx) => {
          const Icon = framework.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-800 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-gray-900 dark:text-white text-xl mb-3">{framework.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{framework.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Proceso de consultoría */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-3xl p-12"
      >
        <h3 className="text-gray-900 dark:text-white text-3xl mb-10 text-center">Metodología de Trabajo</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { phase: 'Diagnóstico', items: ['Análisis de situación actual', 'Identificación de oportunidades', 'Benchmark competitivo'], icon: Search },
            { phase: 'Estrategia', items: ['Definición de objetivos SMART', 'Plan de acción detallado', 'KPIs y métricas'], icon: FileText },
            { phase: 'Implementación', items: ['Ejecución guiada', 'Quick wins tempranos', 'Ajustes iterativos'], icon: Zap },
            { phase: 'Seguimiento', items: ['Monitoreo continuo', 'Reporting mensual', 'Optimización constante'], icon: BarChart3 },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-xl">{step.phase}</h4>
                </div>
                <ul className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Check className="text-indigo-500 flex-shrink-0 mt-0.5" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </div>
));

export const ServicePage = memo(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = slug ? servicesData[slug] : null;
  const lenis = useLenis();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const handleBack = useCallback(() => {
    navigate('/', { state: { scrollTo: 'services' } });
  }, [navigate]);

  const handleContact = useCallback(() => {
    navigate('/', { state: { scrollTo: 'contact' } });
  }, [navigate]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-gray-900 dark:text-white mb-4">Servicio no encontrado</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  // Render different content based on service
  const renderContent = () => {
    switch (slug) {
      case 'marketing-digital':
        return <MarketingDigitalContent gradient={service.gradient} />;
      case 'branding-diseno':
        return <BrandingContent gradient={service.gradient} />;
      case 'analytics-seo':
        return <AnalyticsContent gradient={service.gradient} />;
      case 'contenido-audiovisual':
        return <AudiovisualContent gradient={service.gradient} />;
      case 'social-media':
        return <SocialMediaContent gradient={service.gradient} />;
      case 'consultoria':
        return <ConsultoriaContent gradient={service.gradient} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section - Mantenido igual */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
          style={{ opacity: heroOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            onClick={handleBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-12 transition-colors group"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <ArrowLeft size={20} />
            </div>
            <span className="text-lg">Volver</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: heroY }}
            >
              <h1 className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              
              <p className="text-2xl text-white/90 mb-6">
                {service.subtitle}
              </p>
              
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={handleContact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-white/20 transition-all"
                >
                  Solicitar consultoría →
                </motion.button>

                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
                >
                  Ver todos los servicios
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contenido único por servicio */}
      {renderContent()}

      {/* CTA Section - Mantenido igual */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5OTk5OTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTgtMy41ODItOC04LThzLTggMy41ODItOCA4IDMuNTgyIDggOCA4IDgtMy41ODIgOC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6 text-4xl md:text-5xl">
              ¿Listo para <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>empezar?</span>
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
            <motion.button
              onClick={handleContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 bg-gradient-to-r ${service.gradient} text-white rounded-xl shadow-2xl text-lg`}
            >
              Contactar ahora
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
});
