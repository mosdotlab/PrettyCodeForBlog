import { COMMON_KEYWORDS } from './common-keywords';

export const GOLANG_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'from',
            'import',
            'package'
        ]
    ]);

export const GOLANG_KEYWORDS = [
    'chan',
    'complex128',
    'complex64',
    'const',
    'default',
    'defer',
    'float32',
    'float64',
    'float64',
    'func',
    'int',
    'int16',
    'int32',
    'int64',
    'int8',
    'map',
    'range',
    'select',
    'struct',
    'type',
    'uint',
    'uint16',
    'uint32',
    'uint64',
    'uint8',
    'uintptr',
    'var'
];
