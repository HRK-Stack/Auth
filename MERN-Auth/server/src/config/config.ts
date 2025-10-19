import dotenv from "dotenv";

dotenv.config();

const required = [
    "MONGO_URI",
    "SENDGRID_API_KEY",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET"
]

required.forEach(e => {
    if(!process.env[e]) throw new Error(`${e} is Required`)
});

export default {
  port: process.env.PORT ?? 5000,
  mongoUri: process.env.MONGO_URI!,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  accessExpiry: process.env.ACCESS_TOKEN_EXPIRES ?? '15m',
  refreshExpiry: process.env.REFRESH_TOKEN_EXPIRES ?? '30d',
  cookieDomain: process.env.COOKIE_DOMAIN ?? 'localhost',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
  sendGridKey: process.env.SENDGRID_API_KEY!,
  nodeEnv: process.env.NODE_ENV ?? 'development',
}