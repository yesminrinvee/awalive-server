/* eslint-disable no-unused-vars */

import mongoose from "mongoose";

export type RoomQuery = {
  type?: mongoose.Types.ObjectId;
  maxGuests?: { $gte: number };
  // Add other properties as needed, potentially with MongoDB query operators
};

export type SortOrder = 'asc' | 'desc';
//  SortOrder = 'asc' | 'desc';
 export type SizeOrder = 'lowToHigh' | 'highToLow' ;
// export type MaxGuestsType = number | null;

export type LanguageKey = 'en' | 'ar';

export type LocalizedString = {
  en: string;
  ar: string;
  [key: string]: string;
};

export type PriceOption = {
  price: number;
  currency?: LocalizedString;
  taxesAndCharges?: string;
  breakfast?: LocalizedString;
  cancellation?: LocalizedString;
  prepayment?: LocalizedString;
  refundable?: boolean;
};

export type RoomService = {
  name: LocalizedString;
  image: string;
};

export type SubTitle = {
  roomOne: LocalizedString;
  roomTwo?: LocalizedString; // Optional
};

export enum RoomTag {
  Regular = "regular",
  Promotion = "promotion",
}

export type TRoom = {
  title: LocalizedString;
  subTitle: SubTitle;
  // type: mongoose.Schema.Types.ObjectId; 
  description: LocalizedString;
  maxGuests: number;
  roomQTY: number;
  size:  number;
  // features: LocalizedString[];
  services: RoomService[];
  images: string[];
  priceOptions: PriceOption[];
  tags: RoomTag[];
  priceHistory?: number; // Optional previous price for promotional comparison
  discount?: number;
};
