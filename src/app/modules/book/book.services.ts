import { Types } from "mongoose";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import ApiError from "../../../errors/apiError";

const createBook = async (payload: IBook) => {
  const result = await Book.create(payload);
  return result;
};
const retrieveAllBooks = async (
  page: number,
  pageSize: number,
  sortBy: string
): Promise<IBook[]> => {
  const result = await Book.find({})
    .sort(sortBy)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();
  return result;
};
const retrieveAuthorBooks = async (
  userId: Types.ObjectId
): Promise<IBook[]> => {
  const result = await Book.find({ author: userId });
  return result;
};
const retrieveSingleBook = async (bookId: string): Promise<IBook | null> => {
  const result = await Book.findById(bookId);
  return result;
};
const deleteABook = async (bookId: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(bookId);
  return result;
};
const updateABook = async (
  bookId: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: bookId }, payload, {
    new: true,
  });
  return result;
};

const likeAndUnlikeABook = async (userId: Types.ObjectId, bookId: string) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(400, "book doesn't exist");
  }

  const isUserLiked = book?.likes?.includes(userId);

  let updatedBook;

  if (isUserLiked) {
    // If user liked the book, remove the like
    updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $pull: { likes: userId } },
      { new: true }
    );
  } else {
    // If user hasn't liked the book, add the like
    updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  }

  return book?.likes?.length;
};

export const BookServices = {
  createBook,
  retrieveAllBooks,
  retrieveAuthorBooks,
  retrieveSingleBook,
  deleteABook,
  updateABook,
  likeAndUnlikeABook,
};
