export const config = {
  db: "mongodb://localhost:27017/dev_server",
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  testDb: "mongodb://localhost:27017/test_server"
};
