import Category from "../../database/models/category.model.js"
import { Request, Response } from "express"
import Product from "../../database/models/product.model.js"

const categoryData = [
  {
    categoryName: "Electronics"
  }, 
  {
    categoryName: "Groceries"
  }, {
    categoryName: "Food/Beverage"
  }
]
export const seedCategory = async(req:Request, res:Response):Promise<void> => {
  
const datas = await Category.findAll()
if(datas.length === 0) {
await Category.bulkCreate(categoryData)
// console.log("Categories seeded successfully", datas);
  res.status(201).json({ message: "Categories seeded successfully" })
} else {
  console.log("Category Already seeded!!", datas)
   res.status(200).json({ message: "Categories already seeded" })
}

}

export const addCategory = async(req:Request, res:Response):Promise<void> => {
  const {categoryName} = req.body
  if(!categoryName) {
    res.status(400).json({message: "Please provide category Name!!"})
    return
  }
  const category = await Category.create({
    categoryName
  })
  res.status(201).json({message: "CategoryName Created Sucessfully", category})
}

export const getCategory = async (req:Request, res:Response):Promise<void> => {
  const category = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "productName"]
      }
    ]
  })
  // FIX: findAll() never returns null — it returns []
  if(category.length === 0) {
res.status(404).json({message: "Category Not Found"})
return
  }
  res.status(200).json({message:"Fetched all the Category", category})
}
export const updateCategory = async(req:Request, res:Response):Promise<void> => {
const {id} = req.params
if(!id) {
  res.status(400).json({message: "Category id not Found!!"})
  return
}
const {categoryName} = req.body
const category = await Category.findByPk(id)
if(!category) {
  res.status(404).json({message: "Category not found"})
  return
}
 await category.update({
    categoryName
})
 res.status(200).json({
    message: "CategoryName updated successfully",
    category
  })

}
export const deleteCategory = async(req:Request, res:Response):Promise<void> => {
  const {id} = req.params
  if(!id) {
    res.status(400).json({message: "Category id not found!!"})
    return
  }
  const deleteData = await Category.destroy({
    where: {
      id: id
    }
  })
  if(deleteData === 0) {
    res.status(404).json({message: "Category not Found!!"})
    return
  }
  res.status(200).json({message: "category Deleted successful!!"})
}
//alternative count() instead of findall()
/*
import Category from "../../database/models/category.model.js";

const categoryData = [
  { categoryName: "Electronics" },
  { categoryName: "Groceries" },
  { categoryName: "Food/Beverage" },
];

const seedCategories = async () => {
  const count = await Category.count();

  if (count === 0) {
    await Category.bulkCreate(categoryData);
    console.log("Categories seeded successfully");
  } else {
    console.log("Categories already seeded");
  }
};

export default seedCategories;
*/