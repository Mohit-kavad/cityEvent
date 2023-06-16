import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../../database/models/user";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization.split(" ")[1];
    console.log("*********", bearerToken);

    if (bearerToken === undefined) {
      return res.status(401).json({
        message: "You are not Login please Login to get access",
      });
    }

    // verify token

    const decode = jwt.verify(bearerToken, process.env.JWT_SECRET!);

    if (typeof decode !== "string") {
      const isUserExist = await User.findByPk(decode.id);
      console.log("is user exist", isUserExist);

      if (!isUserExist) {
        return res.status(401).json({
          message: "this user does not exist longer more",
        });
      }
      // GRANT ACCESS
      // @ts-ignore
      req.user = isUserExist;
    }
    next();
  } catch (error) {
    console.log("============", error, "==============");
    res.status(500).json(error);
  }
};

export { verifyToken };
