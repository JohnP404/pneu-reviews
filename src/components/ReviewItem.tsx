"use client";

import { useRouter } from "next/navigation";
import TagsCarousel from "./TagsCarousel";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { ImageIcon } from "@radix-ui/react-icons";

type Props = {
	review: Review;
};

export default function ReviewItem({ review }: Props) {
	const [imgLoading, setImgLoading] = useState(true);
	const [imgError, setImgError] = useState(false);
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/review/${review.id}`)}
			className="bg-slate-900 border p-4 rounded-md space-y-2 min-w-[280px] max-w-fit cursor-pointer transition-all hover:shadow-md hover:shadow-primary/40 grid"
		>
			<div className="w-full pb-1 relative ">
				{imgLoading && (
					<LoadingSpinner className="absolute top-[40%] left-[40%]" />
				)}
				<figure className="h-[300px] w-full flex flex-col justify-center items-center">
					{imgError && (
						<ImageIcon
							height={200}
							width={200}
							aria-label={review.title + " imagem"}
						/>
					)}
					<img
						onLoad={() => setImgLoading(false)}
						onError={() => {
							setImgError(true);
							setImgLoading(false);
						}}
						className="object-cover h-full w-full"
						src={review.image}
						alt={review.title}
					/>
				</figure>
			</div>
			<div className="self-center">
				<h1 className="text-2xl font-semibold">{review.title}</h1>
			</div>
			<div className="flex items-center">
				<span className="text-sm">Tags: </span>
				<TagsCarousel tags={review.tags} />
			</div>
		</div>
	);
}
