"use client";

import { FormEvent, useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { editComment, getComments, postComment } from "@/lib/axios";
import { Auth } from "@/store/AuthContext";

export default function Comments({ reviewId }: { reviewId: string }) {
    const [comments, setComments] = useState<CommentInfo[]>([]);
    const [commentText, setCommentText] = useState("");
    const [commentId, setCommentId] = useState<string | null>(null);
    const { user } = Auth();

    async function fetchComments() {
        const comments = await getComments(reviewId);

        if (comments) {
            setComments(comments);
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    async function postCommentHandler(e: FormEvent) {
        e.preventDefault();

        if (commentText.trim() === "") return;

        if (!commentId) {
            await postComment(commentText, reviewId, {
                email: user.email!,
                displayName: user.displayName!,
                photoURL: user.photoURL!,
            });
        } else {
            await editComment(reviewId, commentId, commentText);
            setCommentId(null);
        }

        setCommentText("");
        fetchComments();
    }

    function cancelEdit() {
        setCommentId(null);
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
                                setComments={setComments}
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
                    <Button onClick={cancelEdit} className="text-xs px-2">
                        Cancelar
                    </Button>
                )}
                <Input
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
