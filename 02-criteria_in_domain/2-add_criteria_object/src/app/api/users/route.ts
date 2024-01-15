import { NextRequest, NextResponse } from "next/server";

import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { FilterField } from "@/contexts/shared/domain/criteria/FilterField";
import { FilterOperator, Operator } from "@/contexts/shared/domain/criteria/FilterOperator";
import { Filters } from "@/contexts/shared/domain/criteria/Filters";
import { FilterValue } from "@/contexts/shared/domain/criteria/FilterValue";
import { Order } from "@/contexts/shared/domain/criteria/Order";
import { OrderBy } from "@/contexts/shared/domain/criteria/OrderBy";
import { OrderType, OrderTypes } from "@/contexts/shared/domain/criteria/OrderType";

export function GET(request: NextRequest): NextResponse {
	const { searchParams } = new URL(request.url);

	const filters = parseFilters(searchParams);

	const criteria = new Criteria(
		new Filters(
			filters.map(
				(filter) =>
					new Filter(
						new FilterField(filter.field),
						new FilterOperator(filter.operator as Operator),
						new FilterValue(filter.value),
					),
			),
		),
		searchParams.get("orderBy") !== null
			? new Order(
					new OrderBy(searchParams.get("orderBy") as string),
					new OrderType(searchParams.get("order") as OrderTypes),
				)
			: Order.none(),
	);

	console.log(criteria);

	return NextResponse.json({
		filters,
		orderBy: searchParams.get("orderBy"),
		order: searchParams.get("order"),
	});
}

interface QueryFilter {
	field: string;
	operator: string;
	value: string;
}

function parseFilters(searchParams: URLSearchParams): QueryFilter[] {
	const tempFilters: Record<string, Partial<QueryFilter>> = {};

	searchParams.forEach((value, key) => {
		const match = key.match(/filters\[(\d+)]\[(.+)]/);
		if (match) {
			const index = match[1];
			const property = match[2] as keyof QueryFilter;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!tempFilters[index]) {
				tempFilters[index] = {};
			}
			tempFilters[index][property] = value;
		}
	});

	return Object.values(tempFilters).filter(
		(filter) =>
			filter.field !== undefined && filter.operator !== undefined && filter.value !== undefined,
	) as QueryFilter[];
}
