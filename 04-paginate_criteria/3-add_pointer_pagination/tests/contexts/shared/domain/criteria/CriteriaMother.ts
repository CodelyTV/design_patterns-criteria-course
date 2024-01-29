import { faker } from "@faker-js/faker";

import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../../src/contexts/shared/domain/criteria/Filter";
import { FiltersMother } from "./FiltersMother";
import { OrderMother } from "./OrderMother";

type CriteriaPrimitives = {
	filters: FiltersPrimitives[];
	orderBy: string | null;
	orderType: string | null;
	pageSize: number | null;
	cursor: string | null;
};

export class CriteriaMother {
	static create(params?: Partial<CriteriaPrimitives>): Criteria {
		const defaultOrder = OrderMother.create();
		const primitives: CriteriaPrimitives = {
			filters: FiltersMother.create().toPrimitives(),
			orderBy: defaultOrder.orderBy.value,
			orderType: defaultOrder.orderType.value,
			pageSize: faker.number.int({ min: 1, max: 100 }),
			cursor: faker.number.int({ min: 1, max: 100 }).toString(),
			...params,
		};

		return Criteria.fromPrimitives(
			primitives.filters,
			primitives.orderBy,
			primitives.orderType,
			primitives.pageSize,
			primitives.cursor,
		);
	}

	static empty(): Criteria {
		return Criteria.fromPrimitives([], null, null, null, null);
	}

	static emptySorted(orderBy: string, orderType: string): Criteria {
		return Criteria.fromPrimitives([], orderBy, orderType, null, null);
	}

	static emptyPaginated(
		orderBy: string,
		orderType: string,
		pageSize: number,
		cursor: string,
	): Criteria {
		return Criteria.fromPrimitives([], orderBy, orderType, pageSize, cursor);
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
