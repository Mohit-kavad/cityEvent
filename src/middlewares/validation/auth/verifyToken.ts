import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../../database/models/User";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization.split(" ")[1];
    if (!bearerToken) {
      return res.status(401).json({
        message: "You are not Login please Login to get access",
      });
    }

    // verify token

    const decode = jwt.verify(bearerToken, process.env.JWT_SECRET);

    if (typeof decode !== "string") {
      const isUserExist = await User.findByPk(decode.id);

      if (decode.tokenVersion !== isUserExist.tokenVersion) {
        return res.status(401).json({
          message: "You have recently changed your password please login",
        });
      }

      if (!isUserExist) {
        return res.status(401).json({
          message: "This user does not exist longer more",
        });
      }
      // GRANT ACCESS
      // @ts-ignore
      req.user = isUserExist;
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export { verifyToken };
