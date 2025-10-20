import { prisma } from './db';
const prismaAny = prisma as any;

export const cartRepository = {
  getOrCreate: async (userId: string) => {
    let cart = await prismaAny.cart.findUnique({ where: { userId }, include: { items: true } });
    if (!cart) cart = await prismaAny.cart.create({ data: { userId }, include: { items: true } });
    return cart;
  },
  upsertItem: async (cartId: string, menuItemId: string, qty: number) => {
    if (qty <= 0) {
      await prismaAny.cartItem.deleteMany({ where: { cartId, menuItemId } });
      return;
    }
    await prismaAny.cartItem.upsert({
      where: { cartId_menuItemId: { cartId, menuItemId } },
      update: { qty },
      create: { cartId, menuItemId, qty },
    });
  },
  getWithDetails: (userId: string) =>
    prismaAny.cart.findUnique({ where: { userId }, include: { items: { include: { menuItem: true } } } }),
  clear: (cartId: string) => prismaAny.cartItem.deleteMany({ where: { cartId } }),
};
