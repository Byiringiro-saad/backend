import mongoose, { Document, Schema } from "mongoose";

//interfaces
import Seat from "./seat.interface";

const SeatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "booked"],
  },
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const SeatModel = mongoose.model<Seat & Document>("Seat", SeatSchema);

export default SeatModel;
