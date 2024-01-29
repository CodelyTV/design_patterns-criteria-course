import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async registrar(id: string, name: string, email: string, profilePicture: string): Promise<void> {
		const user = User.create(id, name, email, profilePicture);

		await this.repository.save(user);
	}
}
