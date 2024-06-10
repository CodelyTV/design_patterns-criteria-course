import { MariaDBConnection } from "../../../shared/infrastructure/MariaDBConnection";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	profile_picture: string;
};

export class MySqlUserRepository implements UserRepository {
	constructor(private readonly connection: MariaDBConnection) {}

	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		const query = `
			INSERT INTO shop__users (id, name, email, profile_picture)
			VALUES (
				'${userPrimitives.id}',
				'${userPrimitives.name}',
				'${userPrimitives.email}',
				'${userPrimitives.profilePicture}'
			);`;

		await this.connection.execute(query);
	}

	async search(id: UserId): Promise<User | null> {
		const query = `SELECT id, name, email, profile_picture FROM shop__users WHERE id = '${id.value}';`;

		const result = await this.connection.searchOne<DatabaseUser>(query);

		if (!result) {
			return null;
		}

		return User.fromPrimitives({
			id: result.id,
			name: result.name,
			email: result.email,
			profilePicture: result.profile_picture,
		});
	}

	async containingName(name: string): Promise<User[]> {
		const query = `SELECT id, name, email, profile_picture FROM shop__users WHERE name LIKE '%${name}%';`;

		const results: DatabaseUser[] = await this.connection.searchAll<DatabaseUser>(query);

		return results.map((result) =>
			User.fromPrimitives({
				id: result.id,
				name: result.name,
				email: result.email,
				profilePicture: result.profile_picture,
			}),
		);
	}

	async containingEmail(email: string): Promise<User[]> {
		const query = `SELECT id, name, email, profile_picture FROM shop__users WHERE email LIKE '%${email}%';`;

		const results: DatabaseUser[] = await this.connection.searchAll<DatabaseUser>(query);

		return results.map((result) =>
			User.fromPrimitives({
				id: result.id,
				name: result.name,
				email: result.email,
				profilePicture: result.profile_picture,
			}),
		);
	}

	async containingNameAndEmail(name: string, email: string): Promise<User[]> {
		const query = `SELECT id, name, email, profile_picture FROM shop__users
		WHERE name LIKE '%${name}%'
		AND email LIKE '%${email}%';`;

		const results: DatabaseUser[] = await this.connection.searchAll<DatabaseUser>(query);

		return results.map((result) =>
			User.fromPrimitives({
				id: result.id,
				name: result.name,
				email: result.email,
				profilePicture: result.profile_picture,
			}),
		);
	}
}
