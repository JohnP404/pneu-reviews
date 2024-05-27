import { User } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";

const db = getDatabase();

export function writeUser(user: User) {
	const data = {
		displayName: user.displayName,
		email: user.email,
		photoURL: user.photoURL,
		uid: user.uid,
	};

	const updates: any = {};
	updates[`/users/${user.uid}`] = data;

	return update(ref(db), updates);
}

export function writeReview(review: Review, action: Actions) {
	const updates: any = {};

	if (action === "POST") {
		const reviewKey = push(child(ref(db), "reviews")).key;
		updates[`/reviews/${reviewKey}`] = review;
	} else {
		updates[`/reviews/${review.id}`] = review;
	}

	return update(ref(db), updates);
}

export function deleteReview(reviewId: string) {
	const updates: any = {};
	updates[`/reviews/${reviewId}`] = null;

	return update(ref(db), updates);
}

export function writeComment(
	reviewId: string,
	comment: CommentInfo,
	action: Actions
) {
	const updates: any = {};

	if (action === "POST") {
		const commentKey = push(child(ref(db), "reviews")).key;
		updates[`/reviews/${reviewId}/comments/${commentKey}`] = comment;
	} else {
		updates[`/reviews/${reviewId}/comments/${comment.id}`] = comment;
	}

	return update(ref(db), updates);
}

export function deleteComment(reviewId: string, commentId: string) {
	const updates: any = {};
	updates[`/reviews/${reviewId}/comments/${commentId}`] = null;

	return update(ref(db), updates);
}
