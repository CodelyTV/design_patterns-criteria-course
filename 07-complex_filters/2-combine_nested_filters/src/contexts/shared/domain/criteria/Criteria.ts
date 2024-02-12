import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
	constructor(
		public readonly filters: Filters,
		public readonly order: Order,
		public readonly pageSize: number | null,
		public readonly pageNumber: number | null,
	) {
		if (pageNumber !== null && pageSize === null) {
			throw new Error("Page size is required when page number is defined");
		}
	}

	static fromPrimitives(
		filters: string,
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null,
	): Criteria {
		return new Criteria(
			new Filters(filters),
			Order.fromPrimitives(orderBy, orderType),
			pageSize,
			pageNumber,
		);
	}

	hasOrder(): boolean {
		return !this.order.isNone();
	}

	hasFilters(): boolean {
		return !this.filters.isEmpty();
	}
}
