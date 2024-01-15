import { Filter, FiltersPrimitives } from "./Filter";

export class Filters {
	constructor(public readonly value: Filter[]) {}

	static fromPrimitives(filters: FiltersPrimitives[]) {
		return new Filters(
			filters.map((filter) => Filter.fromPrimitives(filter.field, filter.operator, filter.value)),
		);
	}
}
