import { MariaDBConnection } from "../../../../../src/contexts/shared/infrastructure/MariaDBConnection";
import { MySqlUserRepository } from "../../../../../src/contexts/shop/users/infrastructure/MySqlUserRepository";
import { CriteriaMother } from "../../../shared/domain/criteria/CriteriaMother";
import { UserIdMother } from "../domain/UserIdMother";
import { UserMother } from "../domain/UserMother";

describe("MySqlUserRepository should", () => {
	const connection = new MariaDBConnection();
	const repository = new MySqlUserRepository(connection);

	beforeEach(async () => {
		await connection.truncate("shop__users");
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

	it("return existing user searching by criteria", async () => {
		const javi = UserMother.create({ name: "Javi" });
		const rafa = UserMother.create({ name: "Rafa" });
		const codelyber = UserMother.create({ name: "Codelyber" });

		await repository.save(javi);
		await repository.save(rafa);
		await repository.save(codelyber);

		expect(
			await repository.matching(CriteriaMother.withOneFilter("name", "EQUAL", "Javi")),
		).toStrictEqual([javi]);
	});
});
