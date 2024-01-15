import { CriteriaToSqlConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToSqlConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToSqlConverter should", () => {
	const converter = new CriteriaToSqlConverter();

	it("Generate simple select with an empty criteria", async () => {
		const actualQuery = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		expect(actualQuery).toBe("SELECT id, name FROM users;");
	});
});
