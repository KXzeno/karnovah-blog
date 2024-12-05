import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: { params: Params, searchParams: SearchParams } /*parent: ResolvingMetadata*/) {
  // read route params
  const { slug } = await props.params;


  // fetch data
  const post = await fetch(`https://blog.karnovah.com/posts/${slug}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
    title: `${post.title}`,
    /*
       openGraph: {
       images: ['/path/to/img', ...previousImages],
       },
     */
  }
}

// export default async function Page({ params, searchParams }: { params: object, searchParams: object }) {}
