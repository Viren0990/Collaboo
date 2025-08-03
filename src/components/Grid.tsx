import { Clock, FolderOpen, MoreVertical, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"

// Define your document type
export interface DocumentType {
  id: string
  title: string
  createdAt: Date
  updatedAt?: Date
  role: "owner" | "editor" | "viewer" | "collaborator"
}

// Role colors mapping - Updated with more vibrant colors
const roleColors = {
  owner: "bg-emerald-600/30 text-emerald-200 border-emerald-500/50",
  editor: "bg-blue-600/30 text-blue-200 border-blue-500/50",
  viewer: "bg-violet-600/30 text-violet-200 border-violet-500/50",
  collaborator: "bg-cyan-600/30 text-cyan-200 border-cyan-500/50",
}

// Props interface for Grid component
interface GridProps {
  files?: DocumentType[] // Made optional with default value
}

export const Grid = ({ files }: GridProps) => {
  console.log(files)

  const formatDate = (date: Date): string => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
    }
  }

  return (
    <div className="px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files?.map((doc: DocumentType) => (
          <Card
            key={doc.id}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-800/50 border border-gray-400 backdrop-blur-md hover:border-purple-400/40 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                  <FolderOpen className="w-5 h-5 text-purple-300" />
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className=" hover:bg-purple-400/20 text-purple-200 hover:text-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-sm border-purple-400/30 shadow-xl">
                      <DropdownMenuItem className="text-white hover:bg-purple-400/20 focus:bg-purple-400/20">
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-red-400/20 focus:bg-red-400/20">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300 leading-tight">
                {doc.title}
              </h3>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-3">
                <div className="flex justify-between">
                <div>
                <div className="flex items-center gap-2 text-sm text-purple-300/80 group-hover:text-purple-200 transition-colors duration-300 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Created {formatDate(doc.createdAt)}</span>
                </div>
                {doc.updatedAt && (
                  <div className="flex items-center gap-2 text-sm text-purple-300/80 group-hover:text-purple-200 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Updated {formatDate(doc.updatedAt)}</span>
                  </div>
                )}
                </div>
                <div className="flex justify-end mt-4 border-1 border-white/50 rounded-md">
                  <Badge className={roleColors[doc.role]}>
                    <User className="w-3 h-3 mr-1" />
                    {doc.role}
                  </Badge>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
