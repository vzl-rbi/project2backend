import { Request, Response } from "express";
import Product from "../../database/models/product.model.js";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Category from "../../database/models/category.model.js";
import User from "../../database/models/user.model.js";

export const addProduct = async (req:AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const {
      productName,
      productDescription,
      productPrice,
      productTotalStockQty,
      categoryId,
    } = req.body;

    // Validate required fields properly
    if (
      !productName ||
      !productDescription ||
      productPrice === undefined ||
      productTotalStockQty === undefined ||
      !categoryId
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
       // 5️⃣ Validate category existence
    const category = await Category.findByPk(categoryId);
    if (!category) {
      res.status(400).json({ message: "Invalid categoryId" });
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
      userId,
      categoryId
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

export const getAllProduct = async(req:AuthRequest, res:Response) => {
const data = await Product.findAll({
  include : [
    {
      model: User, //all data show gardinxa
      attributes: ["id", "email", "userName"] // yesle aba restrict or aba email matra show garxa
    },
    {
      model: Category, 
      attributes: ["id",'categoryName']
    }
  ]
})
res.status(200).json({message : "product Fetched Successfully!!", data})
}
export const getSingleProduct = async(req:Request, res:Response):Promise<void> => {
const id = req.params.id
const data = await Product.findOne({
  where: {
    id: id
  },
  include: [
    {
    model: User,
    attributes: ["id", "userName", "email"]
  },
  {
    model: Category,
    attributes: ["id", "categoryName"]
  }
  ]

})
if(!data) {
  res.status(404).json({ message: "Product not found" });
  return;
}
res.status(200).json({ message: "Product fetched successfully", data });
}
export const deleteProduct = async(req:Request, res:Response):Promise<void> => {
  const {id} = req.params
  if (!id) {
      res.status(400).json({ message: "Product id is required" });
      return;
    }
 const deletedCount = await Product.destroy({
    where: {
      id: id
    }
  })
 if (deletedCount === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  res.status(200).json({message: "Product Deleted Succesfully!!"})
  
}
export const  updateProduct = async(req:Request, res:Response):Promise<void> => {
  const {id} = req.params
  if(!id) {
    res.status(400).json({message: "Product id is Required!!"})
    return
  }
 const {
      productName,
      productDescription,
      productPrice,
      productTotalStockQty,
      categoryId,
    } = req.body;
// Check product exists
const product = await Product.findByPk(id) 
if(!product) {
  res.status(404).json({message: "Product not found!!"})
  return
}
// Validate category if provided
if(categoryId) {
  const category = await Category.findByPk(categoryId)
  if(!category) {
    res.status(404).json({message: "Invalid Category"})
    return
  }
}

    // Update only provided fields
    /*
    // Model.update(values, { where }) → bulk update
   //instance.update(values) → single record (what you want 90% of the time) 
   //product.update  -> yo Product hoina yo const product = await Product.findByPk(id)--> yeslai update garni ho
*/
const updatedItem = await product.update({
        productName,
      productDescription,
      productPrice,
      productTotalStockQty,
      categoryId: categoryId
    })
    res.status(200).json({message: "Product Updated", updatedItem })
}