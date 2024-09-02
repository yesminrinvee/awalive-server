/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TPromotionRoom } from "./promotion.interface";
import { promotionModel } from "./promotion.model";
import AppError from "../../Error/errors/AppError";
import httpStatus from "http-status";



const createPromotion = async (promotionData: TPromotionRoom) => {
    const session = await mongoose.startSession();
    let newRoom;
    try {
        session.startTransaction();
        // Check if a room with the same name already exists
        const existingRoom = await promotionModel.findOne({ roomName: promotionData.roomName }).session(session);
        if (existingRoom) {
            throw new AppError(httpStatus.NOT_FOUND, 'Room with this name already exists')
          
        }
        // If no existing room, proceed to create a new room
        newRoom = new promotionModel(promotionData);
        await newRoom.save({ session });
        await session.commitTransaction();
      } catch (error: any) {
        await session.abortTransaction();
        // console.error('Error in createRoomInDb:', err);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to create promotion room due to an unexpected error. Try again with valid room type. ${error.message}  `,
      );
       
      } finally {
        session.endSession();
      }

      return newRoom;
    
  };

  const getAllPromotionRooms = async (language: string) => {
    try {
        // Fetch all rooms. Assuming 'lean' is used for better performance.
        const rooms = await promotionModel.find().lean();

        // Check if there are any rooms available
        if (!rooms || rooms.length === 0) {
            throw new AppError(httpStatus.NOT_FOUND, 'No rooms available');
        }
        
        // Translate all relevant fields based on the selected language.
        const translatedRooms = rooms.map(room => ({
            ...room,
            roomName: room.roomName[language] || room.roomName.en, // Default to English if the language is not available
            roomImage: room.roomImage, // No translation needed
            price: room.price,
            priceHistory: room.priceHistory, // Assuming price history is just a number, no translation needed
            saleTag: room.saleTag[language] || room.saleTag.en,
            numberOfGuests: room.numberOfGuests, // Assuming this is just a number array, no translation needed
            breakfastAvailable: room.breakfastAvailable[language] || room.breakfastAvailable.en,
            description: room.description[language] || room.description.en,
            fullDetails: room.fullDetails[language] || room.fullDetails.en,
            quantity: room.quantity // Assuming this is just a number, no translation needed
        }));

        return translatedRooms;
    } catch (error: any) {
        // Handle specific known error types (e.g., database errors, no data found, etc.)
        if (error instanceof AppError) {
            throw error;
        }
        // For other unknown or unexpected errors
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to fetch rooms due to an unexpected error ${error.message} `);
    }
};

const singlePromoRoom = async (roomId: string, language: string) => {
  try {
    const room = await promotionModel.findById(roomId).lean();
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
    }

    // Translate all relevant fields based on the selected language
    const translatedRoom = {
      ...room,
      roomName: room.roomName[language] || room.roomName.en, // Default to English if the language is not available
      roomImage: room.roomImage, // No translation needed
      price: room.price,
      priceHistory: room.priceHistory, // Assuming price history is just a number, no translation needed
      saleTag: room.saleTag[language] || room.saleTag.en,
      numberOfGuests: room.numberOfGuests, // Assuming this is just a number array, no translation needed
      breakfastAvailable: room.breakfastAvailable[language] || room.breakfastAvailable.en,
      description: room.description[language] || room.description.en,
      fullDetails: room.fullDetails[language] || room.fullDetails.en,
      quantity: room.quantity // Assuming this is just a number, no translation needed
    };

    return translatedRoom;


    
  } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to retrieve the room. ${err.message} `,
    );
  }
};

  export const PromotionRoomService = {
    createPromotion,
    getAllPromotionRooms,
    singlePromoRoom
  }