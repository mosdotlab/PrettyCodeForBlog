import { COMMON_KEYWORDS } from './common-keywords';

export const JS_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'default',
            'export',
            'extends',
            'from',
            'implements',
            'import'
        ]
    ]);

export const JS_KEYWORDS = [
    'Array',
    'JSON',
    'Math',
    'app',
    'boolean',
    'console',
    'const',
    'constructor',
    'function',
    'let',
    'null',
    'number',
    'string',
    'this',
    'undefined',
    'var',
    'yield'
];
