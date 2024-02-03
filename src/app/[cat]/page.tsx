import { notFound } from "next/navigation";
import SearchBar from "@/components/search-bar";
import ImageLoad from "@/components/image-load";
import { SearchSection } from "./(component)";
import { Suspense } from "react";

async function fetchImage(cat: string, page: string = "0") {
    const headers = new Headers();
    headers.append("Authorization", process.env.PEXELS_API_KEY as string);

    const req = new Request(
        `https://api.pexels.com/v1/search?query=${cat}&page=${page}`,
        {
            method: "GET",
            headers,
        },
    );

    const images = await fetch(req, {
        next: { tags: [`${cat + page}`], revalidate: 60 },
    });

    if (!images.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const json = await images.json();
    return json.photos;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { cat: string };
    searchParams: { page: string };
}) {
    if (!params.cat) notFound();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between gap-10 p-[--padding-x]  [--padding-x:2rem] sm:[--padding-x:5rem] md:gap-20 md:[--padding-x:5rem] lg:[--padding-x:8rem] ">
            <SearchSection page={parseInt(searchParams.page) || 1}>
                <SearchBar defaultValue={params.cat.replaceAll("%20", " ")} />
            </SearchSection>
            <Suspense
                key={JSON.stringify(searchParams)}
                fallback={
                    <div className="flex w-full flex-1 items-center justify-center">
                        Loading...
                    </div>
                }
            >
                <ImageContainer params={params} searchParams={searchParams} />
            </Suspense>
        </main>
    );
}

const ImageContainer = async ({
    params,
    searchParams,
}: {
    params: { cat: string };
    searchParams: { page: string };
}) => {
    const images = await fetchImage(
        params.cat,
        searchParams.page ? searchParams.page : "1",
    );
    return (
        <div className={"w-full"}>
            <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg ">
                {images?.map((ph: any, i: number) => {
                    return (
                        <div key={i}>
                            <ImageLoad photo={ph} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
