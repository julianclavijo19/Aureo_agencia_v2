import React, { memo, useState, useCallback } from 'react';
import { X, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '573209392035';

interface WhatsAppOption {
  id: string;
  title: string;
  message: string;
}

const whatsappOptions: WhatsAppOption[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico gratuito: conoce tu punto de partida',
    message: '¡Hola! 👋 Quiero agendar mi diagnóstico gratuito para conocer en qué etapa está mi marca y como lograr los resultados que espero'
  },
  {
    id: 'etapa1',
    title: 'Etapa 1 – ADN y estrategia de marca',
    message: '¡Hola! 👋 Me interesa conocer más sobre la Etapa 1: ADN y estrategia de marca'
  },
  {
    id: 'etapa2',
    title: 'Etapa 2 – Creación de contenido',
    message: '¡Hola! 👋 Me interesa conocer más sobre la Etapa 2: Creación de contenido'
  },
  {
    id: 'etapa3',
    title: 'Etapa 3 – Expansión de audiencia y ventas',
    message: '¡Hola! 👋 Me interesa conocer más sobre la Etapa 3: Expansión de audiencia y ventas'
  }
];

export const WhatsAppWidget = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleOptionClick = useCallback((option: WhatsAppOption) => {
    const encodedMessage = encodeURIComponent(option.message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Menú flotante */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              zIndex: 999999,
              width: '320px',
            }}
          >
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(to right, #25D366, #128C7E)',
                padding: '16px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>¿En qué podemos ayudarte?</h3>
                  <button
                    onClick={handleToggle}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
                  Elige una opción y te contactaremos por WhatsApp
                </p>
              </div>

              {/* Opciones */}
              <div style={{ padding: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                {whatsappOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #3B82F6, #6366F1)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59,130,246,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ flex: 1 }}>{option.title}</span>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: '12px',
                textAlign: 'center',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Responderemos lo antes posible 🚀
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante - SIEMPRE VISIBLE */}
      <button
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: isOpen ? '#EF4444' : 'linear-gradient(to right, #25D366, #128C7E)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          zIndex: 999999,
          transition: 'all 0.3s',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>

      {/* Badge de notificación */}
      {!isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '76px',
          right: '72px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#EF4444',
          border: '2px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          zIndex: 999999,
        }}>
          !
        </div>
      )}
    </>
  );
});
