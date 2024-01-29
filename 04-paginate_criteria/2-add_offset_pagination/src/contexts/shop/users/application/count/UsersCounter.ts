import { UserRepository } from "../../domain/UserRepository";

export class UsersCounter {
	constructor(private readonly repository: UserRepository) {}

	async count(): Promise<number> {
		return this.repository.count();
	}
}
