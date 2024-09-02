import  express  from "express";
import { validateRequest } from "../../midleware/validateRequest";
import { BookingDataZodSchema } from "./booking.validation";
import { createBookingController } from "./booking.controller";
import { USER_ROLE } from "../../conestants/user.contents";
import isAdmin from "../../midleware/isAdmin";


const router = express.Router()

router.get('/',isAdmin( USER_ROLE.admin), createBookingController.getAllBookingRooms )
router.get('/new/',isAdmin( USER_ROLE.admin), createBookingController.getAllNewBookingRooms )
router.get('/:userEmail',isAdmin(USER_ROLE.admin, USER_ROLE.user), createBookingController.getSingleBookedRoom )
router.get('/invoice/:id',isAdmin(USER_ROLE.admin), createBookingController.invoice )
router.patch('/cancelBooking/:id', isAdmin( USER_ROLE.admin), createBookingController.postSingleBookedRoomCancel )
router.patch('/markAsPaid/:id', isAdmin( USER_ROLE.admin), createBookingController.postSingleBookingPayment )
router.get('/room/:id', createBookingController.getSingleBookedRoomController )
router.delete('/:id', isAdmin( USER_ROLE.admin),createBookingController.deleteBookingController)
router.post('/', isAdmin( USER_ROLE.admin, USER_ROLE.user),  validateRequest(BookingDataZodSchema), createBookingController.bookingRoom)
// router.post('/', isAdmin(USER_ROLE.admin ,USER_ROLE.user), validateRequest(bookingValidationSchema), createBookingController.bookingRoom)
// router.put('/:userId', createUserController.updateSingleUser )
// router.post('/', validateRequest(userValidationSchemaZod), createUserController.createUser )
// router.delete('/:userId', createUserController.deleteSingleUser)
// router.get('/users/:userId/orders/total-price', createUserController.getOrderTotalPrice)
// router.get('/users/:userId/orders', createUserController.getSingleUserOrder)
// router.put('/users/:userId/orders', createUserController.addOrderToUserController)
// router.delete('/users/:userId', createUserController.deleteSingleUser )

export const bookingRoute = router