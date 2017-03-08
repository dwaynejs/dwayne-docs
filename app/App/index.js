import { Block, makeRoute } from 'dwayne';
import template from './index.pug';

class App extends Block {
  static template = template();
  static routerOptions = {
    name: 'root',
    abstract: true,
    root: true
  };

  constructor(opts) {
    super(opts);

    this.setGlobalRoute();

    this.globals.routesNames = {
      introduction: 'Introduction',
      'getting-started': 'Getting started',
      'app-lifecycle': 'App lifecycle',
      terminology: 'Terminology',
      'block-lifecycle': 'Block lifecycle',
      'mixin-lifecycle': 'Mixin lifecycle',
      'embedded-js': 'Embedded Javascript',
      blocks: 'Blocks',
      'd-if': 'd-if',
      'd-switch': 'd-switch',
      'd-block': 'd-block',
      'd-each': 'd-each',
      mixins: 'Mixins',
      'd-show': 'd-show',
      'd-hide': 'd-hide',
      'd-node': 'd-node',
      'd-elem': 'd-elem',
      'd-style': 'd-style',
      'd-attr': 'd-attr',
      'd-class': 'd-class',
      'd-bind': 'd-bind',
      'd-on': 'd-on',
      'd-value': 'd-value',
      'd-rest': 'd-rest',
      'extending-blocks': 'Extending blocks',
      hooks: 'Hooks and listeners',
      '-block-beforeregisterblock-': 'Block.beforeRegisterBlock',
      '-block-beforeregistermixin-': 'Block.beforeRegisterMixin',
      '-block-watch-': 'Block#watchArgs',
      'block-evaluateandwatch': 'Block#evaluateAndWatch',
      'block-static-properties': 'Block static properties'
    };
  }

  setGlobalRoute = () => {
    this.globals.route = this.args.route;
  };

  afterConstruct() {
    this.watch('args.route', this.setGlobalRoute);
  }
}

Block.block('App', App.wrap(
  makeRoute()
));
