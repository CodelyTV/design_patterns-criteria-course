import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserProfilePicture } from "./UserProfilePicture";

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	profilePicture: string;
};

export class User {
	private constructor(
		public readonly id: UserId,
		public readonly name: UserName,
		public readonly email: UserEmail,
		public readonly profilePicture: UserProfilePicture,
	) {}

	static create(id: string, name: string, email: string, profilePicture: string): User {
		return new User(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserProfilePicture(profilePicture),
		);
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserName(primitives.name),
			new UserEmail(primitives.email),
			new UserProfilePicture(primitives.profilePicture),
		);
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			profilePicture: this.profilePicture.value,
		};
	}
}
