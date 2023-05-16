interface Order {
  _id?: string;
  user: string;
  seat: string;
  price: number;
  status: string;
  restaurant: string;
  products: Array<Object>;
}

export default Order;
