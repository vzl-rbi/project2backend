import { envAdmin } from "../config/config.js"
import User from "../database/models/user.model.js"
import bcrypt from "bcrypt"

const adminSeeder = async():Promise<void> => {
  if (!envAdmin.email || !envAdmin.password) {
      throw new Error("Admin email or password missing in envAdmin config");
  }
  const data = await User.findOne({
    where:{
      email: envAdmin.email
    }
  })
  if(!data) {
    await User.create({
      email: envAdmin.email,
      password: await bcrypt.hash(envAdmin.password, 8),
      username: "seniorAdmin",
      role: "Admin"
    })
    console.log("Admin Credintials Seeded Succesfuully!!")
  } else {
    console.log("Admin Credentials already Seeded")
  }
}
export default adminSeeder