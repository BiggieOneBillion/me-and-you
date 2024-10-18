const { z } = require("zod");

// AUTH VALIDATION SCHEMA
const authRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Must be not less than 6 characters" }),
  name: z.string().min(1, { message: "Field cannot be empty" }),
});

const authLoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Must be not less than 6 characters" }),
});

module.exports = {
  authRegisterSchema,
  authLoginSchema,
};
