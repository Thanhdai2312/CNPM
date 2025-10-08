import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../domain/services/OrderService';

export class DeliveryController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  getAvailableDeliveryMethods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { restaurantId } = req.params;
      const { customerLat, customerLng } = req.query;

      if (!customerLat || !customerLng) {
        res.status(400).json({
          success: false,
          message: 'customerLat and customerLng are required'
        });
        return;
      }

      const methods = await this.orderService.getAvailableDeliveryMethods(
        restaurantId,
        parseFloat(customerLat as string),
        parseFloat(customerLng as string)
      );

      res.status(200).json({
        success: true,
        data: methods
      });
    } catch (error) {
      next(error);
    }
  };
}
