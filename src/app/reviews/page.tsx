"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import ReviewItem from "@/components/ReviewItem";
import { parseDbData } from "@/lib/utils";
import { Auth } from "@/store/AuthContext";
import { getDatabase, onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Reviews() {
	const [reviews, setReviews] = useState<Review[]>();
	const [isLoading, setIsLoading] = useState(true);

	const db = getDatabase();
	const { user } = Auth();
	const router = useRouter();

	useLayoutEffect(() => {
		if (!user) router.replace("/");
	}, [user]);

	useEffect(() => {
		setIsLoading(true);

		const reviewsRef = ref(db, "reviews");
		const listener = onValue(reviewsRef, (snapshot) => {
			if (snapshot.exists()) {
				const reviews = parseDbData(snapshot.val());
				setReviews(reviews);
			} else {
				setReviews([]);
			}
			setIsLoading(false);
		});

		return () => {
			listener();
		};
	}, []);

	if (isLoading)
		return (
			<main className="grid h-screen w-screen place-content-center">
				<LoadingSpinner />
			</main>
		);

	return (
		<main className="py-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(4,_300px)] gap-4 justify-center justify-items-center">
			{!reviews && <h1 className="text-2xl p-4">Não há reviews</h1>}
			{reviews &&
				reviews.map((review) => {
					return <ReviewItem key={review.id} review={review} />;
				})}
		</main>
	);
}
