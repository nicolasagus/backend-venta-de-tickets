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
  nombre_apellido TEXT NOT NULL,
  email TEXT NOT NULL,
  id_juego UUID REFERENCES juegos(id), -- Conecta con la tabla juegos
  precio_final NUMERIC NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente', 'confirmado', 'cancelado')) DEFAULT 'pendiente'
);

-- 3. Tabla de Biblioteca
-- El grupo pidió conectar con compras y los juegos confirmados.
CREATE TABLE biblioteca (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  id_juego UUID REFERENCES juegos(id),
  id_compra UUID REFERENCES compras(id) UNIQUE -- Conecta con la compra que originó esto
);