<?php

declare(strict_types=1);

namespace CodelyTv\Backoffice\Courses\Domain;

use CodelyTv\Criteria\Criteria;

interface BackofficeCourseRepository
{
	public function save(BackofficeCourse $course): void;

	public function searchAll(): array;

	/** @return BackofficeCourse[] */
	public function matching(Criteria $criteria): array;
}
