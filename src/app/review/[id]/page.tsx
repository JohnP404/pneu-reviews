"use client";

import ActionsDropdown from "@/components/ActionsDropdown";
import Comments from "@/components/Comments";
import FavoriteIcon from "@/components/FavoriteIcon";
import LoadingSpinner from "@/components/LoadingSpinner";

import { Auth } from "@/store/AuthContext";
import { ImageIcon } from "@radix-ui/react-icons";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

type Params = { params: { id: string } };

export default function Review({ params }: Params) {
	const [review, setReview] = useState<Review>();
	const [imgLoading, setImgLoading] = useState(true);
	const [imgError, setImgError] = useState(false);

	const db = getDatabase();
	const { user, isAdmin } = Auth();
	const router = useRouter();

	useEffect(() => {
		const reviewsRef = ref(db, `reviews/${params.id}`);
		const listener = onValue(reviewsRef, (snapshot) => {
			if (snapshot.exists()) {
				const review = snapshot.val();
				setReview(review);
			}
		});

		return () => {
			listener();
		};
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
				<section className="relative">
					{imgLoading && (
						<LoadingSpinner className="absolute top-[40%] left-[40%]" />
					)}
					<figure className="max-w-[350px] min-w-[250px] mb-2 m-auto">
						{imgError && (
							<ImageIcon
								height={200}
								width={200}
								aria-label={review?.title + " imagem"}
							/>
						)}
						<img
							onLoad={() => setImgLoading(false)}
							onError={() => {
								setImgError(true);
								setImgLoading(false);
							}}
							className="rounded-md object-cover h-[400px] w-auto m-auto"
							src={review?.image}
							alt={review?.title}
						/>
					</figure>
					<div className="flex px-4 md:px-0 flex-wrap max-h-[120px] overflow-y-auto gap-1">
						{review?.tags.map((t) => (
							<div
								key={t}
								className="bg-primary/50 rounded-md px-1 text-center min-w-[40px] max-w-[140px] text-sm line-clamp-1 cursor-default"
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
