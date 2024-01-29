import { Client } from "@elastic/elasticsearch";
import { ResponseError } from "@elastic/transport/lib/errors";

export abstract class ElasticsearchRepository<T> {
	private readonly client = new Client({ node: "http://localhost:9200" });

	protected abstract indexName(): string;

	protected async index(id: string, document: object): Promise<void> {
		await this.client.index({
			index: this.indexName(),
			id,
			document,
			refresh: "wait_for",
		});
	}

	protected async get(id: string, fromPrimitives: (primitives: object) => T): Promise<T | null> {
		try {
			const result = await this.client.get({
				index: this.indexName(),
				id,
			});

			if (!result.found) {
				return null;
			}

			return fromPrimitives(result._source as object);
		} catch (error: unknown) {
			if (error instanceof ResponseError && error.meta.statusCode === 404) {
				return null;
			}

			throw error;
		}
	}
}
