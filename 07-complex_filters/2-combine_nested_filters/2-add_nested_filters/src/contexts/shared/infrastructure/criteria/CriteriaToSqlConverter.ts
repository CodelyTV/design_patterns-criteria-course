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
			query = query.concat(this.processFilters(criteria));
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

	private processFilters(criteria: Criteria): string {
		const whereClause = this.recursiveFilterProcessing(criteria.filters.value);

		return ` WHERE ${whereClause}`;
	}

	private recursiveFilterProcessing(filterString: string): string {
		if (!/\(([^()]+)\)/.test(filterString)) {
			return this.buildFilterQuery(filterString);
		}
		let resultString = "";
		let cursor = 0;

		const regex = /\(([^()]+)\)/g;
		let match;
		while ((match = regex.exec(filterString)) !== null) {
			const preParenthesisPart = filterString
				.substring(cursor, match.index)
				.trim()
				.replace(" AND", "")
				.replace(" OR", "");

			const connector = filterString.includes(" AND") ? "AND" : "OR";

			if (preParenthesisPart) {
				resultString += `${this.buildFilterQuery(preParenthesisPart)} ${connector} `;
			}

			const innerPart = match[1].trim();
			resultString += `(${this.buildFilterQuery(innerPart)})`;

			cursor = match.index + match[0].length;
		}

		const postParenthesisPart = filterString.substring(cursor).trim();
		if (postParenthesisPart) {
			resultString += ` AND ${this.buildFilterQuery(postParenthesisPart)}`;
		}

		return resultString.replace(/^\s*AND\s*|\s*AND\s*$/g, "");
	}

	private buildFilterQuery(filter: string): string {
		const filters = filter.split(/ AND | OR /);
		const connectors = filter.match(/ AND | OR /g) ?? [];

		const queryFilters: string[] = [];

		filters.forEach((filter, index) => {
			const [field, operator, ...valueParts] = filter.split(" ");
			let value = valueParts.join(" ");
			const operatorValue = operators[operator] ?? operator;

			if (operator === "CONTAINS" || operator === "NOT_CONTAINS") {
				value = `%${value}%`;
			}

			queryFilters.push(`${field} ${operatorValue} '${value}'`);

			if (index < connectors.length) {
				queryFilters.push(connectors[index].trim());
			}
		});

		return queryFilters.join(" ");
	}
}
