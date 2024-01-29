import { faker } from "@faker-js/faker";

import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../../src/contexts/shared/domain/criteria/Filter";
import { FiltersMother } from "./FiltersMother";
import { OrderMother } from "./OrderMother";

type CriteriaPrimitives = {
	filters: FiltersPrimitives[];
	orderBy: string | null;
	orderType: string | null;
	limit: number | null;
	offset: number | null;
};

export class CriteriaMother {
	static create(params?: Partial<CriteriaPrimitives>): Criteria {
		const defaultOrder = OrderMother.create();
		const primitives: CriteriaPrimitives = {
			filters: FiltersMother.create().toPrimitives(),
			orderBy: defaultOrder.orderBy.value,
			orderType: defaultOrder.orderType.value,
			limit: faker.number.int({ min: 1, max: 100 }),
			offset: faker.number.int({ min: 1, max: 100 }),
			...params,
		};

		return Criteria.fromPrimitives(
			primitives.filters,
			primitives.orderBy,
			primitives.orderType,
			primitives.limit,
			primitives.offset,
		);
	}

	static empty(): Criteria {
		return Criteria.fromPrimitives([], null, null, null, null);
	}

	static emptySorted(orderBy: string, orderType: string): Criteria {
		return Criteria.fromPrimitives([], orderBy, orderType, null, null);
	}

	static emptyPaginated(limit: number, offset: number): Criteria {
		return Criteria.fromPrimitives([], null, null, limit, offset);
	}

	static withOneFilter(field: string, operator: string, value: string): Criteria {
		return Criteria.fromPrimitives(
			[
				{
					field,
					operator,
					value,
				},
			],
			null,
			null,
			null,
			null,
		);
	}

	static withOneFilterSorted(
		field: string,
		operator: string,
		value: string,
		orderBy: string,
		orderType: string,
	): Criteria {
		return Criteria.fromPrimitives(
			[
				{
					field,
					operator,
					value,
				},
			],
			orderBy,
			orderType,
			null,
			null,
		);
	}
}
