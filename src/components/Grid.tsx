import { File } from 'lucide-react';

export const Grid = () => {
    return(
        <div className="px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-2 bg-black">
                    <div className="h-10 flex justify-center items-center bg-purple-950 p-4">
                        <File className='text-white'/>
                    </div>
                </div>
                <div className="border-2 bg-black">
                    <div className="h-10 flex justify-center items-center bg-purple-900 p-4">
                        <File className='text-white'/>
                    </div>
                </div>
            </div>
        </div>
    )
}