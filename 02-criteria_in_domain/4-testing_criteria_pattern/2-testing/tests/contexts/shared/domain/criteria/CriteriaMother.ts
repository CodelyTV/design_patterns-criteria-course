import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../../src/contexts/shared/domain/criteria/Filter";
import { FiltersMother } from "./FiltersMother";
import { OrderMother } from "./OrderMother";

type CriteriaPrimitives = {
	filters: FiltersPrimitives[];
	orderBy: string | null;
	orderType: string | null;
};

export class CriteriaMother {
	static create(params?: Partial<CriteriaPrimitives>): Criteria {
		const defaultOrder = OrderMother.create();
		const primitives: CriteriaPrimitives = {
			filters: FiltersMother.create().toPrimitives(),
			orderBy: defaultOrder.orderBy.value,
			orderType: defaultOrder.orderType.value,
			...params,
		};

		return Criteria.fromPrimitives(primitives.filters, primitives.orderBy, primitives.orderType);
	}
}
