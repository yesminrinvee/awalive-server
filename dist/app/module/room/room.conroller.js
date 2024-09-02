"use strict";
// import userValidationSchemaZod from "./user.validation";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const room_service_1 = require("./room.service");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/errors/AppError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //saving to db
    const result = yield room_service_1.roomService.createRoomInDb(req.body);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'room not created',
            data: res,
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is created successfully',
            data: result,
        });
    }
}));
const findAllRooms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar'))
        ? languageParam
        : 'en'; // Default to 'en' if the parameter is not 'en' or 'ar'
    const result = yield room_service_1.roomService.findAllRoomsFromDb(language);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'rooms not found',
            data: res,
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is retrieved successfully',
            data: result,
        });
    }
}));
const AdminRooms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar'))
        ? languageParam
        : 'en'; // Default to 'en' if the parameter is not 'en' or 'ar'
    const result = yield room_service_1.roomService.findAllRoomsForAdmin(language);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'rooms not found',
            data: res,
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is retrieved successfully',
            data: result,
        });
    }
}));
const findRegularRooms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar'))
        ? languageParam
        : 'en'; // Default to 'en' if the parameter is not 'en' or 'ar'
    const result = yield room_service_1.roomService.findRegularFromDb(language);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is retrieved successfully',
            data: result,
        });
    }
}));
const findPromotionRooms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar'))
        ? languageParam
        : 'en'; // Default to 'en' if the parameter is not 'en' or 'ar'
    const result = yield room_service_1.roomService.findPromotionFromDb(language);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is retrieved successfully',
            data: result,
        });
    }
}));
const singleRoomById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar'))
        ? languageParam
        : 'en';
    const result = yield room_service_1.roomService.findSingleRoomFromDb(roomId, language);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room is not found');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Single room found Successfully',
            data: result,
        });
    }
}));
const singleRoomByForUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const result = yield room_service_1.roomService.findSingleRoomForUpdate(roomId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room is not found');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Single room found Successfully',
            data: result,
        });
    }
}));
const updateSingleRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const updateInfo = req.body;
    const result = yield room_service_1.roomService.updateRoomById(roomId, updateInfo);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid room ID or Update Information');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Update Successful',
            data: result,
        });
    }
}));
const deleteSingleRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting user id to find the exect user and the body of update info
    const roomId = req.params.id;
    const result = yield room_service_1.roomService.deleteRoomById(roomId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid room Id or delete ');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Update Successful',
            data: result,
        });
    }
}));
// re active room 
const reActiveRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting user id to find the exect user and the body of update info
    const roomId = req.params.id;
    const result = yield room_service_1.roomService.reactivateRoomById(roomId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Reactive room failed ');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Update Successful',
            data: result,
        });
    }
}));
// Delete room permanent
const permanentDeleteRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting user id to find the exect user and the body of update info
    const roomId = req.params.id;
    const result = yield room_service_1.roomService.deleteRoomPermanently(roomId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Deleting room failed ');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Update Successful',
            data: result,
        });
    }
}));
// const searchRoomController = catchAsync(async (req: Request, res: Response) => {
//   // getting user id to find the exect user and the body of update info
//   const categoryId = req.query.categoryId as string;
//   // const checkInDate  = req.query.checkInDate ;
//   // const checkOutDate   = req.query.checkOutDate  ;
//   const languageParam = req.query.lang;
//     const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
//                      ? languageParam 
//                      : 'en';
// // const maxGuestsParam = req.query.maxGuests;
//   // const maxGuests: MaxGuestsType = maxGuestsParam ? parseInt(maxGuestsParam as string, 10) : null;
//   // Check for NaN in case of invalid number input
//   // if (maxGuestsParam && isNaN(maxGuests)) {
//   //   throw new AppError(httpStatus.BAD_REQUEST, "Invalid maxGuests parameter.");
//   // }
//                      // Sorting order parameter
//   const sortOrder = req.query.sortOrder as SortOrder;
//   if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
//     throw new AppError(httpStatus.BAD_REQUEST, "Invalid sortOrder parameter. Must be 'asc' or 'desc'.");
//   }
//   console.log(req,categoryId,checkInDate,checkOutDate,maxGuests);
//   const result = await roomService.searchService(categoryId,sortOrder,language,  );
//   if (!result || result.length === 0) {
//     throw new AppError(httpStatus.NOT_FOUND, 'No room found');
//   } else {
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Search rooms successful',
//       data: result,
//     });
//   }
// });
const availableRoomController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.lang;
    const checkInDate = req.query.checkInDate;
    const checkOutDate = req.query.checkOutDate;
    const sortOrder = req.query.sortByPrice;
    const maxGuestsParam = req.query.maxGuests;
    // const categoryId = req.query.categoryId as string;
    const sizeOrder = req.query.sizeOrder;
    const maxGuests = parseInt(maxGuestsParam, 10);
    if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid sortOrder parameter. Must be 'asc' or 'desc'.");
    }
    const result = yield room_service_1.roomService.checkAllRoomAvailability(checkInDate, checkOutDate, sortOrder, language, maxGuests, sizeOrder);
    if (!result || result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No available room found');
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Search available rooms successful',
            data: result,
        });
    }
}));
// const allUsers = catchAsync(async(req: Request, res: Response)=>{
//         const users = await userService.getAllUserUserFromDb()
//         if (!users) {
//             return res
//               .status(404)
//               .json({ success: false, message: 'No users found' });
//           } else {
//             res.status(200).json({
//               success: true,
//               message: 'users data are retrieved',
//               data: users,
//             });
//           }
// })
// const singleUserById = catchAsync(async(req: Request, res: Response)=>{
//   const userId = (req.params.userId);
//       const user = await userService.getSingleUserById(userId)
//       if (!user) {
//           throw new AppError( httpStatus.NOT_FOUND,'user is not found')
//         } else {
//           sendResponse(res,{
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Single User found Successfully',
//             data: user,
//           })
//         }
// })
// // update user info
// const updateSingleUser = catchAsync(async(req: Request, res: Response)=>{
//   // getting user id to find the exect user and the body of update info
//   const userId = (req.params.userId)
//   const updateInfo = req.body
//       const updateUser = await userService.updateUserInformation(userId, updateInfo)
//       if (!updateUser) {
//           throw new AppError(
//             httpStatus.BAD_REQUEST,
//             "Invalid user Id or Update Information"
//           )
//         } else {
//           sendResponse(res,{
//             statusCode:httpStatus.OK,
//             success:true,
//             message:'Update Successful' ,
//             data : updateUser
//           })
//         }
// })
// const deleteSingleUser = catchAsync(async (req: Request, res:Response) => {
//   const userId = req.params.userId
//   const result = await userService.deleteUser(userId)
//       if (!result) {
//         throw new AppError(
//           httpStatus.NOT_FOUND,
//           'No user with given ID was found.'
//         )
//       } else {
//           sendResponse(res,{
//             statusCode: httpStatus.OK,
//             success: true,
//             message:"Delete Successfull",
//             data: null
//           }
//           )
//       }
// })
// const addOrderToUserController = async(req: Request, res:Response)=>{
//     const userId = parseInt(req.params.userId)
//     const order = req.body;
//     //console.log('order',order)
//     try {
//         const  result=await userService.addOrderToUser(userId,order)
//         if (!result) {
//             return res
//               .status(404)
//               .json({
//                 success: false,
//                 message: 'No user found',
//                 error:{
//                     code: 404,
//                     details:"The user with the given id was not found."
//                 }
//              });
//           } else {
//             res.status(200).json({
//               success: true,
//               message: 'Order placed successfully',
//               data: null,
//             });
//           }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'Error in user or some other',
//             error: err
//          });
//     }
// }
// const getSingleUserOrder = async(req:Request, res:Response)=>{
//     const userId = parseInt(req.params.userId)
//     try {
//         const users = await userService.getSingleUserOrderFromDb(userId)
//         if (!users) {
//             return res
//               .status(404)
//               .json({ success: false, message: 'No users found' });
//           } else {
//             res.status(200).json({
//               success: true,
//               message: 'users order data are retrieved',
//               data: users,
//             });
//           }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'Error in retrieving user order',
//             error: err
//          });
//     }
// }
// const getOrderTotalPrice = async(req:Request, res:Response)=>{
//     const userId = parseInt(req.params.userId)
//     try {
//         const users = await userService.getSingleUserTotalPriceFromDb(userId)
//         if (!users) {
//             return res
//               .status(404)
//               .json({ success: false, message: 'No users found' });
//           } else {
//             res.status(200).json({
//               success: true,
//               message: 'users order data are retrieved',
//               data: users,
//             });
//           }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'Error in retrieving user order',
//             error: err
//          });
//     }
// }
exports.createRoomController = {
    createRoom,
    findAllRooms,
    singleRoomById,
    findRegularRooms,
    findPromotionRooms,
    updateSingleRoom,
    deleteSingleRoom,
    reActiveRoom,
    permanentDeleteRoom,
    AdminRooms,
    singleRoomByForUpdate,
    // searchRoomController,
    availableRoomController
};
