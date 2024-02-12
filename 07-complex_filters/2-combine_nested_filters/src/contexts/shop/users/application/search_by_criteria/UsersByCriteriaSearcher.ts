import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByCriteriaSearcher {
	constructor(private readonly repository: UserRepository) {}

	async search(
		filters: string,
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null,
	): Promise<User[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

		return this.repository.matching(criteria);
	}
}
