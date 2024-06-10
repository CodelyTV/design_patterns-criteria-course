import { CriteriaToMySqlConverterFixed } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToMySqlConverterFixed";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToMySqlConverterFixed should", () => {
	const converter = new CriteriaToMySqlConverterFixed();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		expect(actualQuery).toStrictEqual({ query: "SELECT id, name FROM users;", params: [] });
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptySorted("id", "DESC"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users ORDER BY ? ?;",
			params: ["id", "DESC"],
		});
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = ?;",
			params: ["Javier"],
		});
	});

	it("Generate select with one greater than filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "GREATER_THAN", "25"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, age FROM users WHERE age > ?;",
			params: ["25"],
		});
	});

	it("Generate select with one greater than or equal filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "GREATER_THAN_OR_EQUAL", "25"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, age FROM users WHERE age >= ?;",
			params: ["25"],
		});
	});

	it("Generate select with one lower than filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "LOWER_THAN", "18"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, age FROM users WHERE age < ?;",
			params: ["18"],
		});
	});

	it("Generate select with one lower than or equal filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "LOWER_THAN_OR_EQUAL", "18"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, age FROM users WHERE age <= ?;",
			params: ["18"],
		});
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = ? ORDER BY ? ?;",
			params: ["Javier", "id", "DESC"],
		});
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
				pageSize: null,
				pageNumber: null,
			}),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name, email FROM users WHERE name = ? AND email = ?;",
			params: ["Javier", "javier@terra.es"],
		});
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
				pageSize: null,
				pageNumber: null,
			}),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name, email FROM users WHERE name = ? AND email = ? ORDER BY ? ?;",
			params: ["Javier", "javier@terra.es", "id", "DESC"],
		});
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name NOT LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptyPaginated(10, 3),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users LIMIT ? OFFSET ?;",
			params: [10, 20],
		});
	});

	it("Generate select with not contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name NOT LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate select with not equals filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_EQUAL", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name != ?;",
			params: ["Javier"],
		});
	});

	it("Generate select with one filter with a different name in the query", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("fullname", "EQUAL", "Javier"),
			{ fullname: "name" },
		);

		expect(actualQuery).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = ?;",
			params: ["Javier"],
		});
	});
});
