import "dotenv/config";
import { envConfig } from "./src/config/config.js";
import app from "./src/app.js";
import "./src/database/connection.js"

function startServer() {
  const PORT = 4000
  app.listen(PORT, () => {console.log(`Server started at PORT http://localhost:${PORT}`)})

}
startServer()