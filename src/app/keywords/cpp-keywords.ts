import { COMMON_KEYWORDS } from './common-keywords';

export const CPP_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'define',
            'export',
            'include',
            'namespace',
            'using'
        ]
    ]);

export const CPP_KEYWORDS = [
    'asm',
    'auto',
    'bool',
    'const',
    'double',
    'float',
    'inline',
    'int',
    'long',
    'register',
    'short',
    'signed',
    'struct',
    'template',
    'unsigned',
    'virtual',
    'void',
    'volatile',
    'wchar_t'
];
