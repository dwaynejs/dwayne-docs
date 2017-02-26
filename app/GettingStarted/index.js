import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class GettingStarted extends Block {
  static template = template();
  static routerOptions = {
    name: 'getting-started',
    path: '/getting-started'
  };

  md = md;
}

Block.block('GettingStarted', GettingStarted.wrap(
  makeRoute()
));
