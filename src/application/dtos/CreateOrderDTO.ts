import { DeliveryMethodType } from '../../domain/models/DeliveryMethod';

export interface OrderItemDTO {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  restaurantId: string;
  customerName: string;
  customerAddress: string;
  customerLatitude: number;
  customerLongitude: number;
  items: OrderItemDTO[];
  totalAmount: number;
  deliveryMethod: DeliveryMethodType;
}
