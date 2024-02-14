import { z } from "zod"

const invalid_type_error = "Invalid type provided for this field"
const required_error = "This field cannot be blank"

export const EmailRegisterSchema = z
  .object({
    fname: z.string({ invalid_type_error, required_error }).min(1, "Firstname is too short"),
    lname: z.string({ invalid_type_error, required_error }).min(1, "Lastname is too short"),
    email: z
      .string({ invalid_type_error, required_error })
      .email("Please provide a valid email")
      .min(1, "Email is too short"),
    password: z.string({ invalid_type_error, required_error }).min(8, "Password is too short"),
    cPassword: z.string({ invalid_type_error, required_error }),
  })
  .refine((schema) => schema.password === schema.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  })
