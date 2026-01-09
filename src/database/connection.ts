import { Sequelize} from "sequelize-typescript"
import { envConfig } from "../config/config.js"
import User from "./models/user.model.js"
import Product from "./models/product.model.js";
import Category from "./models/category.model.js";
import Cart from "./models/cart.model.js";
import Order from "./models/order.model.js";
import OrderDetail from "./models/orderDetail.model.js";
import Payment from "./models/payement.model.js";

const sequelize = new Sequelize({
dialect:"mysql",
host: envConfig.host,
  port: envConfig.port,
  database: envConfig.database,
  username: envConfig.username,
  password: envConfig.password,
  models: [User, Product, Category, Cart, Order, OrderDetail, Payment],
  logging: false //logging is not required. It’s a debug convenience switch.It only reduces console spam.
})
export const initDB = async () => {
  try {
      //Realtionship First then Aunthenicate 
      //All associations MUST be defined BEFORE sequelize.sync()     
  // User.hasMany(Product)
  // Product.belongsTo(User)
  //yati matra garda ni bhayo ani  UserId Column banai dinxa Product Table tira but alternative afnai column name din amna lage
//user-product relationship
  User.hasMany(Product, {
    foreignKey: "userId",
    onDelete: "CASCADE"// delete products if user deleted
  })
  Product.belongsTo(User, {
    foreignKey: "userId"
  })
  //category-product relationship
 Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "SET NULL", // or CASCADE, depending on logic
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});
//product-cart relationship
Product.hasMany(Cart, {
  foreignKey: "productId"
})
Cart.belongsTo(Product, {
  foreignKey:"productId"
})
//user- cart relationship
User.hasMany(Cart, {
  foreignKey: "userId"
})
Cart.belongsTo(User, {
  foreignKey: 'userId'
})
//Or one to one relationship
/*
Product.belongsTo(Category, {
foreignKye: "categoryId"
})
Category.hasOne(Product,{
foreignKey: "categoryId"
})
*/
//order-orderDetail relationship
Order.hasMany(OrderDetail, {
  foreignKey: "orderId",
  onDelete:"CASCADE"
})
OrderDetail.belongsTo(Order, {
  foreignKey:"orderId"
})
//orderDetail - product relationship
Product.hasMany(OrderDetail, {
  foreignKey: "productId",
  onDelete:"CASCADE"
})
OrderDetail.belongsTo(Product,{
  foreignKey: "productId"
})
//order-payment relationship
Payment.hasOne(Order, {
  foreignKey: "paymentId",
  onDelete: "CASCADE"
})
Order.belongsTo(Payment, {
  foreignKey: "paymentId"
})
//order-user relation
User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "CASCADE"
})
Order.belongsTo(User, {
  foreignKey: "userId"
})
  //Aunthenticate
    await sequelize.authenticate();
    console.log("Database authentication successful");
// migration garna ko lagi "mysql2"
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
  } catch (err) {
    console.error("Database initialization failed:", err);
    process.exit(1); // exit app if DB fails
  }

};
export default sequelize