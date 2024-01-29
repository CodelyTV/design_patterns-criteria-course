import { FiltersPrimitives } from "./Filter";
import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
	constructor(
		public readonly filters: Filters,
		public readonly order: Order,
		public readonly limit: number | null,
		public readonly offset: number | null,
	) {}

	static fromPrimitives(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		limit: number | null,
		offset: number | null,
	): Criteria {
		return new Criteria(
			Filters.fromPrimitives(filters),
			Order.fromPrimitives(orderBy, orderType),
			limit,
			offset,
		);
	}

	hasOrder(): boolean {
		return !this.order.isNone();
	}

	hasFilters(): boolean {
		return !this.filters.isEmpty();
	}

	hasLimit(): boolean {
		return this.limit !== null;
	}

	hasOffset(): boolean {
		return this.offset !== null;
	}
}
