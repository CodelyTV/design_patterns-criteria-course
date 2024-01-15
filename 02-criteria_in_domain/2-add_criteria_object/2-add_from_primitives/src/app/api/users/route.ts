import { NextRequest, NextResponse } from "next/server";

import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { SearchParamsCriteriaFiltersParser } from "@/contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";

export function GET(request: NextRequest): NextResponse {
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const criteria = Criteria.fromPrimitives(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("order"),
	);

	// eslint-disable-next-line no-console
	console.log(criteria);

	return NextResponse.json({
		filters,
		orderBy: searchParams.get("orderBy"),
		order: searchParams.get("order"),
	});
}
