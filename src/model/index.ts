import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql",
  port: 3306, //by default of node.js
  pool: {
    acquire: dbConfig.pool.acquire,
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    idle: dbConfig.pool.idle
  }
})
sequelize.authenticate().then(()=>{
  console.log("Connected")
}).catch((err)=>{
  console.log(err)
})
const db:any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({force: false}).then(() => {
  console.log("migrated!!")
})
export default db