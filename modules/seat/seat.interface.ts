interface Seat {
  _id?: string;
  name: string;
  status: string;
  booked_by?: string;
  restaurant: string;
}

export default Seat;
