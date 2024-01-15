import { CriteriaToSqlConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToSqlConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToSqlConverter should", () => {
	const converter = new CriteriaToSqlConverter();

	it("Generate simple select with an empty criteria", async () => {
		const actualQuery = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		expect(actualQuery).toBe("SELECT id, name FROM users;");
	});

	it("Generate select with order", async () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptySorted("id", "DESC"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users ORDER BY id DESC;");
	});

	it("Generate select with one filter", async () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users WHERE name = 'Javier';");
	});
});
