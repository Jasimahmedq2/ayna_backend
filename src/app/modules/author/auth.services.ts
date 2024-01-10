import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { JwtHelpers } from "../../../shared/jwtHelpers";
import { ILogin, ILoginResponse, IUser } from "./auth.interfaces";
import { User } from "./auth.models";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Book } from "../book/book.model";

const createUser = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const createSecret = await JwtHelpers.createToken(
    { email: payload.email },
    config.jwt.verify_secret as Secret,
    config.jwt.verify_email_expire as string
  );

  const isExistUser = await User.findOne({
    email: payload.email,
    phoneNo: payload.phone_no,
  });

  if (isExistUser) {
    throw new ApiError(401, "the user already exist");
  }
  const user = new User(payload);
  const result = await user.save();
  return result;
};

const LogIn = async (payload: ILogin): Promise<ILoginResponse> => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "something went wrong");
  }

  const accessToken = await JwtHelpers.createToken(
    {
      userId: isUserExist?._id,
      role: isUserExist?.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  return {
    accessToken,
  };
};

const retrieveAuthorsWithBooks = async () => {
  const authorsWithBooks = await User.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "author",
        as: "books",
      },
    },
  ]);
  return authorsWithBooks;
};
const retrieveSingleAuthorWithBooks = async (userId: string) => {
  const authorsWithBooks = await Book.find({ author: userId }).populate(
    "author",
    "name email phone_no"
  );
  return authorsWithBooks;
};
const retrieveAuthorInfo = async (userId: string): Promise<IUser | null> => {
  const result = await User.findById(userId);
  return result;
};

export const AuthUserServices = {
  createUser,
  LogIn,
  retrieveAuthorsWithBooks,
  retrieveSingleAuthorWithBooks,
  retrieveAuthorInfo,
};
