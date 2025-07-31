
import { Star } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { easeIn, motion } from "framer-motion"

export const Hero = () => {
    return(
        <div className="px-4 py-26 mt-4 md:py-30 lg:py-30">   
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star className="w-1 h-1 text-purple-300 fill-current" />
          </div>
        ))}
      </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight">Notes that <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
               transcend</span> <br /> boundaries
            </h1>
            <p className="text-lg md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto text-center">Collaborate across the universe with real-time notes, infinite workspaces, and cosmic-level organization. Your ideas deserve a platform as limitless as space itself.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                
                <Link href="/create-documents">
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                >
                    Launch your workspace
                </Button>
                </Link>
                
                <Link href="/documents">
                <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-400 text-purple-200 hover:bg-purple-400/10 px-8 py-3 text-lg bg-transparent"
                >
                    Explore
                </Button>
                </Link>
            </div>
        </div>
    )
}