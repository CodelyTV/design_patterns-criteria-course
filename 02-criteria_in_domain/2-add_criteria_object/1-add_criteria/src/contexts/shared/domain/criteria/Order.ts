import { OrderBy } from "./OrderBy";
import { OrderType, OrderTypes } from "./OrderType";

export class Order {
	constructor(
		public readonly orderBy: OrderBy,
		public readonly orderType: OrderType,
	) {}

	static none(): Order {
		return new Order(new OrderBy(""), new OrderType(OrderTypes.NONE));
	}
}
