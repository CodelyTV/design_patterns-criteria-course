import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
	save(user: User): Promise<void>;

	search(id: UserId): Promise<User | null>;
}
