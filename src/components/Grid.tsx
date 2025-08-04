"use client"

import { useState } from "react";
import { Clock, FileText, FolderOpen, MoreVertical, Plus, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { DocumentType } from "@/types/document";
import { deleteDocument } from "@/app/actions/documentActions"

interface GridProps {
  files?: DocumentType[];
  onDelete: (id: string) => Promise<void>;
}

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

 
export const Grid = ({ files, onDelete }: GridProps) => {
  console.log(files)
  if (files?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        {/* Animated cosmic icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-400/30 backdrop-blur-sm">
            <FileText className="w-12 h-12 text-purple-300" />
          </div>
          {/* Floating particles around the icon */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -bottom-1 -left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-40 animation-delay-300"></div>
          <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50 animation-delay-700"></div>
        </div>

        
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-3">Your cosmic workspace awaits</h3>
          <p className="text-lg text-purple-200/80 max-w-md mx-auto leading-relaxed">
            No documents found in this infinite space. Create your first document to begin your journey across the
            digital cosmos.
          </p>
        </div>
        </div>
    )
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
                        <button>Copy Link</button> 
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                      onSelect={(e) => {
                                e.preventDefault(); // Prevent immediate menu closure
                                onDelete(doc.id);
                            }}
                      className="text-red-400 hover:bg-red-400/20 focus:bg-red-400/20">
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
                  <span>Created {formatDate(doc.createdAt as Date)}</span>
                </div>
                {doc.updatedAt && (
                  <div className="flex items-center gap-2 text-sm text-purple-300/80 group-hover:text-purple-200 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Updated {formatDate(doc.updatedAt as Date)}</span>
                  </div>
                )}
                </div>
                <div className="flex justify-end mt-4 border-1 border-white/50 rounded-md ">
                  <Badge className="bg-violet-600/30 text-white border-violet-500/50">
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
