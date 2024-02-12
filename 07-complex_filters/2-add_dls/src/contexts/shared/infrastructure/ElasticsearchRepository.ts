import { Client } from "@elastic/elasticsearch";
import { ResponseError } from "@elastic/transport/lib/errors";

import { Criteria } from "../domain/criteria/Criteria";
import { CriteriaToElasticsearchConverter } from "./criteria/CriteriaToElasticsearchConverter";

export abstract class ElasticsearchRepository<T> {
	private readonly converter = new CriteriaToElasticsearchConverter();

	constructor(private readonly client: Client) {}

	protected abstract indexName(): string;

	protected abstract fromPrimitives(primitives: object): T;

	protected async index(id: string, document: object): Promise<void> {
		await this.client.index({
			index: this.indexName(),
			id,
			document,
			refresh: "wait_for",
		});
	}

	protected async get(id: string): Promise<T | null> {
		try {
			const entity = await this.client.get({
				index: this.indexName(),
				id,
			});

			if (!entity.found) {
				return null;
			}

			return this.fromPrimitives(entity._source as object);
		} catch (error: unknown) {
			if (error instanceof ResponseError && error.meta.statusCode === 404) {
				return null;
			}

			throw error;
		}
	}

	protected async getMatching(criteria: Criteria): Promise<T[]> {
		const query = this.converter.convert(this.indexName(), criteria);

		const response = await this.client.search(query);

		return response.hits.hits.map((hit) => this.fromPrimitives(hit._source as object));
	}
}
