import { NextFunction, Request, Response } from "express";
import { BookServices } from "./book.services";
import sendResponse from "../../../shared/sendResponse";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...bookInfo } = req.body;
    const result = await BookServices.createBook(bookInfo);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "a new book created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookControllers = {
  createBook,
};
