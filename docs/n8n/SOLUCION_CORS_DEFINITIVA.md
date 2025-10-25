# 🔥 Solución CORS Definitiva

## ⚠️ El Problema con CORS en n8n

Cuando tu navegador hace una petición CORS, envía **DOS peticiones**:

1. **OPTIONS** (preflight) - Para verificar permisos
2. **POST** (la real) - Para enviar los datos

Si tu webhook solo maneja POST, la petición OPTIONS falla y todo se rompe.

---

## ✅ SOLUCIÓN (Sigue esto EXACTAMENTE):

### **Paso 1: Elimina o desactiva tu flujo actual**

1. Ve a n8n
2. Abre tu flujo actual
3. Haz clic en el botón "Active" para **DESACTIVARLO** (debe ponerse gris)

### **Paso 2: Importa el flujo completo con CORS**

1. En n8n → **Workflows** → Click en **"+"** (Add workflow)
2. Click en el menú **⋮** (3 puntitos arriba a la derecha)
3. Click en **"Import from File"**
4. Selecciona: **`Flujo-CORS-Completo.json`**
5. El flujo se importará con 4 nodos:
   - Webhook POST
   - Webhook OPTIONS
   - Respuesta POST
   - Respuesta OPTIONS

### **Paso 3: ACTIVA el nuevo flujo**

1. **¡IMPORTANTE!** Click en el botón **"Active"** 
2. Debe ponerse **VERDE** ✅
3. Si no se activa, verifica que no haya errores en los nodos

### **Paso 4: Copia la URL del webhook POST**

1. Click en el nodo **"Webhook POST"**
2. En el panel derecho, copia la **"Production URL"**
3. Debe verse algo así:
   ```
   https://julian454k.app.n8n.cloud/webhook/algo/formulario-contacto
   ```

### **Paso 5: Prueba con el test simple**

1. Abre **`test-super-simple.html`**
2. Pega la URL
3. Click en "Probar Ahora"
4. **Debería funcionar** ✅

---

## 🔍 Si AÚN falla con CORS:

### **Verifica en la consola del navegador (F12):**

Abre las herramientas de desarrollo (F12) y ve a la pestaña **Console**.

#### **Si ves algo como:**
```
Access to fetch at '...' from origin 'null' has been blocked by CORS policy
```

**Causa:** Estás abriendo el HTML desde el disco (`file://`)

**Solución:** Necesitas un servidor local. Opciones:

#### **Opción A: Usar Python**
```bash
# En la carpeta del proyecto
python -m http.server 8000
```
Luego abre: `http://localhost:8000/test-super-simple.html`

#### **Opción B: Usar Node.js**
```bash
npx serve .
```

#### **Opción C: Usar la extensión Live Server de VS Code**
1. Instala la extensión "Live Server"
2. Click derecho en `test-super-simple.html`
3. "Open with Live Server"

---

## 🎯 Otra opción: Test desde cURL (Terminal)

Para verificar que el webhook funciona sin problemas de CORS del navegador:

**PowerShell:**
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "Origin" = "http://localhost:3000"
}

$body = @{
    nombre_completo = "Test CORS"
    correo_electronico = "test@test.com"
    numero_telefono = "+57 300000000"
    nombre_empresa = "Test"
    proyecto = "Test CORS"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto" -Method POST -Headers $headers -Body $body
```

**Si esto funciona**, el webhook está bien. El problema es solo del navegador/CORS.

---

## 📊 Diferencia entre los flujos:

### ❌ Flujo anterior (sin OPTIONS):
```
POST → Respuesta
```
**Resultado:** El navegador envía OPTIONS primero, no hay respuesta, CORS falla.

### ✅ Flujo nuevo (con OPTIONS):
```
POST → Respuesta POST
OPTIONS → Respuesta OPTIONS (preflight)
```
**Resultado:** El navegador envía OPTIONS, recibe respuesta, luego envía POST. ✅

---

## 🔧 Configuración de CORS en n8n Cloud

Si importar el flujo no funciona, puede ser configuración de cuenta:

1. Ve a tu perfil en n8n (esquina superior derecha)
2. **Settings**
3. Busca **"Security"** o **"API"**
4. Si hay opción de **"CORS"** o **"Allowed Origins"**:
   - Agrega: `*` o `http://localhost:3000`
5. Guarda

---

## 🆘 Último recurso: Usar un proxy

Si NADA funciona, podemos crear un proxy simple que evite CORS:

```javascript
// proxy.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/formulario', async (req, res) => {
  try {
    const response = await fetch('TU_URL_N8N_AQUI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy en http://localhost:3001'));
```

Pero esto es solo si TODO lo demás falla.

---

## ✅ Checklist Final:

```
[ ] Desactivé el flujo anterior
[ ] Importé Flujo-CORS-Completo.json
[ ] Activé el nuevo flujo (botón verde)
[ ] Copié la URL del webhook POST
[ ] Probé con test-super-simple.html
[ ] Abrí el HTML con un servidor local (no file://)
[ ] Revisé la consola del navegador (F12)
[ ] Verifiqué que ambos webhooks (POST y OPTIONS) estén en el flujo
```

---

## 💡 Tip: Verifica en n8n Executions

Después de cada prueba:
1. Ve a n8n → **Executions** (menú lateral)
2. Deberías ver:
   - Una ejecución de OPTIONS (código 204)
   - Una ejecución de POST (código 200)
3. Si solo ves una o ninguna, algo está mal

---

## 📞 Debug en tiempo real

Prueba esto en la consola del navegador (F12 → Console):

```javascript
fetch('https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto', {
  method: 'OPTIONS',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => {
  console.log('OPTIONS Status:', r.status);
  console.log('CORS Headers:', {
    origin: r.headers.get('access-control-allow-origin'),
    methods: r.headers.get('access-control-allow-methods'),
    headers: r.headers.get('access-control-allow-headers')
  });
})
.catch(e => console.error('ERROR:', e));
```

Esto te dirá si el webhook OPTIONS está funcionando.

---

**Importa `Flujo-CORS-Completo.json` AHORA y prueba. Este flujo maneja CORS correctamente.**


