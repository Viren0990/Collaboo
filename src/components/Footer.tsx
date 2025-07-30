import {NotebookPen } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-purple-400/30 flex justify-between p-3">
        <div className="flex justify-center items-center py-4">
            <NotebookPen className="h-6 w-6 text-purple-400" />
            <span className="text-white font-medium">Collaboo</span>
        </div>
        <div className="flex justify-end items-center py-4">
            <p className="text-white">© {new Date().getFullYear()} Collaboo. All rights reserved.</p>
        </div>
    </footer>
  )
}
