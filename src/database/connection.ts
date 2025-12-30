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
export const initDB = async () => {
  try {
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