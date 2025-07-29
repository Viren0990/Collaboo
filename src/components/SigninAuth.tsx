"use client"

import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { useState } from "react"
import Link from "next/link"
import { signup } from "@/app/actions/userAction"
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react'

export const SigninAuth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email address");
            setLoading(false);
            return;
        }

        if (!email || !password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
              email,
              password,
              redirect: false
            })

            if (result?.error) {
              setError("Invalid credentials. Please try again.") // Set the error message here
            } else {
              router.push("/landing")
            }
          } catch (error) {
            setError("An unexpected error occurred. Please try again.") // Handle unexpected errors
          } finally {
            setLoading(false)
          }
    };

    return (
        <div className="w-full space-y-6 max-w-sm mx-auto">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-5xl font-bold text-white pb-2">SIGN IN</h1>
                <p className="text-gray-400 text-sm">Enter your credentials</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                        <div className="text-white text-sm text-center p-2 bg-red-500 rounded-lg">
                            {error}
                        </div>
                    )}
            <div className="space-y-2">
                <Label htmlFor="email" className="text text-white font-medium">Email</Label>
                <Input 
                id="email"
                type="email"
                placeholder="Yourname@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-[#160430] lg:bg-[#261046] text-[#A4A4A4] border-none py-4 text-lg"
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="password" className="text text-white font-medium">Password</Label>
                <Input 
                id="password"
                type="password"
                placeholder="*********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 bg-[#160430] lg:bg-[#261046] text-[#A4A4A4] border-none py-4 text-lg"
            />
            </div>
            <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#501794] to-[#3E70A1] hover:bg-gradient-to-r hover:from-[#3E70A1] hover:to-[#501794] h-12 font-medium text-md">
                {loading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="h-1 bg-gray-400 w-full"></div>
            <span className="text-gray-400 text-sm">Don't have an account? <Link href="/signup" className="text-purple-600 hover:text-purple-400 hover:cursor-pointer">Signup</Link></span>
            </form>
        </div>
    )
}