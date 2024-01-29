import { NextRequest, NextResponse } from "next/server";

import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { MariaDBConnection } from "../../../contexts/shared/infrastructure/MariaDBConnection";
import { UsersCounter } from "../../../contexts/shop/users/application/count/UsersCounter";
import { UsersByCriteriaSearcher } from "../../../contexts/shop/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { MySqlUserRepository } from "../../../contexts/shop/users/infrastructure/MySqlUserRepository";

const repository = new MySqlUserRepository(new MariaDBConnection());

const searcher = new UsersByCriteriaSearcher(repository);
const counter = new UsersCounter(repository);

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const users = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("order"),
		searchParams.has("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.has("pageNumber") ? parseInt(searchParams.get("pageNumber") as string, 10) : null,
	);

	const usersCount = await counter.count();

	return NextResponse.json({
		users: users.map((user) => user.toPrimitives()),
		totalPages: Math.ceil(usersCount / parseInt(searchParams.get("pageSize") as string, 10)),
	});
}
