import { Grid } from "@/components/Grid";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Star } from "lucide-react";

export default function MyDocuments() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
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
            <Navbar/>
            <Header />
            <Grid />
        </div>
    )
}