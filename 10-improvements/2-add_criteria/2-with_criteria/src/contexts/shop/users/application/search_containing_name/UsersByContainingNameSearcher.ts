import { Criteria, Operator } from "@codelytv/criteria";

import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByContainingNameSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(name: string): Promise<User[]> {
		const criteria = Criteria.withFilters([
			{ field: "name", operator: Operator.EQUAL, value: name },
		]);

		return await this.repository.matching(criteria);
	}
}
