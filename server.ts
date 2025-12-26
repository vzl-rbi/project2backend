import "dotenv/config";
import { envConfig } from "./config/config.js";
import app from "./src/app.js";
import "./database/connection.js"

function startServer() {
  const PORT = envConfig.port || 8000
  app.listen(PORT, () => {console.log(`Server started at PORT http://localhost:${PORT}`)})

}
startServer()