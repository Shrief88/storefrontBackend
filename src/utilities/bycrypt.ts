import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(
    password + (BCRYPT_PASSWORD as string),
    parseInt(SALT_ROUNDS as string)
  );

export const validatePassword = (
  inputPassword: string,
  userPassword: string
): boolean => {
  return bcrypt.compareSync(
    inputPassword + (BCRYPT_PASSWORD as string),
    userPassword
  );
};
