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
      'd-each': 'd-each'
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
