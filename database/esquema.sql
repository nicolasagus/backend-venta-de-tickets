-- 1. Tabla de Productos (Juegos)
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  genero TEXT,
  precio NUMERIC NOT NULL,
  descripcion TEXT,
  imagen TEXT,
  habilitado BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Compradores (Clientes)
CREATE TABLE compradores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_apellido TEXT NOT NULL,
  documento TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  provincia TEXT NOT NULL,
  localidad TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Compras (Pedidos)
CREATE TABLE compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_comprador UUID REFERENCES compradores(id) ON DELETE RESTRICT,
  id_producto UUID REFERENCES productos(id) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL CHECK (cantidad BETWEEN 1 AND 6),
  precio_final NUMERIC NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente', 'confirmado', 'cancelado')) DEFAULT 'pendiente',
  referencia_pago TEXT,
  payment_url TEXT,
  fecha_compra TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);