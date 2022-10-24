-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Okt 2022 pada 03.29
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_users`
--

CREATE TABLE `role_users` (
  `id` int(11) NOT NULL,
  `roles` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `role_users`
--

INSERT INTO `role_users` (`id`, `roles`) VALUES
(1, 'admin'),
(2, 'member');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `nim` int(22) NOT NULL,
  `fullname` varchar(32) DEFAULT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nohp` int(16) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `job` varchar(32) NOT NULL,
  `fb` varchar(64) DEFAULT NULL,
  `twit` varchar(64) DEFAULT NULL,
  `instagram` varchar(64) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nim`, `fullname`, `username`, `email`, `password`, `nohp`, `alamat`, `job`, `fb`, `twit`, `instagram`, `status`, `foto`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(29, 123456789, 'futas', 'teras', 'yero@gmail.com', '$2b$12$ttWTPaEGzQHKwQzNYud86.HbAVJR34JjuqAezb6FNzvFvDDmEWl8S', NULL, '123456789', '', NULL, NULL, NULL, NULL, '/default.jpg', '', '2022-10-22 20:29:55', '2022-10-22 20:29:55'),
(1, 288293883, 'Harris Munahar', 'funtsu', 'zimibot@gmail.com', '$2b$12$6iZ1WIXiWo31tFEqPi6fsu9GCBIYizdrm8Qg4w79xoaDNoDtfw7BC', 812546235, 'Jl. Taman Makam Pahlawan Taruna No.10, RT.006/RW.008, Sukasari, Kec. Tangerang, Kota Tangerang, Bant', '', 'https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/', 'Belum Nika', '/uploads/Untitled.png', '', '2022-10-22 13:48:31', '2022-10-22 19:25:33'),
(32, 1234412233, 'Kajikul', 'terool', 'teros@gmail.com', '$2b$12$0yrMx2.QrmTs843apaUQ0OaZ76TaMXc197/A6afz.wfG6eAjHvVdC', 895655264, 'tester', 'Front End', 'null', 'null', 'null', 'Belum nika', '/uploads/pexels-photo-2272853.jpeg', '', '2022-10-23 07:49:56', '2022-10-23 08:02:05'),
(31, 1234567811, 'Yero', 'teringa', 'yeros@gmail.com', '$2b$12$qUIgT4HWiUkgy8hVYLbbcORHAAHysp1OzY9DzqoPvCQSTu5wAtgYq', 856225451, 'tester', '', 'null', 'null', 'null', 'Tidak Ada', '/uploads/images.jpg', '', '2022-10-23 07:36:58', '2022-10-23 07:39:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_gallery`
--

