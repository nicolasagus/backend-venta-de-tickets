# 🎮 Guía de Thunder Client para el Backend de Venta de Tickets

## Configuración Inicial

### 1. Crear una Colección en Thunder Client
1. Abre Thunder Client en VS Code
2. Crea una nueva colección: `Venta de Tickets API`
3. Establece la URL base: `http://localhost:3000`

---

## 📚 Endpoints Disponibles

### GET - Listar todos los productos
```
GET http://localhost:3000/api/productos
```

**Respuesta esperada:**
```json
[
  {
    "titulo": "Nombre del juego",
    "genero": "Aventura",
    "precio": 100,
    "descripcion": "Descripción del juego",
    "imagen": "url-imagen",
    "id": "uuid"
  }
]
```

---

### POST - Realizar una compra
```
POST http://localhost:3000/api/comprar
Content-Type: application/json
```

**Body (ejemplo):**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "documento": "12345678",
  "telefono": "1123456789",
  "provincia": "Buenos Aires",
  "localidad": "CABA",
  "cantidad": 2,
  "email": "juan@example.com",
  "idJuego": "uuid-del-juego",
  "nombreJuego": "Super Mario",
  "precioUnitario": 100
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "¡Compra exitosa!",
  "compra": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "nombreApellido": "Juan Pérez",
    "documento": "12345678",
    "email": "juan@example.com",
    "telefono": "1123456789",
    "provincia": "Buenos Aires",
    "localidad": "CABA",
    "cantidad": 2,
    "idJuego": "uuid-del-juego",
    "nombreJuego": "Super Mario",
    "precioUnitario": 100,
    "precioFinal": 200,
    "estado": "confirmado",
    "idTransaccion": "TX-1234567890",
    "metodoPago": "Mercado Pago",
    "fechaCompra": "2026-05-03T12:34:56.789Z"
  },
  "pago": {
    "referencia": "MP-TX-1234567890",
    "url": "https://sandbox.mercadopago.com/checkout/pay/TX-1234567890"
  }
}
```

---

## ⚠️ Errores Comunes

### 400 - Faltan campos obligatorios
```json
{
  "error": "Faltan campos obligatorios para procesar la compra."
}
```
**Solución:** Asegúrate de enviar todos los campos requeridos en el body.

### 400 - Cantidad inválida
```json
{
  "error": "La cantidad debe ser un número entero entre 1 y 6."
}
```
**Solución:** La cantidad debe estar entre 1 y 6 unidades.

### 400 - Precio inválido
```json
{
  "error": "El precio unitario debe ser un valor mayor que cero."
}
```
**Solución:** El precio unitario debe ser > 0.

### 500 - Error de servidor
```json
{
  "error": "Hubo un error en el servidor al procesar la compra."
}
```
**Solución:** Revisa la consola del servidor para más detalles.

---

## 🚀 Secuencia de Prueba Recomendada

1. **Listar productos** - Obtén los juegos disponibles
   ```
   GET http://localhost:3000/api/productos
   ```

2. **Realizar compra** - Usa un `idJuego` de la respuesta anterior
   ```
   POST http://localhost:3000/api/comprar
   ```
   Con datos válidos del body.

3. **Verificar respuesta** - Revisa que la compra se haya creado correctamente

---

## 📝 Variables de Entorno Necesarias

Asegúrate de que tu archivo `.env` contenga:
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-api-key
PORT=3000
```

---

## 🧪 Tests Disponibles

Para ejecutar todos los tests:
```bash
npm test
```

Esto ejecutará pruebas para:
- ✅ Modelo de Compra y Builder
- ✅ Estrategias de Pago (Mock y Mercado Pago)
- ✅ Procesador de Pagos
- ✅ Gestor de Transacciones
- ✅ Modelos antiguos (Juego, Usuario, Tienda)

---

## 🔧 Para Iniciar el Servidor

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**
