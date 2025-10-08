export enum DeliveryMethodType {
  BICYCLE = 'BICYCLE',
  MOTORBIKE = 'MOTORBIKE',
  DRONE = 'DRONE'
}

export interface DeliveryMethod {
  id: string;
  type: DeliveryMethodType;
  name: string;
  maxDistance: number;
  costPerKm: number;
  estimatedTimePerKm: number;
}
