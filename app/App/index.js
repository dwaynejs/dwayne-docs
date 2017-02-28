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
      terminology: 'Terminology',
      blocks: 'Blocks',
      'd-if': 'd-if'
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
