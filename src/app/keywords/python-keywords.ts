import { COMMON_KEYWORDS } from './common-keywords';

export const PYTHON_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'elif',
            'finally',
            'from',
            'import',
        ]
    ]);

export const PYTHON_KEYWORDS = [
    'def',
    'del',
    'except',
    'yield'
];
