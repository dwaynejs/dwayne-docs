import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class Introduction extends Block {
  static template = template();
  static routerOptions = {
    name: 'introduction'
  };

  md = md;
}

Block.block('Introduction', Introduction.wrap(
  makeRoute()
));
