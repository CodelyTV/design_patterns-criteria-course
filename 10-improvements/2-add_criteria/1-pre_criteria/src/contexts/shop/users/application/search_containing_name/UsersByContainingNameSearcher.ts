import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingNameSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(name: string): Promise<User[]> {
		return await this.repository.containingName(name);
	}
}
