<?php

declare(strict_types=1);

namespace CodelyTv\Mooc\Videos\Infrastructure\Persistence;

use CodelyTv\Criteria\Criteria;
use CodelyTv\Criteria\Doctrine\CriteriaToDoctrineConverter;
use CodelyTv\Mooc\Videos\Domain\Video;
use CodelyTv\Mooc\Videos\Domain\VideoId;
use CodelyTv\Mooc\Videos\Domain\VideoRepository;
use CodelyTv\Mooc\Videos\Domain\Videos;
use CodelyTv\Shared\Infrastructure\Persistence\Doctrine\DoctrineRepository;

final class VideoRepositoryMySql extends DoctrineRepository implements VideoRepository
{
	private static array $criteriaToDoctrineFields = [
		'id' => 'id',
		'type' => 'type',
		'title' => 'title',
		'url' => 'url',
		'course_id' => 'courseId',
	];

	public function save(Video $video): void
	{
		$this->persist($video);
	}

	public function search(VideoId $id): ?Video
	{
		return $this->repository(Video::class)->find($id);
	}

	public function searchByCriteria(Criteria $criteria): Videos
	{
		$converter = new CriteriaToDoctrineConverter(self::$criteriaToDoctrineFields);
		$doctrineCriteria = $converter->convert($criteria);

		$videos = $this->repository(Video::class)->matching($doctrineCriteria)->toArray();

		return new Videos($videos);
	}
}
