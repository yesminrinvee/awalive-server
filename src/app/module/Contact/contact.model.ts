import mongoose, {  Schema } from 'mongoose';
import { TMessage } from './contact.interface';


// Define Mongoose Schema
const MessageSchema: Schema = new Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    senderDate: { type: Date, default: Date.now }
  });


  // Create Mongoose Model
export const MessageModel = mongoose.model<TMessage>('Message', MessageSchema);

