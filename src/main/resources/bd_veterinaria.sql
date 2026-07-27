-- ============================================================
-- BASE DE DATOS: VeterinariaDB (versión MySQL)
-- Ajustes aplicados:
--   - Todas las PK/FK migradas de INT a BIGINT (consistente con Long en JPA)
--   - Usuario ahora es la tabla padre: Nombre, Apellido, Correo, Clave,
--     Celular, IdRol, IdEstado
--   - Cliente y Veterinario referencian a Usuario mediante IdUsuario
--     (UNIQUE => relación 1 a 1), ya no contienen Nombre/Apellido/
--     Email/Telefono/IdEstado
--   - Cliente y Veterinario ya no tienen FechaRegistro (se usa
--     Usuario.FechaCreacion)
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
-- TABLA: Servicios
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
-- TABLA: Citas
-- ============================================================
CREATE TABLE Cita (
    IdCita          BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdMascota       BIGINT         NOT NULL,
    IdVeterinario   BIGINT         NOT NULL,
    IdServicio      BIGINT         NOT NULL,
    FechaHora       DATETIME       NOT NULL,
    IdEstadoCita    BIGINT         NOT NULL DEFAULT 1,
    Observaciones   VARCHAR(500)   NULL,
    FechaRegistro   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Citas_Mascota FOREIGN KEY (IdMascota) REFERENCES Mascota(IdMascota),
    CONSTRAINT FK_Citas_Veterinario FOREIGN KEY (IdVeterinario) REFERENCES Veterinario(IdVeterinario),
    CONSTRAINT FK_Citas_Servicio FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio),
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
-- INSERTANDO DATOS
-- ============================================================
INSERT INTO Estado (TipoEstado) VALUES ('Activo'), ('Inactivo');

INSERT INTO EstadoCita (NombreEstado) VALUES ('Pendiente'), ('Confirmada'), ('Atendida'), ('Cancelada');

INSERT INTO Rol (TipoRol) VALUES ('Admin'), ('Veterinario'), ('Cliente');

INSERT INTO Especie (NombreEspecie) VALUES ('Perro'), ('Gato'), ('Ave'), ('Conejo'), ('Otro');

-- ============================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ============================================================

DELIMITER $$

-- Listar citas por cliente
DROP PROCEDURE IF EXISTS sp_ListarCitasPorCliente $$
CREATE PROCEDURE sp_ListarCitasPorCliente (
    IN p_IdCliente BIGINT
)
BEGIN
    SELECT c.IdCita, m.NombreMascota, u.Nombre, u.Apellido,
           s.NombreServicio, c.FechaHora, ec.NombreEstado, c.Observaciones
    FROM Cita c
    INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
    INNER JOIN Veterinario v ON c.IdVeterinario = v.IdVeterinario
    INNER JOIN Usuario u ON v.IdUsuario = u.IdUsuario
    INNER JOIN Servicio s ON c.IdServicio = s.IdServicio
    INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
    WHERE m.IdCliente = p_IdCliente
    ORDER BY c.FechaHora DESC;
END $$

-- Listar citas por veterinario y fecha
DROP PROCEDURE IF EXISTS sp_ListarCitasPorVeterinario $$
CREATE PROCEDURE sp_ListarCitasPorVeterinario (
    IN p_IdVeterinario BIGINT,
    IN p_Fecha DATE
)
BEGIN
    SELECT c.IdCita, m.NombreMascota, uc.Nombre, uc.Apellido,
           s.NombreServicio, c.FechaHora, ec.NombreEstado
    FROM Cita c
    INNER JOIN Mascota m ON c.IdMascota = m.IdMascota
    INNER JOIN Cliente cl ON m.IdCliente = cl.IdCliente
    INNER JOIN Usuario uc ON cl.IdUsuario = uc.IdUsuario
    INNER JOIN Servicio s ON c.IdServicio = s.IdServicio
    INNER JOIN EstadoCita ec ON c.IdEstadoCita = ec.IdEstadoCita
    WHERE c.IdVeterinario = p_IdVeterinario
      AND CAST(c.FechaHora AS DATE) = p_Fecha
    ORDER BY c.FechaHora;
END $$

-- Insertar nueva cita
DROP PROCEDURE IF EXISTS sp_InsertarCita $$
CREATE PROCEDURE sp_InsertarCita (
    IN p_IdMascota BIGINT,
    IN p_IdVeterinario BIGINT,
    IN p_IdServicio BIGINT,
    IN p_FechaHora DATETIME,
    IN p_Observaciones VARCHAR(500)
)
BEGIN
    INSERT INTO Cita (IdMascota, IdVeterinario, IdServicio, FechaHora, Observaciones)
    VALUES (p_IdMascota, p_IdVeterinario, p_IdServicio, p_FechaHora, p_Observaciones);

    SELECT LAST_INSERT_ID() AS IdCitaGenerada;
END $$

-- Actualizar estado de una cita
DROP PROCEDURE IF EXISTS sp_ActualizarEstadoCita $$
CREATE PROCEDURE sp_ActualizarEstadoCita (
    IN p_IdCita BIGINT,
    IN p_IdEstadoCita BIGINT
)
BEGIN
    UPDATE Cita SET IdEstadoCita = p_IdEstadoCita WHERE IdCita = p_IdCita;
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
-- CONSULTAS SELECT
-- ============================================================
SELECT * FROM Rol;
SELECT * FROM Estado;
SELECT * FROM Especie;