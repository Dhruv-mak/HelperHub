import { z } from "zod"

export const userRegistrationSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters." })
        .max(100, { message: "Full name must be at most 100 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    userRole: z.enum(["VOLUNTEER", "ORGANIZATION_ADMIN"]).default("VOLUNTEER"),
    profilePicture: z.instanceof(File).optional(),
})

export type UserRegistrationFormValues = z.infer<typeof userRegistrationSchema>