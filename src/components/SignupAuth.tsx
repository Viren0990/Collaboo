import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

export const SignupAuth = () => {
    return (
        <div className="w-full space-y-6 max-w-sm mx-auto">
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-white pb-2">SIGN UP</h1>
                <p className="text-gray-400 text-sm">Create your new account</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text text-white font-medium">Email</Label>
                <Input 
                id="email"
                type="email"
                placeholder="Yourname@gmail.com"
                className="h-10 bg-[#261046] text-[#A4A4A4] border-none py-4 text-lg"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="username" className="text text-white font-medium">Username</Label>
                <Input
                id="username"
                type="text" 
                placeholder="Yourname123"
                className="h-10 bg-[#261046] text-[#A4A4A4] border-none py-4 text-lg"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text text-white font-mediumfont-medium">Password</Label>
                <Input 
                id="password"
                type="password"
                placeholder="*********"
                className="h-10 bg-[#261046] text-[#A4A4A4] border-none py-4 text-lg"
            />
            </div>
            <Button className="w-full bg-gradient-to-r from-[#501794] to-[#3E70A1] hover:bg-gradient-to-r hover:from-[#3E70A1] hover:to-[#501794] h-12 font-medium text-md">Sign Up</Button>
        </div>
    )
}