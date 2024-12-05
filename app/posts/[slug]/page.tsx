import { ResolvingMetadata } from "next";

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>, searchParams: object }, 
  parent: ResolvingMetadata) {
    // read route params
    const slug = params.then(res => res.slug);

    if (typeof slug === "string") {

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

  }
  export default function Page({ params, searchParams }: { params: object, searchParams: object }) {}
