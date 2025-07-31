import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MidSection } from "@/components/MidSection";
import { Navbar } from "@/components/Navbar";

export default function(){
    return(<div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <div className="h-screen">
            <Navbar />
            <Hero />
        </div>
        <MidSection />
        <Footer />
    </div>)
}