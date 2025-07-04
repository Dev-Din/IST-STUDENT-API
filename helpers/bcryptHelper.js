import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash a plain text password
export const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};

// Compare a plain password with a hashed password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
