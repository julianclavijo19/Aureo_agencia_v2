# 🚨 Solución Rápida - El formulario no funciona

## ❌ Problemas Detectados

He identificado **3 problemas** en tu configuración:

### 1. **El flujo NO está activo** 🔴
En el JSON del flujo veo: `"active": false`

### 2. **Nodos sin configurar que bloquean el flujo** 
El flujo tiene estos nodos que FALLARÁN si no están configurados:
- ❌ Google Sheets (no configurado)
- ❌ WhatsApp (no configurado)
- ❌ Email SMTP (puede que no esté configurado)

### 3. **Todos los nodos están en serie**
Si UN nodo falla (Google Sheets o WhatsApp), TODO el flujo falla y no responde.

---

## ✅ Solución en 3 Pasos

### **Opción A: Flujo Simplificado (1 minuto)** ⚡

Te he creado un flujo simplificado que **funciona SIN configuración**:

#### Paso 1: Importa el flujo simplificado
1. En n8n, ve a **Workflows** > **Import from File**
2. Selecciona: `Flujo-Simplificado-Aureo.json`
3. Este flujo NO necesita emails ni Google Sheets

#### Paso 2: Activa el flujo
1. Haz clic en el botón **"Active"** (esquina superior derecha)
2. **¡IMPORTANTE!** Debe aparecer en VERDE ✅

#### Paso 3: Copia la URL del webhook
1. Haz clic en el nodo "Webhook Formulario"
2. Copia la URL completa
3. Actualiza tu código con esa URL

**Este flujo funciona inmediatamente** y solo responde al formulario sin enviar emails.

---

### **Opción B: Arreglar el flujo actual (5 minutos)** 🔧

Si quieres mantener los emails, sigue estos pasos:

#### 1. Eliminar nodos opcionales problemáticos

En n8n, en tu flujo:
1. **Elimina** o **desconecta** estos nodos:
   - ❌ "Guardar en Google Sheets"
   - ❌ "Send message" (WhatsApp)
   - ❌ "Validar Request" (no es necesario por ahora)

2. **Conecta directamente:**
   ```
   Webhook Formulario → Respuesta al Formulario
   ```

#### 2. Configurar SMTP (si quieres emails)

**Para Gmail:**

1. Ve a Google > **App Passwords**: https://myaccount.google.com/apppasswords
2. Genera una contraseña de aplicación
3. En n8n:
   - Ve a **Credentials** > **New Credential**
   - Tipo: **SMTP**
   - Host: `smtp.gmail.com`
   - Port: `587`
   - User: `aureoagenciadigital@gmail.com`
   - Password: [Pega la contraseña de aplicación]
   - ✅ Activa "Use TLS"
   - Guarda

#### 3. **ACTIVAR EL FLUJO** ✅

**⚠️ CRÍTICO:** Haz clic en el botón **"Active"** en la esquina superior derecha.
- Debe cambiar a VERDE
- Si está en gris/rojo, NO funcionará

---

## 🧪 Prueba Inmediata

### Prueba con cURL (Terminal/PowerShell)

Abre PowerShell y ejecuta:

```powershell
$body = @{
    nombre_completo = "Test Usuario"
    correo_electronico = "test@ejemplo.com"
    numero_telefono = "+57 300-123-4567"
    nombre_empresa = "Empresa Test"
    proyecto = "Mensaje de prueba"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto" -Method POST -Body $body -ContentType "application/json"
```

**Si funciona**, verás:
```json
{
  "success": true,
  "message": "¡Gracias por contactarnos!..."
}
```

**Si NO funciona**, verás un error. Revisa:
1. ¿El flujo está ACTIVO? (botón verde)
2. ¿La URL es correcta?
3. ¿Hay errores en n8n > Executions?

---

## 📋 Checklist de Diagnóstico

Marca cada punto:

```
[ ] El flujo está ACTIVO (botón verde en n8n)
[ ] La URL del webhook es correcta
[ ] No hay errores rojos en los nodos
[ ] Los nodos opcionales (Google Sheets, WhatsApp) están desconectados o eliminados
[ ] El flujo es simple: Webhook → Respuesta
[ ] La prueba con cURL funciona
[ ] El test-webhook.html funciona
```

---

## 🎯 Estructura Recomendada

### Para empezar (FUNCIONA 100%):

```
┌─────────────────┐
│ Webhook         │
│ Formulario      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Respuesta       │
│ Exitosa         │
└─────────────────┘
```

### Más adelante (cuando configures email):

```
┌─────────────────┐
│ Webhook         │
│ Formulario      │
└────────┬────────┘
         │
         ├─────────────────────┐
         │                     │
         ▼                     ▼
┌─────────────┐       ┌─────────────┐
│ Email       │       │ Email       │
│ Cliente     │       │ Dueña       │
└──────┬──────┘       └──────┬──────┘
       │                     │
       └──────────┬──────────┘
                  ▼
         ┌─────────────────┐
         │ Respuesta       │
         │ Exitosa         │
         └─────────────────┘
```

---

## 💡 Errores Comunes

### Error 1: "Failed to fetch"
**Causa:** El flujo no está activo
**Solución:** Activa el flujo (botón verde)

### Error 2: "404 Not Found"
**Causa:** La URL del webhook es incorrecta
**Solución:** Verifica que la URL sea exactamente la que muestra n8n

### Error 3: El flujo se ejecuta pero no responde
**Causa:** Un nodo sin configurar está bloqueando
**Solución:** Elimina Google Sheets y WhatsApp

### Error 4: "Cannot read property 'body'"
**Causa:** El JSON no llega correctamente al webhook
**Solución:** Verifica que el Content-Type sea "application/json"

---

## 📞 Pasos Siguientes

1. **Ahora mismo:** Usa el flujo simplificado para que funcione
2. **Después:** Configura SMTP para los emails
3. **Más tarde:** Agrega Google Sheets (opcional)
4. **Al final:** Agrega WhatsApp (opcional)

---

## 🔍 Debugging en n8n

Para ver qué está pasando:

1. En n8n, ve a **Executions** (panel lateral izquierdo)
2. Verás un listado de ejecuciones
3. Haz clic en la última ejecución
4. Verás:
   - ✅ Verde = Exitoso
   - ❌ Rojo = Error
5. Haz clic en cada nodo para ver los datos

---

## ⚡ Comandos Rápidos de Prueba

### Test 1: Verifica que el webhook existe
```powershell
Invoke-WebRequest -Uri "https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto" -Method OPTIONS
```

### Test 2: Envía datos de prueba
```powershell
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    nombre_completo = "Test"
    correo_electronico = "test@test.com"
    numero_telefono = "+57 300000000"
    nombre_empresa = "Test"
    proyecto = "Test"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto" -Method POST -Headers $headers -Body $body
```

---

## ✅ ¿Funcionó?

Si después de seguir estos pasos el flujo simplificado funciona:

1. ✅ Deja el flujo simplificado activo
2. ✅ El formulario ya funcionará en tu sitio web
3. ✅ Más tarde puedes agregar emails y otras funciones

**El objetivo es que funcione AHORA, las mejoras vienen después.**

---

## 🆘 Si nada funciona

Envíame:
1. Screenshot de tu flujo en n8n
2. Screenshot de "Executions" en n8n
3. El error exacto que aparece en la consola del navegador (F12)
4. La URL exacta de tu webhook

---

**Recuerda:** El flujo simplificado NO requiere ninguna configuración adicional y funcionará inmediatamente.


