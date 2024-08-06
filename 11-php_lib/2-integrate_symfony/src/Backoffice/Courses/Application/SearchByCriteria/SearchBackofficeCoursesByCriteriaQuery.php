<?php

declare(strict_types=1);

namespace CodelyTv\Backoffice\Courses\Application\SearchByCriteria;

use CodelyTv\Shared\Domain\Bus\Query\Query;

final readonly class SearchBackofficeCoursesByCriteriaQuery implements Query
{
	public function __construct(
		private array $filters,
		private ?string $orderBy,
		private ?string $order,
		private ?int $pageSize,
		private ?int $pageNumber
	) {}

	public function filters(): array
	{
		return $this->filters;
	}

	public function orderBy(): ?string
	{
		return $this->orderBy;
	}

	public function order(): ?string
	{
		return $this->order;
	}

	public function pageSize(): ?int
	{
		return $this->pageSize;
	}

	public function pageNumber(): ?int
	{
		return $this->pageNumber;
	}
}
