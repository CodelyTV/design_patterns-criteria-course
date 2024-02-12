import { DataSource, EntitySchema } from "typeorm";

import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToTypeOrmConverter } from "../../../shared/infrastructure/criteria/CriteriaToTypeOrmConverter";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserName } from "../domain/UserName";
import { UserProfilePicture } from "../domain/UserProfilePicture";
import { UserRepository } from "../domain/UserRepository";

export class TypeOrmUserRepository implements UserRepository {
	private readonly dataSource: DataSource;

	constructor() {
		this.dataSource = new DataSource({
			type: "mariadb",
			host: "localhost",
			port: 3306,
			username: "codely",
			password: "c0d3ly7v",
			database: "ecommerce",
		});

		this.dataSource.initialize().catch((err) => {
			console.error("Error during Data Source initialization", err);
		});
	}

	async save(user: User): Promise<void> {
		await this.dataSource.getRepository(this.entitySchema()).save(user);
	}

	async search(id: UserId): Promise<User | null> {
		const result = await this.dataSource
			.getRepository(this.entitySchema())
			.findOne({ [id.value]: id });

		if (typeof result === "undefined") {
			return null;
		}

		return result;
	}

	async matching(criteria: Criteria): Promise<User[]> {
		const converter = new CriteriaToTypeOrmConverter();

		return await this.dataSource
			.getRepository(this.entitySchema())
			.find(converter.convert(criteria));
	}

	private entitySchema(): EntitySchema<User> {
		return new EntitySchema<User>({
			name: User.name,
			tableName: "shop__users",
			columns: {
				id: {
					type: "uuid",
					primary: true,
					transformer: {
						to: (value: UserId): string => value.value,
						from: (value: string): UserId => new UserId(value),
					},
				},
				name: {
					type: String,
					name: "name",
					transformer: {
						to: (value: UserName): string => value.value,
						from: (value: string): UserName => new UserName(value),
					},
				},
				email: {
					type: String,
					name: "email",
					transformer: {
						to: (value: UserEmail): string => value.value,
						from: (value: string): UserEmail => new UserEmail(value),
					},
				},
				profilePicture: {
					type: String,
					name: "profile_picture",
					transformer: {
						to: (value: UserProfilePicture): string => value.value,
						from: (value: string): UserProfilePicture => new UserProfilePicture(value),
					},
				},
			},
		});
	}
}
