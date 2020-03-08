import { COMMON_KEYWORDS } from './common-keywords';

export const SQL_COMMON_KEYWORDS =
    new Set([
        ...COMMON_KEYWORDS,
        ...[
            'begin',
            'end',
            'then',
            'when',
            'use'
        ]
    ]);

export const SQL_KEYWORDS = [
    'and',
    'as',
    'between',
    'by',
    'column',
    'create',
    'create',
    'database',
    'declare',
    'delete',
    'distinct',
    'drop',
    'exists',
    'from',
    'function',
    'go',
    'group',
    'having',
    'in',
    'inner',
    'insert',
    'int',
    'into',
    'join',
    'left',
    'merge',
    'off',
    'on',
    'or',
    'order',
    'outer',
    'pivot',
    'print',
    'procedure',
    'right',
    'select',
    'set',
    'table',
    'top',
    'truncate',
    'type',
    'union',
    'update',
    'values',
    'view',
    'where',
    'with'
];
