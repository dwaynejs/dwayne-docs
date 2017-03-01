## App lifecycle

### Initializing app

To start your app you have to have some HTML element in DOM
to insert the app into. For example, you have `div#root` in your
HTML. All you need to do is register a root block (i.e. `App`)
and call `initApp` function:

```js
// app/App.js

import { Block } from 'dwayne';

// this is block registration
// now you can use this block in the app
Block.block('App', '<div>Hello, world!</div>');
```

```js
// app/index.js

import { initApp } from 'dwayne';

import './App'; // now we have the app block imported

// the function takes the block name as the first argument
// and an HTML element as the second argument
// it also can be of Elem type (helper class, also exported)
// see API docs for the info on this class
initApp('App', document.getElementById('root'));
```

And you're all set! Note that you can create multiple apps
inside different HTML elements, even in ones that are not inside
the document and even inside each other. They won't be connected
one to another in any way.
 
In order to remove the app you need to
call `removeApp` function (cleaner but longer way) or simply
remove the root HTML element:

```js
import { removeApp } from 'dwayne';

const root = document.getElementById('root');

// takes one argument of HTML element type
removeApp(root);

// or

root.parentNode.removeChild(root);
```

Use the first one if you want to reuse the root element.

### Registering blocks

It's strongly recommended to register all your blocks
before calling `initApp`. Although it's possible to register
blocks and even use them after calling `initApp` function
it's not recommended. You always can call the function after
you have registered all blocks.
