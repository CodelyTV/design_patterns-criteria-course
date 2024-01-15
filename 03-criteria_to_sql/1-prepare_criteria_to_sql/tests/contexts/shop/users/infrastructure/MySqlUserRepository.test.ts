import { MariaDBConnection } from "../../../../../src/contexts/shared/infrastructure/MariaDBConnection";
import { MySqlUserRepository } from "../../../../../src/contexts/shop/users/infrastructure/MySqlUserRepository";
import { UserIdMother } from "../domain/UserIdMother";
import { UserMother } from "../domain/UserMother";

describe("MySqlUserRepository should", () => {
	const connection = new MariaDBConnection();
	const repository = new MySqlUserRepository(connection);

	beforeEach(() => {
		connection.truncate("shop__users");
	});

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
