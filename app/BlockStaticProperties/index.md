## Block static properties

There are more `Block` static properties (besides `Block.template`)
that may be useful. All of these properties may not only be
reassigned in Dwayne `Block` class but any of your custom blocks.
All of them are obviously inherited from the main `Block` class.

#### `Block.collapseWhiteSpace`

> type: Boolean  
default: `true`

True stands for ignoring all white space in the block template between
tags and between tags and text data. Will probably be deprecated soon.

#### `Block.onEvalError`

> type: Function  
default: function, that prints eval error information to console

This function is called when an embedded JS expression evaluation
results in an error. The error argument contains all useful info
that you need: `err.expression` is a parsed expression that has
been evaluated, `err.original` is an original expression and
`err.block` is a block in which scope the expression has been
evaluated.

#### `Block.defaultLocals`

> type: Object  
default: null

Set this value to some object to set default locals to the block.
This may be very useful in combination with registration hooks:

```js
// app/hooks.js
import { Block } from 'dwayne';
import _ from 'lodash';
import i18n from './i18n';

Block.beforeRegisterBlock((Block) => {
  if (!Block.defaultLocals) {
    Block.defaultLocals = {};
  }
  
  Block.defaultLocals._ = _;
  Block.defaultLocals.i18n = i18n;
});
```

This hook also sets default `_` and `i18n` locals to each registered
block.

#### `Block.defaultArgs`

> type: Object  
default: null

Set this value to some object that can take arguments that may not
be passed.
