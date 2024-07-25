'use server';

import { prisma } from "@/prisma";

export async function readPostAll(placeholder?: unknown) {
  try {
    let db = await prisma.post.findMany({ 
      include: {
        Section: true,
      },
    });
    return db;
  } catch (error) {
    console.error(error);
  }
}
