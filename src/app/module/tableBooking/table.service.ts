/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TTable } from "./table.interface";
import { TableBookModel } from "./table.model";
import AppError from "../../Error/errors/AppError";
import httpStatus from "http-status";






const createTableBooking = async (data: TTable) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const message = await TableBookModel.create([data], { session });
  
      if (!message) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book Table');
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
        `Failed to book Table due to an unexpected error: ${err.message}`,
      );
    }
  };


  export const tableBookingService = {
    createTableBooking,
    
  };