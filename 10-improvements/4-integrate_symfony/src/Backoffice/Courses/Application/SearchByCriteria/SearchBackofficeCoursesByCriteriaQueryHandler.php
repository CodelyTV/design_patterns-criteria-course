<?php

declare(strict_types=1);

namespace CodelyTv\Backoffice\Courses\Application\SearchByCriteria;

use CodelyTv\Backoffice\Courses\Application\BackofficeCoursesResponse;
use CodelyTv\Shared\Domain\Bus\Query\QueryHandler;

final readonly class SearchBackofficeCoursesByCriteriaQueryHandler implements QueryHandler
{
	public function __construct(private BackofficeCoursesByCriteriaSearcher $searcher) {}

	public function __invoke(SearchBackofficeCoursesByCriteriaQuery $query): BackofficeCoursesResponse
	{
		return $this->searcher->search(
			$query->filters(),
			$query->orderBy(),
			$query->order(),
			$query->pageSize(),
			$query->pageNumber()
		);
	}
}
