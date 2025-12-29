import "dotenv/config";
import app from "./src/app.js";
import "./src/database/connection.js"

function startServer() {
  const PORT:number = 4000
  app.listen(PORT, () => {console.log(`Server started at PORT http://localhost:${PORT}`)})

}
startServer()