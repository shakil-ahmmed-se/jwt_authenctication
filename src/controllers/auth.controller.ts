import { z } from "zod";
import catachErrors from "../utils/catachErrors";


const registerSchema = z.object({
    email: z.string().email().min(1).max(25),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})


export const registerHandler = catachErrors(async (req, res)=> {
    // validate request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]
    });

    // call services

    // return response
})