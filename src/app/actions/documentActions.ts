"use server"

import prisma from "@/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export async function auth() {
  return await getServerSession(NEXT_AUTH_CONFIG);
}

export const createDocument = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const title = formData.get("title") as string;
  const userId = session.user.id;

  if (!title) {
    return { success: false, message: "Title is required" };
  }

  try {
    const document = await prisma.document.create({
      data: {
        title,
        ownerId: userId,
        collaborators: {
          create: {
            userId,
            role: "OWNER",
          },
        },
        versions: {
          create: {
            snapshot: Buffer.from(""), 
            createdById: userId,
            name: "Initial Version", 
          },
        },
      },
      include: {
        versions: true,
      },
    });

    return {
      success: true,
      message: "Document created successfully",
      documentId: document.id,
    };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create document" };
  }
};


export async function getDocuments(){
    const session = await auth();
    if(!session?.user?.id){
        redirect("/signin");
    }

    try{
        const document = await prisma.documentCollaborator.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                document: true,
            },
            orderBy: {
                document: {
                    createdAt: "desc",
                }
            }
        })

        return {
            success: true,
            data : document.map((doc) => ({
            id: doc.document.id,
            title: doc.document.title,
            createdAt: doc.document.createdAt,
            role: doc.role,
        })),
        };
    }catch(e){
        console.error(e);
        return { success: false, message: "Failed to fetch documents" };
    }
}

export async function getDocument(id: string) {
    const session = await auth();
    if (!session?.user) redirect("/signin");

    try {
        const access = await prisma.documentCollaborator.findFirst({
            where: {
                documentId: id,
                userId: session.user.id,
            },
        });

        if (!access) {
            return { success: false, message: "Access denied" };
        }

        const document = await prisma.document.findUnique({
            where: {
                id,
            },
            include: {
                versions: {
                    orderBy: {
                        createdAt: "desc", 
                    },
                },
                collaborators: true,
                owner: true, 
            },
        });

        if (!document) {
            return { success: false, message: "Document not found" };
        }

        return {
            success: true,
            document,
        };
    } catch (e) {
        console.error("Error fetching document:", e);
        return { success: false, message: "Failed to fetch document" };
    }
}

export async function deleteDocument(id: string){
    const session = await auth();
    if (!session?.user) redirect("/signin");

    try{
        const document = await prisma.document.findUnique({
            where: {
                id,
            },
        });

        if(!document){
            return { success: false, message: "Document not found" };
        }

        if(document.ownerId !== session.user.id){
            return { success: false, message: "Access denied" };
        }

        await prisma.document.delete({
            where: { id },
        });

        return { success: true, message: "Document deleted successfully" };
    }catch(e){
        console.error(e);
        return { success: false, message: "Failed to delete document" };
    }
}