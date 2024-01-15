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
}
