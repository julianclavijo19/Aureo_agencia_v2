# 🌟 Agencia de Marketing Aureo

Sitio web moderno y optimizado para agencia de marketing digital, con diseño minimalista y experiencia de usuario excepcional.

## 🚀 Características

- ✨ **Diseño moderno**: Interfaz limpia basada en [Figma Design](https://www.figma.com/design/4uznplzejtBnvXj8kAm0YM/Agencia-de-Marketing-Aureo)
- 🎨 **Dark Mode**: Soporte completo para tema oscuro
- 📱 **100% Responsive**: Optimizado para todos los dispositivos
- ⚡ **Alto Rendimiento**: Optimizado para 60 FPS constantes
- 🎯 **WhatsApp Plugin**: Widget flotante con mensajes predefinidos
- 🎭 **Animaciones fluidas**: Transiciones suaves con Framer Motion
- 🔍 **SEO Ready**: Optimizado para motores de búsqueda

## 📦 Tecnologías

- **React 18.3** - Framework UI
- **TypeScript** - Tipado estático
- **Vite 6.3** - Build tool ultra rápido
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animaciones avanzadas
- **Lenis** - Smooth scroll
- **React Router** - Navegación
- **Lucide React** - Iconos

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Desarrollo

El servidor de desarrollo estará disponible en:
- Local: `http://localhost:3000`

## 📱 Plugin de WhatsApp

Widget flotante optimizado con 4 opciones predefinidas:
- Diagnóstico gratuito
- Etapa 1: ADN y estrategia de marca
- Etapa 2: Creación de contenido
- Etapa 3: Expansión de audiencia y ventas

**Número configurado**: +57 320 9392035

Ver [WHATSAPP_PLUGIN.md](./docs/setup/WHATSAPP_PLUGIN.md) para personalización completa.

## 🔌 Formulario con n8n

El formulario de contacto está integrado con n8n para automatización completa:
- ✉️ Emails automáticos al cliente y a la empresa
- 📊 Registro automático en Google Sheets
- 💬 Notificaciones por WhatsApp (opcional)

### 🎯 Setup Rápido:

1. **Importa el flujo:** `n8n-flows/Flujo-Formulario-Aureo-FUNCIONAL.json` en n8n
2. **Configura Gmail:** Conecta tu cuenta en los nodos de email
3. **Activa el workflow:** Switch verde en n8n
4. **Prueba:** Llena el formulario en tu sitio

📘 **Guía completa:** Ver [GUIA_RAPIDA_N8N.md](./GUIA_RAPIDA_N8N.md)  
📖 **Documentación:** Ver [CONFIGURACION_N8N.md](./docs/n8n/CONFIGURACION_N8N.md)

## ⚡ Optimizaciones Implementadas

Ver [OPTIMIZACIONES.md](./docs/setup/OPTIMIZACIONES.md) para detalles completos.

### Performance
- ✅ Code splitting optimizado
- ✅ Lazy loading de componentes
- ✅ Minificación con Terser
- ✅ CSS optimizado (87% reducción gzip)
- ✅ Bundle size reducido (67% reducción)

### UX/UI
- ✅ Animaciones GPU-accelerated
- ✅ Reduced motion support
- ✅ CSS containment
- ✅ will-change optimizado
- ✅ Smooth scroll (Lenis)

### Resultados
- 🚀 60-80% menos lag
- 🚀 60 FPS constantes
- 🚀 30-40% carga más rápida
- 🚀 40% menos uso de memoria

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI base (shadcn)
│   ├── figma/          # Componentes de Figma
│   ├── Hero.tsx        # Sección hero
│   ├── About.tsx       # Sobre nosotros
│   ├── Services.tsx    # Servicios
│   ├── Portfolio.tsx   # Portafolio
│   ├── Contact.tsx     # Contacto
│   ├── WhatsAppWidget.tsx  # Plugin WhatsApp
│   └── ...
├── pages/              # Páginas
│   ├── Home.tsx
│   ├── ServicePage.tsx
│   └── ProjectPage.tsx
├── styles/             # Estilos globales
├── hooks/              # Custom hooks
└── App.tsx             # App principal

docs/
├── n8n/                # Documentación de N8N
├── setup/              # Guías de configuración
├── prompts/            # Prompts del proyecto
└── README.md           # Índice de documentación

n8n-flows/              # Flujos de trabajo N8N (JSON)
tests/                  # Archivos de prueba
business/               # Documentos de negocio
```

## 🎨 Personalización

### Colores
Los colores están definidos en `src/styles/globals.css` usando variables CSS.

### Contenido
- Servicios: `src/components/Services.tsx`
- Proyectos: `src/components/Portfolio.tsx`
- Testimonios: `src/components/Testimonials.tsx`

### WhatsApp
Ver [WHATSAPP_PLUGIN.md](./docs/setup/WHATSAPP_PLUGIN.md) para configuración completa.

## 🌍 Deploy

### GitHub Pages
```bash
npm run build
# Los archivos están en /dist
```

### Vercel/Netlify
Conecta tu repositorio y configura:
- Build command: `npm run build`
- Output directory: `dist`

## 📄 Documentación

Toda la documentación está organizada en la carpeta `/docs`:

### 📋 Configuración
- [docs/setup/INSTRUCCIONES_PASO_A_PASO.md](./docs/setup/INSTRUCCIONES_PASO_A_PASO.md) - Guía paso a paso completa
- [docs/setup/INSTRUCCIONES_ENV.md](./docs/setup/INSTRUCCIONES_ENV.md) - Variables de entorno
- [docs/setup/OPTIMIZACIONES.md](./docs/setup/OPTIMIZACIONES.md) - Detalles de optimizaciones
- [docs/setup/WHATSAPP_PLUGIN.md](./docs/setup/WHATSAPP_PLUGIN.md) - Plugin de WhatsApp

### 🔌 N8N Integración
- [docs/n8n/SETUP_N8N_RAPIDO.md](./docs/n8n/SETUP_N8N_RAPIDO.md) - Setup rápido (5 min)
- [docs/n8n/CONFIGURACION_N8N.md](./docs/n8n/CONFIGURACION_N8N.md) - Documentación completa
- [docs/n8n/RESUMEN_INTEGRACION_N8N.md](./docs/n8n/RESUMEN_INTEGRACION_N8N.md) - Resumen de integración
- [docs/n8n/SOLUCION_CORS_DEFINITIVA.md](./docs/n8n/SOLUCION_CORS_DEFINITIVA.md) - Solución CORS

### 📝 Flujos N8N
Los flujos de trabajo están en `/n8n-flows`:
- `Flujo-Formulario-Aureo-FUNCIONAL.json` - ⭐ **Flujo principal (USAR ESTE)**
- `Flujo Formulario Web - Aureo.json` - Flujo original (referencia)
- `Flujo-CORS-Completo.json` - Con configuración CORS
- `Flujo-Simplificado-Aureo.json` - Versión simplificada

**Recomendado:** Usa `Flujo-Formulario-Aureo-FUNCIONAL.json` - tiene sintaxis corregida y funciona correctamente.

Ver [GUIA_RAPIDA_N8N.md](./GUIA_RAPIDA_N8N.md) para instrucciones de uso.

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Limpia node_modules y reinstala
rm -rf node_modules
npm install
```

### Errores de build
```bash
# Limpia cache de Vite
npm run build -- --force
```

## 📝 Licencia

Proyecto privado - Agencia de Marketing Aureo

## 🤝 Soporte

Para soporte o consultas, contacta a través de:
- WhatsApp: +57 320 9392035
- Sitio web: [Tu URL aquí]

---

Desarrollado con ❤️ por Agencia Aureo
