'use server';

import { prisma } from "@/prisma";

interface SortParams {
  field: string;
  value: string;
  cursor?: number;
  count?: number;
}

interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

export async function readPostAll(params?: SortParams): Promise<Post[] | undefined> {
  if (params && params.cursor)
    try {
      let query: Post[] = await prisma.post.findMany({ 
        take: 7,
        skip: 1,
        cursor: {
          post_id: params.cursor,
        },
        orderBy: {
          [params.field]: params.value
        },
        // include: {
        //   sections: true,
        // },
      });

      let tailPost = query[query.length - 1];
      params.cursor = tailPost.post_id;
      return query;
    } catch (error) {
      console.error(error);
    } else if (params && !params.cursor){
      try {
        let query = await prisma.post.findMany({ 
          take: 7,
          orderBy: {
            [params.field]: params.value
          }
        });
        let tailPost = query[query.length - 1];
        if (params) { params.cursor = tailPost.post_id; }
        return query;
      } catch (error) {
        console.error(error);
      }
    }
}

export async function getInitialId(): Promise<number | undefined> {
  try {
    let singleQuery: Post | null = await prisma.post.findFirst();
    if (singleQuery !== null) {
      return singleQuery.post_id;
    }
  } catch (x) {
    console.error(x);
  }
}
