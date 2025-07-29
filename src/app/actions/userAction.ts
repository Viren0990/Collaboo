"use server"

import bcrypt from "bcrypt";
import prisma from "@/db";
import { z } from "zod";

const signupSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    username: z.string().trim()
            .min(3,"Username must be at least 3 characters")
            .max(20,"Username can be at most 20 characters")
            .regex(/^\w+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function signup(email: string, username: string, password: string){
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10");
    const validated = signupSchema.safeParse({ email, username, password });
   
    if (!validated.success) {
        return { success: false, message: validated.error.issues[0].message };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        const user = await prisma.user.create({
            data: { email, username, password: hashedPassword },
            select: { id: true, email: true, username: true, createdAt: true },
        });

        return { success: true, user };
    }catch(error: any){
        if (error.code === "P2002") {
            const field = error.meta?.target?.[0];
            if (field === "email") {
                return { success: false, message: "Email is already taken" };
             } else if (field === "username") {
                return { success: false, message: "Username is already taken" };
            }
            return { success: false, message: "Email or username is already taken" };
    }
    console.error("Signup Error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
    }
}

