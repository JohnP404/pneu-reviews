type Actions = "POST" | "EDIT";
type Review = {
	comments?: CommentInfo[];
	id?: string;
	image: string;
	review: string;
	tags: string[];
	title: string;
};

type UserInfo = {
	email: string;
	photoURL: string;
	displayName: string;
};

type CommentInfo = {
	comment: string;
	user: UserInfo;
	id?: string;
};
