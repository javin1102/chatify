import { FieldValue } from "firebase/firestore";

export interface UserType {
	name: string | undefined | null;
	userId: string;
	friends?: [];
	isAuth: boolean;
}

export interface StateSelector {
	user: UserType;
}

export interface ChatType {
	text: string;
	createdAt: FieldValue;
	id: string;
	read?: boolean;
	sender: boolean;
}