CREATE TABLE `users_gallery` (
  `id` int(11) NOT NULL,
  `nim` int(22) NOT NULL,
  `url` varchar(64) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users_gallery`
--

INSERT INTO `users_gallery` (`id`, `nim`, `url`, `createdAt`, `updatedAt`) VALUES
(18, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c813.png', '2022-10-22 15:40:13', '2022-10-22 15:40:13'),
(19, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c814.png', '2022-10-22 15:40:15', '2022-10-22 15:40:15'),
(20, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c815.png', '2022-10-22 15:40:17', '2022-10-22 15:40:17'),
(21, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c816.png', '2022-10-22 15:40:18', '2022-10-22 15:40:18'),
(22, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c817.png', '2022-10-22 15:40:19', '2022-10-22 15:40:19'),
(23, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c81c.png', '2022-10-22 18:32:34', '2022-10-22 18:32:34'),
(24, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c821.png', '2022-10-22 19:28:48', '2022-10-22 19:28:48'),
(25, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c822.png', '2022-10-22 19:37:07', '2022-10-22 19:37:07'),
(26, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c823.png', '2022-10-22 19:37:09', '2022-10-22 19:37:09'),
(27, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c824.png', '2022-10-22 19:37:13', '2022-10-22 19:37:13'),
(28, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c825.png', '2022-10-22 19:37:16', '2022-10-22 19:37:16'),
(29, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c826.png', '2022-10-22 19:37:36', '2022-10-22 19:37:36'),
(30, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c827.png', '2022-10-22 19:38:09', '2022-10-22 19:38:09'),
(31, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c828.png', '2022-10-22 19:38:59', '2022-10-22 19:38:59'),
(32, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c829.png', '2022-10-22 19:39:05', '2022-10-22 19:39:05'),
(33, 288293883, '/uploads/gallery/e2901cae83bf7020ef9d4c82a.png', '2022-10-22 19:39:09', '2022-10-22 19:39:09'),
(34, 1234412233, '/uploads/gallery/3614d57694dc725b9afc03202.jpeg', '2022-10-23 09:24:14', '2022-10-23 09:24:14'),
(35, 1234412233, '/uploads/gallery/3614d57694dc725b9afc03203.jpeg', '2022-10-23 09:24:17', '2022-10-23 09:24:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_skills`
--

CREATE TABLE `users_skills` (
  `id` int(11) NOT NULL,
  `nim` int(11) NOT NULL,
  `nama` varchar(35) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users_skills`
--

INSERT INTO `users_skills` (`id`, `nim`, `nama`, `nilai`, `createdAt`, `updatedAt`) VALUES
(10, 288293883, 'CSS', 80, '2022-10-22 18:10:20', '2022-10-22 18:10:20'),
(11, 288293883, 'HTML', 80, '2022-10-22 18:10:28', '2022-10-22 18:10:28'),
(12, 288293883, 'JAVASCRIPT', 75, '2022-10-22 18:10:35', '2022-10-22 18:10:35'),
(13, 288293883, 'PHP', 65, '2022-10-22 18:10:41', '2022-10-22 18:10:41'),
(14, 288293883, 'REACT JS', 70, '2022-10-22 18:10:50', '2022-10-22 18:10:50'),
(15, 288293883, 'LARAVEL', 35, '2022-10-22 18:10:55', '2022-10-22 18:10:55'),
(18, 1234567811, 'ADMINISTRATOR', 60, '2022-10-23 07:37:30', '2022-10-23 07:37:30'),
(19, 1234567811, 'KOMPUTER', 45, '2022-10-23 07:37:45', '2022-10-23 07:37:45'),
(20, 1234412233, 'BACKEND', 80, '2022-10-23 08:39:29', '2022-10-23 08:39:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_settings`
--

CREATE TABLE `user_settings` (
  `id` int(20) NOT NULL,
  `nim` int(22) NOT NULL,
  `id_roles` int(1) NOT NULL DEFAULT 2,
  `user_active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_settings`
--

INSERT INTO `user_settings` (`id`, `nim`, `id_roles`, `user_active`, `createdAt`, `updatedAt`) VALUES
(9, 123456789, 2, 1, '2022-10-22 20:29:55', '2022-10-22 20:29:55'),
(1, 288293883, 1, 1, '2022-10-17 04:18:58', '2022-10-22 19:25:33'),
(11, 1234412233, 2, 1, '2022-10-23 07:49:56', '2022-10-23 08:02:05'),
(10, 1234567811, 2, 1, '2022-10-23 07:36:58', '2022-10-23 07:39:17');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`nim`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `users_gallery`
--
ALTER TABLE `users_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users_skills`
--
ALTER TABLE `users_skills`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `nim` (`nim`);

--
-- Indeks untuk tabel `user_settings`
--
ALTER TABLE `user_settings`
  ADD PRIMARY KEY (`nim`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `users_gallery`
--
ALTER TABLE `users_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `users_skills`
--
ALTER TABLE `users_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `user_settings`
--
ALTER TABLE `user_settings`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `users_skills`
--
ALTER TABLE `users_skills`
  ADD CONSTRAINT `nim` FOREIGN KEY (`nim`) REFERENCES `users` (`nim`);

--
-- Ketidakleluasaan untuk tabel `user_settings`
--
ALTER TABLE `user_settings`
  ADD CONSTRAINT `nim_user` FOREIGN KEY (`nim`) REFERENCES `users` (`nim`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
