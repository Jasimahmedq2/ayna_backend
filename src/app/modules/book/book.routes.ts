import express from "express";
import { BookControllers } from "./book.controller";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
const router = express.Router();

router.post("/create-book", auth(UserRoles.USER), BookControllers.createBook);
router.get("/", auth(UserRoles.USER), BookControllers.retrieveAllBooks);
router.get(
  "/author-books",
  auth(UserRoles.USER),
  BookControllers.retrieveAuthorBooks
);
router.get(
  "/:bookId",
  auth(UserRoles.USER),
  BookControllers.retrieveSingleBook
);
router.put(
  "/like-unlike/:bookId",
  auth(UserRoles.USER),
  BookControllers.likeAndUnlikeABook
);
router.delete("/:bookId", auth(UserRoles.USER), BookControllers.deleteABook);
router.put("/:bookId", auth(UserRoles.USER), BookControllers.updateABook);

export const bookRoutes = router;
