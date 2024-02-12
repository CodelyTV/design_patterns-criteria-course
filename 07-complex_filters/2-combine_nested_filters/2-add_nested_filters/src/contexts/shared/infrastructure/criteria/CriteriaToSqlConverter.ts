import { Criteria } from "../../domain/criteria/Criteria";

const operators: { [key: string]: string } = {
	EQUAL: "=",
	NOT_EQUAL: "!=",
	CONTAINS: "LIKE",
	NOT_CONTAINS: "NOT LIKE",
};

export class CriteriaToSqlConverter {
	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			const filters = criteria.filters.value.split(/ AND | OR /);
			const connectors = criteria.filters.value.match(/ AND | OR /g) ?? [];

			const queryFilters: string[] = [];

			filters.forEach((filter, index) => {
				const [field, operator, ...valueParts] = filter.split(" ");
				let value = valueParts.join(" ");
				const operatorValue = operators[operator];

				if (operator === "CONTAINS" || operator === "NOT_CONTAINS") {
					value = `%${value}%`;
				}

				queryFilters.push(`${field} ${operatorValue} '${value}'`);

				if (index < connectors.length) {
					queryFilters.push(connectors[index].trim());
				}
			});

			query += ` WHERE ${queryFilters.join(" ")}`;
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
