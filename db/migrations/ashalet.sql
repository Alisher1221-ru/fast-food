CREATE TABLE IF NOT EXISTS users (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(100),
    `password` varchar(255),
    `role` ENUM ('user', 'admin'),
    `refreshToken` varchar(255),
    `phone` integer,
    `user_name` varchar(100),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `title` varchar(255),
    `img` varchar(255),
    `price` varchar(100),
    `description` varchar(255),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_images (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `img` varchar(255),
    `product_id` integer,
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS category (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255),
    `parant_id` integer,
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

ALTER TABLE `category` ADD FOREIGN KEY (`parant_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS cart (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `user_id` integer,
    `product_id` integer,
    `count` integer,
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `cart` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS orders (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `user_name` varchar(100),
    `phone` integer,
    `user_id` integer,
    `product_id` integer,
    `count` varchar(100),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

ALTER TABLE `orders` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS categorys_products (
    `product_id` integer,
    `category_id` integer,
    PRIMARY KEY (`product_id`, `category_id`)
);

CREATE TABLE IF NOT EXISTS carusel (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `img` varchar(100),
    `link` varchar(100)
);

ALTER TABLE categorys_products ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE categorys_products ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
