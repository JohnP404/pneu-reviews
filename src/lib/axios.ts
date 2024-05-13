import axios from "axios";
import { getIdToken } from "./utils";
import { User } from "firebase/auth";

const BASE_URL = "https://pneuzin-reviews-default-rtdb.firebaseio.com";

interface UserData extends User {
	favorites?: string[];
}

export async function postReview(reviewData: Review) {
	const token = await getIdToken();

	try {
		await axios.post(`${BASE_URL}/reviews.json?auth=${token}`, reviewData);
	} catch (error) {
		console.log(error);
	}
}

export async function getReviews() {
	const token = await getIdToken();

	try {
		const { data } = await axios.get(
			`${BASE_URL}/reviews.json?auth=${token}`
		);

		const keys = Object.keys(data);
		const reviews = keys.map((key) => {
			return { ...data[key], id: key };
		}) as Review[];

		return reviews;
	} catch (error) {
		console.log(error);
	}
}

export async function getReview(id: string) {
	const token = await getIdToken();

	try {
		const { data } = await axios.get(
			`${BASE_URL}/reviews/${id}.json?auth=${token}`
		);
		return data as Review;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteReview(id: string) {
	const token = await getIdToken();

	try {
		await axios.delete(`${BASE_URL}/reviews/${id}.json?auth=${token}`);
	} catch (error) {
		console.log(error);
	}
}

export async function editReview(id: string, reviewData: Review) {
	const token = await getIdToken();

	try {
		await axios.patch(
			`${BASE_URL}/reviews/${id}.json?auth=${token}`,
			reviewData
		);
	} catch (error) {
		console.log(error);
	}
}

export async function getComments(id: string) {
	const token = await getIdToken();

	try {
		const { data } = await axios.get(
			`${BASE_URL}/reviews/${id}/comments.json?auth=${token}`
		);
		const keys = Object.keys(data);
		const comments = keys.map((key) => {
			return { ...data[key], id: key };
		}) as CommentInfo[];

		return comments;
	} catch (error) {
		console.log(error);
	}
}

export async function postComment(
	comment: string,
	reviewId: string,
	user: { email: string; displayName: string; photoURL: string }
) {
	const token = await getIdToken();
	try {
		await axios.post(
			`${BASE_URL}/reviews/${reviewId}/comments.json?auth=${token}`,
			{
				comment,
				user,
			}
		);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteComment(id: string, reviewId: string) {
	const token = await getIdToken();

	try {
		if (!id) throw new Error("Comment not found");

		await axios.delete(
			`${BASE_URL}/reviews/${reviewId}/comments/${id}.json?auth=${token}`
		);
	} catch (error) {
		console.log(error);
	}
}

export async function editComment(
	reviewId: string,
	commentId: string,
	comment: string
) {
	try {
		const token = await getIdToken();

		await axios.patch(
			`${BASE_URL}/reviews/${reviewId}/comments/${commentId}.json?auth=${token}`,
			{ comment }
		);
	} catch (error) {
		console.log(error);
	}
}

export async function uploadUser(user: User) {
	try {
		const token = await getIdToken();
		const { email, displayName, uid, photoURL } = user;

		await axios.post(`${BASE_URL}/users/${uid}.json?auth=${token}`, {
			email,
			displayName,
			uid,
			photoURL,
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getUser(
	uid: string
): Promise<{ key: string; user: UserData } | undefined> {
	try {
		const token = await getIdToken();
		const { data } = await axios.get(
			`${BASE_URL}/users/${uid}.json?auth=${token}`
		);

		const [key] = Object.keys(data);

		return { key, user: data[key] };
	} catch (error) {
		console.log(error);
	}
}

export async function uploadFavorite({
	uid,
	reviewId,
}: {
	uid: string;
	reviewId: string;
}) {
	try {
		const token = await getIdToken();
		const userInfo = await getUser(uid);

		const updatedUser = { ...userInfo?.user };

		if (updatedUser.favorites) {
			updatedUser.favorites.push(reviewId);
		} else {
			updatedUser.favorites = [reviewId];
		}

		await axios.patch(
			`${BASE_URL}/users/${uid}/${userInfo?.key}.json?auth=${token}`,
			updatedUser
		);
	} catch (error) {
		console.log(error);
	}
}

export async function removeFavorite({
	uid,
	reviewId,
}: {
	uid: string;
	reviewId: string;
}) {
	try {
		const token = await getIdToken();
		const userInfo = await getUser(uid);

		const updatedUser = { ...userInfo?.user };

		if (updatedUser.favorites) {
			const updatedFavorites = updatedUser.favorites.filter(
				(id) => id !== reviewId
			);
			updatedUser.favorites = updatedFavorites;
		}

		await axios.patch(
			`${BASE_URL}/users/${uid}/${userInfo?.key}.json?auth=${token}`,
			updatedUser
		);
	} catch (error) {
		console.log(error);
	}
}
