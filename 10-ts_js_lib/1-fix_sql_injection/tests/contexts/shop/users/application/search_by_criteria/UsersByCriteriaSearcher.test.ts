import { UsersByCriteriaSearcher } from "../../../../../../src/contexts/shop/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UsersByCriteriaSearcher should", () => {
	const repository = new MockUserRepository();
	const usersByCriteriaSearcher = new UsersByCriteriaSearcher(repository);

	it("search users using a criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedUsers = [UserMother.create()];

		repository.shouldMatch(criteria, expectedUsers);

		expect(
			await usersByCriteriaSearcher.search(
				criteria.filters.toPrimitives(),
				criteria.order.orderBy.value,
				criteria.order.orderType.value,
				criteria.pageSize,
				criteria.pageNumber,
			),
		).toStrictEqual(expectedUsers);
	});
});
