import { Router } from 'express';
// import { CategoryRoute } from '../module/category/category.route';
// import { CourseRoute } from '../module/course/course.route';
import { UserRoute } from '../module/user/user.route';
import { authRoutes } from '../module/auth/auth.route';
import { RoomRoute } from '../module/room/room.route';
import { bookingRoute } from '../module/booking/booking.route';
import { CategoryRoute } from '../module/category/category.route';
import { RoomReviewRoute } from '../module/review/review.route';
import { ContactMessageRoute } from '../module/Contact/contact.route';
import { TableBookingRoute } from '../module/tableBooking/table.rout';
// import { promotionRoomRoute } from '../module/promotion/promotion.route';



const router = Router();



const moduleRoutes = [
    {
      path: '/auth',
      route: authRoutes,
    },
    {
      path: '/user',
      route: UserRoute,
    },
    {
      path: '/room',
      route: RoomRoute,
    },
    {
      path: '/category',
      route: CategoryRoute,
    },
    {
      path: '/contact-message',
      route: ContactMessageRoute,
    },
    {
      path: '/table-booking',
      route: TableBookingRoute,
    },
    // {
    //   path: '/promotion',
    //   route: promotionRoomRoute,
    // },
    {
      path: '/booking',
      route: bookingRoute,
    },
    {
      path: '/review',
      route: RoomReviewRoute,
    },
    // {
    //   path: '/course',
    //   route: CourseRoute,
    // },

]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;