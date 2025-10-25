# 🚀 Guía Rápida - Formulario con n8n

## ✅ Tu Situación Actual

Los datos **SÍ están llegando al webhook** correctamente. 

### El problema identificado:
- El webhook recibe los datos ✅
- El nodo IF se ejecuta ✅
- **PERO** los nodos de email y respuesta no se ejecutan ❌

**Causa:** El Response Body tenía sintaxis compleja con saltos de línea (`\n`) que n8n Cloud no puede procesar correctamente.

## 📦 Flujo Corregido

He creado un flujo funcional simplificado: **`n8n-flows/Flujo-Formulario-Aureo-FUNCIONAL.json`**

### Lo que incluye:

✅ Webhook que recibe datos del formulario  
✅ Email automático a **andresjulian454k@gmail.com** (admin)  
✅ Email de confirmación al cliente  
✅ Respuesta JSON correcta al formulario  
✅ Headers CORS configurados

## 🎯 Cómo Usarlo

### Paso 1: Importar en n8n

```
1. Ve a: https://julian454k.app.n8n.cloud
2. Workflows → Add workflow → Import from file
3. Selecciona: n8n-flows/Flujo-Formulario-Aureo-FUNCIONAL.json
4. Se llamará: "Formulario Aureo - FUNCIONAL"
```

### Paso 2: Configurar credenciales de Gmail

```
1. Click en el nodo "Email a Admin"
2. Panel derecho → Credentials → Selecciona tu Gmail
3. Click en el nodo "Email a Cliente"
4. Panel derecho → Credentials → Selecciona tu Gmail
```

### Paso 3: ACTIVAR

```
Switch en la esquina superior derecha → Active (verde)
```

### Paso 4: Probar desde tu sitio

```bash
npm run dev
# Ve a http://localhost:3000
# Llena el formulario de contacto
# Enviar
```

## 🎯 Resultado Esperado

### En el navegador:
```json
{
  "success": true,
  "message": "¡Gracias por contactarnos! Tu mensaje ha sido recibido correctamente.",
  "nombre": "Tu Nombre",
  "email": "tu@email.com"
}
```

### En tu email (andresjulian454k@gmail.com):
- Email con información del lead
- Botones para responder por email o WhatsApp

### En el email del cliente:
- Email de confirmación personalizado
- Resumen de su solicitud
- Botón para contactar por WhatsApp

### En n8n → Executions:
- ✅ Ejecución verde
- Todos los nodos ejecutados correctamente

## 🔧 Diferencias con el Flujo Original

### ❌ Flujo original (`Flujo Formulario Web - Aureo.json`):
- Tenía un nodo IF de validación innecesario
- Response Body con sintaxis compleja (saltos de línea `\n`)
- Emails con HTML muy complejo
- Causaba error "Unexpected end of JSON input"

### ✅ Flujo corregido (`Flujo-Formulario-Aureo-FUNCIONAL.json`):
- Sin nodo IF (no es necesario)
- Response Body simplificado en una línea
- Emails con HTML limpio y funcional
- Funciona correctamente

## 📋 Qué Hace Cada Nodo

```
1. Webhook Formulario
   - Recibe datos del formulario
   - Configura CORS headers
   
2. Email a Admin (paralelo)
   - Envía email a andresjulian454k@gmail.com
   - Con información del lead
   
3. Email a Cliente (paralelo)
   - Envía email de confirmación al cliente
   - Con resumen de su solicitud
   
4. Respuesta Success
   - Espera a que ambos emails se envíen
   - Responde al navegador con JSON
```

## 🔍 Si Algo Falla

### Los emails no llegan:
```
1. Verifica que las credenciales de Gmail estén configuradas
2. En n8n → Executions → Click en la ejecución
3. Revisa qué nodo falló (tendrá una X roja)
```

### El formulario no responde:
```
1. Verifica que el workflow esté ACTIVO (switch verde)
2. Verifica la URL en Contact.tsx (línea 29):
   https://julian454k.app.n8n.cloud/webhook/formulario-contacto
```

### Error en el navegador:
```
Abre la consola (F12) y comparte el error específico
```

## 🎨 Personalización

### Cambiar el email del admin:
```
Nodo "Email a Admin" → sendTo → Cambia la dirección
```

### Cambiar el contenido de los emails:
```
Cada nodo de email → message → Edita el HTML
```

### Agregar más campos:
```
En el HTML del email, agrega:
<p><strong>Nuevo Campo:</strong> {{ $json.body.nuevo_campo }}</p>
```

## ⚡ Próximos Pasos Opcionales

Una vez que funcione, puedes agregar:

1. **Google Sheets** - Guardar leads automáticamente
2. **WhatsApp** - Notificación instantánea por WhatsApp
3. **CRM** - Integrar con tu CRM favorito
4. **Email de seguimiento** - Automatizar seguimiento después de 48h

## 📞 Notas Importantes

- El flujo **NO** tiene el nodo IF de validación (no es necesario)
- Los datos llegan en `$json.body.*` (no en `$json.*`)
- El Response Body está en **una sola línea** (así funciona en n8n Cloud)
- Los emails se envían en **paralelo** para ser más rápido
- La respuesta se envía **después** de que ambos emails se envíen

---

**TL;DR:** Importa `Flujo-Formulario-Aureo-FUNCIONAL.json` → Configura Gmail → Actívalo → Prueba desde tu sitio ✅

