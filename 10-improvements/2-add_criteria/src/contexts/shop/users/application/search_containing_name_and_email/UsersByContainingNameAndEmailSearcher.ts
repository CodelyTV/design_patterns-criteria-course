import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingNameAndEmailSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(name: string, email: string): Promise<User[]> {
		return await this.repository.containingNameAndEmail(name, email);
	}
}
