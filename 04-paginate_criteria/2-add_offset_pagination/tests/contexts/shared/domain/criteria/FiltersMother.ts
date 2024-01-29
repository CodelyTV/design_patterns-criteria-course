import { Filter } from "../../../../../src/contexts/shared/domain/criteria/Filter";
import { Filters } from "../../../../../src/contexts/shared/domain/criteria/Filters";
import { FilterMother } from "./FilterMother";

export class FiltersMother {
	static create(params: Filter[] = []): Filters {
		return new Filters(params.length !== 0 ? params : [FilterMother.create()]);
	}
}
