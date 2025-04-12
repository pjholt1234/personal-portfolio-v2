<?php

namespace config;

use App\Enums\EnumHelpers;

enum BlockTypesEnum: string
{
    use EnumHelpers;

    case TEXT = 'text';
    case SNIPPET = 'snippet';
    case SET = 'set';
    case IMAGE = 'image';
    case GALLERY = 'gallery';
}
