import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  // let headers = new Headers(req.headers);
  let params = req.nextUrl.searchParams;
  for (let [q, val] of params.entries()) {
    if (q === 'rvc' && val === '1') {
      revalidateTag('posts');
      console.log('Revalidated cache.');
      redirect('/');
    }
    params.delete(q);
    console.log(`Query: ${q}\nValue: ${val}\n\n`);
  }
}
