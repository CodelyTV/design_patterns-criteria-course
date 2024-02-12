import { Filters } from "../../../../../src/contexts/shared/domain/criteria/Filters";

export class FiltersMother {
	static create(filters?: string): Filters {
		return new Filters(filters ?? "");
	}
}
