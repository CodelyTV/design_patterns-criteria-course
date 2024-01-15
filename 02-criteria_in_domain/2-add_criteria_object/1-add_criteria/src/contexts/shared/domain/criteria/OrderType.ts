export enum OrderTypes {
	ASC = "asc",
	DESC = "desc",
	NONE = "none",
}

export class OrderType {
	constructor(public readonly value: OrderTypes) {}
}
