import _ from 'lodash';
import { Block } from 'dwayne';
import template from './index.pug';

class Evaluated extends Block {
  static template = template();

  _ = _;

  isFirstIndex(object, index) {
    for (const key in object) {
      return key === index;
    }
  }

  areSomeProps(object) {
    return D(object).some(() => true);
  }
}

Block.block('Evaluated', Evaluated);
