"use client"

import { NotebookPen } from 'lucide-react';
import { Menu, Mic, X } from "lucide-react"
import { Button } from './ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    const navLinks = [
        { href: "/landing", label: "Home" },
        { href: "/createNotes", label: "Create-Documents" },
        { href: "/myNotes", label: "My-Documents" },
        { href: "/documents", label: "Explore" },
    ]

    return(
        <nav role="navigation" className="flex justify-between items-center h-16 w-full top-0 sticky z-50 border-b border-gray-400 backdrop-blur-sm px-4">
            <div className="flex space-x-2 justify-center items-center">
                <NotebookPen className="h-10 text-white" />
                <h1 className="text-2xl font-bold text-white">Collaboo</h1>
            </div>
            <div className='hidden md:flex items-center gap-x-4'>
            <div className="space-x-4">
                {navLinks.map(({href,label})=>(
                    <a 
                    key={href}
                    href={href} 
                    className="text-gray-300 text-sm font-medium hover:text-white">
                        {label}
                    </a>
                ))}
            </div>
                <div className="hidden md:flex items-center">
                    <Button
                    onClick={async () => {
                        await signOut({ redirect: false });
                        router.push("/signin"); // Force redirect
                        setIsMenuOpen(false);
                    }}
                    className="border-1 border-white text-white hover:bg-purple-400 hover:text-white hover:border-none bg-transparent">
                            Signout
                    </Button>
                </div>
            </div>

            <div className='md:hidden'>
                <Button 
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Toggle Menu"
                className='border-1 border-white bg-transparent hover:bg-purple-400 hover:text-white hover:border-none'>
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>
            
            {isMenuOpen && (
                <div className="md:hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 absolute left-0 right-0 top-16 backdrop-blur-md  border-b border-gray-400 z-50 shadow-md">
                    <div className="flex flex-col items-center gap-4 p-4">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="w-full text-center py-2 text-sm text-white hover:text-purple-600 transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <Button
                            onClick={async () => {
                                await signOut({ redirect: false });
                                router.push("/signin"); // Force redirect
                                setIsMenuOpen(false);
                            }}
                            className="w-full text-white bg-purple-600 hover:bg-purple-700"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}