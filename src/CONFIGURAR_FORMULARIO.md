# 📧 Configurar Formulario de Contacto - Aureo

## ✅ Opción Actual: Web3Forms (Recomendada)

### 🎯 Por qué Web3Forms:
- ✅ **100% Gratis** (hasta 250 mensajes/mes)
- ✅ **Configuración en 2 minutos**
- ✅ **Sin backend necesario**
- ✅ **Anti-spam incluido**
- ✅ **Los emails llegan directamente a tu correo**

---

## 📝 PASOS PARA ACTIVAR EL FORMULARIO:

### **Paso 1: Obtener tu Access Key**

1. Visita: **https://web3forms.com**
2. Ingresa tu email (donde quieres recibir los mensajes)
3. Haz clic en "Create Access Key"
4. **Copia el Access Key** que aparece (algo como: `a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8`)

### **Paso 2: Configurar en el código**

1. Abre el archivo: `/components/Contact.tsx`
2. Busca la línea 36: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'`
3. Reemplaza `YOUR_WEB3FORMS_ACCESS_KEY_HERE` con tu Access Key real

**Ejemplo:**
```typescript
// ANTES:
access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',

// DESPUÉS:
access_key: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
```

### **Paso 3: ¡Probar!**

1. Guarda los cambios
2. Recarga la página
3. Llena el formulario de contacto
4. Envía un mensaje de prueba
5. **Revisa tu email** (puede tardar 1-2 minutos)

---

## 🔧 Personalización Opcional:

### Cambiar el asunto del email (Línea 42):
```typescript
subject: `Nuevo contacto de ${formData.name} - Aureo`,
```

### Cambiar el nombre del remitente (Línea 43):
```typescript
from_name: 'Website Aureo',
```

---

## 🚨 Solución de Problemas:

### ❌ "No recibo los emails"
1. Verifica que el Access Key esté correcto (sin espacios)
2. Revisa la carpeta de SPAM
3. Confirma que el email en Web3Forms esté verificado

### ❌ "Error al enviar"
1. Verifica tu conexión a internet
2. Abre la consola del navegador (F12) para ver el error
3. Verifica que el Access Key esté bien copiado

### ❌ "Access Key inválido"
1. Genera un nuevo Access Key en https://web3forms.com
2. Asegúrate de no incluir comillas extras

---

## 📊 Límites del Plan Gratuito:

- ✅ 250 mensajes/mes
- ✅ Emails ilimitados de destino
- ✅ Sin marca de agua
- ✅ Anti-spam incluido

Si necesitas más, el plan PRO cuesta $7/mes (1,000 mensajes)

---

## 🔄 ALTERNATIVAS (Si Web3Forms no funciona):

### Opción 2: EmailJS
1. Crear cuenta en https://www.emailjs.com/
2. Configurar un servicio de email
3. Crear una plantilla
4. Instalar: `npm install @emailjs/browser`
5. Usar sus credenciales en el código

### Opción 3: Formspree
1. Crear cuenta en https://formspree.io/
2. Crear un nuevo formulario
3. Obtener el endpoint
4. Cambiar la URL del fetch al endpoint de Formspree

### Opción 4: Supabase (Más avanzada)
- Guardar mensajes en base de datos
- Configurar notificaciones por email
- Requiere más configuración pero más control

---

## 📞 Soporte:

Si tienes problemas, revisa:
- **Documentación Web3Forms**: https://docs.web3forms.com/
- **Ejemplos**: https://web3forms.com/examples

---

## ✅ Checklist Final:

- [ ] Obtuve mi Access Key de Web3Forms
- [ ] Reemplacé 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' con mi Access Key real
- [ ] Guardé los cambios en Contact.tsx
- [ ] Probé el formulario con un mensaje de prueba
- [ ] Recibí el email de prueba correctamente
- [ ] El formulario está funcionando ✨

---

**¡Listo! Tu formulario de contacto está funcionando y los mensajes llegarán directamente a tu email.** 🎉
