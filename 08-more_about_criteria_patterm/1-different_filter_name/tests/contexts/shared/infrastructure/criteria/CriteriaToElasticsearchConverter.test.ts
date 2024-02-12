import { CriteriaToElasticsearchConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToElasticsearchConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToElasticsearchConverter should", () => {
	const converter = new CriteriaToElasticsearchConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert("users", CriteriaMother.empty());

		expect(actualQuery).toStrictEqual({ index: "users", body: { query: { bool: {} } } });
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptySorted("id", "DESC"));

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: { query: { bool: {} }, sort: [{ id: { order: "desc" } }] },
		});
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: { query: { bool: { must: [{ match: { name: "Javier" } }] } } },
		});
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: {
				query: { bool: { must: [{ match: { name: "Javier" } }] } },
				sort: [{ id: { order: "desc" } }],
			},
		});
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

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: {
				query: {
					bool: { must: [{ match: { name: "Javier" } }, { match: { email: "javier@terra.es" } }] },
				},
			},
		});
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

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: {
				query: {
					bool: { must: [{ match: { name: "Javier" } }, { match: { email: "javier@terra.es" } }] },
				},
				sort: [{ id: { order: "desc" } }],
			},
		});
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: { query: { bool: { must: [{ match_phrase_prefix: { name: "Javier" } }] } } },
		});
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: { query: { bool: { must: [{ bool: { must_not: { match: { name: "Javier" } } } }] } } },
		});
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptyPaginated(10, 3));

		expect(actualQuery).toStrictEqual({
			index: "users",
			body: { query: { bool: {} }, size: 10, from: 20 },
		});
	});
});
