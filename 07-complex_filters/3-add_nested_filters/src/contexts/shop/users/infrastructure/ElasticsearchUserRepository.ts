import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { ElasticsearchRepository } from "../../../shared/infrastructure/ElasticsearchRepository";
import { User, UserPrimitives } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class ElasticsearchUserRepository
	extends ElasticsearchRepository<User>
	implements UserRepository
{
	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		await this.index(userPrimitives.id, userPrimitives);
	}

	async search(id: UserId): Promise<User | null> {
		return this.get(id.value);
	}

	async matching(criteria: Criteria): Promise<User[]> {
		return this.getMatching(criteria);
	}

	protected indexName(): string {
		return "users";
	}

	protected fromPrimitives(primitives: object): User {
		return User.fromPrimitives(primitives as UserPrimitives);
	}
}
