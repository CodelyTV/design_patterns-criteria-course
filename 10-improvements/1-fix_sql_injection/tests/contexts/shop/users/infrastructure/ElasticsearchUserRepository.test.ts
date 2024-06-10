import { Client } from "@elastic/elasticsearch";

import { ElasticsearchUserRepository } from "../../../../../src/contexts/shop/users/infrastructure/ElasticsearchUserRepository";
import { CriteriaMother } from "../../../shared/domain/criteria/CriteriaMother";
import { UserIdMother } from "../domain/UserIdMother";
import { UserMother } from "../domain/UserMother";

describe("ElasticsearchUserRepository should", () => {
	const client = new Client({ node: "http://localhost:9200" });
	const repository = new ElasticsearchUserRepository(client);

	beforeEach(async () => {
		try {
			await client.indices.delete({ index: "users" });
		} catch (_error) {}
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
		const javiDos = UserMother.create({ name: "JaviDos" });
		const rafa = UserMother.create({ name: "Rafa" });
		const codelyber = UserMother.create({ name: "Codelyber" });

		await repository.save(javi);
		await repository.save(javiDos);
		await repository.save(rafa);
		await repository.save(codelyber);

		expect(
			await repository.matching(CriteriaMother.withOneFilter("name", "CONTAINS", "Javi")),
		).toStrictEqual([javi, javiDos]);
	});
});
