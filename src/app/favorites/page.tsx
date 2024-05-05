"use client";

import FavoriteItem from "@/components/FavoriteItem";
import { getReview, getUser } from "@/lib/axios";
import { Auth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const { user } = Auth();

    const [favorites, setFavorites] = useState<Review[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!user) router.replace("/");
    }, [user]);

    useEffect(() => {
        async function fetchUserFavorites() {
            const userData = await getUser(user.uid);

            userData?.user.favorites?.forEach(async (favId) => {
                const review = await getReview(favId);

                if (review) review.id = favId;
                setFavorites((favorites) => [...favorites, review!]);
            });
        }

        fetchUserFavorites();
    }, []);

    return (
        <main className="p-4">
            <h1 className="text-xl font-semibold">Reviews Favoritas</h1>
            <div className="p-2 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4 justify-items-center">
                {favorites.length !== 0 ? (
                    favorites.map((f) => (
                        <FavoriteItem key={f.id} favorite={f} />
                    ))
                ) : (
                    <p className="p-2 text-md">
                        Você ainda não adicionou nenhuma review nos favoritos...
                    </p>
                )}
            </div>
        </main>
    );
}
