import { Request, Response } from "express";
import { User } from "../database/models/User";
import bcrypt from "bcrypt";

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

const updateUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userID = req.user.id;
    const userIdParam = +req.params.id;

    if (userID !== userIdParam) {
      return res.status(401).json({
        message: "Unauthorized to update this profile",
      });
    }

    const user = await User.findByPk(userIdParam);
    if (!user) {
      return res.status(404).json({
        error: "User not found or deleted",
      });
    }

<<<<<<< HEAD
    // check for password update or not 
    const newPassword  =await bcrypt.hash(req.body.password, 12)


    const updatedUser = await User.update(
      {
        ...req.body,
        password: ,
        tokenVersion: user.tokenVersion,
      },
      { where: { id: userIdParam } }
    );
=======
    // check for password update or not

    const newPassword = req.body.password
      ? await bcrypt.hash(req.body.password, 12)
      : undefined;
    let changeTokenVersion = user.tokenVersion;

    if (newPassword) {
      changeTokenVersion += 1;
    }

    const updateObject = newPassword
      ? { ...req.body, password: newPassword, tokenVersion: changeTokenVersion }
      : { ...req.body, tokenVersion: changeTokenVersion };

    const updatedUser = await User.update(updateObject, {
      where: { id: userIdParam },
    });
>>>>>>> 1bfebad118463b3edce45400e786c869a3efe0db

    res.status(200).json({
      status: 200,
      message: "success",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getUsers, getUser, deleteUser, updateUser };
