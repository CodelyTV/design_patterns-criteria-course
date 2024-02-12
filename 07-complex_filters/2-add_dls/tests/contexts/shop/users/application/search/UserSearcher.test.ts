import { UserSearcher } from "../../../../../../src/contexts/shop/users/application/search/UserSearcher";
import { UserIdMother } from "../../domain/UserIdMother";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserSearcher should", () => {
	const repository = new MockUserRepository();
	const userSearcher = new UserSearcher(repository);

	it("return null searching a non existing user", async () => {
		const userId = UserIdMother.create();

		repository.shouldNotSearch(userId);

		expect(await userSearcher.search(userId.value)).toBeNull();
	});

	it("search an existing user", async () => {
		const existingUser = UserMother.create();

		repository.shouldSearch(existingUser);

		expect(await userSearcher.search(existingUser.id.value)).toBe(existingUser);
	});
});
