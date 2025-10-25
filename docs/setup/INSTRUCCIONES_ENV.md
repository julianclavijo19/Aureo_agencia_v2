# 📝 Instrucciones para crear el archivo .env

## ⚠️ IMPORTANTE: Debes crear este archivo manualmente

El archivo `.env` no se incluye en el repositorio por razones de seguridad.

## 📋 Pasos para crear el archivo .env

### 1. Crear el archivo

En la **raíz del proyecto** (donde está el `package.json`), crea un nuevo archivo llamado **`.env`**

**En Windows (PowerShell):**
```powershell
New-Item -Path ".env" -ItemType File
```

**En Windows (CMD):**
```cmd
type nul > .env
```

**En Mac/Linux:**
```bash
touch .env
```

**O simplemente créalo con tu editor de código:**
- En VS Code: Botón derecho en el explorador > New File > `.env`
- En Cursor: Lo mismo

### 2. Agregar el contenido

Abre el archivo `.env` que acabas de crear y pega esto:

```env
# n8n Webhook Configuration
# URL del webhook de n8n para el formulario de contacto
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/formulario-contacto
```

### 3. Reemplazar la URL

**⚠️ MUY IMPORTANTE:** Debes reemplazar `https://your-n8n-instance.com/webhook/formulario-contacto` con la URL REAL de tu webhook de n8n.

**¿Dónde encuentro la URL del webhook?**

1. Abre tu instancia de n8n
2. Abre el flujo "Flujo Formulario Web - Aureo"
3. Haz clic en el primer nodo llamado **"Webhook Formulario"**
4. En el panel de la derecha verás una URL como:
   ```
   https://n8n.tudominio.com/webhook/formulario-contacto
   ```
   o
   ```
   https://app.n8n.cloud/webhook/abc123/formulario-contacto
   ```
5. **Copia esa URL completa** y pégala en tu archivo `.env`

### 4. Ejemplo completo

Tu archivo `.env` debería verse así (con TU URL):

```env
# n8n Webhook Configuration
VITE_N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/formulario-contacto
```

o

```env
# n8n Webhook Configuration
VITE_N8N_WEBHOOK_URL=https://app.n8n.cloud/webhook/abc123def456/formulario-contacto
```

### 5. Guardar y reiniciar

1. **Guarda** el archivo `.env`
2. **Reinicia** el servidor de desarrollo:
   ```bash
   # Detén el servidor (Ctrl + C)
   # Inicia de nuevo
   npm run dev
   ```

---

## ✅ Verificar que funciona

### Opción 1: Ver en la consola del navegador

1. Abre el sitio web en desarrollo
2. Abre la consola del navegador (F12)
3. Ve a la pestaña **Console**
4. Escribe:
   ```javascript
   import.meta.env.VITE_N8N_WEBHOOK_URL
   ```
5. Deberías ver tu URL del webhook

### Opción 2: Probar el formulario

1. Ve a la sección de contacto en el sitio
2. Llena el formulario con datos de prueba
3. Envía el formulario
4. Si todo está bien, deberías ver el mensaje de éxito

---

## 🚀 Para Producción (Vercel/Netlify)

**NO subas el archivo .env a GitHub**. En su lugar:

### En Vercel:

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega una nueva variable:
   - **Key:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://tu-n8n.com/webhook/formulario-contacto`
4. Haz redeploy

### En Netlify:

1. Ve a tu sitio en Netlify
2. Site Settings > Environment Variables
3. Agrega una nueva variable:
   - **Key:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://tu-n8n.com/webhook/formulario-contacto`
4. Haz redeploy

---

## ❓ Preguntas Frecuentes

### ¿Por qué no veo el archivo .env en mi explorador de archivos?

Los archivos que empiezan con `.` (punto) son archivos ocultos en algunos sistemas operativos.

**Windows:**
- Explorador de archivos > Ver > Mostrar elementos ocultos

**Mac:**
- En Finder, presiona: `Cmd + Shift + .` (punto)

**Linux:**
- En el explorador de archivos, presiona `Ctrl + H`

### ¿Puedo subir el .env a GitHub?

**NO.** El archivo `.env` ya está en `.gitignore` y no se debe subir por seguridad.

### ¿Qué pasa si no creo el archivo .env?

El formulario intentará usar la URL por defecto `YOUR_N8N_WEBHOOK_URL_HERE` y fallará.

### ¿Puedo tener múltiples archivos .env?

Sí, puedes tener:
- `.env` - Variables por defecto
- `.env.local` - Variables locales (tiene prioridad sobre .env)
- `.env.production` - Variables para producción

---

## 🔐 Seguridad

- ✅ El archivo `.env` ya está en `.gitignore`
- ✅ Nunca compartas tu archivo `.env` públicamente
- ✅ Usa variables de entorno en tu hosting para producción
- ⚠️ Ten en cuenta que las variables `VITE_*` son públicas en el bundle (cualquiera puede verlas en el código del sitio)

Para mayor seguridad, considera:
1. Agregar autenticación al webhook de n8n
2. Implementar rate limiting
3. Validar el origen de las peticiones

---

## 🆘 ¿Necesitas ayuda?

Si después de seguir estos pasos el formulario no funciona:

1. Verifica que el archivo `.env` esté en la raíz del proyecto
2. Verifica que no haya espacios extra en la URL
3. Verifica que el flujo en n8n esté activo
4. Revisa la consola del navegador (F12) en busca de errores
5. Lee la documentación completa en `CONFIGURACION_N8N.md`

---

**¡Listo! 🎉** Con el archivo `.env` configurado correctamente, tu formulario podrá enviar datos a n8n.

