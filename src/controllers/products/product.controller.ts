import { Request, Response } from "express";
import Product from "../../database/models/product.model.js";

const addProduct = async (req: Request, res: Response):Promise<Response> => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productTotalStockQty,
    } = req.body;
  let fileName
  if(req.file) {
    fileName = "http://localhost:4000/" + req.file.filename  //hamile pathako image true bhaye
  } else { //image xaina bhane default image yo add hunxa
    fileName = "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
  }

    if (
      !productName ||
      !productDescription ||
      productPrice == null ||
      productTotalStockQty == null
    ) {
      return res.status(400).json({
        message: "All product fields are required",
      });
    }

    const product = await Product.create({
      productName,
      productDescription,
      productPrice,
      productTotalStockQty,
      productImage: fileName
    });

    return res.status(201).json({
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add product",
    });
  }
};

export default addProduct;
