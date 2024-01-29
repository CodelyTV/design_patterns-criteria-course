import { NextRequest, NextResponse } from "next/server";

import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { MariaDBConnection } from "../../../contexts/shared/infrastructure/MariaDBConnection";
import { UsersByCriteriaSearcher } from "../../../contexts/shop/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { MySqlUserRepository } from "../../../contexts/shop/users/infrastructure/MySqlUserRepository";

const searcher = new UsersByCriteriaSearcher(new MySqlUserRepository(new MariaDBConnection()));

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const users = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("order"),
		searchParams.has("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.has("cursor") ? (searchParams.get("cursor") as string) : null,
	);

	return NextResponse.json({
		users: users.map((user) => user.toPrimitives()),
		nextCursor: users.at(-1)?.createdAt,
	});
}
