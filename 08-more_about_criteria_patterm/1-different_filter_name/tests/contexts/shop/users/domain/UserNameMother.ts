import { faker } from "@faker-js/faker";

import { UserName } from "../../../../../src/contexts/shop/users/domain/UserName";

export class UserNameMother {
	static create(value?: string): UserName {
		return new UserName(value ?? faker.person.firstName());
	}
}
