import * as yup from "yup";
import { type User } from "../models/userModel";
import { type Product } from "../models/productModel";

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const createUserSchema: yup.Schema<User> = yup.object({
  email: yup.string().required().email(),
  first_name: yup.string().required().strict().trim(),
  last_name: yup.string().required().strict().trim(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "password must contain only letters and numbers with a minimum of 8 characters"
    )
    .required(),
});

export const createProductSchema: yup.Schema<Product> = yup.object({
  name: yup.string().required().strict().trim(),
  price: yup.number().required(),
  category: yup.string().required().strict().trim(),
});

export const authentiacateUserSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const IDSchema = yup.object({ id: yup.number().required() });
export const categorySchema = yup.object({
  category: yup.string().required().trim(),
});
