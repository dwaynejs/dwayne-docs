import { Block, Mixin } from 'dwayne';
import marked from 'marked';
import hightlight from 'highlight.js';

marked.setOptions({
  highlight(code, lang) {
    return hightlight.highlightAuto(code, [lang]).value;
  }
});

class Markdown extends Mixin {
  afterUpdate(newValue) {
    const { elem } = this;

    elem.html(marked(newValue));
  }
}

Block.mixin('markdown', Markdown);
