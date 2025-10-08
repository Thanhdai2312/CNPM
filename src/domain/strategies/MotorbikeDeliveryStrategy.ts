import { DeliveryStrategy } from './DeliveryStrategy';
import { DeliveryMethodType } from '../models/DeliveryMethod';

export class MotorbikeDeliveryStrategy implements DeliveryStrategy {
  private readonly maxDistance = 20;
  private readonly costPerKm = 15000;
  private readonly timePerKm = 4;

  calculateCost(distance: number): number {
    return distance * this.costPerKm;
  }

  calculateEstimatedTime(distance: number): number {
    return distance * this.timePerKm;
  }

  getDeliveryMethod(): DeliveryMethodType {
    return DeliveryMethodType.MOTORBIKE;
  }

  canDeliver(distance: number): boolean {
    return distance <= this.maxDistance;
  }
}
