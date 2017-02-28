## Blocks

In this section we will cover how to create and use
custom blocks. Also we will explain how to use built-in
blocks.

Block is a class that extends `Block` class or its subclass.
Block has to have static `template` property (but it defaults
to empty string).

### Creating blocks

There are two ways of creating blocks:

1) Directly declare class that extends Block and register
it using `Block.block`:

```js
import { Block } from 'dwayne';

class MyBlock extends Block {
  static template = '<div class="my-block"/>';
}

Block.block('MyBlock', MyBlock);
```

2) Put pure string (Block template) in the second argument
of `Block.block`:

```js
import { Block } from 'dwayne';

Block.block('MyBlock', '<div class="my-block"/>');
```

Dwayne will create the class itself. Note that in this case
you will not be able to declare class and instance methods.
