-- CreateIndex
CREATE INDEX `Delivery_status_idx` ON `Delivery`(`status`);

-- CreateIndex
CREATE INDEX `Drone_status_idx` ON `Drone`(`status`);

-- CreateIndex
CREATE INDEX `MenuItem_restaurantId_isAvailable_idx` ON `MenuItem`(`restaurantId`, `isAvailable`);

-- CreateIndex
CREATE INDEX `Order_userId_createdAt_idx` ON `Order`(`userId`, `createdAt`);

-- CreateIndex
CREATE INDEX `Order_restaurantId_createdAt_idx` ON `Order`(`restaurantId`, `createdAt`);

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_menuItemId_fkey` TO `OrderItem_menuItemId_idx`;

-- RenameIndex
ALTER TABLE `orderitem` RENAME INDEX `OrderItem_orderId_fkey` TO `OrderItem_orderId_idx`;
