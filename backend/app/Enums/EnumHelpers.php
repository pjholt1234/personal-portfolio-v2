<?php

namespace App\Enums;

use Illuminate\Support\Arr;

trait EnumHelpers
{
    public static function all(): array
    {
        return self::cases();
    }

    public static function toArray(): array
    {
        $cases = [];

        foreach(self::all() as $case){
            $cases[$case->name] = $case->value;
        }

        return $cases;
    }

    public static function fromName( string $name ): BlockTypesEnum
    {
        return constant("self::$name");
    }

    public static function fromNames( mixed $names ): array
    {
        return collect(Arr::wrap($names))
            ->transform( fn($value, $name) => constant("self::$name")->value )
            ->toArray();
    }

}
