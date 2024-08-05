<?php

declare(strict_types=1);

namespace CodelyTv\Backoffice\Courses\Infrastructure\Persistence;

use CodelyTv\Backoffice\Courses\Domain\BackofficeCourse;
use CodelyTv\Backoffice\Courses\Domain\BackofficeCourseRepository;
use CodelyTv\Criteria\Criteria;
use CodelyTv\Criteria\Doctrine\CriteriaToDoctrineConverter;
use CodelyTv\Shared\Infrastructure\Persistence\Doctrine\DoctrineRepository;
use Doctrine\ORM\EntityManager;

final class MySqlBackofficeCourseRepository extends DoctrineRepository implements BackofficeCourseRepository
{
	public function __construct(EntityManager $entityManager)
	{
		parent::__construct($entityManager);
	}

	public function save(BackofficeCourse $course): void
	{
		$this->persist($course);
	}

	public function searchAll(): array
	{
		return $this->repository(BackofficeCourse::class)->findAll();
	}

	public function matching(Criteria $criteria): array
	{
		$doctrineCriteria = (new CriteriaToDoctrineConverter())->convert($criteria);

		return $this->repository(BackofficeCourse::class)->matching($doctrineCriteria)->toArray();
	}
}
