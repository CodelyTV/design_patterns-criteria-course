import { FiltersPrimitives } from "../../domain/criteria/Filter";

export class SearchParamsCriteriaFiltersParser {
	static parse(searchParams: URLSearchParams): FiltersPrimitives[] {
		const tempFilters: Record<string, Partial<FiltersPrimitives>> = {};

		searchParams.forEach((value, key) => {
			const match = key.match(/filters\[(\d+)]\[(.+)]/);
			if (match) {
				const index = match[1];
				const property = match[2] as keyof FiltersPrimitives;
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
		) as FiltersPrimitives[];
	}
}
