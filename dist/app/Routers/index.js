"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { CategoryRoute } from '../module/category/category.route';
// import { CourseRoute } from '../module/course/course.route';
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const room_route_1 = require("../module/room/room.route");
const booking_route_1 = require("../module/booking/booking.route");
const category_route_1 = require("../module/category/category.route");
const review_route_1 = require("../module/review/review.route");
const contact_route_1 = require("../module/Contact/contact.route");
const table_rout_1 = require("../module/tableBooking/table.rout");
// import { promotionRoomRoute } from '../module/promotion/promotion.route';
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoute,
    },
    {
        path: '/room',
        route: room_route_1.RoomRoute,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoute,
    },
    {
        path: '/contact-message',
        route: contact_route_1.ContactMessageRoute,
    },
    {
        path: '/table-booking',
        route: table_rout_1.TableBookingRoute,
    },
    // {
    //   path: '/promotion',
    //   route: promotionRoomRoute,
    // },
    {
        path: '/booking',
        route: booking_route_1.bookingRoute,
    },
    {
        path: '/review',
        route: review_route_1.RoomReviewRoute,
    },
    // {
    //   path: '/course',
    //   route: CourseRoute,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
