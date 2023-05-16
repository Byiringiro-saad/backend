interface Seat {
  _id?: string;
  name: string;
  status: string;
  served: boolean;
  booked_by?: string;
  restaurant: string;
}

export default Seat;
