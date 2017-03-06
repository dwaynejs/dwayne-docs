import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class Mixins extends Block {
  static template = template();
  static routerOptions = {
    name: 'mixins',
    path: '/mixins'
  };

  md = md;
}

Block.block('Mixins', Mixins.wrap(
  makeRoute()
));
