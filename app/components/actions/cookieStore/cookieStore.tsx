'use server';

import { cookies } from "next/headers";

export async function handleCookie(data: any) {
  let oneDay: number = 24 * 60 * 60 * 1000;
  let death: number = oneDay * 71;

  let cookieStore = await cookies();
  cookieStore.set('theme-cookie', data, { expires: death, maxAge: death });
}
