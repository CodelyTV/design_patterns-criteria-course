import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(id: string): Promise<User | null> {
		return this.repository.search(new UserId(id));
	}
}
