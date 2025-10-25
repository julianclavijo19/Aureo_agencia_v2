# 🔧 Solución Rápida - Error de Conexión Formulario con n8n

## 🎯 Problema Identificado

El error ocurre porque el flujo de n8n está intentando acceder a los datos usando `$json.body.*` pero los datos llegan directamente en `$json.body.*` desde el webhook.

## ✅ Solución en 3 Pasos

### Paso 1: Importar el Flujo Corregido

1. Ve a n8n (https://julian454k.app.n8n.cloud)
2. En el menú lateral, haz clic en **"Workflows"**
3. Haz clic en **"Import from File"** (Importar desde archivo)
4. Selecciona el archivo: `n8n-flows/Flujo-Corregido-Aureo.json`
5. El flujo se importará automáticamente

### Paso 2: Configurar las Credenciales de Gmail

El flujo corregido usa Gmail para enviar correos. Necesitas conectar tu cuenta:

1. Haz clic en el nodo **"Email a Admin"**
2. En el panel derecho, busca **"Credentials"**
3. Selecciona tu cuenta de Gmail existente o agrega una nueva
4. Repite para el nodo **"Email a Cliente"**

### Paso 3: Activar el Flujo

1. En la esquina superior derecha, activa el switch **"Active"**
2. El webhook estará disponible en:
   ```
   https://julian454k.app.n8n.cloud/webhook/formulario-contacto
   ```

## 🧪 Probar la Conexión

### Desde tu formulario web:

1. Ve a tu sitio local: `http://localhost:3000`
2. Navega a la sección **Contacto**
3. Llena el formulario con datos de prueba
4. Haz clic en **"Enviar mensaje"**

### Verificar en n8n:

1. Ve a n8n
2. Abre el workflow **"Flujo Formulario Web - Aureo (Corregido)"**
3. En la parte superior, haz clic en **"Executions"**
4. Deberías ver una ejecución exitosa (✅ verde)

## 📊 Datos que se Envían

El formulario envía estos campos:

```json
{
  "nombre_completo": "Juan Pérez",
  "correo_electronico": "juan@ejemplo.com",
  "numero_telefono": "+57 300-123-4567",
  "nombre_empresa": "Mi Empresa",
  "proyecto": "Descripción del proyecto..."
}
```

## 🔍 Si Aún Hay Errores

### Error: "Cannot read property..."

**Causa**: El flujo no puede acceder a los datos
**Solución**: Verifica que estés usando `$json.body.nombre_completo` y no `$json.nombre_completo`

### Error: CORS

**Causa**: Problema de permisos de origen cruzado
**Solución**: El flujo corregido ya incluye los headers CORS necesarios:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Error: 401 Unauthorized

**Causa**: Credenciales de Gmail no configuradas
**Solución**: Configura las credenciales de Gmail en cada nodo de email

### El formulario no envía nada

**Causa**: URL del webhook incorrecta
**Solución**: Verifica en `src/components/Contact.tsx` línea 29:
```typescript
const n8nWebhookUrl = 'https://julian454k.app.n8n.cloud/webhook/formulario-contacto';
```

## 🎉 Resultado Esperado

Cuando todo funcione correctamente:

1. ✅ El usuario llena el formulario
2. ✅ Se envía un email a **andresjulian454k@gmail.com** (admin)
3. ✅ Se envía un email de confirmación al cliente
4. ✅ El formulario muestra: "¡Mensaje enviado! Nos pondremos en contacto contigo pronto."

## 🔄 Diferencias del Flujo Corregido

### ❌ Flujo Antiguo (con errores):
- Tenía un nodo de validación innecesario
- Accedía incorrectamente a los datos
- Más complejo de mantener

### ✅ Flujo Corregido:
- **Más simple**: Solo 4 nodos principales
- **Más rápido**: Sin validaciones extras
- **Mejor manejo de errores**: Respuestas claras
- **Acceso correcto a datos**: Usa `$json.body.*` correctamente

## 📞 Ayuda Adicional

Si sigues teniendo problemas:

1. **Revisa los logs en n8n**: Ve a "Executions" y haz clic en la ejecución fallida
2. **Verifica la consola del navegador**: Presiona F12 y ve a la pestaña "Console"
3. **Revisa la pestaña Network**: Busca la petición al webhook y verifica la respuesta

## 🚀 Próximos Pasos Opcionales

Una vez que funcione, puedes agregar:

- ✅ Guardar en Google Sheets
- ✅ Notificaciones por WhatsApp
- ✅ Integración con CRM
- ✅ Email automático de seguimiento después de 48 horas

Ver: `docs/n8n/CONFIGURACION_N8N.md` para más opciones.

