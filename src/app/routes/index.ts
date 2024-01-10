import express from "express";
import { AuthRoutes } from "../modules/author/auth.route";
import { bookRoutes } from "../modules/book/book.routes";

const router = express.Router();

const CoreRoutes = [
  {
    path: "/auth",
    element: AuthRoutes,
  },
  {
    path: "/book",
    element: bookRoutes,
  },
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
