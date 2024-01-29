import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";
import { User } from "../../../../../src/contexts/shop/users/domain/User";
import { UserId } from "../../../../../src/contexts/shop/users/domain/UserId";
import { UserRepository } from "../../../../../src/contexts/shop/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();

	async save(user: User): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(user.toPrimitives());
	}

	async search(id: UserId): Promise<User | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<User | null>;
	}

	async matching(criteria: Criteria): Promise<User[]> {
		expect(this.mockMatching).toHaveBeenCalledWith(criteria);

		return this.mockMatching() as Promise<User[]>;
	}

	shouldSave(user: User): void {
		this.mockSave(user.toPrimitives());
	}

	shouldMatch(criteria: Criteria, users: User[]): void {
		this.mockMatching(criteria);
		this.mockMatching.mockReturnValueOnce(users);
	}

	shouldSearch(user: User): void {
		this.mockSearch(user.id);
		this.mockSearch.mockReturnValueOnce(user);
	}

	shouldNotSearch(id: UserId): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}
}
