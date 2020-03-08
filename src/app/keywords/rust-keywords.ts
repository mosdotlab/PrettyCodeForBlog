import { COMMON_KEYWORDS } from './common-keywords';

export const RUST_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'use'
        ]
    ]);

export const RUST_KEYWORDS =
    [
        'abstract',
        'alignof',
        'as',
        'become',
        'box',
        'const',
        'crate',
        'do',
        'extern crate',
        'extern',
        'false',
        'final',
        'fn',
        'impl',
        'in',
        'let',
        'loop',
        'macro',
        'mut',
        'offsetof',
        'override',
        'priv',
        'proc',
        'pub',
        'pure',
        'ref',
        'return',
        'self',
        'static',
        'struct',
        'super',
        'trait',
        'type',
        'unsafe',
        'unsized',
        'virtual',
        'where',
        'yield'
    ];
