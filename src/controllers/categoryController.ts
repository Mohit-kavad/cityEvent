import { Request, Response } from "express";
import { Category } from "../database/models/index";

const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("printing category");

    const { categoryName } = req.body;
    const category = await Category.create({
      categoryName,
    });
    res.status(201).json({
      status: 201,
      message: "success",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).json({
      status: 200,
      message: "success",
      categories,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const isCategoryExist = await Category.findByPk(categoryId);
    if (!isCategoryExist) {
      return res.status(409).json({
        error: "category does not exist or deleted",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success",
      isCategoryExist,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
    const isCategoryExist = await Category.findByPk(categoryId);
    if (!isCategoryExist) {
      return res.status(409).json({
        error: "category does not exist or deleted",
      });
    }
    const updatedCategory = await Category.update(categoryName, {
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Success",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const isCategoryExist = await Category.findByPk(categoryId);
    if (!isCategoryExist) {
      return res.status(409).json({
        error: "category does not exist or already deleted",
      });
    }
    await Category.destroy({
      where: { id: categoryId },
    });
    res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (error) {}
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
