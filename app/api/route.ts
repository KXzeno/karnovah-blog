import { type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  let headers = new Headers(req.headers);
  let params = req.nextUrl.searchParams;
  for (let [q, val] of params.entries()) {
    if (q === 'rvc' && val === '1') {
      revalidatePath('/');
      console.log('Revalidated cache.');
      redirect('/');
    }
    console.log(`Query: ${q}\nValue: ${val}\n\n`);
  }
  return headers; 
}
