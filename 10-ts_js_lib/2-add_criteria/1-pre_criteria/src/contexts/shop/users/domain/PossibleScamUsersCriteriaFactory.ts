import { Criteria } from "../../../shared/domain/criteria/Criteria";

export class PossibleScamUsersCriteriaFactory {
	public static create(): Criteria {
		return Criteria.fromPrimitives(
			[
				{
					field: "email",
					operator: "CONTAINS",
					value: "kodely",
				},
				{
					field: "email",
					operator: "CONTAINS",
					value: "codeli",
				},
				{
					field: "name",
					operator: "EQUAL",
					value: "Gavi",
				},
			],
			"name",
			"ASC",
			null,
			null,
		);
	}
}
