import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
	const { searchParams } = new URL(request.url);

	const filters = parseFilters(searchParams);

	return NextResponse.json(filters);
}

interface Filter {
	field: string;
	operator: string;
	value: string;
}

function parseFilters(searchParams: URLSearchParams): Filter[] {
	const tempFilters: Record<string, Partial<Filter>> = {};

	searchParams.forEach((value, key) => {
		const match = key.match(/filters\[(\d+)]\[(.+)]/);
		if (match) {
			const index = match[1];
			const property = match[2] as keyof Filter;
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
	) as Filter[];
}
