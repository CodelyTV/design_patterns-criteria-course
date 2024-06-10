import { PossibleScamUsersCriteriaFactory } from "../../domain/PossibleScamUsersCriteriaFactory";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class PossibleScamUsersSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(): Promise<User[]> {
		const criteria = PossibleScamUsersCriteriaFactory.create();

		return this.repository.matching(criteria);
	}
}
