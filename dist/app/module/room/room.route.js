"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoute = void 0;
const express_1 = __importDefault(require("express"));
const room_conroller_1 = require("./room.conroller");
const validateRequest_1 = require("../../midleware/validateRequest");
const room_validation_1 = __importDefault(require("./room.validation"));
const isAdmin_1 = __importDefault(require("../../midleware/isAdmin"));
const user_contents_1 = require("../../conestants/user.contents");
const router = express_1.default.Router();
router.get('/available', room_conroller_1.createRoomController.availableRoomController);
// router.get('/search',  createRoomController.searchRoomController)
router.post('/create', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(room_validation_1.default), room_conroller_1.createRoomController.createRoom);
router.get('/', room_conroller_1.createRoomController.findAllRooms);
router.get('/admin/room', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), room_conroller_1.createRoomController.AdminRooms);
router.get('/regular', room_conroller_1.createRoomController.findRegularRooms);
router.get('/promotion', room_conroller_1.createRoomController.findPromotionRooms);
router.get('/:id', room_conroller_1.createRoomController.singleRoomById);
router.put('/:id/reactivate', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), room_conroller_1.createRoomController.reActiveRoom);
router.get('/:id/single', room_conroller_1.createRoomController.singleRoomByForUpdate);
router.put('/:id/update', (0, validateRequest_1.validateRequest)(room_validation_1.default), (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), room_conroller_1.createRoomController.updateSingleRoom);
router.delete('/:id', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), room_conroller_1.createRoomController.deleteSingleRoom);
router.delete('/:id/permanent', (0, isAdmin_1.default)(user_contents_1.USER_ROLE.admin), room_conroller_1.createRoomController.permanentDeleteRoom);
exports.RoomRoute = router;
