import { Request, Response, NextFunction } from "express";

const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "You do not have permition to perform this action",
      });
    }
    next();
  };
};

export { restrictTo };
