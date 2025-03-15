<?php

namespace App;

enum ProjectTypesEnum: string
{
    use EnumHelpers;

    case PERSONAL = 'Personal';
    case PROFESSIONAL = 'Professional';
}
