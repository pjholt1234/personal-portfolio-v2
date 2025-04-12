<?php

namespace App\Enums;

enum ProjectTypesEnum: string
{
    use EnumHelpers;

    case PERSONAL = 'Personal';
    case PROFESSIONAL = 'Professional';
}
