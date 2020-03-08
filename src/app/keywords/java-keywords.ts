import { COMMON_KEYWORDS } from './common-keywords';

export const JAVA_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'extends',
            'implements',
            'import',
            'throws'
        ]
    ]);

export const JAVA_KEYWORDS =
    [
        'Override',
        'abstract',
        'assert',
        'boolean',
        'byte',
        'char',
        'default',
        'double',
        'final',
        'finally',
        'float',
        'instanceof',
        'int',
        'interface',
        'long',
        'native',
        'null',
        'package',
        'short',
        'static',
        'super',
        'synchronized',
        'this',
        'transient',
        'void',
        'volatile'
    ];
