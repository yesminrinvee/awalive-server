import mongoose, {  Schema } from 'mongoose';
import { TTable } from './table.interface';



// Define Mongoose Schema
const tableSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: false },
  bookingDate: { type: String, required: true },
  time: { type: String, required: true },
  guest: { type: Number, required: true },
  restaurantName:{type: String, required:true },
  createBookDate: { type: Date, default: Date.now }, // Automatically set to current date
});


  // Create Mongoose Model
export const TableBookModel = mongoose.model<TTable>('TableBooking', tableSchema);