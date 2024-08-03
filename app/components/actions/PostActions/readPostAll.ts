'use server';

import { prisma } from "@/prisma";

interface SortParams {
  orderBy?: {
    [key: PropertyKey]: object | string | number
  };
  cursor?: number;
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

interface Category {
  category_id: number,
  name: string,
  posts?: Post[],
}

export async function readPostAll(params?: SortParams): Promise<Post[] | undefined> {
  if (params && params.cursor) {
    try {
      let query: Post[] = await prisma.post.findMany({ 
        take: 7,
        skip: 1,
        ...params,
        cursor: {
          post_id: params.cursor,
        },
        include: {
          categories: true,
        },
      });

      let tailPost = query[query.length - 1];
      params.cursor = tailPost.post_id;
      return query;
    } catch (error) {
      console.error(error);
    }
  } else if (params && !params.cursor){
    try {
      let query = await prisma.post.findMany({ 
        take: 7,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          categories: true,
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

export async function getByCategory(): Promise<Category[] | null | undefined> {
  try {
    let query: Category[] = await prisma.category.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        name: 'asc'
      },
    });
    return query;
  } catch (x) {
    console.error(x);
  }
}

export async function getCategory(name: string): Promise<Category | null | undefined> {
  if (name !== undefined && typeof name === 'string') {
    try {
      let query: Category | null = await prisma.category.findUnique({
        where: {
          name: name,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        },
      })
      return query;
    } catch (x) {
      console.error(x);
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
