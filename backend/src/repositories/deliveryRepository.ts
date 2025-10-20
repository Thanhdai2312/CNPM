import { PrismaClient, DeliveryStatus } from '@prisma/client';
import { prisma } from './db';

export class DeliveryRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: {
    orderId: string;
    droneId: string;
    status?: DeliveryStatus;
    etaMinutes?: number | null;
    startedAt?: Date | null;
    completedAt?: Date | null;
  }) {
    return this.db.delivery.create({
      data: {
        status: DeliveryStatus.QUEUED,
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<{
    status: DeliveryStatus;
    etaMinutes: number | null;
    startedAt: Date | null;
    completedAt: Date | null;
  }>) {
    return this.db.delivery.update({ where: { id }, data });
  }

  async getById(id: string) {
    return this.db.delivery.findUnique({ where: { id } });
  }
}
