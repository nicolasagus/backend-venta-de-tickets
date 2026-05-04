# 🚀 Thunder Client - Guía de Pruebas

El servidor backend está corriendo en: `http://localhost:3000`

---

## 1️⃣ **GET /api/productos** - Listar Productos (Partidos)

### Configuración en Thunder Client:
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/productos`
- **Headers:** Opcional

### Respuesta Esperada:
```json
[
  {
    "id": 1,
    "nombre": "Boca vs River",
    "precio": 10000,
    "cantidad": 10
  },
  {
    "id": 2,
    "nombre": "River vs Independiente",
    "precio": 15000,
    "cantidad": 5
  }
]
```

---

## 2️⃣ **POST /api/comprar** - Realizar una Compra

### Configuración en Thunder Client:
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/comprar`
- **Headers:** `Content-Type: application/json`

### Cuerpo (Body) - Ejemplo JSON:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "documento": "12345678",
  "telefono": "+34612345678",
  "provincia": "Madrid",
  "localidad": "Madrid",
  "cantidad": 1,
  "email": "juan@example.com",
  "idProducto": "6a3d0825-0284-419b-831d-eba51bddd7ce",
  "nombreProducto": "Boca vs River",
  "precioUnitario": 10000
}
```

### Parámetros Requeridos:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | string | Nombre del comprador |
| apellido | string | Apellido del comprador |
| documento | string | Documento de identidad |
| telefono | string | Número de teléfono |
| provincia | string | Provincia de residencia |
| localidad | string | Localidad/Ciudad |
| cantidad | number | Cantidad de entradas (debe ser 1) |
| email | string | Email del comprador |
| idProducto | string | ID del producto/partido (UUID) |
| nombreProducto | string | Nombre del producto/partido |
| precioUnitario | number | Precio por unidad |

### Respuesta Esperada (Éxito):
```json
{
  "mensaje": "¡Compra exitosa!",
  "compra": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "documento": "12345678",
    "cantidad": 1,
    "precioFinal": 10000
  },
  "pago": {
    "referencia": "PAY-123456",
    "url": "https://payment-url.com"
  }
}
```

### Respuesta de Error (Campos Faltantes):
```json
{
  "error": "Faltan campos obligatorios para procesar la compra."
}
```

### Respuesta de Error (Validación de Cantidad):
```json
{
  "error": "Solamente se puede comprar un ticket/partido a la vez (cantidad debe ser 1)."
}
```

---

## 📝 Pasos para Probar en Thunder Client:

1. **Abre Thunder Client** en VS Code
2. **Crea una nueva solicitud (Request)**
3. **Prueba GET /api/productos primero** para ver los partidos disponibles
4. **Luego prueba POST /api/comprar** con uno de los IDs que recibiste
5. **Verifica las respuestas** en el panel de respuesta

---

## 🛑 Notas Importantes:

- El servidor debe estar corriendo (`npm run dev` o `node dist/main/app.js`)
- Todas las solicitudes POST deben incluir el header `Content-Type: application/json`
- La cantidad debe ser exactamente 1
- El email debe ser válido

---

## 🚀 Comandos Rápidos:

```bash
# Compilar y ejecutar
npm run dev

# Solo compilar
npm run build

# Solo ejecutar (requiere que esté compilado)
npm start

# Ejecutar tests
npm test
```
