import { User } from "../models/user.js";

export function getUserByEmail(request) {
  return User.findOne({
    email: request.body.email,
  });
}

export function getUserById(userID) {
  return User.findById(userID).select("_id name email role");
}
