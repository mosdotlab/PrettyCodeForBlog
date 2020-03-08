import { COMMON_KEYWORDS } from './common-keywords';

export const PHP_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'abstract',
            'implements',
            'use'
        ]
    ]);

export const PHP_KEYWORDS = [
    'const',
    'declare',
    'final',
    'function',
    'implements',
    'static',
    'this',
    'yield'
];
