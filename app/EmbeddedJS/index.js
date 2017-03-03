import _ from 'lodash';
import { Block, makeRoute } from 'dwayne';
import template from './index.pug';
import md from './index.md';
import parseJS from '../parseJS';

let id = 0;

class EmbeddedJS extends Block {
  static template = template();
  static routerOptions = {
    name: 'embedded-js',
    path: '/embedded-js'
  };

  md = md;
  expression = null;
  scope = [];
  resultExpression = '\u00a0';
  resultEvaluated = undefined;

  afterConstruct() {
    this.watch('expression', 'scope', this.calculate);
  }

  findIndexById(ID) {
    return _.findIndex(this.scope, (({ id }) => id === ID));
  }

  removeScopeParam = (id) => {
    const index = this.findIndexById(id);

    this.scope = [
      ...this.scope.slice(0, index),
      ...this.scope.slice(index + 1)
    ];
  };

  addScopeParam() {
    this.scope = [
      ...this.scope,
      {
        id: id++,
        name: '',
        value: ''
      }
    ];
  }

  changeScopeItem(id, params) {
    const index = this.findIndexById(id);

    this.scope = [
      ...this.scope.slice(0, index),
      {
        ...this.scope[index],
        ...params
      },
      ...this.scope.slice(index + 1)
    ];
  }

  changeScopeParamName = (id, name) => {
    this.changeScopeItem(id, { name });
  };

  changeScopeParamValue = (id, value) => {
    this.changeScopeItem(id, { value });
  };

  calculate = () => {
    try {
      const {
        expression = ''
      } = parseJS(this.expression, this.expression, true) || {};
      const scope = this.scope.reduce((scope, { name, value }) => {
        scope[name] = new Function(`return ${ value }`)();

        return scope;
      }, {});
      let evaluated;

      if (expression) {
        try {
          evaluated = new Function('$', `return ${ expression }`)(scope);
        } catch (err) {
          evaluated = err;
        }
      }

      this.resultExpression = expression;
      this.resultEvaluated = evaluated;
    } catch (err) {
      this.resultExpression = err;
      this.resultEvaluated = undefined;
    }
  };
}

Block.block('EmbeddedJS', EmbeddedJS.wrap(
  makeRoute()
));
