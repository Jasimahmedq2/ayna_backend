import express from "express";
import { AuthUserControllers } from "./auth.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
const router = express.Router();

router.post(
  "/signup",
  ValidateRequest(AuthValidationSchema.CreateUser),
  AuthUserControllers.createUser
);

router.post(
  "/login",
  ValidateRequest(AuthValidationSchema.logInUser),
  AuthUserControllers.LogIn
);

router.get(
  "/authors",
  auth(UserRoles.USER),
  AuthUserControllers.retrieveAuthorsWithBooks
);
router.get(
  "/author/me",
  auth(UserRoles.USER),
  AuthUserControllers.retrieveAuthorInfo
);
router.get(
  "/author/:userId",
  auth(UserRoles.USER),
  AuthUserControllers.retrieveSingleAuthorWithBooks
);
export const AuthRoutes = router;
