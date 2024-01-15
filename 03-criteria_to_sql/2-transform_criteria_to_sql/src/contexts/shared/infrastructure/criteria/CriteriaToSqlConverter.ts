import { Criteria } from "../../domain/criteria/Criteria";

export class CriteriaToSqlConverter {
	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			query = query.concat(" WHERE ");

			const whereQuery = criteria.filters.value.map((filter) => {
				return `${filter.field.value} ${filter.operator.value} '${filter.value.value}'`;
			});

			query = query.concat(whereQuery.join(" AND "));
		}

		if (criteria.hasOrder()) {
			query = query.concat(
				` ORDER BY ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`,
			);
		}

		return `${query};`;
	}
}
