import * as yup from "yup";
import { type User } from "../models/userModel";

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const createUserSchema: yup.Schema<User> = yup.object({
  email: yup.string().required().email(),
  first_name: yup.string().required().strict(),
  last_name: yup.string().required().strict(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "password must contain only letters and numbers with a minimum of 8 characters"
    )
    .required(),
});
