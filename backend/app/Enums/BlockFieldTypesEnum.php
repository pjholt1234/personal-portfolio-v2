<?php

namespace App\Enums;

enum BlockFieldTypesEnum: string
{
    use EnumHelpers;
    case TEXT = 'text';
    case TEXTAREA = 'textarea';
    case RICH_TEXT = 'rich_text';
    case CODE_SNIPPET = 'code_snippet';
    case ARRAY = 'array';
}
