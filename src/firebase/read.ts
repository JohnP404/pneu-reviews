import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

export async function readUser(userId: string) {
	let val;
	try {
		const snapshot = await get(child(dbRef, `reviews/${userId}`));
		if (snapshot.exists()) {
			val = snapshot.val();
		}
		return val;
	} catch (error) {
		console.error(error);
	}
}

export async function readReview(reviewId: string) {
	let val;
	try {
		const snapshot = await get(child(dbRef, `reviews/${reviewId}`));
		if (snapshot.exists()) {
			val = snapshot.val();
		}
		return val;
	} catch (error) {
		console.error(error);
	}
}
