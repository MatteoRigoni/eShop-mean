import { OrderItem } from "./order-item.model";
import { User } from '@front-end/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: string;
  dateCreated?: string;
}
