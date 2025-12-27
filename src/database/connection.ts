import { Sequelize} from "sequelize-typescript"
import { envConfig } from "../config/config.js"
import User from "./models/user.model.js"

const sequelize = new Sequelize({
dialect:"mysql",
host: envConfig.host,
  port: envConfig.port,
  database: envConfig.database,
  username: envConfig.username,
  password: envConfig.password,
  models: [User],
  logging: false //logging is not required. It’s a debug convenience switch.It only reduces console spam.
})
try {
  sequelize.authenticate().then(()=> {
    console.log("Matched Authentication!!")
  }).catch((err)=>{
    console.log("Authentication not matched!!", err)
  })
} catch (error) {
  console.log(error)
  
}
//migration garna lai mysql ko lagi
sequelize.sync({force : false}).then(() => {
  console.log("Migration Successfully Achieved!!")
}).catch((err) => {
  console.log("Migration fail", err)
})
export default sequelize