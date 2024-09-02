import  express  from "express";
import { createRoomController } from "./room.conroller";
import { validateRequest } from "../../midleware/validateRequest";
import RoomValidationSchema from "./room.validation";
import isAdmin from "../../midleware/isAdmin";
import { USER_ROLE } from "../../conestants/user.contents";


const router = express.Router()

router.get('/available',  createRoomController.availableRoomController)
// router.get('/search',  createRoomController.searchRoomController)
router.post('/create', isAdmin(USER_ROLE.admin), validateRequest(RoomValidationSchema), createRoomController.createRoom )
router.get('/',  createRoomController.findAllRooms )
router.get('/admin/room', isAdmin(USER_ROLE.admin),  createRoomController.AdminRooms )
router.get('/regular',  createRoomController.findRegularRooms )
router.get('/promotion',  createRoomController.findPromotionRooms )
router.get('/:id',  createRoomController.singleRoomById )
router.put('/:id/reactivate', isAdmin(USER_ROLE.admin), createRoomController.reActiveRoom)
router.get('/:id/single',  createRoomController.singleRoomByForUpdate )
router.put('/:id/update', validateRequest(RoomValidationSchema), isAdmin(USER_ROLE.admin), createRoomController.updateSingleRoom)
router.delete('/:id', isAdmin(USER_ROLE.admin), createRoomController.deleteSingleRoom)
router.delete('/:id/permanent', isAdmin(USER_ROLE.admin), createRoomController.permanentDeleteRoom)


export const RoomRoute = router