import { PrismaClient, DroneStatus } from '@prisma/client';
import { prisma } from './db';

export class DroneRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async list() {
    return this.db.drone.findMany();
  }

  async getById(id: string) {
    return this.db.drone.findUnique({ where: { id } });
  }

  async create(data: {
    code: string;
    name: string;
    capacityKg: number;
    maxRangeKm: number;
    batteryPercent: number;
    status?: DroneStatus;
  }) {
    return this.db.drone.create({ data: { status: DroneStatus.AVAILABLE, ...data } });
  }

  async update(id: string, data: Partial<{
    name: string;
    capacityKg: number;
    maxRangeKm: number;
    batteryPercent: number;
    status: DroneStatus;
  }>) {
    return this.db.drone.update({ where: { id }, data });
  }
}
