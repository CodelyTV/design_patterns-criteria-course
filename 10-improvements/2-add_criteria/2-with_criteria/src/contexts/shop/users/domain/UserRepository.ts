import { Criteria } from "@codelytv/criteria";

import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
	save(user: User): Promise<void>;

	search(id: UserId): Promise<User | null>;

	matching(criteria: Criteria): Promise<User[]>;
}
