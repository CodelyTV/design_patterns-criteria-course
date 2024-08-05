<?php

declare(strict_types=1);

namespace CodelyTv\Tests\Backoffice\Courses\Domain;

use CodelyTv\Criteria\Criteria;
use CodelyTv\Criteria\Mother\CriteriaMother;
use CodelyTv\Criteria\Mother\FilterMother;
use CodelyTv\Criteria\Mother\FiltersMother;

final class BackofficeCourseCriteriaMother
{
	public static function nameContains(string $text): Criteria
	{
		return CriteriaMother::create(
			FiltersMother::createOne(
				FilterMother::fromPrimitives([
					'field' => 'name',
					'operator' => 'CONTAINS',
					'value' => $text,
				])
			)
		);
	}
}
