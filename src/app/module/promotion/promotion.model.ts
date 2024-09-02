import mongoose from 'mongoose';
import { TPromotionRoom } from './promotion.interface';

const { Schema, model } = mongoose;

const promotionRoomSchema = new Schema({
  roomName: {
    en: { type: String, required: true, unique:true },
    ar: { type: String, required: true, unique: true },
  },
  roomImage: { type: String, required: true },
  price: { type: Number, required: true },
  priceHistory: { type: Number, },
  saleTag: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  numberOfGuests: [{ type: Number }],
  breakfastAvailable: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  fullDetails: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  quantity: { type: Number, required: true },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

export const promotionModel = model<TPromotionRoom>('promotion', promotionRoomSchema);

