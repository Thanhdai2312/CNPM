import { DeliveryMethodType } from '../models/DeliveryMethod';

export interface DeliveryStrategy {
  calculateCost(distance: number): number;
  calculateEstimatedTime(distance: number): number;
  getDeliveryMethod(): DeliveryMethodType;
  canDeliver(distance: number): boolean;
}
