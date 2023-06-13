import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../database/models/user";
import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, mobile, username, email, password, role } =
      req.body;
    const isExist = await User.findOne({ where: { email: email } });
    if (isExist) {
      return res.status(409).json({
        message: "User already Exist",
      });
    }
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      username: username,
      email: email,
      password: await bcrypt.hash(password, 12),
      role: role,
    });

    res.status(201).json({
      status: 201,
      message: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email: email } });
    console.log("user is exist or not ", userExist);
    if (!userExist) {
      return res.status(404).json({
        message: "user does not Exist please signup",
      });
    }
    const passwordValid = await bcrypt.compare(password, userExist.password);
    console.log("is password valid", passwordValid);
    if (!passwordValid) {
      return res.status(401).json({
        message: "Password is not valid",
      });
    }

    const token = await jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
        username: userExist.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(201).json({
      status: 200,
      message: "success",
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { signUp, login };
