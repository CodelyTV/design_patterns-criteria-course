import { FilterField } from "./FilterField";
import { FilterOperator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export class Filter {
	readonly field: FilterField;
	readonly operator: FilterOperator;
	readonly value: FilterValue;

	constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
		this.field = field;
		this.operator = operator;
		this.value = value;
	}
}
