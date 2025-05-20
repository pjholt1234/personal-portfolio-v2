<?php

namespace App\Enums;

enum BlockTypesEnum: string
{
    use EnumHelpers;

    case TEXT = 'text';
    case SNIPPET = 'snippet';
    case SET = 'set';
    case IMAGE = 'image';
    case GALLERY = 'gallery';
    case PROJECTS = 'projects';
    case YOUTUBE = 'Youtube Embed';
    CASE TEXT_WITH_IMAGE = 'Text with image';
}
