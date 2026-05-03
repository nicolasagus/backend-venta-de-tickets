# 🚀 Thunder Client - Guía de Pruebas

El servidor backend está corriendo en: `http://localhost:3000`

---

## 1️⃣ **GET /api/productos** - Listar Productos

### Configuración en Thunder Client:
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/productos`
- **Headers:** Opcional

### Respuesta Esperada:
```json
[
  {
    "id": 1,
    "nombre": "Elden Ring",
    "precio": 3999,
    "cantidad": 10
  },
  {
    "id": 2,
    "nombre": "Baldur's Gate 3",
    "precio": 3999,
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
  "cantidad": 2,
  "email": "juan@example.com",
  "idJuego": "6a3d0825-0284-419b-831d-eba51bddd7ce",
  "nombreJuego": "Elden Ring",
  "precioUnitario": 3999
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
| cantidad | number | Cantidad de entradas (1-6) |
| email | string | Email del comprador |
| idJuego | string | ID del juego (UUID) |
| nombreJuego | string | Nombre del juego |
| precioUnitario | number | Precio por unidad |

### Respuesta Esperada (Éxito):
```json
{
  "mensaje": "¡Compra exitosa!",
  "compra": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "documento": "12345678",
    "cantidad": 2,
    "precioFinal": 7998
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

### Respuesta de Error (Validación):
```json
{
  "error": "La cantidad debe ser un número entero entre 1 y 6."
}
```

---

## 📝 Pasos para Probar en Thunder Client:

1. **Abre Thunder Client** en VS Code
2. **Crea una nueva solicitud (Request)**
3. **Prueba GET /api/productos primero** para ver los juegos disponibles
4. **Luego prueba POST /api/comprar** con uno de los IDs que recibiste
5. **Verifica las respuestas** en el panel de respuesta

---

## 🛑 Notas Importantes:

- El servidor debe estar corriendo (`npm run dev` o `node dist/main/app.js`)
- Todas las solicitudes POST deben incluir el header `Content-Type: application/json`
- La cantidad debe ser un número entre 1 y 6
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
