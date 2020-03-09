export interface Tag {
    value?: string[];
    re?: RegExp;
    span: string;
    openTag: string;
}

export const themes = [
    { value: 'Dark', key: 'pretty-code-dark' },
    { value: 'Light', key: 'pretty-code-light' }
];

export const specialSymbols = ['\s*', '^'];

export const openTag = 'oXpen_tXag';
export const closeTag = 'cXlose_tXag';

export const reFirstSpaces = /[^ ].*$/g;
export const reHtmlTags = /(\<|\<\/)([a-zA-Z0-9\-]*?)(\>|$| )|\>|\/\>|\/\</g;
export const reBetweenHtmlTags = /(?<=[\<|\<\/])([a-zA-Z0-9\-]*?)(?=[\>|\/\>| ]|$)/g;
export const reRoundBrackets = /\b([^\.\)\[\\:\>\{ ]*?)(?=[\(|$])/g;
export const reArrowFunctions = /([a-zA-Z0-9]*?)(?=( =[ ]([^\.]*)[ ]=> ))/g;
export const rePropName = /\b[^ ]*?\: /g;
export const reNumbers = /(?<![A-Za-z0-9])[0-9]+/g;
export const reWord = (word: string, flag: string) => new RegExp(`\\b${word}\\b`, flag);

export const comments: Tag = {
    span: '<span class="comment">',
    openTag: `${openTag}_cXomments`
};

export const quotes: Tag = {
    value: ['`', '"', '\''],
    span: '<span class="quotes">',
    openTag: `${openTag}_qXuotes`
};

export const keywords: Tag = {
    span: '<span class="keyword">',
    openTag: `${openTag}_kXeyword`
};

export const commonKeywords: Tag = {
    span: '<span class="common-keyword">',
    openTag: `${openTag}_cXommon_kXeyword`
};

export const roundBrackets: Tag = {
    re: reRoundBrackets,
    span: '<span class="function">',
    openTag: `${openTag}_fXunction`
};

export const arrowFunctions: Tag = {
    re: reArrowFunctions,
    span: '<span class="arrow-function">',
    openTag: `${openTag}_aXrrow_fXunction`
};

export const htmlTags: Tag = {
    re: reHtmlTags,
    span: '<span class="html-tag">',
    openTag: `${openTag}_hXtml`
};

export const betweenHtmlTags: Tag = {
    re: reBetweenHtmlTags,
    span: '<span class="html-tag">',
    openTag: `${openTag}_iXnside_hXtml`
};

export const propName: Tag = {
    re: rePropName,
    span: '<span class="prop-name">',
    openTag: `${openTag}_pXrop_nXame`
};

export const numbers: Tag = {
    re: reNumbers,
    span: '<span class="number">',
    openTag: `${openTag}_nXumber`
};

export const tags: Tag[] = [
    comments, quotes, keywords, commonKeywords,
    roundBrackets, arrowFunctions, htmlTags, betweenHtmlTags,
    propName, numbers
];
