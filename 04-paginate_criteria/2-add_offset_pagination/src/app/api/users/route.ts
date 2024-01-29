import { NextRequest, NextResponse } from "next/server";

import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { MariaDBConnection } from "../../../contexts/shared/infrastructure/MariaDBConnection";
import { UsersByCriteriaSearcher } from "../../../contexts/shop/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { MySqlUserRepository } from "../../../contexts/shop/users/infrastructure/MySqlUserRepository";

const searcher = new UsersByCriteriaSearcher(new MySqlUserRepository(new MariaDBConnection()));

export function GET(request: NextRequest): NextResponse {
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const users = searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("order"),
		searchParams.has("limit") ? parseInt(searchParams.get("limit") as string, 10) : null,
		searchParams.has("offset") ? parseInt(searchParams.get("offset") as string, 10) : null,
	);

	return NextResponse.json(users);
}
