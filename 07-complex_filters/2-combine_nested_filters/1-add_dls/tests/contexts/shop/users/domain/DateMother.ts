import { faker } from "@faker-js/faker";

export class DateMother {
	static create(value?: string): Date {
		return new Date(value ?? faker.date.recent());
	}

	static today(): Date {
		return new Date();
	}

	static yesterday(): Date {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		return yesterday;
	}
}
