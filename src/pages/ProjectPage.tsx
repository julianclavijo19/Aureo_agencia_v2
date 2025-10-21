import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowLeft, TrendingUp, Users, DollarSign, Target, Zap, Award, BarChart3, LineChart as LineChartIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLenis } from '../App';

const projectsData: Record<string, any> = {
  'estrategia-digital': {
    title: 'Estrategia Digital para TechStart',
    category: 'Marketing Digital',
    client: 'TechStart Inc.',
    duration: '6 meses',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=1200',
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
    description: 'Transformación digital completa para startup tecnológica que resultó en un incremento del 250% en ROI y duplicación de la base de clientes en solo 6 meses.',
    challenge: 'TechStart necesitaba establecer una presencia digital sólida desde cero, con recursos limitados y un mercado altamente competitivo. El desafío era generar tracción rápida mientras se construía una marca sostenible.',
    solution: 'Desarrollamos una estrategia digital integral que combinó SEO, content marketing, social media y paid advertising. Implementamos un sistema de tracking avanzado y optimización continua basada en datos.',
    impact: 'La campaña no solo superó las expectativas de ROI, sino que posicionó a TechStart como líder de opinión en su industria, generando cobertura en medios especializados y atrayendo inversión adicional.',
    results: [
      { metric: '250%', label: 'Aumento en ROI', icon: DollarSign, color: 'from-green-400 to-emerald-400' },
      { metric: '180%', label: 'Crecimiento en leads', icon: TrendingUp, color: 'from-blue-400 to-cyan-400' },
      { metric: '95%', label: 'Tasa de conversión', icon: Target, color: 'from-purple-400 to-pink-400' },
      { metric: '500+', label: 'Nuevos clientes', icon: Users, color: 'from-orange-400 to-red-400' },
    ],
    monthlyData: [
      { month: 'Ene', visits: 1200, leads: 45, conversions: 12 },
      { month: 'Feb', visits: 1800, leads: 68, conversions: 18 },
      { month: 'Mar', visits: 2400, leads: 95, conversions: 28 },
      { month: 'Abr', visits: 3200, leads: 128, conversions: 42 },
      { month: 'May', visits: 4100, leads: 165, conversions: 58 },
      { month: 'Jun', visits: 5200, leads: 210, conversions: 76 },
    ],
    growthData: [
      { metric: 'Tráfico Web', value: 320 },
      { metric: 'Engagement', value: 285 },
      { metric: 'Conversiones', value: 250 },
      { metric: 'ROI', value: 410 },
    ],
    channelData: [
      { name: 'SEO', value: 35, color: '#60a5fa' },
      { name: 'Social Media', value: 28, color: '#a78bfa' },
      { name: 'Paid Ads', value: 22, color: '#f472b6' },
      { name: 'Email', value: 15, color: '#34d399' },
    ],
  },
  'rediseno-marca': {
    title: 'Rediseño de Marca para Fashion Co',
    category: 'Branding',
    client: 'Fashion Co.',
    duration: '4 meses',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1510832758362-af875829efcf?w=1200',
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
    description: 'Transformación completa de identidad corporativa que modernizó la marca y aumentó el reconocimiento en un 300%, conectando con una audiencia más joven.',
    challenge: 'Fashion Co. tenía una imagen anticuada que no resonaba con su target millennial y Gen Z. Necesitaban una renovación completa manteniendo su legado de calidad.',
    solution: 'Creamos una nueva identidad visual moderna pero sofisticada, con un sistema de diseño flexible que funciona en todos los canales. Desarrollamos guías completas de marca y materiales de aplicación.',
    impact: 'El rebrand transformó completamente la percepción de la marca, atrayendo una nueva generación de clientes mientras mantenía la lealtad de los existentes, resultando en un crecimiento del 150% en ventas online.',
    results: [
      { metric: '300%', label: 'Reconocimiento de marca', icon: Award, color: 'from-yellow-400 to-orange-400' },
      { metric: '180%', label: 'Engagement social', icon: Users, color: 'from-pink-400 to-rose-400' },
      { metric: '150%', label: 'Ventas online', icon: DollarSign, color: 'from-green-400 to-emerald-400' },
      { metric: '92%', label: 'Satisfacción cliente', icon: Target, color: 'from-purple-400 to-indigo-400' },
    ],
    monthlyData: [
      { month: 'Ene', brandAwareness: 32, engagement: 45, sales: 100 },
      { month: 'Feb', brandAwareness: 48, engagement: 62, sales: 125 },
      { month: 'Mar', brandAwareness: 65, engagement: 88, sales: 158 },
      { month: 'Abr', brandAwareness: 82, engagement: 115, sales: 192 },
    ],
    growthData: [
      { metric: 'Reconocimiento', value: 300 },
      { metric: 'Engagement', value: 255 },
      { metric: 'Ventas', value: 192 },
      { metric: 'NPS Score', value: 185 },
    ],
    channelData: [
      { name: 'Instagram', value: 40, color: '#f472b6' },
      { name: 'Website', value: 30, color: '#a78bfa' },
      { name: 'Retail', value: 20, color: '#60a5fa' },
      { name: 'Email', value: 10, color: '#34d399' },
    ],
  },
  'consultoria-estrategica': {
    title: 'Consultoría Estratégica para GrowUp',
    category: 'Consultoría',
    client: 'GrowUp Ventures',
    duration: '8 meses',
    year: '2023-2024',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
    gradient: 'from-indigo-400 via-violet-400 to-purple-400',
    description: 'Plan de crecimiento integral para startup que resultó en levantamiento de Serie A y escalamiento exitoso del equipo y operaciones.',
    challenge: 'GrowUp tenía tracción inicial pero necesitaba estructura y estrategia para escalar. Enfrentaban desafíos en operaciones, producto y go-to-market.',
    solution: 'Desarrollamos un roadmap estratégico integral, optimizamos procesos operacionales, redefinimos la propuesta de valor y creamos un plan de crecimiento sostenible con métricas claras.',
    impact: 'La consultoría no solo permitió levantar $5M en Serie A, sino que estableció las bases para un crecimiento sostenible, aumentando el revenue en 200% y expandiendo el equipo estratégicamente.',
    results: [
      { metric: '$5M', label: 'Serie A levantada', icon: DollarSign, color: 'from-green-400 to-emerald-400' },
      { metric: '200%', label: 'Crecimiento revenue', icon: TrendingUp, color: 'from-blue-400 to-cyan-400' },
      { metric: '3x', label: 'Expansión de equipo', icon: Users, color: 'from-purple-400 to-pink-400' },
      { metric: '100%', label: 'Objetivos cumplidos', icon: Target, color: 'from-orange-400 to-red-400' },
    ],
    monthlyData: [
      { month: 'Q1', revenue: 50, team: 12, efficiency: 65 },
      { month: 'Q2', revenue: 85, team: 18, efficiency: 78 },
      { month: 'Q3', revenue: 120, team: 28, efficiency: 85 },
      { month: 'Q4', revenue: 150, team: 36, efficiency: 92 },
    ],
    growthData: [
      { metric: 'Revenue', value: 200 },
      { metric: 'Eficiencia', value: 180 },
      { metric: 'Team Size', value: 300 },
      { metric: 'Producto', value: 220 },
    ],
    channelData: [
      { name: 'Enterprise', value: 45, color: '#60a5fa' },
      { name: 'SMB', value: 35, color: '#a78bfa' },
      { name: 'Partners', value: 15, color: '#f472b6' },
      { name: 'Direct', value: 5, color: '#34d399' },
    ],
  },
};

