import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToTypeOrmConverter } from "../../../shared/infrastructure/criteria/CriteriaToTypeOrmConverter";
import { MariaDBConnection } from "../../../shared/infrastructure/MariaDBConnection";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class TypeOrmUserRepository implements UserRepository {
	constructor(private readonly connection: MariaDBConnection) {}

	async save(user: User): Promise<void> {
		// …
	}

	async search(id: UserId): Promise<User | null> {
		// …
	}

	async matching(criteria: Criteria): Promise<User[]> {
		const converter = new CriteriaToTypeOrmConverter();

		// this.dataSource.getRepository(this.entitySchema()).find(converter.convert(criteria));
	}
}
