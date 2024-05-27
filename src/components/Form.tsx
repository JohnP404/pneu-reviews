"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { readReview } from "@/firebase/read";
import { writeReview } from "@/firebase/write";

interface Inputs {
	image: string;
	title: string;
	tags: string;
	review: string;
}

type InputNames = "tags" | "title" | "image" | "review";

const schema = z
	.object({
		image: z
			.string()
			.trim()
			.min(1, "Imagem é obrigatória")
			.url("URL inválida"),

		title: z.string().trim().min(1, "Título é obrigatório"),
		tags: z
			.string()
			.trim()
			.min(1, "Tags são obrigatórias")
			.transform((val) => val.replace(/,\s+|\s+,/g, ",")),
		review: z.string().trim().min(1, "Review é obrigatória").trim(),
	})
	.required();

export default function Form() {
	const [showInfo, setShowInfo] = useState(false);
	const [review, setReview] = useState({
		image: "",
		title: "",
		tags: "",
		review: "",
	});
	const router = useRouter();
	const searchParams = useSearchParams();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: review,
	});

	useEffect(() => {
		const reviewId = searchParams.get("id");

		async function fetchReviewData() {
			const reviewData = await readReview(reviewId!);

			if (!reviewData) return;

			const formattedData = {
				...reviewData,
				tags: reviewData?.tags.join(","),
			};

			setReview(formattedData);
		}
		reviewId
			? fetchReviewData()
			: setReview({ image: "", title: "", tags: "", review: "" });
	}, [searchParams]);

	useEffect(() => {
		reset(review);
	}, [review]);

	function inputChangeHandler(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		if (!review) return;

		const name = e.target.name as InputNames;
		const updatedReview = { ...review };

		updatedReview[name] = e.target.value;

		setReview(updatedReview);
	}

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const reviewId = searchParams.get("id");
		const reviewData = {
			...data,
			tags: data.tags.split(","),
			id: reviewId!,
		};

		reviewId
			? await writeReview(reviewData, "EDIT")
			: await writeReview(reviewData, "POST");

		router.replace("/reviews");
	};

	return (
		<form
			className="space-y-3 max-w-[500px] w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<Label>URL da Imagem</Label>
				<Controller
					name="image"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							onChange={inputChangeHandler}
							value={review?.image}
							className={errors.image && "border-destructive"}
						/>
					)}
				/>
				<p className="text-xs text-red-700 mt-1">
					{errors.image && errors.image.message}
				</p>
			</div>
			<div>
				<Label>Título</Label>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							onChange={inputChangeHandler}
							value={review?.title}
							className={errors.title && "border-destructive"}
						/>
					)}
				/>
				<p className="text-xs text-red-700 mt-1">
					{errors.title && errors.title.message}
				</p>
			</div>
			<div>
				<div className="flex items-center gap-1 mb-1 relative">
					<Label>Tags</Label>
					<InfoCircledIcon
						className="cursor-pointer"
						onMouseEnter={() => setShowInfo(true)}
						onMouseLeave={() => setShowInfo(false)}
					/>

					<div
						className={`transition-all absolute text-xs bg-zinc-900/30 backdrop-blur-sm p-2 rounded-md border border-white/50 max-w-[180px] left-14 -top-9 ${
							showInfo ? "scale-100" : "scale-0"
						}`}
					>
						Devem ser separadas por vírgula. Ex: x,y,z
					</div>
				</div>
				<Controller
					name="tags"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							onChange={inputChangeHandler}
							value={review?.tags}
							className={errors.tags && "border-destructive"}
						/>
					)}
				/>
				<p className="text-xs text-red-700 mt-1">
					{errors.tags && errors.tags.message}
				</p>
			</div>
			<div>
				<Label>Review</Label>
				<Controller
					name="review"
					control={control}
					render={({ field }) => (
						<Textarea
							rows={5}
							{...field}
							onChange={inputChangeHandler}
							value={review?.review}
							className={errors.review && "border-destructive"}
						/>
					)}
				/>
				<p className="text-xs text-red-700 mt-1">
					{errors.review && errors.review.message}
				</p>
			</div>
			<Button type="submit">Upload</Button>
		</form>
	);
}
