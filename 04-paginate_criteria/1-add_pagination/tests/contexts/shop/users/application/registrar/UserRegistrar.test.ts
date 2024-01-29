import { UserRegistrar } from "../../../../../../src/contexts/shop/users/application/registrar/UserRegistrar";
import { UserMother } from "../../domain/UserMother";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar should", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);

	it("register a valid user", async () => {
		const expectedUser = UserMother.create();
		const expectedUserPrimitives = expectedUser.toPrimitives();

		repository.shouldSave(expectedUser);

		await userRegistrar.registrar(
			expectedUserPrimitives.id,
			expectedUserPrimitives.name,
			expectedUserPrimitives.email,
			expectedUserPrimitives.profilePicture,
		);
	});
});
