import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "./user.js";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  let token;
  if (req.headers) {
    try {
      token = await req.headers["x-auth-token"];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await getUserById(decode.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
  if (!token) {
    return res.status(400).json({ error: "Invalid Authentication Token." });
  }
};

export { isAuthenticated };
