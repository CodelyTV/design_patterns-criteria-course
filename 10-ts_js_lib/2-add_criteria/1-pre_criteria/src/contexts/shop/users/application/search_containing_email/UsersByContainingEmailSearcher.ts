import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingEmailSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(email: string): Promise<User[]> {
		return await this.repository.containingEmail(email);
	}
}
