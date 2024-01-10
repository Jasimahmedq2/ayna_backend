import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { JwtHelpers } from "../../../shared/jwtHelpers";
import { ILogin, ILoginResponse, IUser } from "./auth.interfaces";
import { User } from "./auth.models";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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

export const AuthUserServices = {
  createUser,
  LogIn,
};
