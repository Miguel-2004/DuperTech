-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-09-2024 a las 20:45:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_tarjetas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `ID_Admin` int(11) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Contrasenia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`ID_Admin`, `Usuario`, `Nombre`, `Contrasenia`) VALUES
(1, '100000@gmail.com', 'Santiago García', 'password1'),
(2, '100001', 'Valeria Hernández', 'password2'),
(3, '100002', 'Camila Rodríguez', 'password3'),
(4, '100003', 'Mateo López', 'password4'),
(5, '100004', 'Sofía Martínez', 'password5'),
(6, '100005', 'Sebastián González', 'password6'),
(7, '100006', 'Emma Pérez', 'password7'),
(8, '100007', 'Daniel Sánchez', 'password8'),
(9, '100008', 'Isabella Gómez', 'password9'),
(10, '100009', 'Martín Jiménez', 'password10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_Cliente` int(11) NOT NULL,
  `Nombre_Cliente` varchar(100) NOT NULL,
  `Telefono_Cliente` varchar(15) NOT NULL,
  `Fecha_Nac` date NOT NULL,
  `Sexo` enum('M','F') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_Cliente`, `Nombre_Cliente`, `Telefono_Cliente`, `Fecha_Nac`, `Sexo`) VALUES
(1, 'Carlos Pérez', '5551234101', '1990-05-15', 'M'),
(2, 'Ana López', '5551234102', '1985-03-20', 'F'),
(3, 'Luis Martínez', '5551234103', '1988-11-08', 'M'),
(4, 'Sofía Torres', '5551234104', '1992-07-18', 'F'),
(5, 'María Rodríguez', '5551234105', '1980-04-30', 'F'),
(6, 'Pedro Gómez', '5551234106', '1987-09-12', 'M'),
(7, 'Fernanda Gutiérrez', '5551234107', '1995-02-22', 'F'),
(8, 'Jorge Jiménez', '5551234108', '1993-01-25', 'M'),
(9, 'Claudia Fernández', '5551234109', '1989-12-13', 'F'),
(10, 'Arturo Reyes', '5551234110', '1991-08-20', 'M'),
(11, 'Paula Castro', '5551234111', '1994-07-09', 'F'),
(12, 'Ricardo Morales', '5551234112', '1990-02-10', 'M'),
(13, 'Laura Ramírez', '5551234113', '1993-05-05', 'F'),
(14, 'Francisco Ortega', '5551234114', '1985-09-28', 'M'),
(15, 'Gabriela Muñoz', '5551234115', '1988-04-14', 'F'),
(16, 'Andrés Castillo', '5551234116', '1991-10-31', 'M'),
(17, 'Lucía Serrano', '5551234117', '1992-12-01', 'F'),
(18, 'Miguel Herrera', '5551234118', '1985-06-23', 'M'),
(19, 'Santiago Medina', '5551234119', '1994-11-07', 'M'),
(20, 'Mariana Cortés', '5551234120', '1995-08-13', 'F'),
(21, 'Verónica Vázquez', '5551234121', '1990-01-29', 'F'),
(22, 'Joaquín Ramírez', '5551234122', '1987-11-10', 'M'),
(23, 'Sara Aguirre', '5551234123', '1985-03-30', 'F'),
(24, 'Diego Flores', '5551234124', '1993-07-18', 'M'),
(25, 'Mónica Núñez', '5551234125', '1992-10-21', 'F'),
(26, 'Daniel González', '5551234126', '1988-09-17', 'M'),
(27, 'Patricia Romero', '5551234127', '1989-02-16', 'F'),
(28, 'Pablo Estrada', '5551234128', '1990-08-08', 'M'),
(29, 'Beatriz Jiménez', '5551234129', '1987-05-12', 'F'),
(30, 'Martín Peña', '5551234130', '1991-09-22', 'M'),
(31, 'Elsa Castro', '5551234131', '1989-11-03', 'F'),
(32, 'Jorge Paredes', '5551234132', '1992-12-05', 'M'),
(33, 'Florencia Gómez', '5551234133', '1986-10-27', 'F'),
(34, 'Raúl Santiago', '5551234134', '1993-02-15', 'M'),
(35, 'Irene Delgado', '5551234135', '1994-06-20', 'F'),
(36, 'Rodrigo Vargas', '5551234136', '1990-12-11', 'M'),
(37, 'Cecilia Salinas', '5551234137', '1989-04-07', 'F'),
(38, 'Samuel Robles', '5551234138', '1991-03-09', 'M'),
(39, 'Mariana Rivera', '5551234139', '1992-11-16', 'F'),
(40, 'Fernando Fuentes', '5551234140', '1993-05-13', 'M'),
(41, 'Alberto Cruz', '5551234141', '1987-02-03', 'M'),
(42, 'Laura Sandoval', '5551234142', '1995-09-29', 'F'),
(43, 'Santiago Vázquez', '5551234143', '1990-08-12', 'M'),
(44, 'Alejandra López', '5551234144', '1991-07-04', 'F'),
(45, 'Claudio Pérez', '5551234145', '1990-01-15', 'M'),
(46, 'Isabel Castro', '5551234146', '1988-12-22', 'F'),
(47, 'Luis Ramírez', '5551234147', '1986-05-17', 'M'),
(48, 'Cristina González', '5551234148', '1993-06-05', 'F'),
(49, 'Carlos Luna', '5551234149', '1994-03-22', 'M'),
(50, 'Ana Carrillo', '5551234150', '1990-10-11', 'F'),
(51, 'Víctor Peña', '5551234151', '1995-01-30', 'M'),
(52, 'Eva Díaz', '5551234152', '1991-09-07', 'F'),
(53, 'Luciano Gutiérrez', '5551234153', '1992-05-19', 'M'),
(54, 'Elena Fernández', '5551234154', '1994-02-14', 'F'),
(55, 'Ignacio Ruiz', '5551234155', '1993-12-09', 'M'),
(56, 'Patricia Ortega', '5551234156', '1992-03-02', 'F'),
(57, 'Carmen Medina', '5551234157', '1989-07-29', 'F'),
(58, 'Luis Fernández', '5551234158', '1991-05-03', 'M'),
(59, 'Gloria Herrera', '5551234159', '1993-08-25', 'F'),
(60, 'Jorge Castillo', '5551234160', '1994-11-02', 'M'),
(61, 'Adriana Vargas', '5551234161', '1990-04-19', 'F'),
(62, 'David Ponce', '5551234162', '1987-08-30', 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `ID_Empleado` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `ID_Admin` int(11) NOT NULL,
  `Nombre_Empleado` varchar(100) NOT NULL,
  `Telefono_Empleado` varchar(15) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Contrasenia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`ID_Empleado`, `ID_Establecimiento`, `ID_Admin`, `Nombre_Empleado`, `Telefono_Empleado`, `Usuario`, `Contrasenia`) VALUES
(31, 1, 1, 'Javier Castillo', '5551234001', '200000', 'passwordEmp1'),
(32, 1, 1, 'Mariana Ruiz', '5551234002', '200001', 'passwordEmp2'),
(33, 2, 2, 'Pablo Romero', '5551234003', '200002', 'passwordEmp3'),
(34, 2, 2, 'Sara Ramírez', '5551234004', '200003', 'passwordEmp4'),
(35, 3, 3, 'Gabriel Torres', '5551234005', '200004', 'passwordEmp5'),
(36, 3, 3, 'Lucía Morales', '5551234006', '200005', 'passwordEmp6'),
(37, 4, 4, 'Andrés Flores', '5551234007', '200006', 'passwordEmp7'),
(38, 4, 4, 'Elena Castillo', '5551234008', '200007', 'passwordEmp8'),
(39, 5, 5, 'Juan Vega', '5551234009', '200008', 'passwordEmp9'),
(40, 5, 5, 'Fernanda Pacheco', '5551234010', '200009', 'passwordEmp10'),
(41, 6, 6, 'Rodrigo Delgado', '5551234011', '200010', 'passwordEmp11'),
(42, 6, 6, 'Natalia Aguirre', '5551234012', '200011', 'passwordEmp12'),
(43, 7, 7, 'Miguel Cruz', '5551234013', '200012', 'passwordEmp13'),
(44, 7, 7, 'Paola Espinoza', '5551234014', '200013', 'passwordEmp14'),
(45, 8, 8, 'David Estrada', '5551234015', '200014', 'passwordEmp15'),
(46, 8, 8, 'Laura Vázquez', '5551234016', '200015', 'passwordEmp16'),
(47, 9, 9, 'Carlos Reyes', '5551234017', '200016', 'passwordEmp17'),
(48, 9, 9, 'Andrea Montes', '5551234018', '200017', 'passwordEmp18'),
(49, 10, 10, 'Manuel Cortés', '5551234019', '200018', 'passwordEmp19'),
(50, 10, 10, 'Julia Ortega', '5551234020', '200019', 'passwordEmp20'),
(51, 1, 1, 'Alejandro Maldonado', '5551234021', '200020', 'passwordEmp21'),
(52, 2, 2, 'Irene Pérez', '5551234022', '200021', 'passwordEmp22'),
(53, 3, 3, 'Sergio Herrera', '5551234023', '200022', 'passwordEmp23'),
(54, 4, 4, 'Diana Navarro', '5551234024', '200023', 'passwordEmp24'),
(55, 5, 5, 'Mario Valdez', '5551234025', '200024', 'passwordEmp25'),
(56, 6, 6, 'Rosa Medina', '5551234026', '200025', 'passwordEmp26'),
(57, 7, 7, 'Iván Serrano', '5551234027', '200026', 'passwordEmp27'),
(58, 8, 8, 'Claudia Figueroa', '5551234028', '200027', 'passwordEmp28'),
(59, 9, 9, 'Eduardo Rivera', '5551234029', '200028', 'passwordEmp29'),
(60, 10, 10, 'Patricia Silva', '5551234030', '200028', 'passwordEmp30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimiento`
--

CREATE TABLE `establecimiento` (
  `ID_Establecimiento` int(11) NOT NULL,
  `Nombre_Establecimiento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `establecimiento`
--

INSERT INTO `establecimiento` (`ID_Establecimiento`, `Nombre_Establecimiento`) VALUES
(1, 'Chilaquiles La Abuela'),
(2, 'Chilaquiles Doña Lucha'),
(3, 'Chilaquiles Express'),
(4, 'Chilaquiles del Pueblo'),
(5, 'Los Chilaquiles Originales'),
(6, 'Chilaquiles y Más'),
(7, 'Chilaquiles Don Pepe'),
(8, 'Chilaquiles Gourmet'),
(9, 'Chilaquiles con Sabor'),
(10, 'Los Mejores Chilaquiles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamacion_recompensa`
--

CREATE TABLE `reclamacion_recompensa` (
  `ID_Reclamacion` int(11) NOT NULL,
  `Fecha_Reclamacion` date NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `ID_Recompensa` int(11) NOT NULL,
  `Evidencia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reclamacion_recompensa`
--

INSERT INTO `reclamacion_recompensa` (`ID_Reclamacion`, `Fecha_Reclamacion`, `ID_Cliente`, `ID_Recompensa`, `Evidencia`) VALUES
(61, '2024-06-01', 1, 1, 'foto_reclamacion_1.jpg'),
(62, '2024-06-02', 2, 2, 'foto_reclamacion_2.jpg'),
(63, '2024-06-03', 3, 3, 'foto_reclamacion_3.jpg'),
(64, '2024-06-04', 4, 4, 'foto_reclamacion_4.jpg'),
(65, '2024-06-05', 5, 5, 'foto_reclamacion_5.jpg'),
(66, '2024-06-06', 6, 6, 'foto_reclamacion_6.jpg'),
(67, '2024-06-07', 7, 7, 'foto_reclamacion_7.jpg'),
(68, '2024-06-08', 8, 8, 'foto_reclamacion_8.jpg'),
(69, '2024-06-09', 9, 9, 'foto_reclamacion_9.jpg'),
(70, '2024-06-10', 10, 10, 'foto_reclamacion_10.jpg'),
(71, '2024-06-11', 11, 11, 'foto_reclamacion_11.jpg'),
(72, '2024-06-12', 12, 12, 'foto_reclamacion_12.jpg'),
(73, '2024-06-13', 13, 13, 'foto_reclamacion_13.jpg'),
(74, '2024-06-14', 14, 14, 'foto_reclamacion_14.jpg'),
(75, '2024-06-15', 15, 15, 'foto_reclamacion_15.jpg'),
(76, '2024-06-16', 16, 16, 'foto_reclamacion_16.jpg'),
(77, '2024-06-17', 17, 17, 'foto_reclamacion_17.jpg'),
(78, '2024-06-18', 18, 18, 'foto_reclamacion_18.jpg'),
(79, '2024-06-19', 19, 19, 'foto_reclamacion_19.jpg'),
(80, '2024-06-20', 20, 20, 'foto_reclamacion_20.jpg'),
(81, '2024-06-21', 21, 21, 'foto_reclamacion_21.jpg'),
(82, '2024-06-22', 22, 22, 'foto_reclamacion_22.jpg'),
(83, '2024-06-23', 23, 23, 'foto_reclamacion_23.jpg'),
(84, '2024-06-24', 24, 24, 'foto_reclamacion_24.jpg'),
(85, '2024-06-25', 25, 25, 'foto_reclamacion_25.jpg'),
(86, '2024-06-26', 1, 1, 'foto_reclamacion_26.jpg'),
(87, '2024-06-27', 2, 2, 'foto_reclamacion_27.jpg'),
(88, '2024-06-28', 3, 3, 'foto_reclamacion_28.jpg'),
(89, '2024-06-29', 4, 4, 'foto_reclamacion_29.jpg'),
(90, '2024-06-30', 5, 5, 'foto_reclamacion_30.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensa`
--

CREATE TABLE `recompensa` (
  `ID_Recompensa` int(11) NOT NULL,
  `Nombre_Recompensa` varchar(100) NOT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Final` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensa`
--

INSERT INTO `recompensa` (`ID_Recompensa`, `Nombre_Recompensa`, `Fecha_Inicio`, `Fecha_Final`) VALUES
(1, 'Chilaquiles Gratis', '2024-01-01', '2024-06-30'),
(2, 'Descuento en Chilaquiles', '2024-02-01', '2024-07-31'),
(3, 'Bebida Gratis con Chilaquiles', '2024-03-01', '2024-08-30'),
(4, 'Chilaquiles para Dos', '2024-04-01', '2024-09-30'),
(5, 'Orden Doble de Chilaquiles', '2024-05-01', '2024-10-31'),
(6, 'Chilaquiles Especiales', '2024-06-01', '2024-11-30'),
(7, 'Postre Gratis con Chilaquiles', '2024-07-01', '2024-12-31'),
(8, 'Chilaquiles al 2x1', '2024-08-01', '2025-01-31'),
(9, 'Chilaquiles con Extra Queso', '2024-09-01', '2025-02-28'),
(10, 'Chilaquiles con Todo', '2024-10-01', '2025-03-31'),
(11, 'Chilaquiles Tradicionales', '2024-11-01', '2025-04-30'),
(12, 'Chilaquiles con Salsa Especial', '2024-12-01', '2025-05-31'),
(13, 'Chilaquiles con Aguacate Gratis', '2025-01-01', '2025-06-30'),
(14, 'Chilaquiles a Precio Especial', '2025-02-01', '2025-07-31'),
(15, 'Chilaquiles Verdes', '2025-03-01', '2025-08-31'),
(16, 'Chilaquiles Rojos', '2025-04-01', '2025-09-30'),
(17, 'Chilaquiles de la Casa', '2025-05-01', '2025-10-31'),
(18, 'Chilaquiles de Temporada', '2025-06-01', '2025-11-30'),
(19, 'Chilaquiles con Extra Pollo', '2025-07-01', '2025-12-31'),
(20, 'Chilaquiles Super Combinación', '2025-08-01', '2026-01-31'),
(21, 'Chilaquiles Gratis', '2024-01-01', '2024-06-30'),
(22, 'Descuento en Chilaquiles', '2024-02-01', '2024-07-31'),
(23, 'Bebida Gratis con Chilaquiles', '2024-03-01', '2024-08-30'),
(24, 'Chilaquiles para Dos', '2024-04-01', '2024-09-30'),
(25, 'Orden Doble de Chilaquiles', '2024-05-01', '2024-10-31'),
(26, 'Chilaquiles Especiales', '2024-06-01', '2024-11-30'),
(27, 'Postre Gratis con Chilaquiles', '2024-07-01', '2024-12-31'),
(28, 'Chilaquiles al 2x1', '2024-08-01', '2025-01-31'),
(29, 'Chilaquiles con Extra Queso', '2024-09-01', '2025-02-28'),
(30, 'Chilaquiles con Todo', '2024-10-01', '2025-03-31'),
(31, 'Chilaquiles Tradicionales', '2024-11-01', '2025-04-30'),
(32, 'Chilaquiles con Salsa Especial', '2024-12-01', '2025-05-31'),
(33, 'Chilaquiles con Aguacate Gratis', '2025-01-01', '2025-06-30'),
(34, 'Chilaquiles a Precio Especial', '2025-02-01', '2025-07-31'),
(35, 'Chilaquiles Verdes', '2025-03-01', '2025-08-31'),
(36, 'Chilaquiles Rojos', '2025-04-01', '2025-09-30'),
(37, 'Chilaquiles de la Casa', '2025-05-01', '2025-10-31'),
(38, 'Chilaquiles de Temporada', '2025-06-01', '2025-11-30'),
(39, 'Chilaquiles con Extra Pollo', '2025-07-01', '2025-12-31'),
(40, 'Chilaquiles Super Combinación', '2025-08-01', '2026-01-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regalo`
--

CREATE TABLE `regalo` (
  `ID_Regalo` int(11) NOT NULL,
  `ID_Recompensa` int(11) NOT NULL,
  `Nombre_Regalo` varchar(100) NOT NULL,
  `Descripcion_Regalo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `regalo`
--

INSERT INTO `regalo` (`ID_Regalo`, `ID_Recompensa`, `Nombre_Regalo`, `Descripcion_Regalo`) VALUES
(31, 1, 'Orden Gratis de Chilaquiles', 'Recibe una orden gratis de chilaquiles en nuestra sucursal'),
(32, 2, 'Bebida Gratis', 'Obtén una bebida gratis con tu orden de chilaquiles'),
(33, 3, 'Descuento del 50%', 'Recibe un 50% de descuento en tu próxima orden de chilaquiles'),
(34, 4, 'Orden Doble de Chilaquiles', 'Paga una orden y recibe otra gratis'),
(35, 5, 'Chilaquiles para Dos', 'Chilaquiles para dos personas al precio de uno'),
(36, 6, 'Postre Gratis', 'Obtén un postre gratis con tu orden de chilaquiles'),
(37, 7, 'Chilaquiles Especiales', 'Orden especial de chilaquiles con ingredientes adicionales'),
(38, 8, 'Chilaquiles al 2x1', 'Disfruta de una promoción 2x1 en chilaquiles'),
(39, 9, 'Orden con Extra Queso', 'Recibe una porción adicional de queso en tus chilaquiles'),
(40, 10, 'Chilaquiles con Todo', 'Orden de chilaquiles con todos los ingredientes adicionales'),
(41, 11, 'Chilaquiles Tradicionales', 'Disfruta de nuestros chilaquiles tradicionales con salsa roja'),
(42, 12, 'Salsa Especial Gratis', 'Añade nuestra salsa especial sin costo adicional'),
(43, 13, 'Chilaquiles con Aguacate', 'Incluye aguacate gratis en tu orden de chilaquiles'),
(44, 14, 'Descuento Especial en Chilaquiles', 'Recibe un descuento especial en tu próxima orden de chilaquiles'),
(45, 15, 'Chilaquiles Verdes', 'Orden de chilaquiles con salsa verde y extra queso'),
(46, 16, 'Chilaquiles Rojos', 'Orden de chilaquiles con salsa roja y un toque picante'),
(47, 17, 'Chilaquiles de la Casa', 'Prueba nuestra receta secreta de chilaquiles'),
(48, 18, 'Chilaquiles de Temporada', 'Disfruta de nuestros chilaquiles con ingredientes de temporada'),
(49, 19, 'Chilaquiles con Extra Pollo', 'Añade pollo extra a tu orden de chilaquiles'),
(50, 20, 'Chilaquiles Super Combinación', 'Una combinación especial de chilaquiles y otros platillos'),
(51, 1, 'Orden Familiar de Chilaquiles', 'Orden grande de chilaquiles para compartir con la familia'),
(52, 2, 'Chilaquiles Gourmet', 'Orden de chilaquiles con ingredientes gourmet adicionales'),
(53, 3, 'Chilaquiles con Salsa Especial', 'Añade nuestra salsa especial sin costo a tu orden'),
(54, 4, 'Chilaquiles con Queso Extra', 'Añade una porción extra de queso a tus chilaquiles'),
(55, 5, 'Chilaquiles al Estilo Mexicano', 'Chilaquiles servidos con ingredientes típicos mexicanos'),
(56, 6, 'Orden Doble con Bebida Gratis', 'Recibe una bebida gratis al pedir una orden doble de chilaquiles'),
(57, 7, 'Chilaquiles con Pollo Extra', 'Añade extra pollo a tu orden de chilaquiles'),
(58, 8, 'Chilaquiles con Todo', 'Chilaquiles servidos con todos los ingredientes disponibles'),
(59, 9, 'Salsa Roja Especial', 'Prueba nuestra salsa roja especial sin costo adicional'),
(60, 10, 'Chilaquiles Verdes con Aguacate', 'Incluye aguacate gratis en tu orden de chilaquiles verdes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sello`
--

CREATE TABLE `sello` (
  `Sello_ID` int(11) NOT NULL,
  `ID_Tarjeta` int(11) NOT NULL,
  `ID_Empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sello`
--

INSERT INTO `sello` (`Sello_ID`, `ID_Tarjeta`, `ID_Empleado`) VALUES
(285, 1, 31),
(286, 1, 32),
(287, 2, 33),
(288, 2, 34),
(289, 3, 35),
(290, 3, 36),
(291, 4, 37),
(292, 4, 38),
(293, 5, 39),
(294, 5, 40),
(295, 6, 41),
(296, 6, 42),
(297, 7, 43),
(298, 7, 44),
(299, 8, 45),
(300, 8, 46),
(301, 9, 47),
(302, 9, 48),
(303, 10, 49),
(304, 10, 50),
(305, 11, 51),
(306, 11, 52),
(307, 12, 53),
(308, 12, 54),
(309, 13, 55),
(310, 13, 56),
(311, 14, 57),
(312, 14, 58),
(313, 15, 59),
(314, 15, 60),
(315, 16, 31),
(316, 16, 32),
(317, 17, 33),
(318, 17, 34),
(319, 18, 35),
(320, 18, 36),
(321, 19, 37),
(322, 19, 38),
(323, 20, 39),
(324, 20, 40),
(325, 21, 41),
(326, 21, 42),
(327, 22, 43),
(328, 22, 44),
(329, 23, 45),
(330, 23, 46),
(331, 24, 47),
(332, 24, 48),
(333, 25, 49),
(334, 25, 50),
(335, 26, 51),
(336, 26, 52),
(337, 27, 53),
(338, 27, 54),
(339, 28, 55),
(340, 28, 56),
(341, 29, 57),
(342, 29, 58),
(343, 30, 59),
(344, 30, 60),
(345, 31, 31),
(346, 31, 32),
(347, 32, 33),
(348, 32, 34),
(349, 33, 35),
(350, 33, 36),
(351, 34, 37),
(352, 34, 38),
(353, 35, 39),
(354, 35, 40),
(355, 36, 41),
(356, 36, 42),
(357, 37, 43),
(358, 37, 44),
(359, 38, 45),
(360, 38, 46),
(361, 39, 47),
(362, 39, 48),
(363, 40, 49),
(364, 40, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `ID_Tarjeta` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `ID_Establecimiento` int(11) NOT NULL,
  `Numero_Sellos` int(11) NOT NULL DEFAULT 0,
  `Fecha_Emision` date NOT NULL,
  `Version` int(11) NOT NULL DEFAULT 1,
  `Monto_Compra` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Tarjetas_Complet` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`ID_Tarjeta`, `ID_Cliente`, `ID_Establecimiento`, `Numero_Sellos`, `Fecha_Emision`, `Version`, `Monto_Compra`, `Tarjetas_Complet`) VALUES
(1, 1, 1, 10, '2024-01-01', 3, 150.00, 4),
(2, 2, 2, 7, '2024-02-01', 4, 120.00, 3),
(3, 3, 3, 5, '2024-03-05', 2, 90.00, 2),
(4, 4, 4, 9, '2024-04-10', 1, 200.00, 5),
(5, 5, 5, 8, '2024-05-12', 2, 100.00, 4),
(6, 6, 6, 6, '2024-06-14', 3, 140.00, 3),
(7, 7, 7, 7, '2024-07-01', 4, 130.00, 2),
(8, 8, 8, 4, '2024-08-03', 1, 110.00, 5),
(9, 9, 9, 10, '2024-09-04', 3, 180.00, 5),
(10, 10, 10, 9, '2024-10-05', 2, 160.00, 4),
(11, 11, 1, 6, '2024-01-11', 5, 90.00, 3),
(12, 12, 2, 7, '2024-02-15', 4, 120.00, 4),
(13, 13, 3, 8, '2024-03-17', 1, 140.00, 2),
(14, 14, 4, 5, '2024-04-21', 3, 110.00, 3),
(15, 15, 5, 9, '2024-05-24', 2, 180.00, 5),
(16, 16, 6, 7, '2024-06-26', 5, 130.00, 4),
(17, 17, 7, 8, '2024-07-29', 4, 150.00, 3),
(18, 18, 8, 10, '2024-08-30', 1, 170.00, 5),
(19, 19, 9, 6, '2024-09-02', 3, 120.00, 4),
(20, 20, 10, 5, '2024-10-06', 2, 100.00, 2),
(21, 21, 1, 8, '2024-01-12', 4, 140.00, 4),
(22, 22, 2, 7, '2024-02-16', 1, 160.00, 5),
(23, 23, 3, 9, '2024-03-18', 2, 180.00, 4),
(24, 24, 4, 6, '2024-04-22', 5, 130.00, 3),
(25, 25, 5, 10, '2024-05-25', 3, 150.00, 2),
(26, 26, 6, 9, '2024-06-27', 4, 110.00, 4),
(27, 27, 7, 8, '2024-07-30', 1, 170.00, 5),
(28, 28, 8, 7, '2024-08-31', 5, 130.00, 3),
(29, 29, 9, 5, '2024-09-03', 2, 150.00, 4),
(30, 30, 10, 6, '2024-10-07', 3, 100.00, 5),
(31, 31, 1, 10, '2024-01-13', 4, 140.00, 2),
(32, 32, 2, 9, '2024-02-17', 5, 110.00, 4),
(33, 33, 3, 8, '2024-03-19', 1, 170.00, 3),
(34, 34, 4, 7, '2024-04-23', 2, 160.00, 5),
(35, 35, 5, 6, '2024-05-26', 3, 150.00, 2),
(36, 36, 6, 10, '2024-06-28', 4, 130.00, 4),
(37, 37, 7, 5, '2024-07-31', 5, 140.00, 3),
(38, 38, 8, 9, '2024-08-01', 2, 120.00, 5),
(39, 39, 9, 6, '2024-09-05', 1, 180.00, 2),
(40, 40, 10, 8, '2024-10-08', 3, 170.00, 4),
(41, 41, 1, 7, '2024-01-14', 5, 100.00, 4),
(42, 42, 2, 6, '2024-02-18', 1, 140.00, 3),
(43, 43, 3, 10, '2024-03-20', 4, 160.00, 5),
(44, 44, 4, 5, '2024-04-24', 2, 110.00, 2),
(45, 45, 5, 9, '2024-05-27', 3, 180.00, 5),
(46, 46, 6, 8, '2024-06-29', 4, 130.00, 3),
(47, 47, 7, 7, '2024-07-01', 5, 150.00, 4),
(48, 48, 8, 6, '2024-08-02', 1, 170.00, 2),
(49, 49, 9, 10, '2024-09-06', 2, 100.00, 5),
(50, 50, 10, 5, '2024-10-09', 3, 140.00, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`ID_Admin`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_Cliente`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`ID_Empleado`),
  ADD KEY `ID_Establecimiento` (`ID_Establecimiento`),
  ADD KEY `ID_Admin` (`ID_Admin`);

--
-- Indices de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  ADD PRIMARY KEY (`ID_Establecimiento`);

--
-- Indices de la tabla `reclamacion_recompensa`
--
ALTER TABLE `reclamacion_recompensa`
  ADD PRIMARY KEY (`ID_Reclamacion`),
  ADD KEY `ID_Cliente` (`ID_Cliente`),
  ADD KEY `ID_Recompensa` (`ID_Recompensa`);

--
-- Indices de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  ADD PRIMARY KEY (`ID_Recompensa`);

--
-- Indices de la tabla `regalo`
--
ALTER TABLE `regalo`
  ADD PRIMARY KEY (`ID_Regalo`),
  ADD KEY `ID_Recompensa` (`ID_Recompensa`);

--
-- Indices de la tabla `sello`
--
ALTER TABLE `sello`
  ADD PRIMARY KEY (`Sello_ID`),
  ADD KEY `ID_Tarjeta` (`ID_Tarjeta`),
  ADD KEY `ID_Empleado` (`ID_Empleado`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`ID_Tarjeta`),
  ADD KEY `ID_Cliente` (`ID_Cliente`),
  ADD KEY `ID_Establecimiento` (`ID_Establecimiento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `ID_Admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `ID_Empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  MODIFY `ID_Establecimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reclamacion_recompensa`
--
ALTER TABLE `reclamacion_recompensa`
  MODIFY `ID_Reclamacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  MODIFY `ID_Recompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `regalo`
--
ALTER TABLE `regalo`
  MODIFY `ID_Regalo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `sello`
--
ALTER TABLE `sello`
  MODIFY `Sello_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=365;

--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `ID_Tarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimiento` (`ID_Establecimiento`),
  ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`ID_Admin`) REFERENCES `administrador` (`ID_Admin`);

--
-- Filtros para la tabla `reclamacion_recompensa`
--
ALTER TABLE `reclamacion_recompensa`
  ADD CONSTRAINT `reclamacion_recompensa_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`),
  ADD CONSTRAINT `reclamacion_recompensa_ibfk_2` FOREIGN KEY (`ID_Recompensa`) REFERENCES `recompensa` (`ID_Recompensa`);

--
-- Filtros para la tabla `regalo`
--
ALTER TABLE `regalo`
  ADD CONSTRAINT `regalo_ibfk_1` FOREIGN KEY (`ID_Recompensa`) REFERENCES `recompensa` (`ID_Recompensa`);

--
-- Filtros para la tabla `sello`
--
ALTER TABLE `sello`
  ADD CONSTRAINT `sello_ibfk_1` FOREIGN KEY (`ID_Tarjeta`) REFERENCES `tarjeta` (`ID_Tarjeta`),
  ADD CONSTRAINT `sello_ibfk_2` FOREIGN KEY (`ID_Empleado`) REFERENCES `empleado` (`ID_Empleado`);

--
-- Filtros para la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`),
  ADD CONSTRAINT `tarjeta_ibfk_2` FOREIGN KEY (`ID_Establecimiento`) REFERENCES `establecimiento` (`ID_Establecimiento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
