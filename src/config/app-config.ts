export const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost:27017/server-name',
}