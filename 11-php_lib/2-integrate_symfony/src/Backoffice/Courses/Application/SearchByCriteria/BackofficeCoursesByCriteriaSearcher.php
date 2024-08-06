<?php

declare(strict_types=1);

namespace CodelyTv\Backoffice\Courses\Application\SearchByCriteria;

use CodelyTv\Backoffice\Courses\Application\BackofficeCourseResponse;
use CodelyTv\Backoffice\Courses\Application\BackofficeCoursesResponse;
use CodelyTv\Backoffice\Courses\Domain\BackofficeCourse;
use CodelyTv\Backoffice\Courses\Domain\BackofficeCourseRepository;
use CodelyTv\Criteria\Criteria;

use function Lambdish\Phunctional\map;

final readonly class BackofficeCoursesByCriteriaSearcher
{
	public function __construct(private BackofficeCourseRepository $repository) {}

	public function search(
		array $filters,
		?string $orderBy,
		?string $orderType,
		?int $pageSize,
		?int $pageNumber
	): BackofficeCoursesResponse {
		$criteria = Criteria::fromPrimitives($filters, $orderBy, $orderType, $pageSize, $pageNumber);

		$courses = $this->repository->matching($criteria);

		return new BackofficeCoursesResponse(...map($this->toResponse(), $courses));
	}

	private function toResponse(): callable
	{
		return static fn (BackofficeCourse $course): BackofficeCourseResponse => new BackofficeCourseResponse(
			$course->id(),
			$course->name(),
			$course->duration()
		);
	}
}
