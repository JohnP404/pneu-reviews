"use client";

import ActionsDropdown from "@/components/ActionsDropdown";
import Comments from "@/components/Comments";
import FavoriteIcon from "@/components/FavoriteIcon";

import { getReview } from "@/lib/axios";
import { Auth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

type Params = { params: { id: string } };

export default function Review({ params }: Params) {
    const [review, setReview] = useState<Review>();
    const { user, isAdmin } = Auth();
    const router = useRouter();

    useEffect(() => {
        async function fetchReview() {
            const review = await getReview(params.id);
            setReview(review);
        }
        fetchReview();
    }, []);

    useLayoutEffect(() => {
        !user && router.replace("/");
    }, [user]);

    return (
        <main className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-1">
                {isAdmin && <ActionsDropdown id={params.id} />}
                {user && (
                    <FavoriteIcon reviewId={params.id} userId={user.uid} />
                )}
            </div>
            <article className="grid max-md:justify-center md:flex">
                <section>
                    <figure className="max-w-[350px] min-w-[250px] mb-2 m-auto">
                        <img
                            className="rounded-md object-cover h-[400px] w-auto m-auto"
                            src={review?.image}
                            alt={review?.title}
                        />
                    </figure>
                    <div className="flex px-4 md:px-0 flex-wrap max-h-[120px] overflow-y-auto gap-1">
                        {review?.tags.map((t) => (
                            <div
                                key={t}
                                className="bg-primary/50 rounded-md px-1 text-center min-w-[40px] max-w-[100px] text-sm line-clamp-1 cursor-default"
                                title={t.length > 10 ? t : ""}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </section>
                <section className="p-4">
                    <h1 className="font-bold text-5xl mb-2 max-w-[1000px] line-clamp-2 leading-tight">
                        {review?.title}
                    </h1>
                    <div className="max-h-[312px] overflow-y-auto pl-2 pr-4 scrollbox">
                        <p className="text-justify">{review?.review}</p>
                    </div>
                </section>
            </article>
            <Comments reviewId={params.id} />
        </main>
    );
}
