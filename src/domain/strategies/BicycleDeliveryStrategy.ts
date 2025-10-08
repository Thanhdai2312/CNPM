import { DeliveryStrategy } from './DeliveryStrategy';
import { DeliveryMethodType } from '../models/DeliveryMethod';

export class BicycleDeliveryStrategy implements DeliveryStrategy {
  private readonly maxDistance = 5;
  private readonly costPerKm = 10000;
  private readonly timePerKm = 8;

  calculateCost(distance: number): number {
    return distance * this.costPerKm;
  }

  calculateEstimatedTime(distance: number): number {
    return distance * this.timePerKm;
  }

  getDeliveryMethod(): DeliveryMethodType {
    return DeliveryMethodType.BICYCLE;
  }

  canDeliver(distance: number): boolean {
    return distance <= this.maxDistance;
  }
}
