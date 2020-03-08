import { COMMON_KEYWORDS } from './common-keywords';

export const CSHARP_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'namespace',
            'finally',
            'using'
        ]
    ]);

export const CSHARP_KEYWORDS = [
    'Dictionary',
    'List',
    'Task',
    'abstract',
    'bool',
    'byte',
    'const',
    'decimal',
    'float',
    'from',
    'int',
    'null',
    'readonly',
    'static',
    'string',
    'this',
    'var',
    'virtual',
    'void',
    'where',
    'yield'
];
