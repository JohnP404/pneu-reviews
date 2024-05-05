"use client";

import { useRouter } from "next/navigation";
import TagsCarousel from "./TagsCarousel";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
    game: Review;
};

export default function ReviewItem({ game }: Props) {
    const [imgLoading, setImgLoading] = useState(true);
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/review/${game.id}`)}
            className="bg-slate-900 border p-4 rounded-md space-y-2 min-w-[280px] max-w-fit cursor-pointer transition-all hover:shadow-md hover:shadow-primary/40 grid"
        >
            <div className="max-w-[250px] mb-2 relative">
                <img
                    onLoad={() => setImgLoading(false)}
                    className="mb-2 object-cover h-[300px] w-auto m-auto"
                    src={game.image}
                    alt={game.title}
                />

                {imgLoading && (
                    <LoadingSpinner className="absolute top-[40%] left-[40%]" />
                )}
                <h1 className="text-2xl font-semibold">{game.title}</h1>
            </div>
            <div className="flex items-center">
                <span className="text-sm">Tags: </span>
                <TagsCarousel tags={game.tags} />
            </div>
        </div>
    );
}
