"use client";

import ReviewItem from "@/components/ReviewItem";
import { getReviews } from "@/lib/axios";
import { Auth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>();
    const [isLoading, setIsLoading] = useState(true);

    const { user } = Auth();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!user) router.replace("/");
    }, [user]);

    useEffect(() => {
        setIsLoading(true);

        async function fetchReviews() {
            const reviews = await getReviews();

            setReviews(reviews);
            setIsLoading(false);
        }

        user && fetchReviews();
    }, []);

    if (isLoading) return <></>;

    return (
        <main className="py-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(4,_300px)] gap-4 justify-center justify-items-center">
            {reviews?.map((game) => {
                return <ReviewItem key={game.id} game={game} />;
            })}
        </main>
    );
}
