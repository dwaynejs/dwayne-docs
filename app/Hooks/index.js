import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class Hooks extends Block {
  static template = template();
  static routerOptions = {
    name: 'hooks',
    path: '/hooks'
  };

  md = md;
}

Block.block('Hooks', Hooks.wrap(
  makeRoute()
));
