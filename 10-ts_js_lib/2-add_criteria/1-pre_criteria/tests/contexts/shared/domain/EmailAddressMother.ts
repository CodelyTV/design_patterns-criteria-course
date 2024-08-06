import { faker } from "@faker-js/faker";

import { EmailAddress } from "../../../../src/contexts/shared/domain/EmailAddress";

export class EmailAddressMother {
	static create(value?: string): EmailAddress {
		return new EmailAddress(value ?? faker.internet.email());
	}
}
