import { NextFunction, Request, Response } from "express";
import { AuthUserServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interfaces";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthUserServices.createUser(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully created a user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const LogIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthUserServices.LogIn(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully logged in a user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const retrieveAuthorsWithBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AuthUserServices.retrieveAuthorsWithBooks();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully retrieve all authors with books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const retrieveSingleAuthorWithBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const result = await AuthUserServices.retrieveSingleAuthorWithBooks(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully retrieve all authors with books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const retrieveAuthorInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = (req as any).user;
  try {
    const result = await AuthUserServices.retrieveAuthorInfo(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully retrieve all authors with books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthUserControllers = {
  createUser,
  LogIn,
  retrieveAuthorsWithBooks,
  retrieveSingleAuthorWithBooks,
  retrieveAuthorInfo,
};
