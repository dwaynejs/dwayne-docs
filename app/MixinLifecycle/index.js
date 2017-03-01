import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class MixinLifecycle extends Block {
  static template = template();
  static routerOptions = {
    name: 'mixin-lifecycle',
    path: '/mixin-lifecycle'
  };

  md = md;
}

Block.block('MixinLifecycle', MixinLifecycle.wrap(
  makeRoute()
));
