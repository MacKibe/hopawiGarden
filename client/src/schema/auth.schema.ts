import * as z from "zod"; 

export const loginUserSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const registerUserSchema = loginUserSchema.extend({
    firstName: z.string().min(1, {message: "Please enter your first name"}),
    lastName: z.string().min(1, {message: "Please enter your last name"}), 
    confirmPassword: z.string().min(8, { message: "Please confirm your password" })
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ['confirmPassword']
} )

export type RegisteredUser = z.infer<typeof registerUserSchema>
export type LoginUser = z.infer<typeof loginUserSchema>