export const ProjectPage = memo(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = slug ? projectsData[slug] : null;
  const [activeChart, setActiveChart] = useState(0);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [animatedData, setAnimatedData] = useState<any[]>([]);
  const lenis = useLenis();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Animate chart data on mount
  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => {
        setAnimatedData(project.monthlyData);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentChartIndex((prev) => {
        const chartsPerView = getChartsForActiveTab();
        return (prev + 1) % chartsPerView.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [activeChart]);

  // Smooth scroll to top on mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const handleBack = useCallback(() => {
    navigate('/', { state: { scrollTo: 'portfolio' } });
  }, [navigate]);

  const handleContact = useCallback(() => {
    navigate('/', { state: { scrollTo: 'contact' } });
  }, [navigate]);

  const nextChart = useCallback(() => {
    const chartsPerView = getChartsForActiveTab();
    setCurrentChartIndex((prev) => (prev + 1) % chartsPerView.length);
  }, [activeChart]);

  const prevChart = useCallback(() => {
    const chartsPerView = getChartsForActiveTab();
    setCurrentChartIndex((prev) => (prev - 1 + chartsPerView.length) % chartsPerView.length);
  }, [activeChart]);

  const getChartsForActiveTab = () => {
    if (!project) return [];
    
    if (activeChart === 0) {
      return [
        { type: 'area', title: 'Evolución temporal' },
        { type: 'line', title: 'Comparativa' },
      ];
    } else if (activeChart === 1) {
      return [
        { type: 'bar', title: 'Crecimiento por métrica (%)' },
      ];
    } else {
      return [
        { type: 'pie', title: 'Distribución por canal (%)' },
      ];
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-gray-900 dark:text-white mb-4">Proyecto no encontrado</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Volver a proyectos
          </button>
        </motion.div>
      </div>
    );
  }

  const charts = getChartsForActiveTab();
  const currentChart = charts[currentChartIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Animated Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        {/* Gradient background with reduced saturation */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
          style={{ opacity: heroOpacity }}
        >
          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)
              `
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />

          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 80, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -60, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            onClick={handleBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-12 transition-colors group"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: -360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
            >
              <ArrowLeft size={20} />
            </motion.div>
            <span className="text-lg">Volver a proyectos</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: heroY }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm">
                  {project.category}
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm">
                  {project.year}
                </span>
              </motion.div>

              <h1 className="text-white mb-8 text-4xl md:text-5xl lg:text-6xl leading-tight">
                {project.title}
              </h1>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
                >
                  <p className="text-white/70 text-sm mb-1">Cliente</p>
                  <p className="text-white">{project.client}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
                >
                  <p className="text-white/70 text-sm mb-1">Duración</p>
                  <p className="text-white">{project.duration}</p>
                </motion.div>
              </div>

              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={handleContact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-white/20 transition-all"
                >
                  Iniciar proyecto similar
                </motion.button>

                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
                >
                  Ver más proyectos
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
              Resultados{' '}
              <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                medibles
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
              Impacto cuantificable en métricas clave del negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result: any, index: number) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-10 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`} />
                  
                  <div className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className={`w-14 h-14 bg-gradient-to-br ${result.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="text-white" size={24} />
                    </motion.div>
                    
                    <motion.div
                      className={`text-5xl md:text-6xl bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-3`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {result.metric}
                    </motion.div>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {result.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32">
                <h2 className="text-gray-900 dark:text-white mb-8 text-3xl md:text-4xl">
                  Sobre el{' '}
                  <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    proyecto
                  </span>
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 text-xl">Desafío</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 text-xl">Solución</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 text-xl">Impacto</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Charts Section with Carousel */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
              Análisis detallado de{' '}
              <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                resultados
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
              Datos reales que demuestran el impacto de nuestro trabajo
            </p>
          </motion.div>

          {/* Chart Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Crecimiento Mensual', 'Métricas de Éxito', 'Distribución por Canal'].map((label, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveChart(index);
                  setCurrentChartIndex(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl transition-all ${
                  activeChart === index
                    ? `bg-gradient-to-r ${project.gradient} text-white shadow-lg`
                    : 'bg-slate-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeChart}-${currentChartIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Area Chart */}
                {currentChart?.type === 'area' && (
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <LineChartIcon className="text-white" size={20} />
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl">{currentChart.title}</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={animatedData}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            backdropFilter: 'blur(10px)'
                          }}
                          labelStyle={{ color: '#fff', marginBottom: '8px' }}
                          itemStyle={{ color: '#cbd5e1' }}
                        />
                        <Area
                          type="monotone"
                          dataKey={Object.keys(project.monthlyData[0] || {})[1]}
                          stroke="#818cf8"
                          strokeWidth={3}
                          fill="url(#colorGradient)"
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Line Chart */}
                {currentChart?.type === 'line' && (
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
                        <TrendingUp className="text-white" size={20} />
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl">{currentChart.title}</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={animatedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey={Object.keys(project.monthlyData[0] || {})[2] || 'value'}
                          stroke="#f472b6"
                          strokeWidth={3}
                          dot={{ fill: '#f472b6', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 8 }}
                          animationDuration={2000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Bar Chart */}
                {currentChart?.type === 'bar' && (
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <BarChart3 className="text-white" size={20} />
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl">{currentChart.title}</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={project.growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="metric" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px'
                          }}
                        />
                        <Bar
                          dataKey="value"
                          radius={[12, 12, 0, 0]}
                          animationDuration={2000}
                        >
                          {project.growthData.map((_: any, index: number) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#gradient-${index})`}
                            />
                          ))}
                        </Bar>
                        <defs>
                          {project.growthData.map((_: any, index: number) => (
                            <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                          ))}
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Pie Chart */}
                {currentChart?.type === 'pie' && (
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                        <Target className="text-white" size={20} />
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl">{currentChart.title}</h3>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={project.channelData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={2000}
                          >
                            {project.channelData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.9)',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Legend */}
                      <div className="flex flex-col gap-3">
                        {project.channelData.map((channel: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: channel.color }}
                            />
                            <span className="text-gray-900 dark:text-white">{channel.name}</span>
                            <span className="text-gray-600 dark:text-gray-400 ml-auto">{channel.value}%</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation - Only show if multiple charts */}
            {charts.length > 1 && (
              <>
                <motion.button
                  onClick={prevChart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-10"
                >
                  <ChevronLeft className="text-gray-900 dark:text-white" size={24} />
                </motion.button>

                <motion.button
                  onClick={nextChart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-10"
                >
                  <ChevronRight className="text-gray-900 dark:text-white" size={24} />
                </motion.button>
              </>
            )}
          </div>

          {/* Carousel Dots Indicator */}
          {charts.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {charts.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentChartIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentChartIndex === index
                      ? `bg-gradient-to-r ${project.gradient} w-8`
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '48px 48px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl items-center justify-center mb-8 shadow-2xl"
            >
              <Zap className="text-white" size={40} />
            </motion.div>

            <h2 className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl">
              ¿Listo para resultados similares?
            </h2>
            
            <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Hablemos sobre cómo podemos transformar tu negocio con estrategias probadas
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={handleContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-white/30 transition-all relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative group-hover:text-white transition-colors flex items-center gap-2 text-lg">
                  Iniciar proyecto
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all text-lg"
              >
                Ver más proyectos
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
});
