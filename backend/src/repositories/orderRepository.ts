import { prisma } from './db';

export const orderRepository = {
  findById: (id: string) =>
    prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, payment: true, delivery: true },
    }),
};
