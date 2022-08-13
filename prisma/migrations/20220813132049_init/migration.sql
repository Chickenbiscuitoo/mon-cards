-- CreateTable
CREATE TABLE `Sprite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sprite` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `sprite_id` INTEGER NOT NULL,

    UNIQUE INDEX `Pokemon_sprite_id_key`(`sprite_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_sprite_id_fkey` FOREIGN KEY (`sprite_id`) REFERENCES `Sprite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
