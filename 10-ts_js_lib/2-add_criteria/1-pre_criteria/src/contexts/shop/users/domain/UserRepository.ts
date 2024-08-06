import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
	save(user: User): Promise<void>;

	search(id: UserId): Promise<User | null>;

	containingName(name: string): Promise<User[]>;

	containingEmail(email: string): Promise<User[]>;

	containingNameAndEmail(name: string, email: string): Promise<User[]>;
}
