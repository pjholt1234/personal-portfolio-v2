<?php

namespace App;

enum EventTypesEnum: string
{
    use EnumHelpers;

    case EDUCATION = 'Education';
    case PROFESSIONAL = 'Professional';
}
