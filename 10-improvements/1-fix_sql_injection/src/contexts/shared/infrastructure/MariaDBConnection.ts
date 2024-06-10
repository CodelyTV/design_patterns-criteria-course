import { createPool, Pool } from "mariadb";

interface MinimalConn {
	query: (sql: string, params: (string | number)[]) => Promise<unknown>;
	end: () => Promise<void>;
}

export class MariaDBConnection {
	private poolInstance: Pool | null = null;

	private get pool(): Pool {
		if (!this.poolInstance) {
			this.poolInstance = createPool({
				host: "localhost",
				user: "codely",
				password: "c0d3ly7v",
				database: "ecommerce",
			});
		}

		return this.poolInstance;
	}

	async searchOne<T>(query: string, params: (string | number)[] = []): Promise<T | null> {
		let conn: MinimalConn | null = null;
		try {
			conn = (await this.pool.getConnection()) as MinimalConn;
			const rows = (await conn.query(query, params)) as T[];

			return rows[0] ?? null;
		} finally {
			if (conn) {
				await conn.end();
			}
		}
	}

	async searchAll<T>(query: string, params: (string | number)[] = []): Promise<T[]> {
		let conn: MinimalConn | null = null;
		try {
			conn = (await this.pool.getConnection()) as MinimalConn;

			return (await conn.query(query, params)) as T[];
		} finally {
			if (conn) {
				await conn.end();
			}
		}
	}

	async execute(query: string, params: (string | number)[] = []): Promise<void> {
		let conn: MinimalConn | null = null;
		try {
			conn = (await this.pool.getConnection()) as MinimalConn;
			await conn.query(query, params);
		} finally {
			if (conn) {
				await conn.end();
			}
		}
	}

	async truncate(users: string): Promise<void> {
		await this.execute(`TRUNCATE TABLE ${users}`);
	}

	async close(): Promise<void> {
		if (this.poolInstance !== null) {
			await this.pool.end();
		}
	}
}
