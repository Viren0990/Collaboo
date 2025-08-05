"use client";

import { Filter, Search, Share2, Star, X } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useCallback, useEffect, useState } from "react";
import { createDocument } from "@/app/actions/documentActions";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [newDocument, setNewDocument] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300), // 300ms delay
    [onSearch] // Recreate if onSearch changes
  );

  const create = async () => {
    setLoading(true);
    if (!title) {
      setError("Please enter a title");
      setLoading(false);
      return;
    }
    try {
      const res = await createDocument(title);
      if (res?.success) {
        toast.success("Document created!");
        setError("");
        setLoading(false);
        setNewDocument(false);
        setTitle("");
      }
    } catch (e) {
      toast.error("Failed to create document");
      setError("");
      setTitle("");
      setLoading(false);
      setNewDocument(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    debouncedSearch(query); // This will now be debounced
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
    return(
        <div className="py-4 px-6">
            <div className="text-center md:flex md:text-left justify-between items-center py-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Cosmic</span> Documents</h1>
                    <p className="text-purple-300 text-lg">Manage and explore your infinite workspace</p>
                </div>
                <div>
                    <Button 
                    onClick={() => {
                        setNewDocument(!newDocument);
                        setError("");
                        setTitle("");
                    }}
                    className="mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">{newDocument?<X />:<span>New document</span>}</Button>
                </div>
            </div>
            {
                newDocument && (
                    <div className="mb-4">
                        {error && (
                        <div className="text-white mb-2 text-sm text-center p-2 bg-red-500 rounded-lg">
                            {error}
                        </div>
                    )}
                        <input 
                            onChange= {(e)=>setTitle(e.target.value)}
                            placeholder="Enter the document title"
                            className="w-full bg-black/30 border-purple-400/30 text-white placeholder:text-purple-300 focus:border-purple-400 p-2 border-1 rounded-sm"
                        ></input>
                        <Button 
                        onClick={() => create()}
                        className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">{loading? <span>Creating....</span>:<span>Create Document</span>}</Button>
                    </div>
                )
            }
            <div>
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                       <input 
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search across the cosmos..."
              className="w-full pl-10 bg-black/30 border-purple-400/30 text-white placeholder:text-purple-300 focus:border-purple-400 p-2 border-1 rounded-sm"
            />
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                className="px-3 border-2 border-purple-400/30 text-purple-200 hover:bg-purple-400/10 bg-transparent"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    All
                                </Button>
                            </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-purple-400/30">
                        <DropdownMenuItem
                            className="text-white hover:bg-purple-400/20"
                            >
                                All Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-white hover:bg-purple-400/20"
                        >
                            Owner
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-white hover:bg-purple-400/20"
                        >
                            Collaborator
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}