<?php

namespace App\Http\Requests;

use ComplexHeart\Domain\Criteria\Contracts\CriteriaSource;
use Illuminate\Foundation\Http\FormRequest;

class SearchUserRequest extends FormRequest implements CriteriaSource
{
    public function filterGroups(): array
    {
        return [$this->input('filters', [])];
    }

    public function orderType(): string
    {
        return $this->input('order', 'none');
    }

    public function orderBy(): string
    {
        return $this->input('orderBy', '');
    }

    public function pageLimit(): int
    {
        return $this->input('limit', 25);
    }

    public function pageOffset(): int
    {
        return $this->input('offset', 0);
    }

    public function pageNumber(): int
    {
        return $this->input('page', 0);
    }
}
