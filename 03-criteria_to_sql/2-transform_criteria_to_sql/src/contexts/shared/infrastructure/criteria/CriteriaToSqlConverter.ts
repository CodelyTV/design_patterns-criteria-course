import { Criteria } from "../../domain/criteria/Criteria";

export class CriteriaToSqlConverter {
	convert(fieldsToSelect: string[], tableName: string, criteria: Criteria): string {
		return `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName};`;
	}
}
