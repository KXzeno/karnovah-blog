import { ResolvingMetadata } from "next";

type PageProps = Promise<{ params: { slug: string }, searchParams: object }>;

export async function generateMetadata(pageProps: PageProps, parent: ResolvingMetadata) {
    // read route params
    const slug = pageProps.then(res => res.params.slug);

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
