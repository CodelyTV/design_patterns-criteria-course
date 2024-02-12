import { CriteriaToEsqlConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToEsqlConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToEsqlConverter should", () => {
	const converter = new CriteriaToEsqlConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert("users", CriteriaMother.empty());

		expect(actualQuery).toBe("FROM users");
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptySorted("id", "DESC"));

		expect(actualQuery).toBe("FROM users | SORT id DESC");
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		expect(actualQuery).toBe(`FROM users | WHERE name = "Javier"`);
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		expect(actualQuery).toBe(`FROM users | WHERE name = "Javier" | SORT id DESC`);
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
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
				pageSize: null,
				pageNumber: null,
			}),
		);

		expect(actualQuery).toBe(`FROM users | WHERE name = "Javier" AND email = "javier@terra.es"`);
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
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
				pageSize: null,
				pageNumber: null,
			}),
		);

		expect(actualQuery).toBe(
			`FROM users | WHERE name = "Javier" AND email = "javier@terra.es" | SORT id DESC`,
		);
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		expect(actualQuery).toBe(`FROM users | WHERE name LIKE "*Javier*"`);
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		expect(actualQuery).toBe(`FROM users | WHERE name NOT LIKE "*Javier*"`);
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptyPaginated(10, 3));

		expect(actualQuery).toBe("FROM users | LIMIT 10");
	});
});
