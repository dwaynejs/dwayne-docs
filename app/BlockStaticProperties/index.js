import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';

class BlockStaticProperties extends Block {
  static template = template();
  static routerOptions = {
    name: 'block-static-properties',
    path: '/block-static-properties'
  };

  md = md;
}

Block.block('BlockStaticProperties', BlockStaticProperties.wrap(
  makeRoute()
));
