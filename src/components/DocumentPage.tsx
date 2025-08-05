"use client";

import { Grid } from "@/components/Grid";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { DocumentType, Responses } from "@/types/document";
import { Star } from "lucide-react";
import { deleteDocument } from "@/app/actions/documentActions";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";

export function DocumentsPage(props: { documents: Responses }) {
  const [files, setFiles] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const { documents } = props;
    if (documents.success && documents.data) {
      setFiles(documents.data);
    }
    setLoading(false);
  }, [props.documents]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter((file) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  const handleDeleteDocument = async (id: string) => {
    try {
      const deleted = await deleteDocument(id);
      if (deleted.success) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
        toast.success("Document deleted!");
      } else {
        throw new Error(deleted.message || "Failed to delete document");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete document");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-purple-300">Loading documents...</div>
      </div>
    );
  }

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
      <Navbar />
      <Header onSearch={handleSearch} />
      <Grid files={filteredFiles} onDelete={handleDeleteDocument} />
    </div>
  );
}
