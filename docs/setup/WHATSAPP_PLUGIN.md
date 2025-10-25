# Plugin de WhatsApp - Documentación

## 📱 Descripción

Plugin flotante de WhatsApp optimizado que permite a los usuarios contactarte directamente con mensajes predefinidos según sus intereses.

## ✨ Características

- 🎨 **Diseño moderno**: Animaciones fluidas con Framer Motion
- 📱 **Responsive**: Funciona perfectamente en móviles y escritorio
- 🚀 **Optimizado**: No afecta el rendimiento de la página
- 🎯 **4 opciones predefinidas**: Diagnóstico gratuito y 3 etapas de servicio
- 💫 **Animaciones suaves**: Efectos visuales atractivos
- 🌙 **Dark mode**: Compatible con tema oscuro
- ♿ **Accesible**: Labels ARIA y navegación por teclado

## 📞 Configuración

### Número de WhatsApp
```typescript
const WHATSAPP_NUMBER = '573209392035'; // +57 320 9392035
```

### Mensajes Predefinidos

1. **Diagnóstico gratuito**
   - "¡Hola! 👋 Quiero agendar mi diagnóstico gratuito para conocer en qué etapa está mi marca y como lograr los resultados que espero"

2. **Etapa 1 - ADN y estrategia de marca**
   - "¡Hola! 👋 Me interesa conocer más sobre la Etapa 1: ADN y estrategia de marca"

3. **Etapa 2 - Creación de contenido**
   - "¡Hola! 👋 Me interesa conocer más sobre la Etapa 2: Creación de contenido"

4. **Etapa 3 - Expansión de audiencia y ventas**
   - "¡Hola! 👋 Me interesa conocer más sobre la Etapa 3: Expansión de audiencia y ventas"

## 🎨 Personalización

### Cambiar el número de WhatsApp

Edita `src/components/WhatsAppWidget.tsx`:

```typescript
const WHATSAPP_NUMBER = 'TU_NUMERO_AQUI'; // Formato: código de país + número sin espacios
```

Ejemplo:
- Colombia: `573209392035` (para +57 320 9392035)
- México: `521234567890` (para +52 123 456 7890)
- España: `34612345678` (para +34 612 345 678)

### Agregar o modificar opciones

```typescript
const whatsappOptions: WhatsAppOption[] = [
  {
    id: 'nueva-opcion',
    title: 'Título de la nueva opción',
    message: 'Mensaje que se enviará por WhatsApp'
  },
  // ... más opciones
];
```

### Cambiar el tiempo de aparición

Por defecto aparece después de 2 segundos:

```typescript
useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 2000); // Cambiar 2000ms
  return () => clearTimeout(timer);
}, []);
```

### Modificar colores

Los colores principales están en las clases de Tailwind:

**Botón flotante:**
```tsx
// Verde (actual)
className="bg-gradient-to-r from-green-500 to-green-600"

// Azul (ejemplo)
className="bg-gradient-to-r from-blue-500 to-blue-600"
```

**Header del menú:**
```tsx
// Verde (actual)
className="bg-gradient-to-r from-green-500 to-green-600"
```

**Botones de opciones:**
```tsx
// Azul-Índigo (actual)
className="bg-gradient-to-r from-blue-600 to-indigo-600"

// Personalizado (ejemplo)
className="bg-gradient-to-r from-purple-600 to-pink-600"
```

## 🔧 Ubicación del Widget

Por defecto está en la esquina inferior derecha:

```tsx
<div className="fixed bottom-6 right-6 z-50">
```

Para cambiarlo a la izquierda:
```tsx
<div className="fixed bottom-6 left-6 z-50">
// Y cambiar en el menú:
className="absolute bottom-20 left-0 w-80 mb-2" // Cambiar right-0 por left-0
```

## 📱 Cómo Funciona

1. **Aparición**: El widget aparece 2 segundos después de cargar la página
2. **Pulse animation**: Efecto de pulso para llamar la atención
3. **Badge de notificación**: Indicador visual de "nuevo mensaje"
4. **Click en botón**: Abre el menú con las opciones
5. **Selección**: Al hacer click en una opción, abre WhatsApp con el mensaje predefinido
6. **Auto-cierre**: El menú se cierra después de seleccionar una opción

## 🎯 Eventos del Usuario

### Apertura/Cierre del menú
```typescript
const handleToggle = useCallback(() => {
  setIsOpen(prev => !prev);
}, []);
```

### Click en opción
```typescript
const handleOptionClick = useCallback((option: WhatsAppOption) => {
  const encodedMessage = encodeURIComponent(option.message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
  setIsOpen(false);
}, []);
```

## 🎨 Animaciones Incluidas

- **Fade in/out**: Aparición suave del menú
- **Scale animation**: Efecto de zoom en botones
- **Pulse**: Efecto de pulso en el botón flotante
- **Shine effect**: Efecto de brillo al hacer hover en opciones
- **Rotate transition**: Rotación del icono X/WhatsApp
- **Slide animations**: Animaciones de entrada para cada opción

## 📱 Responsive Design

El widget se adapta automáticamente:
- **Móvil**: Ancho completo del menú (w-80)
- **Tablet**: Mismo comportamiento
- **Desktop**: Posición fija en esquina

## ♿ Accesibilidad

- ✅ Labels ARIA descriptivos
- ✅ Navegación por teclado
- ✅ Contraste de colores adecuado
- ✅ Hover states claramente visibles

## 🚀 Performance

Optimizaciones implementadas:
- `React.memo`: Previene re-renders innecesarios
- `useCallback`: Memoiza funciones
- `CSS containment`: Aislamiento de layout
- Animaciones optimizadas con GPU
- Lazy loading del componente

## 🔍 Testing

### Verificar que funciona:

1. Abre la página en `http://localhost:3002/`
2. Espera 2 segundos
3. Verás el botón verde de WhatsApp con efecto de pulso
4. Click en el botón → se abre el menú
5. Click en cualquier opción → se abre WhatsApp Web con el mensaje

### Testing en móvil:

1. Abre la página en tu móvil
2. Click en una opción
3. Debe abrir la app de WhatsApp directamente

## 🐛 Troubleshooting

### El widget no aparece
- Verifica que `WhatsAppWidget` esté importado en `App.tsx`
- Revisa la consola del navegador por errores
- Asegúrate de que el z-index sea 50 o superior

### WhatsApp no se abre
- Verifica el formato del número (debe ser código país + número sin espacios ni símbolos)
- Asegúrate de que el navegador permite pop-ups

### El mensaje no está correcto
- Los mensajes se codifican con `encodeURIComponent()`
- Verifica que los emojis estén correctamente incluidos

## 📝 Notas Importantes

- El número debe estar en formato internacional SIN el símbolo +
- Los mensajes se codifican automáticamente para URLs
- El widget es persistente en todas las páginas
- Las animaciones respetan `prefers-reduced-motion`

## 🔗 Links Útiles

- [WhatsApp API Documentation](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)
- [Formato de números internacionales](https://countrycode.org/)

## 📊 Estadísticas

Para rastrear clicks, puedes agregar:

```typescript
const handleOptionClick = useCallback((option: WhatsAppOption) => {
  // Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      option_id: option.id,
      option_title: option.title
    });
  }
  
  // Código existente...
}, []);
```

## 🎉 ¡Listo para Usar!

El plugin está completamente funcional y optimizado. Solo personaliza los textos y colores según tu marca.




