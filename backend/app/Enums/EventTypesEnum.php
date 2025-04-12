<?php

namespace App\Enums;

enum EventTypesEnum: string
{
    use EnumHelpers;

    case EDUCATION = 'Education';
    case PROFESSIONAL = 'Professional';
}
