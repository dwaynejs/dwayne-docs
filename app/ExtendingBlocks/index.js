import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class ExtendingBlocks extends Block {
  static template = template();
  static routerOptions = {
    name: 'extending-blocks',
    path: '/extending-blocks'
  };

  md = md;
}

Block.block('ExtendingBlocks', ExtendingBlocks.wrap(
  makeRoute()
));
