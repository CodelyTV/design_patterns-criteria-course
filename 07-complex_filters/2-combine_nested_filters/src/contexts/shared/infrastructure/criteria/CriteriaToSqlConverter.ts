import { Criteria } from "../../domain/criteria/Criteria";

const operators: { [key: string]: string } = {
	EQUAL: "=",
};

export class CriteriaToSqlConverter {
	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			query = query.concat(" WHERE ");

			const filters = criteria.filters.value.split(" ");
			const field = filters[0];
			const operator = filters[1];
			const value = filters.slice(2).join(" ");

			query = query.concat(`${field} ${operators[operator]} '${value}'`);
		}

		if (criteria.hasOrder()) {
			query = query.concat(
				` ORDER BY ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`,
			);
		}

		if (criteria.pageSize !== null) {
			query = query.concat(` LIMIT ${criteria.pageSize}`);
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query = query.concat(` OFFSET ${criteria.pageSize * (criteria.pageNumber - 1)}`);
		}

		return `${query};`;
	}
}
