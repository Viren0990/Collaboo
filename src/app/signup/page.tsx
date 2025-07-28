import { SignupAuth } from "@/components/SignupAuth";
import Image from "next/image";
import Backgroundd from '@/images/Backgroundd.png'

export default function Signup() {
    return (
        <div className="flex bg-[#160430] min-h-screen">
            <div className="flex-[0.65] min-h-screen bg-[url('@/images/Backgroundd.png')] bg-cover bg-center bg-no-repeat">
                
            </div>
            <div className="flex-[0.35] flex justify-center items-center px-8 py-8 md:py-0 max-h-screen overflow-y-auto">
                <SignupAuth />
            </div>
        </div>
    )
}