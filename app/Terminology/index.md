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
// MyDiv/index.js

import { Block } from 'dwayne';

class MyDiv extends Block {
  static template = '<div class="my-div"><d-block/></div>';
}

Block.block('MyDiv', MyDiv);
```

This is just a simple wrapper into `div.my-div`
HTML-element.

### Mixins

Mixin is like a special HTML attribute which allows
you to change HTML element behaviour. As with blocks
there are some built-in mixins, ones that are written
by you and usual HTML attributes.  
Note: mixins are attributes for only pure HTML elements.
Attributes for Blocks are called arguments (or simply
`args`). We'll cover them below.

```html
<div
  id="my-input"
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

##### Local variables (locals)

This is the most common type of variable. It's simply
an instance property that can be used both by the view
and the controller. Example:

```js
import { Block } from 'dwayne';

class Counter extends Block {
  static template = '<div>Counter: {counter}</div>';
  
  counter = 0;
  
  afterConstruct() {
    // we will look through the Block API later
    
    setInterval(() => {
      // these changes will be immediately
      // reflected by the view
      this.counter++;
    }, 1000);
  }
}

Block.block('Counter', Counter);
```

##### Arguments variables (args)

This is variables that come from a block that uses this
block. You can access args through Block#args property.
For example:

```js
// App.js

import { Block } from 'dwayne';

class App extends Block {
  static template = '<Counter value="{counter}"/>';
  
  counter = 0;
  
  afterConstruct() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }
}

Block.block('App', App);
```

```js
// Counter.js

import { Block } from 'dwayne';

Block.block('Counter', '<div>Counter: {args.counter}</div>');
```

##### Global variables (globals)
