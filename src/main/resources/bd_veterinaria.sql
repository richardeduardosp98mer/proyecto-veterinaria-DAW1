-- ============================================================
-- BASE DE DATOS: VeterinariaDB (versión MySQL)
-- PROPUESTA: eliminar Cita.IdServicio (Opción A)
--
-- Motivo: Cita.IdServicio directo entraba en conflicto con
-- DetalleServicio, que ya permite varios servicios por cita con
-- cantidad y precio propio (y es lo que sp_ListarCitasPorCliente
-- usa para calcular el Total, ignorando Cita.IdServicio). Una cita
-- ya no se agenda para un servicio fijo: los servicios reales se
-- registran en DetalleServicio (al agendar o al atender).
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
    IdEstado        BIGINT AUTO_INCREMENT PRIMARY KEY,
    TipoEstado      VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Rol (Admin - Veterinario - Cliente)
-- ============================================================
CREATE TABLE Rol (
    IdRol       BIGINT AUTO_INCREMENT PRIMARY KEY,
    TipoRol     VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: EstadoCita
-- ============================================================
CREATE TABLE EstadoCita (
    IdEstadoCita    BIGINT AUTO_INCREMENT PRIMARY KEY,
    NombreEstado    VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Especies
-- ============================================================
CREATE TABLE Especie (
    IdEspecie      BIGINT AUTO_INCREMENT PRIMARY KEY,
    NombreEspecie  VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Usuario (autenticación + datos personales base)
-- ============================================================
CREATE TABLE Usuario (
    IdUsuario        BIGINT AUTO_INCREMENT PRIMARY KEY,
    Nombre           VARCHAR(100)    NOT NULL,
    Apellido         VARCHAR(100)    NOT NULL,
    Correo           VARCHAR(50)     NOT NULL UNIQUE,
    Clave            VARCHAR(256)    NOT NULL,
    Celular          VARCHAR(9)      NULL,
    IdRol            BIGINT          NOT NULL DEFAULT 3, -- 1=Admin, 2=Veterinario, 3=Cliente
    IdEstado         BIGINT          NOT NULL DEFAULT 1,
    FechaCreacion    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Usuario_Rol FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
    CONSTRAINT FK_Usuario_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Cliente (dueños de mascotas)
-- ============================================================
CREATE TABLE Cliente (
    IdCliente        BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario        BIGINT         NOT NULL UNIQUE,
    DNI              VARCHAR(8)     NOT NULL UNIQUE,
    Direccion        VARCHAR(200)   NULL,
    CONSTRAINT FK_Cliente_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Veterinario
-- ============================================================
CREATE TABLE Veterinario (
    IdVeterinario        BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario            BIGINT        NOT NULL UNIQUE,
    Especialidad         VARCHAR(100)  NULL,
    NumeroColegiatura    VARCHAR(30)   NULL,
    CONSTRAINT FK_Veterinario_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Mascotas
-- ============================================================
CREATE TABLE Mascota (
    IdMascota        BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdCliente        BIGINT         NOT NULL,
    IdEspecie        BIGINT         NOT NULL,
    NombreMascota    VARCHAR(100)   NOT NULL,
    Raza             VARCHAR(100)   NULL,
    FechaNacimiento  DATE           NULL,
    Sexo             CHAR(1)        NULL,
    Peso             DECIMAL(6,2)   NULL,
    Observaciones    VARCHAR(500)   NULL,
    IdEstado         BIGINT         NOT NULL DEFAULT 1,
    CONSTRAINT FK_Mascotas_Clientes FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente),
    CONSTRAINT FK_Mascotas_Especies FOREIGN KEY (IdEspecie) REFERENCES Especie(IdEspecie),
    CONSTRAINT FK_Mascotas_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado),
    CONSTRAINT CK_Mascota_Sexo CHECK (Sexo IN ('M','H'))
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Servicios (catálogo)
-- ============================================================
CREATE TABLE Servicio (
    IdServicio        BIGINT AUTO_INCREMENT PRIMARY KEY,
    NombreServicio    VARCHAR(100)   NOT NULL,
    Descripcion       VARCHAR(300)   NULL,
    Precio            DECIMAL(8,2)   NOT NULL,
    DuracionMinutos   INT            NOT NULL DEFAULT 30,
    IdEstado          BIGINT         NOT NULL DEFAULT 1,
    CONSTRAINT FK_Servicio_Estado FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Cita
-- CAMBIO: ya no tiene IdServicio directo. Los servicios de la
-- cita se registran en DetalleServicio (uno o varios).
-- ============================================================
CREATE TABLE Cita (
    IdCita          BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdMascota       BIGINT         NOT NULL,
    IdVeterinario   BIGINT         NOT NULL,
    FechaHora       DATETIME       NOT NULL,
    IdEstadoCita    BIGINT         NOT NULL DEFAULT 1,
    Observaciones   VARCHAR(500)   NULL,
    FechaRegistro   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Citas_Mascota FOREIGN KEY (IdMascota) REFERENCES Mascota(IdMascota),
    CONSTRAINT FK_Citas_Veterinario FOREIGN KEY (IdVeterinario) REFERENCES Veterinario(IdVeterinario),
    CONSTRAINT FK_Citas_EstadoCita FOREIGN KEY (IdEstadoCita) REFERENCES EstadoCita(IdEstadoCita)
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: HistorialMedico
-- ============================================================
CREATE TABLE HistorialMedico (
    IdHistorial      BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdMascota        BIGINT         NOT NULL,
    IdVeterinario    BIGINT         NOT NULL,
    IdCita           BIGINT         NULL,
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
-- TABLA: DetalleServicio
-- Fuente única de verdad para los servicios de una Cita, con
-- el precio congelado al momento de la atención.
-- ============================================================
CREATE TABLE DetalleServicio (
    IdDetalleServicio   BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdCita              BIGINT         NOT NULL,
    IdServicio          BIGINT         NOT NULL,
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
    IdMetodoPago      BIGINT AUTO_INCREMENT PRIMARY KEY,
    NombreMetodoPago  VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- TABLA: Pago
-- ============================================================
CREATE TABLE Pago (
    IdPago          BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdCita          BIGINT         NOT NULL,
    IdMetodoPago    BIGINT         NOT NULL,
    Monto           DECIMAL(8,2)   NOT NULL,
    FechaPago       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Referencia      VARCHAR(100)   NULL,
    CONSTRAINT FK_Pago_Cita FOREIGN KEY (IdCita) REFERENCES Cita(IdCita),
    CONSTRAINT FK_Pago_MetodoPago FOREIGN KEY (IdMetodoPago) REFERENCES MetodoPago(IdMetodoPago),
    CONSTRAINT CK_Pago_Monto CHECK (Monto > 0)
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

-- Listar citas por cliente (servicios agregados + total, vía DetalleServicio)
DROP PROCEDURE IF EXISTS sp_ListarCitasPorCliente $$
CREATE PROCEDURE sp_ListarCitasPorCliente (
    IN p_IdCliente BIGINT
)
BEGIN
    SELECT c.IdCita, m.NombreMascota, u.Nombre, u.Apellido,
           c.FechaHora, ec.NombreEstado AS EstadoCita, c.Observaciones,
           GROUP_CONCAT(s.NombreServicio SEPARATOR ', ') AS Servicios,
           COALESCE(SUM(ds.Subtotal), 0) AS Total
    FROM Cita c
        INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
        INNER JOIN Veterinario v ON c.IdVeterinario = v.IdVeterinario
        INNER JOIN Usuario u ON v.IdUsuario = u.IdUsuario
        INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
        LEFT JOIN DetalleServicio ds ON ds.IdCita = c.IdCita
        LEFT JOIN Servicio s ON ds.IdServicio = s.IdServicio
    WHERE m.IdCliente = p_IdCliente
    GROUP BY c.IdCita, m.NombreMascota, u.Nombre, u.Apellido,
             c.FechaHora, ec.NombreEstado, c.Observaciones
    ORDER BY c.FechaHora DESC;
END $$

-- Listar citas por veterinario y fecha (servicios agregados, vía DetalleServicio)
DROP PROCEDURE IF EXISTS sp_ListarCitasPorVeterinario $$
CREATE PROCEDURE sp_ListarCitasPorVeterinario (
    IN p_IdVeterinario BIGINT,
    IN p_Fecha DATE
)
BEGIN
    SELECT c.IdCita, m.NombreMascota, uc.Nombre, uc.Apellido,
           c.FechaHora, ec.NombreEstado AS EstadoCita,
           GROUP_CONCAT(s.NombreServicio SEPARATOR ', ') AS Servicios
    FROM Cita c
        INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
        INNER JOIN Cliente cl ON m.IdCliente = cl.IdCliente
        INNER JOIN Usuario uc ON cl.IdUsuario = uc.IdUsuario
        INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
        LEFT JOIN DetalleServicio ds ON ds.IdCita = c.IdCita
        LEFT JOIN Servicio s ON ds.IdServicio = s.IdServicio
    WHERE c.IdVeterinario = p_IdVeterinario
      AND CAST(c.FechaHora AS DATE) = p_Fecha
    GROUP BY c.IdCita, m.NombreMascota, uc.Nombre, uc.Apellido,
             c.FechaHora, ec.NombreEstado
    ORDER BY c.FechaHora;
END $$

-- Insertar nueva cita (sin servicio directo; se agrega después vía DetalleServicio)
DROP PROCEDURE IF EXISTS sp_InsertarCita $$
CREATE PROCEDURE sp_InsertarCita (
    IN p_IdMascota BIGINT,
    IN p_IdVeterinario BIGINT,
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
    IN p_IdCita BIGINT,
    IN p_Estado_Cita VARCHAR(20)
)
BEGIN
    DECLARE v_IdEstadoCita BIGINT;

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
    IN p_IdCita BIGINT,
    IN p_IdServicio BIGINT,
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
    IN p_IdCita BIGINT
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
    IN p_IdCita BIGINT,
    IN p_IdMetodoPago BIGINT,
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
    IN p_IdMascota BIGINT
)
BEGIN
    SELECT h.IdHistorial, h.FechaConsulta, u.Nombre, u.Apellido,
           h.Diagnostico, h.Tratamiento, h.Peso, h.Temperatura, h.Observaciones
    FROM HistorialMedico h
        INNER JOIN Veterinario v ON h.IdVeterinario = v.IdVeterinario
        INNER JOIN Usuario u ON v.IdUsuario = u.IdUsuario
    WHERE h.IdMascota = p_IdMascota
    ORDER BY h.FechaConsulta DESC;
END $$

-- Listar mascotas por cliente
DROP PROCEDURE IF EXISTS sp_ListarMascotasPorCliente $$
CREATE PROCEDURE sp_ListarMascotasPorCliente (
    IN p_IdCliente BIGINT
)
BEGIN
    SELECT m.IdMascota, m.NombreMascota, e.NombreEspecie, m.Raza,
           m.FechaNacimiento, m.Sexo, m.Peso
    FROM Mascota m
        INNER JOIN Especie e ON m.IdEspecie = e.IdEspecie
    WHERE m.IdCliente = p_IdCliente AND m.IdEstado = 1;
END $$

-- Login: obtener usuario por correo (para validar credenciales en la app)
DROP PROCEDURE IF EXISTS sp_ObtenerUsuarioPorCorreo $$
CREATE PROCEDURE sp_ObtenerUsuarioPorCorreo (
    IN p_Correo VARCHAR(50)
)
BEGIN
    SELECT u.IdUsuario, u.Nombre, u.Apellido, u.Correo, u.Clave,
           u.IdRol, r.TipoRol, u.IdEstado,
           cl.IdCliente, v.IdVeterinario
    FROM Usuario u
        INNER JOIN Rol r ON u.IdRol = r.IdRol
        LEFT JOIN Cliente cl ON cl.IdUsuario = u.IdUsuario
        LEFT JOIN Veterinario v ON v.IdUsuario = u.IdUsuario
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
