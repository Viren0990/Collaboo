import { SigninAuth } from "@/components/SigninAuth";
import Image from "next/image";
import Backgroundd from '@/images/Backgroundd.png';
import bgMobile from '@/images/bg-mobile.png';
import { NotebookPen } from 'lucide-react';
import { signIn } from 'next-auth/react'

export default function Signin() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen  bg-[#261046] lg:bg-[#160430] relative overflow-hidden">
            
           
            <div className="lg:flex-[0.55] relative">
                <Image
                    src={Backgroundd}
                    alt="Space Illustration"
                    width={600}
                    height={600}
                    priority
                    className="hidden lg:block w-full h-screen"
                />
                <Image
                    src={bgMobile}
                    alt="Space Illustration"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-140 lg:hidden"
                />
                <header className="absolute top-8 left-10 flex space-x-4">
                    <NotebookPen className="text-white h-10" />
                    <h1 className="text-white text-3xl font-bold">Collaboo</h1>
                </header>
                <div className="hidden lg:block absolute bottom-12 left-12">
                    <span className="text-4xl font-bold text-white">GET READY FOR SHARING</span><br />
                    <span className="text-3xl font-bold text-purple-400">SIGNIN TO GET STARTED</span>
                </div>
            </div>

           
            <div className="lg:flex-[0.45] flex justify-center items-center px-8 py-12">
                <div className="relative z-10 -mt-100 lg:mt-0 w-full max-w-md lg:static">
                    <SigninAuth />
                </div>
            </div>
        </div>
    );
}
