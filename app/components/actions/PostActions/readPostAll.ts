'use server';

import { prisma } from "@/prisma";

interface SortParams {
  field: string,
  value: string,
}

export async function readPostAll(params?: SortParams) {
  if (params)
    try {
      let db = await prisma.post.findMany({ 
        orderBy: {
          [params.field]: params.value
        },
        include: {
          Section: true,
        },
      });
      return db;
    } catch (error) {
      console.error(error);
    } else {
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
}
