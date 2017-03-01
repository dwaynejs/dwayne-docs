## Terminology

### Blocks

All your HTML code will consist of built-in blocks,
your own ones and pure HTML elements.
Let's take a look at the following example:

```html
<div>
  <span>Foo</span>
</div>
<d-if if="{condition}">
  <span>Bar</span>
</d-if>
<MyDiv>
  <span>Baz</span>
</MyDiv>
```

The first element is a pure HTML `div` element,
the second one is a `d-if` built-in block (we will look
through them in the next section) and the last one
is a custom block (with "MyDiv" name) which needs
to be registered (otherwise it will be parsed as a regular
HTML element) like this:

```js
import { Block } from 'dwayne';

Block.block('MyDiv', '<div class="my-div"><d-block/></div>');
```

This is just a simple wrapper into `div.my-div`
HTML-element (`d-block` is a built-in block which we will
discuss a bit later).

### Mixins

Mixin looks like a special HTML attribute which allows
you to change HTML element behaviour. As with blocks
there are some built-in mixins, ones that are written
by you and usual HTML attributes.  
Note: mixins are attributes for only pure HTML elements.
Attributes for Blocks are called arguments (or simply
`args`). We'll cover them below.

```html
<div
  id="my-div"
  d-class="{{ visible: visible }}"
  markdown="# Hello"
/>
```

The first one is simply an HTML id attribute, the second
one is a built-in `d-class` mixin (we will look through
mixins in a couple of sections) and the last one is
a custom mixin (with "markdown" name) which needs
to be registered (otherwise it will be parsed as a regular
HTML attribute) like this:

```js
// markdown.js

import { Block, Mixin } from 'dwayne';

class Markdown extends Mixin {
  afterUpdate(newValue, oldValue) {
    // parse markdown and put it in element innerHTML property
    // we'll write this functionality later
  }
}

Block.mixin('markdown', Markdown);
```

### Variables

There are 3 types of variables in Dwayne:

#### Local variables (locals)

This is the most common type of variable. It's simply
an block class instance property that can be used both
by the view and the controller. Example:

```js
import { Block } from 'dwayne';

class Greeter extends Block {
  static template = '<div>Hello, {who}!</div>';
  
  who = 'world';
}

Block.block('Greeter', Greeter);
```

#### Arguments variables (args)

This is variables that come from a block that uses this
block in its template. You can access args through
`Block#args` property. For example:

```js
// App.js

import { Block } from 'dwayne';

Block.block('App', '<Greeter who="world"/>');
```

```js
// Greeter.js

import { Block } from 'dwayne';

Block.block('Counter', '<div>Hello, {args.who}!</div>');
```

#### Global variables (globals)

Global variables are the rarest type of variables but the
most powerful. They let you declare, change variables that
are visible to all child blocks, their children and etc.
For example:

```js
// App.js

import { Block } from 'dwayne';

class App extends Block {
  static template = '<Counter/>';
  
  constructor(opts) {
    super(opts);
    
    this.globals.who = 'world';
  }
}

Block.block('App', App);
```

```js
// Counter.js

import { Block } from 'dwayne';

Block.block('Counter', '<div>Hello, {globals.who}!</div>');
```

Note that all types variables are watched if they are
defined in the constructor function (args are defined
in `Block` constructor by Dwayne itself). So every time
a variable changes the view changes as well (in cases
of reversed binding in inputs the same thing happens
to the controller and the rest of the view).
