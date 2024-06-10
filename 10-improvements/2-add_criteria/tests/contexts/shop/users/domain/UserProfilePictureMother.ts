import { faker } from "@faker-js/faker";

import { UserProfilePicture } from "../../../../../src/contexts/shop/users/domain/UserProfilePicture";

export class UserProfilePictureMother {
	static create(value?: string): UserProfilePicture {
		return new UserProfilePicture(value ?? faker.image.url());
	}
}
