import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { langConfig, Langs } from './config/lang.config';
import * as CONFIG from './config/app.config';
import { EXAMPLE } from 'src/example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PrettyCodeForBlog';
  langs: any;
  themes: any;
  selectedLang: string;
  selectedTheme: string;
  prettyForm: FormGroup;
  result: string;
  resultHtml: string;
  resultCss: string;
  sass = '//github.com/mosdotlab/PrettyCodeForBlog/src/styles/pretty-code.scss';
  css = '//github.com/mosdotlab/PrettyCodeForBlog/src/styles/pretty-code.css';

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.langs = Langs;
    this.themes = CONFIG.themes;
    this.selectedLang = Langs.JS.toString();
    this.selectedTheme = this.themes[0].key;
  }

  ngOnInit() {
    this.prettyForm = this._formBuilder.group({
      code: [EXAMPLE, [Validators.required]],
      lang: [this.selectedLang, [Validators.required]],
      theme: [this.selectedTheme, [Validators.required]]
    });

    this.prettify();
  }

  onLangChange(event) {
    this.selectedLang = event.value;
    this.prettify();
  }

  onThemeChange(event) {
    this.selectedTheme = event.value;
    this.prettify();
  }

  prettify() {
    const lang = langConfig.find(x => x.lang === Langs[this.selectedLang]);
    let code: string = this.prettyForm.controls.code.value;
    this.result = '';
    this.resultHtml = '';
    let isFirstLine = false;
    const minIndex = this.getMinIndex(code);

    if (lang.comments) {
      lang.comments.forEach(comment => {
        code = this.parseComments(code, comment.start, comment.end, comment.oneLine, CONFIG.comments.openTag);
      });
    }

    const codeArray = code.split('\n');
    const length = codeArray.length;

    for (let index = 0; index < length; index++) {
      let el: string = codeArray[index];
      if (el.trim().length === 0) {
        if (isFirstLine) {
          this.result += '<br />';
        }
      } else {

        isFirstLine = true;
        el = this.parseQuotes(el, CONFIG.quotes.openTag);

        if (lang.commonKeywords) {
          el = this.parseKeywords(el, lang.commonKeywords, CONFIG.commonKeywords.openTag);
        }

        if (lang.keywords) {
          el = this.parseKeywords(el, lang.keywords, CONFIG.keywords.openTag);
        }

        if (lang.special) {
          lang.special.forEach(
            x => el = this.parseSpecial(el, x.re, x.openTag)
          );
        }

        if (lang.simple) {
          lang.simple.forEach(
            x => el = this.parseSimple(el, x.re, x.openTag)
          );
        }

        el = el.replace(/>/g, '&gt;').replace(/</g, '&lt;').substring(minIndex);
        this.result += `\n<p>${el}</p>`;
      }
    }

    CONFIG.tags.forEach(tag => {
      const re = new RegExp(tag.openTag, 'g');
      this.result = this.result.replace(re, tag.span);
    });

    const recloseTag = new RegExp(CONFIG.closeTag, 'g');
    this.result = this.result
      .replace(recloseTag, '</span>')
      .replace(/{/g, '&#123;')
      .replace(/}/g, '&#125;')
      .replace(/\[/g, '&#91;')
      .replace(/\[/g, '&#93;')
      .replace(/\(/g, '&#40;')
      .replace(/\)/g, '&#41;')
      .replace(/\*/g, '&#42;')
      .replace(/\$/g, '&#36;');

    this.result = `\n<pre class="${this.selectedTheme}">${this.result}<br />\n</pre>\n`;
    this.resultHtml = `${this.result}\n`;
  }

  submit() {
    if (this.prettyForm.invalid) {
      return;
    }
    this.prettyForm.disable();
    try {
      this.prettify();
    } catch (error) {
      console.log(error);
      this._snackBar.open('See the error in the console.', null, { duration: 5000 });
      this.result = '';
      this.resultHtml = '';

    }
    this.prettyForm.enable();
  }

  parseKeywords(el: string, keywords: string[], openTag: string): string {
    let flag = 'g';
    if (this.prettyForm.controls.lang.value === Langs.SQL) {
      flag = 'gi';
    }
    keywords.forEach(keyword => {
      const re = CONFIG.reWord(keyword, flag);
      el = this.parseSpecial(el, re, openTag);
    });
    return el;
  }

  parseSimple(el: string, re: RegExp, openTag: string): string {
    el = el.replace(re, (val, index) => {
      if (val.trim().length === 0) {
        return val;
      }
      if (val.includes(CONFIG.closeTag) || val.includes(CONFIG.openTag)) {
        return val;
      }
      if (this.checkIndex(el, index)) {
        return `${openTag}${val}${CONFIG.closeTag}`;
      }
      return val;
    });
    return el;
  }

  parseSpecial(el: string, re: RegExp, openTag: string): string {
    if (el.includes('\s*') || el.includes('^')) {
      return el;
    }
    const arr = [{ val: '', indices: [], index: -1 }];
    el = el.replace(re, (val) => {
      console.log('parseSpecial', val);
      if (val.trim().length === 0) {
        return val;
      }

      let item = arr.find(x => x.val === val);
      if (!item) {
        const re1 = new RegExp(val, 'g');
        const indices = new Array();
        while (re1.exec(el)) {
          indices.push(re1.lastIndex);
        }
        item = { val, indices, index: -1 };
        arr.push(item);
      }

      if (item.index < item.indices.length - 1) {
        item.index++;
      }

      if (this.checkIndex(el, item.indices[item.index])) {
        return `${openTag}${val}${CONFIG.closeTag}`;
      }
      return val;
    });
    return el;
  }

  parseQuotes(el: string, openTag: string): string {
    const quotes = CONFIG.quotes.value;
    if (!quotes.some(x => el.includes(x))) {
      return el;
    }
    for (const val of quotes) {
      if (!this.checkIndex(el, el.indexOf(val))) {
        continue;
      }
      const re = new RegExp(val, 'g');
      el = this.parsePairs(el, re, openTag);
    }
    return el;
  }

  parsePairs(el: string, re: RegExp, openTag: string): string {
    const indices = new Array();
    let newEl = '';
    while (re.exec(el)) {
      indices.push(re.lastIndex);
    }
    const length = indices.length;

    if (length > 1 && Math.abs(length % 2) === 0) {
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          newEl += el.substring(0, indices[i] - 1);
        }

        if (Math.abs(i % 2) === 1) {
          const str = el.substring(indices[i - 1] - 1, indices[i]);
          const nextEl = (i === length - 1) ? el.substring(indices[i]) : el.substring(indices[i], indices[i + 1] - 1);
          if (this.checkIndex(el, indices[i] - 1)) {
            if (!str.includes(CONFIG.closeTag)) {
              newEl += `${openTag}${str}${CONFIG.closeTag}` + nextEl;
            } else {
              newEl += str;
            }
          } else {
            newEl += str + nextEl;
          }
        }
      }
      return newEl;
    }

    if (length > 2 && Math.abs(length % 2) === 1) {
      const firstIndex = indices[0];
      const lastIndex = indices[length - 1];
      const str = el.substring(firstIndex - 1, lastIndex);
      if (!str.includes(CONFIG.closeTag)) {
        newEl += `${el.substring(0, firstIndex - 1)}${openTag}${str}${CONFIG.closeTag}${el.substring(lastIndex)}`;
        return newEl;
      }
    }
    return el;
  }

  getMinIndex(str: string): number {
    const re = CONFIG.reFirstSpaces;
    const arr = str.split('\n');
    const indices = arr.map(x => x.indexOf((x.match(re) || [])[0])).filter(x => x >= 0);
    const minIndex = Math.min(...indices);
    return minIndex;
  }

  parseComments(str: string, start: string, end: string, oneLine: string, openTag: string): string {
    const arr = str.split('\n');
    const length = arr.length;
    const newArr = [];
    let firstIndex = -1;
    let lastIndex = -1;
    for (let index = 0; index < length; index++) {
      const el: string = arr[index];
      if (el.trim().indexOf(start) === 0 && firstIndex === -1) {
        firstIndex = index;
      }

      if (firstIndex >= 0 && el.indexOf(start) > 0 && el.indexOf(end) > 0 && start !== end) {
        newArr[index] = `${openTag}${el}${CONFIG.closeTag}`;
        firstIndex = -1;
        continue;
      }

      const oneLineIndex = el.indexOf(oneLine);
      if (firstIndex === -1 && oneLineIndex >= 0) {
        newArr[index] = `${el.substring(0, oneLineIndex)}` +
          `${openTag}${el.substring(oneLineIndex)}${CONFIG.closeTag}`;
        continue;
      }

      if (el.substring(el.length - end.length, el.length) === end && el.trim().indexOf(end) > -1 && firstIndex >= 0) {
        lastIndex = index;
        for (let i = firstIndex; i < lastIndex + 1; i++) {
          newArr[i] = `${openTag}${arr[i]}${CONFIG.closeTag}`;
        }
        firstIndex = -1;
        continue;
      }
      newArr[index] = el;
    }
    return newArr.join('\n');
  }

  checkIndex(el: string, index: number): boolean {
    if (index < 0) {
      return false;
    }
    const re1 = new RegExp(CONFIG.openTag, 'g');
    const re2 = new RegExp(CONFIG.closeTag, 'g');
    const indices1 = new Array();
    const indices2 = new Array();

    while (re1.exec(el)) {
      indices1.push(re1.lastIndex);
    }
    while (re2.exec(el)) {
      indices2.push(re2.lastIndex);
    }

    const count1 = indices1.filter(x => x < index).length - indices2.filter(x => x < index).length;
    const count2 = indices1.filter(x => x > index).length - indices2.filter(x => x > index).length;
    return (count1 === 0 && count2 === 0);
  }

  copyToClipboard(event) {
    if (event.index === 1 && this.resultHtml) {
      const el = document.createElement('textarea');
      el.value = this.resultHtml;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      const message = 'Result html is copied to clipboard';
      this._snackBar.open(message, null, { duration: 3000 });
    }
  }

  clear() {
    this.prettyForm.controls.code.reset();
    this.result = '';
    this.resultHtml = '';
  }
}
