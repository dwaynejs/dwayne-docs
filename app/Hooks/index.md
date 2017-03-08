## Hooks and listeners

We have already covered block listeners such as `Block#afterConstruct`,
`Block#afterRender` and `Block#beforeRemove`. There are a couple more.

#### `Block#beforeRegisterBlock`

> The function takes one hook function argument, which is called
with two arguments: the registering block class and its name.

Call `Block.beforeRegisterBlock` in order to change the registering
block (or not change) in some way. Return value of the hook function
is registered instead of the initial one (if you don't return a class
that extends `Block` the initial one is used). I.e. the example from
the previous section may be rewritten like this:

```js
// app/hooks.js
import { Block } from 'dwayne';
import localVarsWrapper from './wrappers/localVars';
import loggerWrapper from './wrappers/logger';

Block.beforeRegisterBlock((Block, name) => {
  if (Block.logger) {
    Block = Block.wrap(localVarsWrapper);
  }
  
  if (Block.locals) {
    Block = Block.wrap(loggerWrapper);
  }
  
  return Block;
});
```

```js
// app/index.js
import { Block } from 'dwayne';
import './hooks';
import './blocks/App';
// ... import other blocks
```

Now we can set in any block static `logger` or `locals` property
to simply wrap it before registration:

```js
// blocks/App/index.js
import { Block } from 'dwayne';

class App extends Block {
  static template = `<div class="app">[{_.times(4).join(', ')}]</div>`;
  static logger = true;
  static locals = true;
}

Block.block('App', App);
```

#### `Block.beforeRegisterMixin`

> The function takes one hook function argument, which is called
with two arguments: the registering mixin class and its name.

This function is almost the same as the previous one, though it's
less useful.

> Note: you may not only wrap your blocks or mixins using these hooks.
You can set static and prototype properties and methods, wrap templates,
replace some template fragments (if you need even fore flexibility
than Dwayne provides) and etc. Also you can set multiple hooks.

#### `Block#watch`

Call this function (only in `Block#afterConstruct` or later) when
you need to watch for any kind of a variable.

> The function takes any number of string arguments and then only
one watcher function that doesn't receive any arguments (if you need
to get the old and the new value use `Block#executeAndWatch` instead).
This watcher function is executed right away (believe us, it's not
a bug, it's a feature) and each time when some given variable has
been changed.

> String arguments may be:  
`$` - watch for all local variables;  
`args` - watch for all args;  
`globals` - watch for all globals;  
`value` (or any other name) - watch for local `value` var;  
`args.value` (or any other name) - watch for arg `value` var;  
`globals.value` (or any other name) - watch for global `value` var.

It's very useful if much calculations and data depends on some
argument, global variable or a local one. Example:

```js
// ComplicatedCalculation/index.js
import { Block } from 'dwayne';
import template from './index.html';

class ComplicatedCalculation extends Block {
  static template = template;
  
  doSomeComplicatedCalculation() {
    const { value } = this.args;
    
    // do something with the value
    
    return result;
  }
}

Block.block('ComplicatedCalculation', ComplicatedCalculation);
```

```html
<!-- ComplicatedCalculation/index.html -->
<div class="calc-value">
  {doSomeComplicatedCalculation()}
</div>
<div class="calc-negative-value">
  {-doSomeComplicatedCalculation()}
</div>
```

When `args.value` is changed `doSomeComplicatedCalculation` is
called twice (which is obviously not rational behaviour). Instead
we could use `Block#watch` do this more rationally:

```js
// ComplicatedCalculation/index.js
import { Block } from 'dwayne';
import template from './index.html';

class ComplicatedCalculation extends Block {
  static template = template;
  
  afterConstruct() {
    // see, it's convenient that the function is called right away:
    // we don't need to call it the first time
    this.watch('args.value', this.doSomeComplicatedCalculation);
  }
  
  // note that we used class properties proposal for instance
  // properties in order not to bind "this" to the function (see above)
  doSomeComplicatedCalculation = () => {
    const { value } = this.args;
    
    // do something with the value
    
    this.calculationResult = result;
  };
}

Block.block('ComplicatedCalculation', ComplicatedCalculation);
```

```html
<!-- ComplicatedCalculation/index.html -->
<div class="calc-value">
  {calculationResult}
</div>
<div class="calc-negative-value">
  {-calculationResult}
</div>
```

Now the function is called just once when `args.value` is changed.

> Note that we didn't have to initialize the `calculationResult`
variable because it's used in the template so JS parser detects it
and initializes it for us.

> Worth mentioning: the watcher is called asynchronously (after
a variable has been changed) in order to optimize the behaviour.
If two watched variables are changed synchronously the watcher
is called just once.

#### Block#evaluateAndWatch

This function will probably be deprecated some time soon.

> It takes two arguments: a JS expression (like ones you use in
templates and a function that is called when the expression result
is changed). Returns the result of the expression at the moment of
the function call.

There is also `Block#evaluateOnce` function that just executes a JS
expression and returns the result. It's probably going to be
deprecated as well.
