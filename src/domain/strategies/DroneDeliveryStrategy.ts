import { DeliveryStrategy } from './DeliveryStrategy';
import { DeliveryMethodType } from '../models/DeliveryMethod';

export class DroneDeliveryStrategy implements DeliveryStrategy {
  private readonly maxDistance = 15;
  private readonly costPerKm = 25000;
  private readonly timePerKm = 2;

  calculateCost(distance: number): number {
    return distance * this.costPerKm;
  }

  calculateEstimatedTime(distance: number): number {
    return distance * this.timePerKm;
  }

  getDeliveryMethod(): DeliveryMethodType {
    return DeliveryMethodType.DRONE;
  }

  canDeliver(distance: number): boolean {
    return distance <= this.maxDistance;
  }
}
