import { COMMON_KEYWORDS } from './common-keywords';

export const RUBY_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'elsif',
            'module',
            'require',
            'unless'
        ]
    ]);

export const RUBY_KEYWORDS = [
    'begin',
    'def',
    'end',
    'nil',
    'not',
    'or',
    'print',
    'super',
    'yield'
];
