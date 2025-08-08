import Tiptap from "@/components/Editor";


import { Navbar } from "@/components/Navbar";


export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Navbar />
      <Tiptap />
    </div>
  )
}
