import { deleteComment } from "@/firebase/write";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type Props = {
	comment: string;
	user: UserInfo;
	commentId: string;
	reviewId: string;
	editing: string | null;
	setCommentText: Dispatch<SetStateAction<string>>;
	setEditing: Dispatch<SetStateAction<string>>;
};

export default function CommentItem({
	user,
	editing,
	comment,
	commentId,
	reviewId,
	setCommentText,
	setEditing,
}: Props) {
	const imageUrl = new RegExp(
		/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|jpg|gif|png)/gi
	).test(comment);

	const nonImageUrl = new RegExp(
		/((http|https):\/\/(?!.*\.(?:png|jpg|jpeg|svg|gif)).*)/gi
	).test(comment);

	async function deleteCommentHandler() {
		await deleteComment(reviewId, commentId);
	}

	async function editCommentHandler() {
		setEditing(commentId);
		setCommentText(comment);
	}

	let content;

	if (imageUrl) {
		content = (
			<div className="max-w-[200px] max-h-[200px] overflow-hidden m-auto mb-3">
				<img src={comment} className="w-full h-full" />
			</div>
		);
	} else if (nonImageUrl) {
		content = (
			<a className="text-blue-500" href={comment}>
				{comment}
			</a>
		);
	} else {
		content = <p className="max-w-[620px] break-words">{comment}</p>;
	}

	return (
		<div
			className={` ${
				editing === commentId ? "bg-red-950" : "bg-secondary"
			} grid p-4 rounded-md min-w-[300px] max-w-fit`}
		>
			<div className="flex items-center gap-2 mb-2">
				<img
					width={30}
					height={30}
					src={user?.photoURL || ""}
					referrerPolicy="no-referrer"
					className="rounded-full"
				/>
				<span>{user?.displayName}</span>
			</div>

			{content}

			{user?.email === getAuth().currentUser?.email && (
				<div className="flex gap-2 text-xs justify-self-end">
					<div
						onClick={deleteCommentHandler}
						className="text-red-500 flex items-center cursor-pointer"
					>
						<TrashIcon />
						<span>Delete</span>
					</div>
					<div
						onClick={editCommentHandler}
						title="Em breve..."
						className="text-blue-600 flex items-center cursor-pointer"
					>
						<Pencil1Icon />
						<span>Edit</span>
					</div>
				</div>
			)}
		</div>
	);
}
