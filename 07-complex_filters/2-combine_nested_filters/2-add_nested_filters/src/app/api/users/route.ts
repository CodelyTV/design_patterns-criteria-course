import { NextRequest, NextResponse } from "next/server";

import { MariaDBConnection } from "../../../contexts/shared/infrastructure/MariaDBConnection";
import { UsersByCriteriaSearcher } from "../../../contexts/shop/users/application/search_by_criteria/UsersByCriteriaSearcher";
import { MySqlUserRepository } from "../../../contexts/shop/users/infrastructure/MySqlUserRepository";

const searcher = new UsersByCriteriaSearcher(new MySqlUserRepository(new MariaDBConnection()));

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);

	const users = await searcher.search(
		searchParams.get("filters"),
		searchParams.get("orderBy"),
		searchParams.get("order"),
		searchParams.has("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.has("pageNumber") ? parseInt(searchParams.get("pageNumber") as string, 10) : null,
	);

	return NextResponse.json(users.map((user) => user.toPrimitives()));
}
