import api from '../config/axios';

export interface CreateOrderRequest {
  customerEmail: string;
  customerName: string;
  deliveryMethod: 'delivery' | 'pickup';
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  pickupLocation?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  message: string;
}

export const orderService = {
  async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
    const response = await api.post<CreateOrderResponse>('/orders', orderData);
    return response.data;
  },

  async getUserOrders(email: string) {
    const response = await api.get(`/orders/user/${email}`);
    return response.data;
  }
};