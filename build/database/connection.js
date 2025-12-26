import { Sequelize } from "sequelize-typescript";
import path from "node:path";
import { fileURLToPath } from "node:url";
/* ESM-safe __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* simple env guard */
function must(value, name) {
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
const sequelize = new Sequelize({
    dialect: "mysql",
    database: must(process.env.DB_NAME, "DB_NAME"),
    username: must(process.env.DB_USERNAME, "DB_USERNAME"),
    password: must(process.env.DB_PASSWORD, "DB_PASSWORD"),
    host: must(process.env.DB_HOST, "DB_HOST"),
    port: Number(must(process.env.DB_PORT, "DB_PORT")),
    models: [path.join(__dirname, "models")],
});
export default sequelize;
/* optional connection check */
export async function initDB() {
    try {
        await sequelize.authenticate();
        console.log("DB connected");
        await sequelize.sync({ force: false });
        console.log("Synced");
    }
    catch (err) {
        console.error("Database initialization failed:", err);
        throw err; // lets the top-level catch in app.ts handle it
    }
}
//# sourceMappingURL=connection.js.map