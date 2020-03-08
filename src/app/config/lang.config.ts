import * as CONFIG from './app.config';
import { JS_KEYWORDS, JS_COMMON_KEYWORDS } from '../keywords/js-keywords';
import { CSHARP_KEYWORDS, CSHARP_COMMON_KEYWORDS } from '../keywords/csharp-keywords';
import { CPP_KEYWORDS, CPP_COMMON_KEYWORDS } from '../keywords/cpp-keywords';
import { GOLANG_KEYWORDS, GOLANG_COMMON_KEYWORDS } from '../keywords/golang-keywords';
import { PYTHON_COMMON_KEYWORDS, PYTHON_KEYWORDS } from '../keywords/python-keywords';
import { RUBY_KEYWORDS, RUBY_COMMON_KEYWORDS } from '../keywords/ruby-keywords';
import { SQL_KEYWORDS, SQL_COMMON_KEYWORDS } from '../keywords/sql-keywords';
import { PHP_KEYWORDS, PHP_COMMON_KEYWORDS } from '../keywords/php-keywords';
import { JAVA_COMMON_KEYWORDS, JAVA_KEYWORDS } from '../keywords/java-keywords';
import { RUST_COMMON_KEYWORDS, RUST_KEYWORDS } from '../keywords/rust-keywords';

export enum Langs {
    JS = 'JS',
    HTML = 'HTML',
    CSS = 'CSS',
    CSHARP = 'C#',
    JAVA = 'JAVA',
    CPP = 'C++',
    GOLANG = 'GO',
    PYTHON = 'PYTHON',
    PHP = 'PHP',
    RUBY = 'RUBY',
    SQL = 'SQL',
    RUST = 'RUST'
}

interface LangItem {
    lang: Langs;
    comments?: Comments[];
    commonKeywords?: string[];
    keywords?: string[];
    special?: Array<CONFIG.Tag>;
    simple?: Array<CONFIG.Tag>;
}

interface Comments {
    start: string;
    end: string;
    oneLine: string;
}

interface LangItems extends Array<LangItem> { }

export const langConfig: LangItems = [
    {
        lang: Langs.JS,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...JS_COMMON_KEYWORDS],
        keywords: JS_KEYWORDS,
        special: [CONFIG.roundBrackets, CONFIG.arrowFunctions, CONFIG.betweenHtmlTags],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.HTML,
        comments: [{ start: '<!--', end: '-->', oneLine: '<!--' }],
        special: [CONFIG.roundBrackets, CONFIG.htmlTags],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.CSS,
        comments: [
            { start: '/*', end: '*/', oneLine: '//' },
            { start: '<!--', end: '-->', oneLine: '<!--' }
        ],
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.propName]
    },
    {
        lang: Langs.CSHARP,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...CSHARP_COMMON_KEYWORDS],
        keywords: CSHARP_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.JAVA,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...JAVA_COMMON_KEYWORDS],
        keywords: JAVA_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.CPP,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...CPP_COMMON_KEYWORDS],
        keywords: CPP_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.GOLANG,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...GOLANG_COMMON_KEYWORDS],
        keywords: GOLANG_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.PYTHON,
        comments: [{ start: '"""', end: '"""', oneLine: '#' }],
        commonKeywords: [...PYTHON_COMMON_KEYWORDS],
        keywords: PYTHON_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.PHP,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...PHP_COMMON_KEYWORDS],
        keywords: PHP_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.RUBY,
        comments: [{ start: '=begin', end: '=end', oneLine: '#' }],
        commonKeywords: [...RUBY_COMMON_KEYWORDS],
        keywords: RUBY_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.SQL,
        comments: [{ start: '/*', end: '*/', oneLine: '--' }],
        commonKeywords: [...SQL_COMMON_KEYWORDS],
        keywords: SQL_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    },
    {
        lang: Langs.RUST,
        comments: [{ start: '/*', end: '*/', oneLine: '//' }],
        commonKeywords: [...RUST_COMMON_KEYWORDS],
        keywords: RUST_KEYWORDS,
        special: [CONFIG.roundBrackets],
        simple: [CONFIG.numbers]
    }
];



