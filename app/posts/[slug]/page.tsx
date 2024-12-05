import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{slug: string, searchParams: object }>;

export async function generateMetadata({ params }: { params: Params }, parent: ResolvingMetadata) {
    // read route params
    const { slug } = await params;

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
    } else {
      notFound();
    }

  }
  export default function Page({ params, searchParams }: { params: object, searchParams: object }) {}
