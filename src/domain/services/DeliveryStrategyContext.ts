import { DeliveryStrategy } from '../strategies/DeliveryStrategy';
import { BicycleDeliveryStrategy } from '../strategies/BicycleDeliveryStrategy';
import { MotorbikeDeliveryStrategy } from '../strategies/MotorbikeDeliveryStrategy';
import { DroneDeliveryStrategy } from '../strategies/DroneDeliveryStrategy';
import { DeliveryMethodType } from '../models/DeliveryMethod';
import { AppError } from '../../shared/errors/AppError';

export class DeliveryStrategyContext {
  private strategies: Map<DeliveryMethodType, DeliveryStrategy>;

  constructor() {
    this.strategies = new Map();
    this.strategies.set(DeliveryMethodType.BICYCLE, new BicycleDeliveryStrategy());
    this.strategies.set(DeliveryMethodType.MOTORBIKE, new MotorbikeDeliveryStrategy());
    this.strategies.set(DeliveryMethodType.DRONE, new DroneDeliveryStrategy());
  }

  getStrategy(deliveryMethod: DeliveryMethodType): DeliveryStrategy {
    const strategy = this.strategies.get(deliveryMethod);
    if (!strategy) {
      throw new AppError(`Delivery method ${deliveryMethod} not supported`, 400);
    }
    return strategy;
  }

  getAvailableStrategies(distance: number): DeliveryStrategy[] {
    const availableStrategies: DeliveryStrategy[] = [];
    this.strategies.forEach((strategy) => {
      if (strategy.canDeliver(distance)) {
        availableStrategies.push(strategy);
      }
    });
    return availableStrategies;
  }
}
