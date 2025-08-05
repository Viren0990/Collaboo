import { deleteDocument, getDocuments } from "@/app/actions/documentActions";
import { DocumentsPage } from "@/components/DocumentPage";

export default async function Documents() {
  const docs = await getDocuments();
  return <DocumentsPage documents={docs} />;
}