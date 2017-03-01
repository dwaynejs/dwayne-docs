import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class BlockLifecycle extends Block {
  static template = template();
  static routerOptions = {
    name: 'block-lifecycle',
    path: '/block-lifecycle'
  };

  md = md;
}

Block.block('BlockLifecycle', BlockLifecycle.wrap(
  makeRoute()
));
