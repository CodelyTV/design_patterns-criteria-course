import { Criteria } from "../../domain/criteria/Criteria";

export class CriteriaToSqlConverter {
	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			query = query.concat(
				` WHERE ${criteria.filters.value[0].field.value} ${criteria.filters.value[0].operator.value} '${criteria.filters.value[0].value.value}'`,
			);
		}

		if (criteria.hasOrder()) {
			query = query.concat(
				` ORDER BY ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`,
			);
		}

		return `${query};`;
	}
}
