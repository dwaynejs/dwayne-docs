import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class Terminology extends Block {
  static template = template();
  static routerOptions = {
    name: 'terminology',
    path: '/terminology'
  };

  md = md;
}

Block.block('Terminology', Terminology.wrap(
  makeRoute()
));
