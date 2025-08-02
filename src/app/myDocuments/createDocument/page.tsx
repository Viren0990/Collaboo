import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";

export default async function newDocument() {
  return(
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        <Navbar />
        <Header />
    </div>
  );
}