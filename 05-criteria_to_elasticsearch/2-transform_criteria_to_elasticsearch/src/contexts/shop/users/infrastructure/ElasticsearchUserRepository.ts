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
		return this.get(id.value, (primitives: object) =>
			User.fromPrimitives(primitives as UserPrimitives),
		);
	}

	async matching(_criteria: Criteria): Promise<User[]> {
		throw new Error("Method not implemented.");
	}

	protected indexName(): string {
		return "users";
	}
}
