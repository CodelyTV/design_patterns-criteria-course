import { Criteria, Operator } from "@codelytv/criteria";

import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingEmailSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(email: string): Promise<User[]> {
		const criteria = Criteria.withFilters([
			{ field: "email", operator: Operator.EQUAL, value: email },
		]);

		return await this.repository.matching(criteria);
	}
}
