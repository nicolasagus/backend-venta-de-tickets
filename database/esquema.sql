-- 1. Tabla de Juegos
CREATE TABLE juegos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  genero TEXT,
  precio NUMERIC NOT NULL,
  descripcion TEXT,
  imagen TEXT,
  habilitado BOOLEAN DEFAULT true
);

-- 2. Tabla de Compras
CREATE TABLE compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  nombre_apellido TEXT NOT NULL,
  documento TEXT NOT NULL,
  telefono TEXT NOT NULL,
  provincia TEXT NOT NULL,
  localidad TEXT NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad BETWEEN 1 AND 6),
  email TEXT NOT NULL,
  id_juego UUID REFERENCES juegos(id), -- Conecta con la tabla juegos
  nombre_juego TEXT NOT NULL,
  precio_unitario NUMERIC NOT NULL,
  precio_final NUMERIC NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente', 'confirmado', 'cancelado')) DEFAULT 'pendiente',
  referencia_pago TEXT,
  payment_url TEXT,
  fecha_compra TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Biblioteca
-- El grupo pidió conectar con compras y los juegos confirmados.
CREATE TABLE biblioteca (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  id_juego UUID REFERENCES juegos(id),
  id_compra UUID REFERENCES compras(id) UNIQUE -- Conecta con la compra que originó esto
);