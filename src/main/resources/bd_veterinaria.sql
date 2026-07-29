-- ============================================================
-- BASE DE DATOS: VeterinariaDB (versión MySQL 8.0+)
-- ============================================================
DROP DATABASE IF EXISTS VeterinariaDB;

CREATE DATABASE IF NOT EXISTS VeterinariaDB
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE VeterinariaDB;

-- ============================================================
-- TABLA: Estado (Activo - Inactivo)
-- ============================================================
CREATE TABLE Estado (
                        IdEstado        INT AUTO_INCREMENT PRIMARY KEY,
                        TipoEstado      VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Rol (Admin - Veterinario - Cliente)
-- ============================================================
CREATE TABLE Rol (
    IdRol       INT AUTO_INCREMENT PRIMARY KEY,
    TipoRol     VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Cliente (dueños de mascotas)
-- ============================================================
CREATE TABLE Cliente (
   IdCliente        INT AUTO_INCREMENT PRIMARY KEY,
   NombreCliente    VARCHAR(100)   NOT NULL,
   ApellidoCliente  VARCHAR(100)   NOT NULL,
   DNI              VARCHAR(8)     NOT NULL UNIQUE,
   Telefono         VARCHAR(9)     NULL,
   Email            VARCHAR(150)   NULL,
   Direccion        VARCHAR(200)   NULL,
   FechaRegistro    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   IdEstado         INT            NOT NULL DEFAULT 1,
   CONSTRAINT FK_Cliente_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Veterinario
-- ============================================================
CREATE TABLE Veterinario (
   IdVeterinario        INT AUTO_INCREMENT PRIMARY KEY,
   NombreVeterinario    VARCHAR(100)  NOT NULL,
   ApellidoVeterinario  VARCHAR(100)  NOT NULL,
   Especialidad         VARCHAR(100)  NULL,
   Telefono             VARCHAR(20)   NULL,
   Email                VARCHAR(150)  NULL,
   NumeroColegiatura    VARCHAR(30)   NULL,
   IdEstado             INT           NOT NULL DEFAULT 1,
   CONSTRAINT FK_Veterinario_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Especies
-- ============================================================
CREATE TABLE Especie (
   IdEspecie      INT AUTO_INCREMENT PRIMARY KEY,
   NombreEspecie  VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Mascotas
-- ============================================================
CREATE TABLE Servicio (
   IdServicio        INT AUTO_INCREMENT PRIMARY KEY,
   NombreServicio    VARCHAR(100)   NOT NULL,
   Descripcion       VARCHAR(300)   NULL,
   Precio            DECIMAL(8,2)   NOT NULL,
   DuracionMinutos   INT            NOT NULL DEFAULT 30,
   IdEstado          INT            NOT NULL DEFAULT 1,
   CONSTRAINT FK_Servicio_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Servicios (catálogo)
-- ============================================================
CREATE TABLE Mascota (
   IdMascota        INT AUTO_INCREMENT PRIMARY KEY,
   IdCliente        INT            NOT NULL,
   IdEspecie        INT            NOT NULL,
   NombreMascota    VARCHAR(100)   NOT NULL,
   Raza             VARCHAR(100)   NULL,
   FechaNacimiento  DATE           NULL,
   Sexo             CHAR(1)        NULL,
   Peso             DECIMAL(6,2)   NULL,
   Observaciones    VARCHAR(500)   NULL,
   IdEstado         INT            NOT NULL DEFAULT 1,
   CONSTRAINT FK_Mascotas_Clientes FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente),
   CONSTRAINT FK_Mascotas_Especies FOREIGN KEY (IdEspecie) REFERENCES Especie(IdEspecie),
   CONSTRAINT FK_Mascotas_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado),
   CONSTRAINT CK_Mascota_Sexo CHECK (Sexo IN ('M','H'))
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: EstadoCita
-- ============================================================
CREATE TABLE EstadoCita (
   IdEstadoCita    INT AUTO_INCREMENT PRIMARY KEY,
   NombreEstado    VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Cita
-- ============================================================
CREATE TABLE Cita (
   IdCita          INT AUTO_INCREMENT PRIMARY KEY,
   IdMascota       INT            NOT NULL,
   IdVeterinario   INT            NOT NULL,
   FechaHora       DATETIME       NOT NULL,
   IdEstadoCita    INT            NOT NULL DEFAULT 1,
   Observaciones   VARCHAR(500)   NULL,
   FechaRegistro   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT FK_Citas_Mascota FOREIGN KEY (IdMascota) REFERENCES Mascota(IdMascota),
   CONSTRAINT FK_Citas_Veterinario FOREIGN KEY (IdVeterinario) REFERENCES Veterinario(IdVeterinario),
   CONSTRAINT FK_Citas_EstadoCita FOREIGN KEY (IdEstadoCita) REFERENCES EstadoCita(IdEstadoCita)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: DetalleServicio
-- Uno o varios servicios prestados dentro de una Cita, con
-- el precio congelado al momento de la atención.
-- ============================================================
CREATE TABLE DetalleServicio (
   IdDetalleServicio   INT AUTO_INCREMENT PRIMARY KEY,
   IdCita              INT            NOT NULL,
   IdServicio          INT            NOT NULL,
   Cantidad            INT            NOT NULL DEFAULT 1,
   PrecioUnitario      DECIMAL(8,2)   NOT NULL,
   Subtotal            DECIMAL(8,2)   GENERATED ALWAYS AS (Cantidad * PrecioUnitario) STORED,
   Observaciones       VARCHAR(300)   NULL,
   CONSTRAINT FK_DetalleServicio_Cita FOREIGN KEY (IdCita) REFERENCES Cita(IdCita),
   CONSTRAINT FK_DetalleServicio_Servicio FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio),
   CONSTRAINT CK_DetalleServicio_Cantidad CHECK (Cantidad > 0)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: MetodoPago (catálogo)
-- ============================================================
CREATE TABLE MetodoPago (
   IdMetodoPago      INT AUTO_INCREMENT PRIMARY KEY,
   NombreMetodoPago  VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Pago
-- ============================================================
CREATE TABLE Pago (
   IdPago          INT AUTO_INCREMENT PRIMARY KEY,
   IdCita          INT            NOT NULL,
   IdMetodoPago    INT            NOT NULL,
   Monto           DECIMAL(8,2)   NOT NULL,
   FechaPago       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   Referencia      VARCHAR(100)   NULL,
   CONSTRAINT FK_Pago_Cita FOREIGN KEY (IdCita) REFERENCES Cita(IdCita),
   CONSTRAINT FK_Pago_MetodoPago FOREIGN KEY (IdMetodoPago) REFERENCES MetodoPago(IdMetodoPago),
   CONSTRAINT CK_Pago_Monto CHECK (Monto > 0)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: HistorialMedico
-- ============================================================
CREATE TABLE HistorialMedico (
   IdHistorial      INT AUTO_INCREMENT PRIMARY KEY,
   IdMascota        INT            NOT NULL,
   IdVeterinario    INT            NOT NULL,
   IdCita           INT            NULL,
   FechaConsulta    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   Diagnostico      VARCHAR(500)   NULL,
   Tratamiento      VARCHAR(500)   NULL,
   Peso             DECIMAL(6,2)   NULL,
   Temperatura      DECIMAL(4,1)   NULL,
   Observaciones    VARCHAR(500)   NULL,
   CONSTRAINT FK_Historial_Mascota FOREIGN KEY (IdMascota) REFERENCES Mascota(IdMascota),
   CONSTRAINT FK_Historial_Veterinario FOREIGN KEY (IdVeterinario) REFERENCES Veterinario(IdVeterinario),
   CONSTRAINT FK_Historial_Cita FOREIGN KEY (IdCita) REFERENCES Cita(IdCita)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Usuarios (multi-rol)
-- ============================================================
CREATE TABLE Usuario (
   IdUsuario        INT AUTO_INCREMENT PRIMARY KEY,
   Correo           VARCHAR(50)     NOT NULL UNIQUE,
   Clave            VARCHAR(256)    NOT NULL,
   IdRol            INT             NOT NULL DEFAULT 3, -- 1=Admin, 2=Veterinario, 3=Cliente
   IdCliente        INT             NULL,
   IdVeterinario    INT             NULL,
   IdEstado         INT             NOT NULL DEFAULT 1,
   FechaCreacion    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT FK_Usuario_Rol FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
   CONSTRAINT FK_Usuario_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado),
   CONSTRAINT FK_Usuario_Cliente FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente),
   CONSTRAINT FK_Usuario_Veterinario FOREIGN KEY (IdVeterinario) REFERENCES Veterinario(IdVeterinario)
) ENGINE=InnoDB;

-- ============================================================
-- DATOS INICIALES (catálogos)
-- ============================================================
INSERT INTO Estado (TipoEstado) VALUES ('Activo'), ('Inactivo');

INSERT INTO EstadoCita (NombreEstado) VALUES ('Pendiente'), ('Confirmada'), ('Atendida'), ('Cancelada');

INSERT INTO Rol (TipoRol) VALUES ('Admin'), ('Veterinario'), ('Cliente');

INSERT INTO Especie (NombreEspecie) VALUES ('Perro'), ('Gato'), ('Ave'), ('Conejo'), ('Otro');

INSERT INTO MetodoPago (NombreMetodoPago)
VALUES ('Efectivo'), ('Tarjeta débito'), ('Tarjeta crédito'), ('Yape'), ('Plin'), ('Transferencia');

-- ============================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ============================================================
DELIMITER $$

-- Listar citas por cliente (servicios agregados + total)
DROP PROCEDURE IF EXISTS sp_ListarCitasPorCliente $$
CREATE PROCEDURE sp_ListarCitasPorCliente (
    IN p_IdCliente INT
)
BEGIN
SELECT c.IdCita, m.NombreMascota, v.NombreVeterinario, v.ApellidoVeterinario,
       c.FechaHora, ec.NombreEstado AS EstadoCita, c.Observaciones,
       GROUP_CONCAT(s.NombreServicio SEPARATOR ', ') AS Servicios,
       COALESCE(SUM(ds.Subtotal), 0) AS Total
FROM Cita c
         INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
         INNER JOIN Veterinario v ON c.IdVeterinario = v.IdVeterinario
         INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
         LEFT JOIN DetalleServicio ds ON ds.IdCita = c.IdCita
         LEFT JOIN Servicio s ON ds.IdServicio = s.IdServicio
WHERE m.IdCliente = p_IdCliente
GROUP BY c.IdCita, m.NombreMascota, v.NombreVeterinario, v.ApellidoVeterinario,
         c.FechaHora, ec.NombreEstado, c.Observaciones
ORDER BY c.FechaHora DESC;
END $$

-- Listar citas por veterinario y fecha (servicios agregados)
DROP PROCEDURE IF EXISTS sp_ListarCitasPorVeterinario $$
CREATE PROCEDURE sp_ListarCitasPorVeterinario (
    IN p_IdVeterinario INT,
    IN p_Fecha DATE
)
BEGIN
SELECT c.IdCita, m.NombreMascota, cl.NombreCliente, cl.ApellidoCliente,
       c.FechaHora, ec.NombreEstado AS EstadoCita,
       GROUP_CONCAT(s.NombreServicio SEPARATOR ', ') AS Servicios
FROM Cita c
         INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
         INNER JOIN Cliente cl ON m.IdCliente = cl.IdCliente
         INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
         LEFT JOIN DetalleServicio ds ON ds.IdCita = c.IdCita
         LEFT JOIN Servicio s ON ds.IdServicio = s.IdServicio
WHERE c.IdVeterinario = p_IdVeterinario
  AND CAST(c.FechaHora AS DATE) = p_Fecha
GROUP BY c.IdCita, m.NombreMascota, cl.NombreCliente, cl.ApellidoCliente,
         c.FechaHora, ec.NombreEstado
ORDER BY c.FechaHora;
END $$

-- Insertar nueva cita (sin servicio directo; se agrega después)
DROP PROCEDURE IF EXISTS sp_InsertarCita $$
CREATE PROCEDURE sp_InsertarCita (
    IN p_IdMascota INT,
    IN p_IdVeterinario INT,
    IN p_FechaHora DATETIME,
    IN p_Observaciones VARCHAR(500)
)
BEGIN
INSERT INTO Cita (IdMascota, IdVeterinario, FechaHora, Observaciones)
VALUES (p_IdMascota, p_IdVeterinario, p_FechaHora, p_Observaciones);

SELECT LAST_INSERT_ID() AS IdCitaGenerada;
END $$

-- Actualizar estado de una cita (recibe el NOMBRE del estado)
DROP PROCEDURE IF EXISTS sp_ActualizarEstadoCita $$
CREATE PROCEDURE sp_ActualizarEstadoCita (
    IN p_IdCita INT,
    IN p_Estado_Cita VARCHAR(20)
)
BEGIN
    DECLARE v_IdEstadoCita INT;

SELECT IdEstadoCita INTO v_IdEstadoCita
FROM EstadoCita
WHERE NombreEstado = p_Estado_Cita
    LIMIT 1;

IF v_IdEstadoCita IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El estado de cita indicado no existe en EstadoCita.';
ELSE
UPDATE Cita
SET IdEstadoCita = v_IdEstadoCita
WHERE IdCita = p_IdCita;
END IF;
END $$

-- Agregar un servicio al detalle de una cita
DROP PROCEDURE IF EXISTS sp_AgregarDetalleServicio $$
CREATE PROCEDURE sp_AgregarDetalleServicio (
    IN p_IdCita INT,
    IN p_IdServicio INT,
    IN p_Cantidad INT,
    IN p_Observaciones VARCHAR(300)
)
BEGIN
    DECLARE v_Precio DECIMAL(8,2);

SELECT Precio INTO v_Precio FROM Servicio WHERE IdServicio = p_IdServicio;

INSERT INTO DetalleServicio (IdCita, IdServicio, Cantidad, PrecioUnitario, Observaciones)
VALUES (p_IdCita, p_IdServicio, p_Cantidad, v_Precio, p_Observaciones);

SELECT LAST_INSERT_ID() AS IdDetalleGenerado;
END $$

-- Listar el detalle de servicios de una cita
DROP PROCEDURE IF EXISTS sp_ListarDetalleServicioPorCita $$
CREATE PROCEDURE sp_ListarDetalleServicioPorCita (
    IN p_IdCita INT
)
BEGIN
SELECT ds.IdDetalleServicio, s.NombreServicio, ds.Cantidad,
       ds.PrecioUnitario, ds.Subtotal, ds.Observaciones
FROM DetalleServicio ds
         INNER JOIN Servicio s ON ds.IdServicio = s.IdServicio
WHERE ds.IdCita = p_IdCita;
END $$

-- Registrar un pago
DROP PROCEDURE IF EXISTS sp_RegistrarPago $$
CREATE PROCEDURE sp_RegistrarPago (
    IN p_IdCita INT,
    IN p_IdMetodoPago INT,
    IN p_Monto DECIMAL(8,2),
    IN p_Referencia VARCHAR(100)
)
BEGIN
INSERT INTO Pago (IdCita, IdMetodoPago, Monto, Referencia)
VALUES (p_IdCita, p_IdMetodoPago, p_Monto, p_Referencia);

SELECT LAST_INSERT_ID() AS IdPagoGenerado;
END $$

-- Listar métodos de pago disponibles
DROP PROCEDURE IF EXISTS sp_ListarMetodosPago $$
CREATE PROCEDURE sp_ListarMetodosPago ()
BEGIN
SELECT IdMetodoPago, NombreMetodoPago FROM MetodoPago;
END $$

-- Listar historial médico por mascota
DROP PROCEDURE IF EXISTS sp_ListarHistorialPorMascota $$
CREATE PROCEDURE sp_ListarHistorialPorMascota (
    IN p_IdMascota INT
)
BEGIN
SELECT h.IdHistorial, h.FechaConsulta, v.NombreVeterinario, v.ApellidoVeterinario,
       h.Diagnostico, h.Tratamiento, h.Peso, h.Temperatura, h.Observaciones
FROM HistorialMedico h
         INNER JOIN Veterinario v ON h.IdVeterinario = v.IdVeterinario
WHERE h.IdMascota = p_IdMascota
ORDER BY h.FechaConsulta DESC;
END $$

-- Listar mascotas por cliente
DROP PROCEDURE IF EXISTS sp_ListarMascotasPorCliente $$
CREATE PROCEDURE sp_ListarMascotasPorCliente (
    IN p_IdCliente INT
)
BEGIN
SELECT m.IdMascota, m.NombreMascota, e.NombreEspecie, m.Raza,
       m.FechaNacimiento, m.Sexo, m.Peso
FROM Mascota m
         INNER JOIN Especie e ON m.IdEspecie = e.IdEspecie
WHERE m.IdCliente = p_IdCliente AND m.IdEstado = 1;
END $$

-- Login: obtener usuario por correo
DROP PROCEDURE IF EXISTS sp_ObtenerUsuarioPorCorreo $$
CREATE PROCEDURE sp_ObtenerUsuarioPorCorreo (
    IN p_Correo VARCHAR(50)
)
BEGIN
SELECT u.IdUsuario, u.Correo, u.Clave, u.IdRol, r.TipoRol,
       u.IdCliente, u.IdVeterinario, u.IdEstado
FROM Usuario u
         INNER JOIN Rol r ON u.IdRol = r.IdRol
WHERE u.Correo = p_Correo AND u.IdEstado = 1;
END $$

DELIMITER ;

-- ============================================================
-- CONSULTAS DE VERIFICACIÓN
-- ============================================================
SELECT * FROM Rol;
SELECT * FROM Estado;
SELECT * FROM EstadoCita;
SELECT * FROM Especie;
SELECT * FROM MetodoPago;