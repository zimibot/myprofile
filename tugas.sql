-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Okt 2022 pada 16.33
-- Versi server: 10.4.16-MariaDB
-- Versi PHP: 7.4.12

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
  `nim` int(20) NOT NULL,
  `fullname` varchar(32) DEFAULT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nohp` int(16) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nim`, `fullname`, `username`, `email`, `password`, `nohp`, `alamat`, `status`, `foto`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 288293883, 'Harris Munahar', 'funtsu', 'zimibot@gmail.com', '$2b$12$GbrFWKPBCNwBZNNegapsJOBatzcmWiUgNAz2mDYCqxU.0MWpWXrLO', NULL, 'asdaddd', NULL, '/default.jpg', '', '2022-10-17 04:18:58', '2022-10-17 04:18:58'),
(2, 2147483647, 'pantek', 'pantek', 'pantek@gmail.com', '$2b$12$uSxLXkNYdwdoY3XsqAkFs.yPLJtOGNwrZGbgkcpsyu8gEMqsauiby', 2390938, 'asdad', 'status', '/uploads/WhatsApp Image 2022-08-06 at 09.37.58.jpeg', '', '2022-10-17 04:21:26', '2022-10-17 05:08:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_gallery`
--

CREATE TABLE `users_gallery` (
  `id` int(11) NOT NULL,
  `nim` int(20) DEFAULT NULL,
  `url` varchar(16) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_settings`
--

CREATE TABLE `user_settings` (
  `id` int(20) NOT NULL,
  `nim` int(20) NOT NULL,
  `id_roles` int(1) NOT NULL DEFAULT 2,
  `user_active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_settings`
--

INSERT INTO `user_settings` (`id`, `nim`, `id_roles`, `user_active`, `createdAt`, `updatedAt`) VALUES
(1, 288293883, 1, 1, '2022-10-17 04:18:58', '2022-10-17 04:18:58'),
(2, 2147483647, 2, 0, '2022-10-17 04:21:26', '2022-10-17 05:08:48');

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users_gallery`
--
ALTER TABLE `users_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user_settings`
--
ALTER TABLE `user_settings`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
