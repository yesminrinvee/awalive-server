import mongoose, { model } from 'mongoose';
// import { RoomCategory, TRoom } from './room.interface';
import AppError from '../../Error/errors/AppError';
import httpStatus from 'http-status';
import { TRoom } from './room.interface';



const localizedSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
  // icon: { type: String }
}, { _id: false });

const priceOptionSchema = new mongoose.Schema({
  price: { type: Number, required: [true, 'Price is required'] },
  currency: localizedSchema,
  taxesAndCharges: {
    type: String,
  },
  breakfast: localizedSchema,
  cancellation: localizedSchema,
  prepayment: localizedSchema,
  refundable: {
    type: Boolean,
  },
}, { _id: false });

// const RoomService = new mongoose.Schema({
//   name: localizedSchema,
//   image: { type: String, required: [true, 'service image are required'] },
// }, { _id: false });

const roomSchema = new mongoose.Schema(
  {
    title: localizedSchema,
    subTitle: {
      roomOne: localizedSchema,
      roomTwo: localizedSchema,
    },

    description: {
      en: {
        type: String,
        required: [true, 'English room description is required'],
      },
      ar: {
        type: String,
        required: [true, 'Arabic room description is required'],
      },
    },
    maxGuests: {
      type: Number,
      required: [true, 'Maximum number of guests is required'],
    },
    roomQTY: { type: Number, required: [true, 'Room quantity is required'] },
    size: { type: Number, required: [true, 'size is required'] },
    
    // services: [RoomService],

    images: {
      type: [{ type: String, required: true }],
      required: [true, 'Room images are required'],
    },
    priceOptions: {
      type: [priceOptionSchema],
      required: [true, 'Price options are required'],
    },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: { type: String, required: [true, 'tags is required']  },
    priceHistory: Number,
    discount: Number,
  },
  { timestamps: true },
);

roomSchema.pre('save', async function (next) {
  // console.log(`Checking for existing room with type: ${this.type}, maxGuests: ${this.maxGuests}`);
  if (this.isNew || this.isModified('title')) {
    const existingRoom = await RoomModel.findOne({
      _id: { $ne: this._id }, // Exclude the current document
      title: this.title,
    });

    if (existingRoom) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'A room with this title already exists.',
      );
    }
  }
  next();
});

roomSchema.pre('save', function(next) {
  if (typeof this.priceHistory === 'number' && this.priceOptions && this.priceOptions.length > 0) {
    const currentPrice = this.priceOptions[0].price;
    if (currentPrice < this.priceHistory && this.priceHistory > 0) {
      const discount = ((this.priceHistory - currentPrice) / this.priceHistory) * 100;
      // Round the discount to no decimal places
      this.discount = Math.round(discount);
    } else {
      this.discount = 0;
    }
  } else {
    this.discount = 0;
  }
  next();
});


export const RoomModel = model<TRoom>('Room', roomSchema);
