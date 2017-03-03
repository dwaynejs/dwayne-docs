## Mixin lifecycle

In order to use a mixin you need to register it first:

```js
// app/my-mixin.js

import { Block, Mixin } from 'dwayne';

class MyMixin extends Mixin {
  afterUpdate(newValue, oldValue) {
    // do something with the HTML element
  }
}

// this is mixin registration
Block.mixin('my-mixin', MyMixin);
```

`Block.mixin` takes two arguments: first one is mixin name
and the second one is either mixin class that extends `Mixin`
class (not necessarily directly) or a function (
`Mixin#afterUpdate` class instance method analogue) that is
called with three arguments: new value, old value and mixin
instance itself. In the second case Dwayne will create the class
itself. In both cases Dwayne gets a class that extends `Block`
that has `afterUpdate` instance method.

Then you need to insert the mixin as a regular HTML attribute
inside some block into some HTML element, for example inside
the root app block into `div` element:

```js
// app/App.js

import { Block } from 'dwayne';

Block.block('App', '<div my-mixin="foo"/>');
```

> There are more kinds of syntax to insert a mixin but we'll
cover them later.

When this block is rendering and sees `my-mixin` the following
happens:

1. The mixin instance is created as a regular class instance.
Some internal variables are created. Two most important instance
variables are created: `elem` and `node` (there are actually
more, but it's not necessary to know them for now), so you can use
them starting from `constructor`. `node` property contains HTML
element so you can use it for your needs (it's very likely
that you're going to need it because extending HTML elements
behaviour is the only thing mixins do). `elem` property contains
`Elem` analogue of the `node` property (which is not covered
by the guide, see API docs). Note that it's necessary to call
`super(opts)` in the `constructor` if you use it (though it's
a rare case when you need to use the `constructor` in mixin).

2. If mixin class has a static `evaluate` property set to `false`
(it's defaults to `true` and means that the HTML attribute value
needs to be evaluated like any other HTML attribute or a block
argument) nothing happens and steps `2` and `3` are skipped.
If not (default) the mixin value is evaluated, `Mixin#value`
is created, which contains the mixin value. `Mixin#afterUpdate`
method is called with the new value (initial in this case)
and the old one (`undefined` in this case).

3. Each time the mixin value changes `Mixin#afterUpdate` is called
with the new value and the old one.

4. Now if some parent blocks or elements are removed
`Mixin#beforeRemove` function is called. It's useful for removing
some event handlers that you've set. That's the end of the mixin
lifecycle.

Note that if there are more than one usage of the same
mixin nothing special happens. They don't conflict with
each other in any way.
