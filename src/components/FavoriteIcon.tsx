"use client";

import { getUser, removeFavorite, uploadFavorite } from "@/lib/axios";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type Props = {
    userId: string;
    reviewId: string;
};

export default function FavoriteIcon({ userId, reviewId }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function fetchUserFavorites() {
            const currentUser = await getUser(userId);

            if (currentUser?.user.favorites?.includes(reviewId))
                setIsFavorite(true);
            else setIsFavorite(false);
        }
        fetchUserFavorites();
    }, []);

    async function changeFavorite() {
        if (isFavorite) {
            await removeFavorite({ uid: userId, reviewId });
        } else {
            await uploadFavorite({ uid: userId, reviewId });
        }
    }

    function clickHandler() {
        setIsFavorite((state) => !state);
        changeFavorite();
    }

    if (isFavorite)
        return (
            <HeartFilledIcon
                className="cursor-pointer"
                width={20}
                color="red"
                height={20}
                onClick={clickHandler}
            />
        );
    else
        return (
            <HeartIcon
                className="cursor-pointer"
                width={20}
                height={20}
                onClick={clickHandler}
            />
        );
}
