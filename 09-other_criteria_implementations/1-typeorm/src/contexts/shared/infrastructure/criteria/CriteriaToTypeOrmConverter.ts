import { Like, Not } from "typeorm";

import { Criteria } from "../../domain/criteria/Criteria";
import { Filter } from "../../domain/criteria/Filter";

type Mappings = { [key: string]: string };

type TypeOrmOptions = {
	order?: { [key: string]: string };
	where?: { [key: string]: string };
	take?: number;
	skip?: number;
};

export class CriteriaToTypeOrmConverter {
	convert(criteria: Criteria, mappings: Mappings = {}): TypeOrmOptions {
		const query: TypeOrmOptions = {};

		if (criteria.hasFilters()) {
			query.where = criteria.filters.value.reduce((acc, filter) => {
				return { ...acc, ...this.generateWhereQuery(filter, mappings) };
			}, {});
		}

		if (criteria.hasOrder()) {
			query.order = {
				[criteria.order.orderBy.value]: criteria.order.orderType.value,
			};
		}

		if (criteria.pageSize !== null) {
			query.take = criteria.pageSize;
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query.skip = criteria.pageSize * (criteria.pageNumber - 1);
		}

		return query;
	}

	private generateWhereQuery(filter: Filter, mappings: Mappings = {}) {
		const field = mappings[filter.field.value] || filter.field.value;

		if (filter.operator.isContains()) {
			return { [field]: Like(filter.value.value) };
		}

		if (filter.operator.isNotContains()) {
			return { [field]: Not(Like(filter.value.value)) };
		}

		if (filter.operator.isNotEquals()) {
			return { [field]: Not(filter.value.value) };
		}

		return { [field]: filter.value.value };
	}
}
