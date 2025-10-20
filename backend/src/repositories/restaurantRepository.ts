import { prisma } from './db';

export const restaurantRepository = {
  list: () => prisma.restaurant.findMany({ select: { id: true, name: true, address: true, lat: true, lng: true } }),
  findMenu: (restaurantId: string) =>
    prisma.menuItem.findMany({ where: { restaurantId, isAvailable: true }, select: { id: true, name: true, price: true, weight: true } }),
};
