import Category from "../../database/models/category.model.js"

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
const seedCategory = async():Promise<void> => {
  
const datas = await Category.findAll()
if(datas.length === 0) {
await Category.bulkCreate(categoryData)
console.log("Categories seeded successfully", datas);
} else {
  console.log("Category Already seeded!!", datas)
}

}
export default seedCategory

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