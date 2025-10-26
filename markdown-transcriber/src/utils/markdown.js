import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
breaks: true,
gfm: true,
});


export function mdToSafeHtml(markdown = ''){
const raw = marked.parse(markdown || '');
if (typeof window !== 'undefined'){
return DOMPurify.sanitize(raw);
}
return raw;
}