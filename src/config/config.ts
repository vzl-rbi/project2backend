function required(name: string, allowEmpty = false): string {
  const value = process.env[name];

  if (value === undefined || (!allowEmpty && value === "")) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const envConfig = {
  dialect: "mysql" as const,
  database: required("DB_NAME"),
  username: required("DB_USERNAME"),
  password: required("DB_PASSWORD", true), // 👈 allow empty
  host: required("DB_HOST"),
  port: Number(required("DB_PORT")),
};
export const envJwt = {
  secret: required("JWT_SECRET"),
    expiresIn: Number(required("JWT_EXPIRES_IN")),
    cookieName: required("JWT_COOKIE_NAME"),
}
export const envAdmin = {
  email: required("ADMIN_EMAIL"),
  password: required("ADMIN_PASSWORD")
}