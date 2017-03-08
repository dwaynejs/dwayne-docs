## Wrapping and extending blocks

Wrapping and extending blocks may be useful for two kinds of things:

1. Not repeating yourself, setting some variables, that you need in
every block, to each block (or not to pollute the global scope).

2. Extending block behaviour by animating it, adding some outer args
(i.e., from [Redux](http://redux.js.org/) state or a router), adding
extra functions and etc.

You can extend your blocks (or let outer plugins or libraries do it)
by simply extending them in `ES6` way.

But usually it's far more convenient to write a function that returns
a wrapper and call `Block.wrap` when you need to wrap some block.

> `Block.wrap` takes any number of function arguments and calls
them in a chain passing a result from the previous function to the
next one.

For example, we have a wrapper that sets local variables:

```js
// app/wrappers/localVars.js
import _ from 'lodash';
import i18n from '../i18n';

export default (Block) => {
  return class extends Block {
    constructor(opts) {
      super(opts);
      
      this._ = _;
      this.i18n = i18n;
    }
  };
};
```

and a logger wrapper:

```js
// app/wrappers/logger.js
export default (Block) => {
  return class extends Block {
    afterConstruct() {
      // this.$$ contains some internal properties
      // you can explore it by logging it
      // but don't change anything there because
      // it can break something
      // use only public API
      console.log(`block ${ this.$$.name } constructed`);
      
      // call super.afterConstruct in order not
      // to destroy the block behaviour
      super.afterConstruct();
    }
    
    afterRender() {
      console.log(`block ${ this.$$.name } rendered`);
      
      super.afterRender();
    }
    
    beforeRemove() {
      console.log(`block ${ this.$$.name } removed`);
      
      super.beforeRemove();
    }
  };
};
```

```js
// blocks/App/index.js
import { Block } from 'dwayne';
import localVarsWrapper from '../../wrappers/localVars';
import loggerWrapper from '../../wrappers/logger';

class App extends Block {
  static template = `<div class="app">[{_.times(4).join(', ')}]</div>`;
}

Block.block('App', App.wrap(
  localVarsWrapper,
  loggerWrapper
));
```

If you init this block as an app you'll see in HTML:

```html
<div class="app">
  [0, 1, 2, 3]
</div>
```

And in console there will be:

```
block App constructed
block App rendered
```

Although you may think that it's not very convenient to import
wrappers every time you need to use them, they become far more
powerful in combination with registration hooks (next section).
