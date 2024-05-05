"use client";

import { useRouter } from "next/navigation";

type Props = {
    favorite: Review;
};

export default function FavoriteItem({ favorite }: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/review/${favorite.id}`)}
            className="cursor-pointer flex items-center gap-2 bg-secondary p-2 w-fit max-w-[400px] rounded-md"
        >
            <img
                className="rounded-md"
                src={favorite.image}
                alt={favorite.title}
                width={90}
                height={90}
            />
            <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">
                {favorite.title}
            </h1>
        </div>
    );
}
