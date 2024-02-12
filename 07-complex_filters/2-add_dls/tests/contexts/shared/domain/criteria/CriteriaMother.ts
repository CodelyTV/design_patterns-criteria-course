import { faker } from "@faker-js/faker";

import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";
import { FiltersMother } from "./FiltersMother";
import { OrderMother } from "./OrderMother";

type CriteriaPrimitives = {
	filters: string;
	orderBy: string | null;
	orderType: string | null;
	pageSize: number | null;
	pageNumber: number | null;
};

export class CriteriaMother {
	static create(params?: Partial<CriteriaPrimitives>): Criteria {
		const defaultOrder = OrderMother.create();
		const primitives: CriteriaPrimitives = {
			filters: FiltersMother.create().value,
			orderBy: defaultOrder.orderBy.value,
			orderType: defaultOrder.orderType.value,
			pageSize: faker.number.int({ min: 1, max: 100 }),
			pageNumber: faker.number.int({ min: 1, max: 100 }),
			...params,
		};

		return Criteria.fromPrimitives(
			primitives.filters,
			primitives.orderBy,
			primitives.orderType,
			primitives.pageSize,
			primitives.pageNumber,
		);
	}

	static empty(): Criteria {
		return Criteria.fromPrimitives("", null, null, null, null);
	}

	static emptySorted(orderBy: string, orderType: string): Criteria {
		return Criteria.fromPrimitives("", orderBy, orderType, null, null);
	}

	static emptyPaginated(pageSize: number, pageNumber: number): Criteria {
		return Criteria.fromPrimitives("", null, null, pageSize, pageNumber);
	}

	static withOneFilter(filter: string): Criteria {
		return Criteria.fromPrimitives(filter, null, null, null, null);
	}

	static withOneFilterSorted(filter: string, orderBy: string, orderType: string): Criteria {
		return Criteria.fromPrimitives(filter, orderBy, orderType, null, null);
	}
}
