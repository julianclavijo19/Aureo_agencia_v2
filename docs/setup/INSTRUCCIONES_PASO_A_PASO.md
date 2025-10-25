# 🎯 Instrucciones PASO A PASO (sigueme exactamente)

## ⚠️ Vamos a hacerlo juntos desde CERO

Sigue **EXACTAMENTE** estos pasos. No te saltes ninguno.

---

## 📱 PASO 1: Verificar que n8n esté abierto

1. Abre tu navegador
2. Ve a: `https://julian454k.app.n8n.cloud`
3. Inicia sesión si es necesario
4. ✅ Deberías ver tu dashboard de n8n

---

## 📋 PASO 2: Verificar tu flujo actual

1. En el menú lateral izquierdo, haz clic en **"Workflows"**
2. ¿Ves un flujo llamado "Flujo Formulario Web - Aureo"?
   - ✅ **SÍ** → Continúa al Paso 3
   - ❌ **NO** → Ve al Paso 3A (Importar)

---

## 🔴 PASO 3: Ver si el flujo está ACTIVO

1. Haz clic en tu flujo para abrirlo
2. Mira la **esquina superior derecha**
3. ¿Hay un botón que dice **"Active"** o **"Inactive"**?

### 🟢 Si dice "Active" (en VERDE):
- ✅ Perfecto, continúa al Paso 4

### 🔴 Si dice "Inactive" (en GRIS/ROJO):
- ❌ **ESTE ES TU PROBLEMA** 
- Haz clic en ese botón para activarlo
- Debe cambiar a VERDE
- Ahora sí continúa al Paso 4

---

## 🔍 PASO 4: Copiar la URL del webhook CORRECTAMENTE

1. En tu flujo, busca el primer nodo (normalmente a la izquierda)
2. Debe decir **"Webhook Formulario"** o algo similar
3. **HAZ CLIC** en ese nodo
4. En el panel de la DERECHA, busca donde dice:
   - **"Production URL"** o
   - **"Test URL"** o
   - Solo "URL"
5. Verás una URL que se parece a:
   ```
   https://julian454k.app.n8n.cloud/webhook-test/formulario-contacto
   ```
6. **COPIA** esa URL completa
   - Haz clic en el icono de copiar 📋 si lo hay
   - O selecciónala toda y copia (Ctrl+C / Cmd+C)

---

## 🧪 PASO 5: Probar con el test simple

1. Abre el archivo **`test-super-simple.html`** en tu navegador
   - Arrastra el archivo a tu navegador, o
   - Haz doble clic en el archivo
2. **PEGA** la URL que copiaste en el campo
3. Haz clic en **"🚀 Probar Ahora"**
4. Mira el resultado:

### ✅ Si sale ÉXITO:
**¡PERFECTO!** Tu webhook funciona. El problema está en otra parte.

### ❌ Si sale ERROR:
Lee el mensaje de error. Los errores comunes son:

#### Error: "No se puede conectar con el webhook"
**Causa:** El flujo NO está activo
**Solución:** Vuelve al Paso 3 y activa el flujo

#### Error: "Webhook no encontrado (404)"
**Causa:** La URL está mal
**Solución:** Vuelve al Paso 4 y copia bien la URL

#### Error: "Error 500"
**Causa:** Tu flujo tiene nodos sin configurar
**Solución:** Ve al Paso 6

---

## 🔧 PASO 6: Si tienes error 500 (Flujo con problemas)

Tu flujo tiene nodos que necesitan configuración. Vamos a simplificarlo:

### Opción A: Eliminar nodos problemáticos

1. En tu flujo en n8n, **ELIMINA** estos nodos si los tienes:
   - ❌ "Guardar en Google Sheets"
   - ❌ "Send message" (WhatsApp)
   - ❌ "Email al Cliente"
   - ❌ "Email a la Dueña"
   - ❌ "Validar Request"

2. **Deja SOLO** estos 2 nodos:
   - ✅ "Webhook Formulario"
   - ✅ "Respuesta al Formulario" o "Respond to Webhook"

3. **Conecta** el webhook directamente a la respuesta:
   ```
   [Webhook] → [Respuesta]
   ```

4. Haz clic en **"Save"** (Guardar)
5. Vuelve al Paso 5 y prueba de nuevo

### Opción B: Importar el flujo simplificado

1. En n8n, ve a **"Workflows"**
2. Haz clic en **"Add workflow"**
3. En el menú (3 puntitos), haz clic en **"Import from File"**
4. Selecciona: **`Flujo-Simplificado-Aureo.json`**
5. Se importará un flujo limpio y simple
6. **ACTIVA** el flujo (botón Active en verde)
7. Vuelve al Paso 4 y copia la nueva URL

---

## 📸 PASO 7: Si NADA funciona, toma screenshots

Toma capturas de pantalla de:

1. **Tu flujo completo en n8n** (para ver todos los nodos)
2. **El panel del webhook** (lado derecho cuando haces clic en el nodo webhook)
3. **El error** en test-super-simple.html
4. **Executions** en n8n (menú lateral > Executions)

---

## 🎯 Checklist Final

Marca cada uno conforme lo hagas:

```
[ ] n8n está abierto en mi navegador
[ ] Puedo ver mi flujo "Flujo Formulario Web - Aureo"
[ ] El botón "Active" está en VERDE
[ ] Hice clic en el nodo "Webhook Formulario"
[ ] Copié la URL completa del webhook
[ ] Abrí test-super-simple.html en mi navegador
[ ] Pegué la URL en el campo
[ ] Hice clic en "Probar Ahora"
[ ] Vi el resultado (éxito o error)
```

---

## 💡 Diagnóstico Rápido

### Si el test dice "No se puede conectar":
→ **El flujo NO está activo**

### Si el test dice "404 Not Found":
→ **La URL está mal copiada**

### Si el test dice "Error 500":
→ **Hay nodos sin configurar en tu flujo**

### Si el test dice "CORS error":
→ **n8n no permite peticiones desde tu navegador** (poco común en n8n cloud)

---

## 🆘 Último Recurso

Si después de seguir TODO esto aún no funciona:

1. Ve a n8n
2. Menú lateral > **"Executions"**
3. Haz clic en la última ejecución (debería estar en rojo si falló)
4. Toma screenshot de lo que dice
5. Ese es el error exacto

---

## ✅ ¿Ya funcionó el test?

**SÍ →** Perfecto, ahora solo actualiza la URL en tu código:
1. Abre `src/components/Contact.tsx`
2. Busca la línea 29
3. Cambia la URL por la que copiaste
4. Reinicia el servidor: `npm run dev`

**NO →** Vuelve a revisar cada paso, especialmente:
- ¿El flujo está ACTIVO (verde)?
- ¿Copiaste la URL completa?
- ¿n8n está funcionando?

---

**Respira, vamos paso a paso. El 99% de las veces es porque el flujo no está activo o la URL está mal copiada.**


