import { Criteria, Operator } from "@codelytv/criteria";

import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingNameAndEmailSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(name: string, email: string): Promise<User[]> {
		const criteria = Criteria.withFilters([
			{ field: "name", operator: Operator.EQUAL, value: name },
			{ field: "email", operator: Operator.EQUAL, value: email },
		]);

		return await this.repository.matching(criteria);
	}
}
