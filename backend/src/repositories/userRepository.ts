import { prisma } from './db';
import { UserRole } from '@prisma/client';

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (params: { name: string; email: string; passwordHash: string; role?: UserRole }) =>
    prisma.user.create({ data: { name: params.name, email: params.email, passwordHash: params.passwordHash, role: params.role ?? 'CUSTOMER' } }),
};
