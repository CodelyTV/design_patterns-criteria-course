import { ElasticsearchUserRepository } from "../../../../../src/contexts/shop/users/infrastructure/ElasticsearchUserRepository";
import { UserIdMother } from "../domain/UserIdMother";
import { UserMother } from "../domain/UserMother";

describe("MySqlUserRepository should", () => {
	const repository = new ElasticsearchUserRepository();

	it("save a user", async () => {
		const user = UserMother.create();

		await repository.save(user);
	});

	it("return null searching a non existing user", async () => {
		const userId = UserIdMother.create();

		expect(await repository.search(userId)).toBeNull();
	});

	it("return existing user", async () => {
		const user = UserMother.create();

		await repository.save(user);

		expect(await repository.search(user.id)).toStrictEqual(user);
	});
});
