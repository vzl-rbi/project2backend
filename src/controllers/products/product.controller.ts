import { Request, Response } from "express";
import Product from "../../database/models/product.model.js";
import { AuthRequest } from "../../middleware/auth.middleware.js";

const addProduct = async (req:AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const {
      productName,
      productDescription,
      productPrice,
      productTotalStockQty,
    } = req.body;

    // Validate required fields properly
    if (
      !productName ||
      !productDescription ||
      productPrice === undefined ||
      productTotalStockQty === undefined
    ) {
      res.status(400).json({
        message: "All product fields are required",
      });
      return;
    }

    // Parse numeric values
    const price = Number(productPrice);
    const stockQty = Number(productTotalStockQty);

    if (isNaN(price) || isNaN(stockQty)) {
      res.status(400).json({
        message: "Price and stock quantity must be numbers",
      });
      return;
    }

    const image = req.file
      ? `http://localhost:4000/${req.file.filename}`
      : "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg";

    const product = await Product.create({
      productName,
      productDescription,
      productPrice: price,
      productTotalStockQty: stockQty,
      image,
      userId
    });

    res.status(201).json({
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add product",
    });
  }
};

export default addProduct;
