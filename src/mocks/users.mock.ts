export const mockUser = {
  email: "test@test.gmail",
  password: "1234"
};

export const mockUserWithWrongEmail = {
  email: "test@wrong.email",
  password: "1234"
};

export const mockUserWithWrongPassword = {
  email: "test@test.gmail",
  password: "12345"
};

export const mockUserWithHashedPassword = {
  email: "test@test.gmail",
  password: "$2b$10$5FMWXHwOrVvWdi27Q1YgAOxTLSxj1DO28rqfB.ADG8T5hKIerqM2G"
};

export const invalidUser = {
  password: "12345"
};
