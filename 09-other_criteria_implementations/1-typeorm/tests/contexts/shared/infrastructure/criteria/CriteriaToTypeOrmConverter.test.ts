import { Like, Not } from "typeorm";

import { CriteriaToTypeOrmConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToTypeOrmConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToTypeOrmConverter should", () => {
	const converter = new CriteriaToTypeOrmConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert(CriteriaMother.empty());

		expect(actualQuery).toStrictEqual({});
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert(CriteriaMother.emptySorted("id", "DESC"));

		expect(actualQuery).toStrictEqual({ order: { id: "DESC" } });
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(CriteriaMother.withOneFilter("name", "EQUAL", "Javier"));

		expect(actualQuery).toStrictEqual({ where: { name: "Javier" } });
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		expect(actualQuery).toStrictEqual({ where: { name: "Javier" }, order: { id: "DESC" } });
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
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

		expect(actualQuery).toStrictEqual({ where: { name: "Javier", email: "javier@terra.es" } });
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
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
			where: { name: "Javier", email: "javier@terra.es" },
			order: { id: "DESC" },
		});
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({ where: { name: Like("Javier") } });
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		expect(actualQuery).toStrictEqual({ where: { name: Not(Like("Javier")) } });
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert(CriteriaMother.emptyPaginated(10, 3));

		expect(actualQuery).toStrictEqual({ take: 10, skip: 20 });
	});
});
