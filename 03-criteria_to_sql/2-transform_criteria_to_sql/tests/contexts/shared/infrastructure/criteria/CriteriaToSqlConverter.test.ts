import { CriteriaToSqlConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToSqlConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToSqlConverter should", () => {
	const converter = new CriteriaToSqlConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		expect(actualQuery).toBe("SELECT id, name FROM users;");
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptySorted("id", "DESC"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users ORDER BY id DESC;");
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users WHERE name = 'Javier';");
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users WHERE name = 'Javier' ORDER BY id DESC;");
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
			["id", "name", "email"],
			"users",
			CriteriaMother.create({
				filters: [
					{
						field: "name",
						operator: "EQUAL",
						value: "Javier",
					},
					{
						field: "email",
						operator: "EQUAL",
						value: "javier@terra.es",
					},
				],
				orderBy: null,
				orderType: null,
			}),
		);

		expect(actualQuery).toBe(
			"SELECT id, name, email FROM users WHERE name = 'Javier' AND email = 'javier@terra.es';",
		);
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
			["id", "name", "email"],
			"users",
			CriteriaMother.create({
				filters: [
					{
						field: "name",
						operator: "EQUAL",
						value: "Javier",
					},
					{
						field: "email",
						operator: "EQUAL",
						value: "javier@terra.es",
					},
				],
				orderBy: "id",
				orderType: "DESC",
			}),
		);

		expect(actualQuery).toBe(
			"SELECT id, name, email FROM users WHERE name = 'Javier' AND email = 'javier@terra.es' ORDER BY id DESC;",
		);
	});

	it('Generate select with one filter and "CONTAINS" operator', () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "tuttodev"),
		);

		expect(actualQuery).toBe("SELECT id, name FROM users WHERE name LIKE '%tuttodev%';");
	});
});
