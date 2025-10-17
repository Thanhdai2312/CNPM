/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const r1 = await prisma.restaurant.upsert({
    where: { id: 'seed-restaurant-1' },
    update: {},
    create: {
      id: 'seed-restaurant-1',
      name: 'DroneFood A',
      address: '123 Main St',
      lat: 10.762622,
      lng: 106.660172,
      menuItems: {
        create: [
          { name: 'Burger', price: 50000, weight: 0.3 },
          { name: 'Fried Chicken', price: 70000, weight: 0.5 },
          { name: 'Cola', price: 15000, weight: 0.3 }
        ],
      },
    },
  });

  await prisma.drone.upsert({
    where: { code: 'DRN-001' },
    update: {},
    create: {
      code: 'DRN-001',
      capacityKg: 2.0,
      maxRangeKm: 10.0,
      batteryPercent: 100,
    },
  });

  console.log('Seeded:', r1.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
