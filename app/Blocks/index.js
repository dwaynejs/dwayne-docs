import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class Blocks extends Block {
  static template = template();
  static routerOptions = {
    name: 'blocks',
    path: '/blocks'
  };

  md = md;
}

Block.block('Blocks', Blocks.wrap(
  makeRoute()
));
