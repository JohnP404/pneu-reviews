"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Auth } from "@/store/AuthContext";
import { getDatabase, onValue, ref } from "firebase/database";
import { writeComment } from "@/firebase/write";
import { parseDbData } from "@/lib/utils";

export default function Comments({ reviewId }: { reviewId: string }) {
	const [comments, setComments] = useState<CommentInfo[]>([]);
	const [commentText, setCommentText] = useState("");
	const [commentId, setCommentId] = useState("");

	const txtInputRef = useRef<HTMLInputElement>(null);
	const db = getDatabase();
	const { user } = Auth();

	useEffect(() => {
		const reviewsRef = ref(db, `reviews/${reviewId}/comments`);
		const listener = onValue(reviewsRef, (snapshot) => {
			if (snapshot.exists()) {
				const comments = parseDbData(snapshot.val());
				setComments(comments);
			} else {
				setComments([]);
			}
		});

		return () => {
			listener();
		};
	}, []);

	useEffect(() => {
		if (commentId) txtInputRef.current?.focus();
	}, [commentId]);

	async function postCommentHandler(e: FormEvent) {
		e.preventDefault();
		if (commentText.trim() === "") return;

		const data = {
			comment: commentText,
			user: {
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
			},
			id: commentId,
		};

		commentId
			? writeComment(reviewId, data as CommentInfo, "EDIT")
			: writeComment(reviewId, data as CommentInfo, "POST");

		setCommentId("");
		setCommentText("");
	}

	function cancelEdit() {
		setCommentId("");
		setCommentText("");
	}

	return (
		<section className="max-w-2xl mt-10">
			<h1 className="text-xl">Comentários</h1>
			<div className="grid gap-2 mt-4 max-h-[370px] max-w[672px] w-full overflow-y-auto scrollbox px-2">
				{comments?.length > 0 ? (
					<>
						{comments.toReversed().map((c) => (
							<CommentItem
								key={c.id}
								reviewId={reviewId}
								comment={c.comment}
								user={c.user}
								commentId={c.id || ""}
								setCommentText={setCommentText}
								editing={commentId}
								setEditing={setCommentId}
							/>
						))}
					</>
				) : (
					<p className="text-sm text-slate-500">
						Nenhum comentário postado... Seja o primeiro a comentar!
					</p>
				)}
			</div>
			<form
				onSubmit={postCommentHandler}
				className="flex items-center mt-4 gap-2 relative"
			>
				{commentId && (
					<Button
						type="button"
						onClick={cancelEdit}
						className="text-xs px-2"
					>
						Cancelar
					</Button>
				)}
				<Input
					ref={txtInputRef}
					placeholder="Escreva um comentário"
					className="bg-background"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<Button type="submit">Postar</Button>
			</form>
		</section>
	);
}
