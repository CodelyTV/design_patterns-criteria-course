import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByCriteriaSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		limit: number | null,
		offset: number | null,
	): Promise<User[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, limit, offset);

		return this.repository.matching(criteria);
	}
}
