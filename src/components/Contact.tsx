import { memo, useState, useRef, useCallback, useMemo } from 'react';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export const Contact = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Web3Forms API - Replace with client's access key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // Get from https://web3forms.com
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          subject: `Nuevo contacto de ${formData.name} - Aureo`,
          from_name: 'Website Aureo',
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Format phone number to Colombian format: +57 300-000-0000
  const formatPhoneNumber = useCallback((value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Extract only the digits after +57
    let digits = cleaned.replace(/^\+?57/, '');
    
    // Limit to 10 digits
    digits = digits.slice(0, 10);
    
    // Format based on length
    if (digits.length === 0) {
      return '+57 ';
    } else if (digits.length <= 3) {
      return `+57 ${digits}`;
    } else if (digits.length <= 6) {
      return `+57 ${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `+57 ${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format phone number if it's the phone field
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }, [formatPhoneNumber]);

  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: 'aureoagenciadigital@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '320 9392035',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Bogota, Colombia',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Clock,
      label: 'Horario',
      value: '8:00 - 18:00',
      gradient: 'from-pink-500 to-rose-500',
    },
  ], []);

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-white dark:bg-slate-950">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-900/10 dark:to-transparent" />
      
      {/* Decorative gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-300/20 dark:bg-blue-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 12,
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
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 rounded-full mb-6 text-sm">
            Contacto
          </span>
          <h2 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-5xl">
            Hablemos de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              tu proyecto
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Estamos listos para ayudarte a llevar tu marca al siguiente nivel
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700 focus:border-blue-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 300-000-0000"
                    className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Nombre de tu empresa
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700 focus:border-blue-500 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full min-h-[180px] bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200 dark:border-slate-700 focus:border-blue-500 rounded-xl resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={20} />
                      Enviar mensaje
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group relative p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-slate-950/50 hover:shadow-xl dark:hover:shadow-slate-950 transition-all border border-white/50 dark:border-slate-800/50"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                  
                  <div className="flex items-start gap-4 relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{info.label}</div>
                      <div className="text-gray-900 dark:text-white">{info.value}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative p-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              
              <div className="relative">
                <h3 className="text-white mb-3">
                  ¿Prefieres una llamada?
                </h3>
                <p className="text-blue-100 mb-6">
                  Agenda una reunión con nuestro equipo y descubre cómo podemos ayudarte.
                </p>
                <motion.button
                  className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Agendar reunión
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
