import { FiltersPrimitives } from "./Filter";
import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
	constructor(
		public readonly filters: Filters,
		public readonly order: Order,
	) {
		this.filters = filters;
		this.order = order;
	}

	static fromPrimitives(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
	): Criteria {
		return new Criteria(Filters.fromPrimitives(filters), Order.fromPrimitives(orderBy, orderType));
	}

	hasOrder(): boolean {
		return !this.order.isNone();
	}

	hasFilters() {
		return !this.filters.isEmpty();
	}
}
