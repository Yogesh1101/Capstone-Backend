import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { dataBaseConnection } from "./db.js";
import { getUserByEmail } from "./controllers/user.js";
import { User, generateToken } from "./models/user.js";
import { ticketRouter } from "./routes/ticket.js";
import { isAuthenticated } from "./controllers/auth.js";
import { adminRouter } from "./routes/admin.js";

// configuring the environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8050;

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

dataBaseConnection();

app.post("/signup", async (req, res) => {
  try {
    // check user is already is exist
    let user = await getUserByEmail(req);
    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // storing the email and password in user database
    user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    }).save();
    const token = generateToken(user._id);
    res.status(201).json({ message: "Successfully Created.", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.post("/login", async (req, res) => {
  try {
    // check user is exist or not
    const user = await getUserByEmail(req);
    if (!user) {
      return res.status(404).json({ error: "User does not exists." });
    }
    // validate the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(404).json({ error: "Invalid Credentials." });
    }
    const token = generateToken(user._id);
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "Logged in Successfully.", role: user.role, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.use("/user", isAuthenticated, ticketRouter);
app.use("/admin", adminRouter);

// server connection
app.listen(PORT, () => console.log(`Server started at localhost: ${PORT}`));
