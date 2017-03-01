## Getting started

### Installation

First run

```bash
$ npm install dwayne --save
```

and you will have it installed in your project `node_modules`
directory.

Then there are two ways to start using Dwayne:

##### Through a module bundler (recommended)

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

##### Through a regular HTML script tag (not recommended)

```html
<script src="/node_modules/dwayne/build/dwayne.min.js"></script>
```

This will spawn a global Dwayne variable which has
all of the exported properties set.

### Writing a simple app

We assume you use a module bundler so we will use ES6 `import`
statements in all following examples.

First register your App block. For this step in your `app`
directory create `App` folder with `index.js` and `indes.html`
in it (you can use any template language which is compiled
to HTML).

Type in `app/App/index.html` the following:

```html
<div>Hello, {who}!</div>
```

Then type in `app/App/index.js` this:

```js
import { Block } from 'dwayne';
import template from './index.html';

class App extends Block {
  static template = template;
  
  constructor(opts) {
    super(opts);
    
    this.who = 'world';
  }
}

Block.block('App', App); // this is a block registration
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
