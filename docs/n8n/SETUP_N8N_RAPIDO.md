# ⚡ Setup Rápido - Formulario con n8n

## 🚨 ¿No funciona? → [Abre diagnostico-n8n.html](diagnostico-n8n.html) para ver qué está mal

## 🎯 Pasos para conectar en 5 minutos

**⚠️ IMPORTANTE:** Usa el **Flujo-Simplificado-Aureo.json** (NO el otro). Este funciona sin configuración adicional.

### 1️⃣ En n8n (3 pasos - SIN configuración)

1. **Importa el flujo SIMPLIFICADO:**
   - Abre n8n > Workflows > Import from File
   - Selecciona `Flujo-Simplificado-Aureo.json` ⚡
   - **NO** uses el "Flujo Formulario Web - Aureo.json" (ese necesita configuración)

2. **⚠️ ACTIVA el flujo:**
   - **¡CRÍTICO!** Haz clic en el botón **"Active"** en la esquina superior derecha
   - Debe cambiar a **VERDE** ✅
   - Si está gris/rojo, NO funcionará

3. **Copia la URL del webhook:**
   - Haz clic en el nodo "Webhook Formulario"
   - Copia la URL completa (ejemplo: `https://tu-n8n.com/webhook/formulario-contacto`)

**✅ ¡Listo en n8n!** El flujo simplificado NO necesita emails ni otras configuraciones.

---

### 2️⃣ En el Sitio Web (3 pasos)

1. **Crea el archivo `.env` en la raíz del proyecto:**
   ```bash
   VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/formulario-contacto
   ```
   ⚠️ Reemplaza con TU URL del webhook de n8n

2. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

3. **¡Listo! Prueba el formulario**

---

### 3️⃣ Para Producción

**Vercel:**
```bash
# Settings > Environment Variables
VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/formulario-contacto
```

**Netlify:**
```bash
# Site Settings > Environment Variables
VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/formulario-contacto
```

---

## 🧪 Prueba

### Opción 1: Script de prueba independiente (Recomendado)

1. Abre el archivo `test-webhook.html` en tu navegador
2. Pega la URL del webhook de n8n
3. Llena los campos de prueba
4. Haz clic en "Enviar Prueba"
5. ✅ Deberías ver un mensaje de éxito
6. Verifica que lleguen los 2 emails

### Opción 2: Probar desde el sitio web

1. Llena el formulario de contacto en el sitio
2. Verifica que lleguen 2 emails:
   - ✉️ Email al cliente (agradecimiento)
   - ✉️ Email a ti (notificación de lead)

---

## ❌ ¿No funciona?

### Error común: "Failed to fetch"
**Solución:** Verifica que:
- El flujo en n8n esté ACTIVO (botón verde)
- La URL en `.env` sea correcta
- No haya espacios extra en la URL

### No llegan los emails
**Solución:**
- Verifica las credenciales SMTP en n8n
- Para Gmail, usa una [contraseña de aplicación](https://myaccount.google.com/apppasswords)
- Revisa la carpeta de spam

---

## 📚 Documentación completa

Para más detalles, configuración de Google Sheets, WhatsApp, etc.:
👉 Lee **CONFIGURACION_N8N.md**

---

## 🎉 ¡Eso es todo!

Tu formulario ahora está conectado a n8n y envía:
- ✅ Email de agradecimiento al cliente
- ✅ Notificación a aureoagenciadigital@gmail.com
- ✅ (Opcional) Registro en Google Sheets
- ✅ (Opcional) Notificación por WhatsApp

