# 🔌 Configuración de n8n para el Formulario de Contacto

Esta guía te ayudará a conectar el formulario del sitio web con tu automatización de n8n.

## 📋 Índice
1. [Requisitos previos](#requisitos-previos)
2. [Configuración en n8n](#configuración-en-n8n)
3. [Configuración en el sitio web](#configuración-en-el-sitio-web)
4. [Pruebas](#pruebas)
5. [Resolución de problemas](#resolución-de-problemas)

---

## 🎯 Requisitos Previos

- ✅ Instancia de n8n funcionando (cloud o self-hosted)
- ✅ Flujo de n8n importado desde `Flujo Formulario Web - Aureo.json`
- ✅ Configuración de email en n8n (SMTP)
- ✅ (Opcional) Google Sheets configurado para guardar leads

---

## ⚙️ Configuración en n8n

### Paso 1: Importar el flujo

1. Abre tu instancia de n8n
2. Ve a **Workflows** > **Import from File**
3. Selecciona el archivo `Flujo Formulario Web - Aureo.json`
4. El flujo se importará con todos los nodos configurados

### Paso 2: Activar el Webhook

1. Abre el flujo importado
2. Haz clic en el nodo **"Webhook Formulario"**
3. Copia la URL del webhook que aparece en el panel
   - Formato: `https://tu-n8n.com/webhook/formulario-contacto`
4. **¡IMPORTANTE!** Guarda esta URL, la necesitarás más adelante

### Paso 3: Configurar el Email (SMTP)

#### Opción A: Usar Gmail (Recomendado para testing)

1. Ve a **Credentials** en n8n
2. Crea una nueva credencial de tipo **SMTP**
3. Configura:
   ```
   Host: smtp.gmail.com
   Port: 587
   User: aureoagenciadigital@gmail.com
   Password: [Contraseña de aplicación de Gmail]
   ```
4. Habilita "Use TLS"
5. Guarda la credencial

**⚠️ Nota:** Para Gmail, necesitas crear una [contraseña de aplicación](https://myaccount.google.com/apppasswords)

#### Opción B: Usar otro proveedor de email

Configura según tu proveedor:

**Outlook/Hotmail:**
```
Host: smtp-mail.outlook.com
Port: 587
```

**SendGrid:**
```
Host: smtp.sendgrid.net
Port: 587
User: apikey
Password: [Tu API Key]
```

### Paso 4: Asignar las credenciales a los nodos de Email

1. Haz clic en el nodo **"Email al Cliente"**
2. En "Credentials", selecciona la credencial SMTP que creaste
3. Repite para el nodo **"Email a la Dueña"**

### Paso 5: (Opcional) Configurar Google Sheets

Si quieres guardar los leads en una hoja de cálculo:

1. Crea una hoja de Google Sheets con estas columnas:
   ```
   Fecha y Hora | Nombre Completo | Teléfono | Email | Empresa | Proyecto | Estado
   ```

2. En n8n, crea una credencial de tipo **Google Sheets OAuth2**

3. Haz clic en el nodo **"Guardar en Google Sheets"**

4. En el campo `documentId`, reemplaza `TU_ID_DE_GOOGLE_SHEET` con el ID de tu hoja:
   - El ID está en la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`

5. Asigna la credencial de Google Sheets

### Paso 6: (Opcional) Configurar WhatsApp

Si quieres recibir notificaciones por WhatsApp:

1. Necesitas configurar la API de WhatsApp Business
2. O puedes remover el nodo si no lo necesitas

### Paso 7: Activar el flujo

1. Haz clic en el botón **"Active"** en la esquina superior derecha
2. El webhook ahora está listo para recibir peticiones

---

## 🌐 Configuración en el Sitio Web

### Paso 1: Crear el archivo .env

En la raíz del proyecto, crea o edita el archivo `.env`:

```bash
# n8n Webhook Configuration
VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/formulario-contacto
```

**⚠️ Importante:** Reemplaza `https://tu-n8n.com/webhook/formulario-contacto` con la URL real de tu webhook de n8n.

### Paso 2: Reiniciar el servidor de desarrollo

```bash
# Detén el servidor si está corriendo (Ctrl+C)

# Reinicia el servidor
npm run dev
```

### Paso 3: Configurar CORS en n8n (si es necesario)

Si tienes problemas de CORS, en n8n:

1. Ve a **Settings** > **General**
2. En **CORS Origins**, agrega:
   ```
   http://localhost:3000
   https://tu-dominio.com
   ```

---

## 🧪 Pruebas

### 1. Prueba local

1. Inicia el sitio web: `npm run dev`
2. Navega a la sección de contacto
3. Llena el formulario con datos de prueba:
   ```
   Nombre: Test Usuario
   Email: test@ejemplo.com
   Teléfono: +57 300-123-4567
   Empresa: Empresa Test
   Mensaje: Este es un mensaje de prueba
   ```
4. Haz clic en "Enviar mensaje"

### 2. Verificar en n8n

1. Ve a tu instancia de n8n
2. Abre el workflow
3. Ve a **Executions** (panel lateral)
4. Deberías ver una nueva ejecución
5. Haz clic para ver los detalles

### 3. Verificar los emails

Revisa las bandejas de entrada:
- ✉️ **Cliente** (test@ejemplo.com): Email de agradecimiento
- ✉️ **Dueña** (aureoagenciadigital@gmail.com): Notificación de nuevo lead

### 4. Verificar Google Sheets (si está configurado)

Abre tu hoja de Google Sheets y verifica que se haya agregado una nueva fila con los datos.

---

## 🎯 Mapeo de Campos

El formulario envía estos campos a n8n:

| Campo del Formulario | Campo en n8n          | Requerido |
|---------------------|-----------------------|-----------|
| name                | nombre_completo       | ✅        |
| email               | correo_electronico    | ✅        |
| phone               | numero_telefono       | ❌        |
| company             | nombre_empresa        | ❌        |
| message             | proyecto              | ✅        |

---

## 🔧 Resolución de Problemas

### Error: "Failed to fetch"

**Causa:** El webhook de n8n no está accesible

**Solución:**
1. Verifica que el flujo en n8n esté activo
2. Verifica que la URL en `.env` sea correcta
3. Verifica la configuración de CORS en n8n

### Error: 400 Bad Request

**Causa:** Los datos no tienen el formato correcto

**Solución:**
1. Verifica que el nodo "Validar Request" en n8n esté funcionando
2. Verifica que todos los campos requeridos se estén enviando
3. Revisa los logs en n8n

### No llegan los emails

**Causa:** Credenciales SMTP incorrectas o no configuradas

**Solución:**
1. Verifica las credenciales SMTP en n8n
2. Prueba enviando un email de prueba desde n8n
3. Verifica que no estén en spam
4. Para Gmail, asegúrate de usar una contraseña de aplicación

### Error de CORS

**Causa:** n8n no permite peticiones desde tu dominio

**Solución:**
1. En n8n, ve a Settings > General
2. Agrega tu dominio en "CORS Origins":
   ```
   http://localhost:3000
   https://tu-dominio.com
   ```
3. Reinicia n8n si es self-hosted

### Google Sheets no guarda datos

**Causa:** Credenciales no configuradas o permisos insuficientes

**Solución:**
1. Verifica que la credencial de Google Sheets esté configurada
2. Verifica que el ID de la hoja sea correcto
3. Verifica que la cuenta tenga permisos de edición en la hoja

---

## 🔐 Seguridad

### Variables de Entorno

⚠️ **IMPORTANTE:** Nunca subas el archivo `.env` a git. Ya está incluido en `.gitignore`.

### Para producción:

1. **Vercel:**
   - Ve a tu proyecto > Settings > Environment Variables
   - Agrega: `VITE_N8N_WEBHOOK_URL` = `https://tu-n8n.com/webhook/formulario-contacto`

2. **Netlify:**
   - Ve a Site Settings > Environment Variables
   - Agrega: `VITE_N8N_WEBHOOK_URL` = `https://tu-n8n.com/webhook/formulario-contacto`

3. **GitHub Pages / Hosting estático:**
   - Edita directamente en `src/components/Contact.tsx`
   - Reemplaza `import.meta.env.VITE_N8N_WEBHOOK_URL` con tu URL hardcodeada
   - ⚠️ La URL será pública en el código del sitio

### Proteger el Webhook

Para evitar spam en tu webhook:

1. **Agregar autenticación básica:**
   - En n8n, agrega un nodo "HTTP Request" antes de validar
   - Verifica un token secreto

2. **Rate limiting:**
   - Configura rate limiting en tu servidor de n8n
   - O usa Cloudflare para proteger el endpoint

3. **Validación de dominio:**
   - En el nodo "Validar Request", agrega validación del header `Origin`

---

## 📊 Estructura del Flujo

```
┌─────────────────────┐
│  Webhook Formulario │
│  (Recibe POST)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Validar Request    │
│  (JSON válido?)     │
└─────┬───────────┬───┘
      │           │
      │ Sí        │ No
      │           │
      ▼           ▼
  ┌──────┐   ┌──────────┐
  │ OK   │   │  Error   │
  └──┬───┘   │ Response │
     │       └──────────┘
     │
     ├──────────────┬─────────────┬────────────────┬─────────────┐
     ▼              ▼             ▼                ▼             ▼
┌─────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐
│ Email   │  │  Email   │  │  Google   │  │WhatsApp  │  │Respuesta │
│ Cliente │  │  Dueña   │  │  Sheets   │  │(opcional)│  │   JSON   │
└─────────┘  └──────────┘  └───────────┘  └──────────┘  └──────────┘
```

---

## 📝 Ejemplo de Payload

El formulario envía este JSON a n8n:

```json
{
  "nombre_completo": "Juan Pérez",
  "correo_electronico": "juan@ejemplo.com",
  "numero_telefono": "+57 300-123-4567",
  "nombre_empresa": "Mi Empresa SAS",
  "proyecto": "Necesito ayuda con marketing digital para mi negocio..."
}
```

n8n responde con:

```json
{
  "success": true,
  "message": "¡Gracias por contactarnos! Tu mensaje ha sido recibido correctamente.",
  "data": {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "timestamp": "25/10/2025 18:30:45"
  }
}
```

---

## 🚀 Deploy a Producción

### Antes de hacer deploy:

1. ✅ Verifica que el flujo de n8n esté activo
2. ✅ Prueba el formulario localmente
3. ✅ Configura las variables de entorno en tu hosting
4. ✅ Verifica que los emails lleguen correctamente
5. ✅ Verifica que Google Sheets esté funcionando (si aplica)

### Después del deploy:

1. ✅ Haz una prueba real desde el sitio en producción
2. ✅ Verifica los emails de confirmación
3. ✅ Revisa la ejecución en n8n
4. ✅ Verifica Google Sheets

---

## 💡 Tips y Mejoras

### Agregar Google reCAPTCHA

Para evitar spam, puedes agregar reCAPTCHA:

1. Obtén las keys de Google reCAPTCHA v3
2. Agrega el script en `index.html`
3. Envía el token en el body del POST
4. Valida el token en n8n con un nodo HTTP Request

### Notificaciones en Tiempo Real

Puedes agregar más nodos en n8n para:
- 📱 Notificaciones push (Pushover, Telegram)
- 💬 Mensajes a Slack
- 📊 Registro en tu CRM
- 📈 Analytics events

### Respuestas Automáticas Personalizadas

Personaliza los emails según el tipo de proyecto:
1. Agrega un nodo "Switch" después de validar
2. Clasifica según palabras clave en el mensaje
3. Envía emails diferentes según la categoría

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los logs en n8n:**
   - Ve a Executions
   - Haz clic en la ejecución fallida
   - Revisa el mensaje de error

2. **Revisa la consola del navegador:**
   - F12 > Console
   - Busca errores de red o JavaScript

3. **Verifica el network tab:**
   - F12 > Network
   - Filtra por Fetch/XHR
   - Revisa la petición al webhook

---

## ✅ Checklist de Configuración

- [ ] Flujo importado en n8n
- [ ] Webhook activado
- [ ] Credenciales SMTP configuradas
- [ ] Emails asignados a los nodos
- [ ] Google Sheets configurado (opcional)
- [ ] URL del webhook copiada
- [ ] Archivo `.env` creado con la URL
- [ ] Servidor reiniciado
- [ ] CORS configurado (si es necesario)
- [ ] Prueba local exitosa
- [ ] Email al cliente recibido
- [ ] Email a la dueña recibido
- [ ] Datos guardados en Google Sheets
- [ ] Variables de entorno configuradas en hosting
- [ ] Deploy exitoso
- [ ] Prueba en producción exitosa

---

**¡Listo! 🎉** Tu formulario ahora está conectado a n8n y completamente automatizado.

Si necesitas ayuda adicional, revisa la [documentación de n8n](https://docs.n8n.io/).

