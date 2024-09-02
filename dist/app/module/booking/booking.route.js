"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../midleware/validateRequest");
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const user_contents_1 = require("../../conestants/user.contents");
const isAdmin_1 = __importDefault(require("../../midleware/isAdmin"));
const router = express_1.default.Router();
router.get('/', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.getAllBookingRooms);
router.get('/new/', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.getAllNewBookingRooms);
router.get('/:userEmail', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin, user_contents_1.USER_ROLE.user), booking_controller_1.createBookingController.getSingleBookedRoom);
router.get('/invoice/:id', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.invoice);
router.patch('/cancelBooking/:id', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.postSingleBookedRoomCancel);
router.patch('/markAsPaid/:id', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.postSingleBookingPayment);
router.get('/room/:id', booking_controller_1.createBookingController.getSingleBookedRoomController);
router.delete('/:id', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), booking_controller_1.createBookingController.deleteBookingController);
router.post('/', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin, user_contents_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(booking_validation_1.BookingDataZodSchema), booking_controller_1.createBookingController.bookingRoom);
// router.post('/', isAdmin(USER_ROLE.admin ,USER_ROLE.user), validateRequest(bookingValidationSchema), createBookingController.bookingRoom)
// router.put('/:userId', createUserController.updateSingleUser )
// router.post('/', validateRequest(userValidationSchemaZod), createUserController.createUser )
// router.delete('/:userId', createUserController.deleteSingleUser)
// router.get('/users/:userId/orders/total-price', createUserController.getOrderTotalPrice)
// router.get('/users/:userId/orders', createUserController.getSingleUserOrder)
// router.put('/users/:userId/orders', createUserController.addOrderToUserController)
// router.delete('/users/:userId', createUserController.deleteSingleUser )
exports.bookingRoute = router;
