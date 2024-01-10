import { NextFunction, Request, Response } from "express";
import { BookServices } from "./book.services";
import sendResponse from "../../../shared/sendResponse";
import { faker } from "@faker-js/faker";
import { IBook } from "./book.interface";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  const bookInfo = {
    name: faker.lorem.words(3),
    title: faker.lorem.words(10),
    author: user.userId,
  };
  console.log({ bookInfo });
  try {
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

const retrieveAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const sortBy = req.query.sortBy === "likes" ? "likes" : "-likes";
  try {
    const result = await BookServices.retrieveAllBooks(page, pageSize, sortBy);
    sendResponse<IBook[] | null>(res, {
      statusCode: 200,
      success: true,
      message: "successfully get all books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const retrieveAuthorBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const result = await BookServices.retrieveAuthorBooks(user.userId);
    sendResponse<IBook[] | null>(res, {
      statusCode: 200,
      success: true,
      message: "successfully get all author books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const retrieveSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  try {
    const result = await BookServices.retrieveSingleBook(bookId);
    sendResponse<IBook | null>(res, {
      statusCode: 200,
      success: true,
      message: "successfully get a singel book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteABook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  try {
    const result = await BookServices.deleteABook(bookId);
    sendResponse<IBook | null>(res, {
      statusCode: 200,
      success: true,
      message: "successfully delete a book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateABook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const { ...bookInfo } = req.body;
  try {
    const result = await BookServices.updateABook(bookId, bookInfo);
    sendResponse<IBook | null>(res, {
      statusCode: 200,
      success: true,
      message: "successfully update a book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const likeAndUnlikeABook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  const { userId } = (req as any).user;
  try {
    const result = await BookServices.likeAndUnlikeABook(userId, bookId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "done",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookControllers = {
  createBook,
  retrieveAllBooks,
  retrieveAuthorBooks,
  retrieveSingleBook,
  deleteABook,
  updateABook,
  likeAndUnlikeABook,
};
