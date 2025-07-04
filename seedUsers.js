// seedUsers.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/usermodel.js";
import { hashPassword } from "./helpers/bcryptHelper.js";
import "./helpers/init-mongodb.js"; // Ensures connection

dotenv.config();

const seedUsers = async () => {
  try {
    const users = [];

    for (let i = 1; i <= 10; i++) {
      const email = `user${i}@mail.com`;
      const plainPassword = "123456";
      const password = await hashPassword(plainPassword);

      users.push({ email, password });
    }

    await User.insertMany(users);
    console.log("✅ 10 users added successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
