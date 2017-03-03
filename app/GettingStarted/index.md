## Getting started

### Installation

First run

```bash
$ npm install dwayne --save
```

and you will have it installed in your project `node_modules`
directory.

Then there are two ways to start using Dwayne:

#### Through a module bundler (recommended)

You will need [Webpack](https://webpack.github.io/),
[Browserify](http://browserify.org/) or
[Rollup](http://rollupjs.org/) for this.

Just `import` or `require` it in your code
and you're ready to go:

```js
import { Block } from 'dwayne';
// or
const { Block } = require('dwayne');

class MyBlock extends Block {
  // declare some methods and properties
}

Block.block('MyBlock', MyBlock);
```

We will proceed to blocks declaration and initialization later.

#### Through a regular HTML script tag (not recommended)

```html
<script src="/node_modules/dwayne/build/dwayne.min.js"></script>
```

This will spawn a global Dwayne variable which has
all of the exported properties set.

### Writing a simple app

We assume you already use a module bundler and you know how to
use [Babel](https://babeljs.io/) so we will use ES6 classes and
`import` statements in all following examples.
Also you should probably have this babel plugin
(https://babeljs.io/docs/plugins/transform-class-properties/)
installed in your npm as well (you could write the examples
without it, but in order to do that you need to transform all of
the code to ES6 compatible code).

Note that you still can write all the examples in the global
scope (using the `script` way), but it's really not recommended.

First register your App block. For this step in your `app`
directory create `App.js`. Type in it:

```js
import { Block } from 'dwayne';

class App extends Block {
  static template = '<div>Hello, {who}!</div>';
  
  who = 'world';
}

 // this is a block registration
Block.block('App', App);
```

Then create `app/index.js` file (which is the app root file)
with the following content:

```js
import { initApp } from 'dwayne';
import './App';

// insert div#root element in your main HTML file
initApp('App', document.getElementById('root'));
```

And this is it! Open up your app in browser and see the result!
