## Block lifecycle

In order to use a block you need to register it first:

```js
// app/MyBlock.js

import { Block } from 'dwayne';

class MyBlock extends Block {
  static template = '<div class="my-block"/>';
}

// this is block registration
Block.block('Block', MyBlock);
```

`Block.block` takes two arguments: first one is block name
and the second one is either block class that extends `Block`
class (not necessarily directly) or a simple string that
is meant to be the block template. In the second case Dwayne
will create the class itself. In both cases Dwayne gets
a class that extends `Block` that has `template` class property.

> This function parses the template as HTML (though XML
notation is also allowed), parses embedded JS (we will proceed
to this later) and transforms it for own usage (the original
logic does not change).

Then you need to insert the block as a regular HTML element
in some other block, for example in the root app block:

```js
// app/App.js

import { Block } from 'dwayne';

Block.block('App', '<MyBlock/>');
```

When this block is rendering and sees `MyBlock` the following
happens:

1. The block instance is created as a regular class instance.
Some internal variables are created (`$` and `$$`). Two most
important instance variables are created: `args` and `globals`,
so you can use them starting from `constructor`. Also
`Block#parentScope` (in which scope the block is located) and
`Block#parentTemplate` (in which template the block is located)
are created as well. Note that it's necessary to call
`super(opts)` in the `constructor`.

2. `Block#afterConstruct` is called (you don't have to define
it if you don't need it). By this moment you have to
initialize all your local variables and global variables
(if you need them to be watched). Although the JS parser
detects all variables that are used in the template (so
you don't need to define them in the constructor), it's always
handy to see all variables that are used.

3. Block template is rendered. If the template has some
other blocks (not only HTML elements) this cycle starts
for them the same way. If some HTML elements have any mixins
(not only usual attributes) the mixin cycle starts for them
(next section).

4. After the template is rendered `Block#afterRender` is called
(you don't have to define it if you don't need it as well).
This method is helpful when you need to do something with
HTML elements which Dwayne can't do: define some third-party
plugins (scrollers, galleries, players and etc), check how
much width or height some elements have and etc.

5. Now if some parent blocks or elements are removed (you
are strongly recommended not to mutate with DOM by adding
or removing HTML elements) `Block#beforeRemove` function is
called. It's useful for removing some event handlers that
won't be removed if you don't directly delete them (event
emitters handlers, `window`, or `document` or any other
global element event listeners and etc), disconnecting
sockets and etc. That's the end of the block lifecycle.

Note that if there are more than one usage of the same
block nothing special happens. They don't conflict with
each other in any way.
