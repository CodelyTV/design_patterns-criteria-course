import { Criteria } from "../../domain/criteria/Criteria";
import { Filter } from "../../domain/criteria/Filter";
import { Operator } from "../../domain/criteria/FilterOperator";


export class CriteriaToSqlConverter {
	private operatorFunctionMap = {
		[Operator.EQUAL.valueOf()]: this.toEQUAL,
		[Operator.CONTAINS.valueOf()]: this.toCONTAINS,
	};

	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			query = query.concat(" WHERE ");

			const whereQuery = criteria.filters.value.map((filter) => {
				const operatorFunction = this.operatorFunctionMap[filter.operator.value];
				if (!operatorFunction) {
						throw new Error(`No function defined for operator ${filter.operator.value}`);
				}
				return operatorFunction(filter);
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

	toEQUAL(filter: Filter): string {
		return `${filter.field.value} = '${filter.value.value}'`;
	}

	toCONTAINS(filter: Filter): string {
		return `${filter.field.value} LIKE '%${filter.value.value}%'`;
	}
}
