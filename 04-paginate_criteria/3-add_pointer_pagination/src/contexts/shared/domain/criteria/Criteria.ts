import { FiltersPrimitives } from "./Filter";
import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
	constructor(
		public readonly filters: Filters,
		public readonly order: Order,
		public readonly pageSize: number | null,
		public readonly cursor: string | null,
	) {
		if (cursor !== null && pageSize === null) {
			throw new Error("Page size is required when page number is defined");
		}

		if (cursor !== null && order.isNone()) {
			throw new Error("Order is required when cursor is defined");
		}
	}

	static fromPrimitives(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		cursor: string | null,
	): Criteria {
		return new Criteria(
			Filters.fromPrimitives(filters),
			Order.fromPrimitives(orderBy, orderType),
			pageSize,
			cursor,
		);
	}

	hasOrder(): boolean {
		return !this.order.isNone();
	}

	hasFilters(): boolean {
		return !this.filters.isEmpty();
	}
}
