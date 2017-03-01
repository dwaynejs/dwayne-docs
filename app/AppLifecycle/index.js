import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class AppLifecycle extends Block {
  static template = template();
  static routerOptions = {
    name: 'app-lifecycle',
    path: '/app-lifecycle'
  };

  md = md;
}

Block.block('AppLifecycle', AppLifecycle.wrap(
  makeRoute()
));
