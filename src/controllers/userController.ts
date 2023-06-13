import { Request, Response } from "express";
import { User } from "../database/models/user";

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await User.findAll({});
    res.status(200).json({
      status: 200,
      message: "success",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.id;

    const data = await User.findByPk(userId);
    if (data == null) {
      return res.status(404).json({
        error: "User not found or deleted",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found or deleted",
      });
    }
    await User.destroy({ where: { id: user.id } });

    res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// const updateUser = async (req: Request, res: Response) => {
//   const userID: number = +req.params.id;
//   const {} = req.body;
// };

export { getUsers, getUser, deleteUser };
