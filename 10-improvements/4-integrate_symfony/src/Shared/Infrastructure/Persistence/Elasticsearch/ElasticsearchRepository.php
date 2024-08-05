<?php

declare(strict_types=1);

namespace CodelyTv\Shared\Infrastructure\Persistence\Elasticsearch;

use CodelyTv\Criteria\Criteria;
use CodelyTv\Criteria\Elasticsearch\CriteriaToElasticsearchConverter;
use CodelyTv\Shared\Infrastructure\Elasticsearch\ElasticsearchClient;
use Elasticsearch\Common\Exceptions\Missing404Exception;

use function Lambdish\Phunctional\get_in;
use function Lambdish\Phunctional\map;

abstract class ElasticsearchRepository
{
	public function __construct(private readonly ElasticsearchClient $client, private readonly CriteriaToElasticsearchConverter $converter) {}

	abstract protected function aggregateName(): string;

	final public function searchByCriteria(Criteria $criteria): array
	{
		$query = $this->converter->convert($this->aggregateName(), $criteria);

		return $this->searchRawElasticsearchQuery($query);
	}

	protected function persist(string $id, array $plainBody): void
	{
		$this->client->persist($this->aggregateName(), $id, $plainBody);
	}

	protected function searchAllInElastic(): array
	{
		return $this->searchRawElasticsearchQuery([]);
	}

	protected function searchRawElasticsearchQuery(array $params): array
	{
		try {
			$result = $this->client->client()->search(array_merge(['index' => $this->indexName()], $params));

			$hits = (array) get_in(['hits', 'hits'], $result, []);

			return map($this->elasticValuesExtractor(), $hits);
		} catch (Missing404Exception) {
			return [];
		}
	}

	protected function indexName(): string
	{
		return sprintf('%s_%s', $this->client->indexPrefix(), $this->aggregateName());
	}

	private function elasticValuesExtractor(): callable
	{
		return static fn (array $elasticValues): array => $elasticValues['_source'];
	}
}