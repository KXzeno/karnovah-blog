import { revalidatePath } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  let reqString = await req.text();
}

export const config = {
  matcher: '/',
}

