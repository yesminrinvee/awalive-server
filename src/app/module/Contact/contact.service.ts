/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TMessage } from "./contact.interface";
import { MessageModel } from "./contact.model";
import AppError from "../../Error/errors/AppError";
import httpStatus from "http-status";



const createContactMessage = async (data: TMessage) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const message = await MessageModel.create([data], { session });
  
      if (!message) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create message');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return message;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
  
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create message due to an unexpected error.',
      );
    }
  };


  export const contactService = {
    createContactMessage,
    
  };
  