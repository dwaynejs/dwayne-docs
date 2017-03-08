## Mixins

In this section we will cover how to create and use
custom mixins. Also we will explain how to use built-in
mixins.

Mixin is a class that extends `Mixin` class or its subclass.

### Creating mixins

There are two ways of creating mixins:

1. Directly declare class that extends Mixin and register
it using `Block.mixin`:

  ```js
  import { Block, Mixin } from 'dwayne';
  
  class MyMixin extends Mixin {
     afterUpdate() {
       // do something
     }
  }
  
  Block.mixin('my-mixin', MyMixin);
  ```

2. Put a function in the second argument of `Block.mixin` (which
basically means `Mixin#afterUpdate` method with additional third
argument - the mixin instance):

  ```js
  import { Block } from 'dwayne';
  
  Block.mixin('my-mixin', (newValue, oldValue, mixin) => {
     // do something
  });
  ```
  
  Dwayne will create the class itself. Note that in this case
  you can't declare class and instance methods.
  
### `Mixin.evaluate`

This static property defaults to `true` and means that mixin value
should be evaluated and watched. `false` stands for not doing that.
Instead you can extract the value at any time you want (multiple
times, if needed). For example,
<a href="#d-on" no-routing>d-on</a> mixin
calculates the value when the provided event is fired and
<a href="#d-value" no-routing>d-value</a>,
<a href="#d-elem" no-routing>d-elem</a> and
<a href="#d-node" no-routing>d-node</a> calculate their
values just once.
  
### Usage

There are a few ways to use a mixin (all include inserting
an HTML attribute into some HTML element, not block):

1. Put the name of mixin as a name:

  ```html
  <!-- App/index.html -->
  <div class="app">
     <div my-mixin="{value}"/>
     <!-- in this case mixin value equals to JS true value -->
     <div my-mixin/>
  </div>
  ```
  
2. Put the name with following string static args wrapped in
`(` and `)` and separated with `,`:

  ```html
    <!-- App/index.html -->
    <div class="app">
       <div my-mixin(arg1,arg2)="{value}"/>
    </div>
  ```
  
  You can access these static args through `Mixin#args`. If no
  arguments (with no brackets) provided `Mixin#args` equals
  `undefined`.
  
3. After optional args put `#` with some comment after it:

  ```html
    <!-- App/index.html -->
    <div class="app">
       <div my-mixin(arg1,arg2)#comment="{value}"/>
       <!-- or -->
       <div my-mixin#anotherComment="{value}"/>
    </div>
  ```
  
  You can access this comment through `Mixin#comment`. If no
  comment (with no `#`) provided `Mixin#comment` equals
  `undefined`.
  
  Comments exist in order to set two or more same mixins but
  for different purposes. Example:
  
  ```html
    <!-- App/index.html -->
    <div class="app">
       <div
         d-bind(click)="{onClick}"
         d-rest="{restArgs}"
       />
    </div>
  ```
  
  In this case, if `restArgs` contains `d-bind(click)` mixin
  it overrides `d-bind(click)`
  (see <a href="#d-rest" no-routing>d-rest</a>).
  So it's better to write something like this:
  
  ```html
    <!-- App/index.html -->
    <div class="app">
       <div
         d-bind(click)#forApp="{onClick}"
         d-rest="{restArgs}"
       />
    </div>
  ```

### Built-in blocks

#### d-show

Use `d-show` mixin when you want show or hide an HTML element
based on some condition. If the condition is truthy the element
is shown, if not it's hidden:

```html
<!-- App/index.html -->
<div class="app">
  <div d-show="{true}">
    TRUE
  </div>
  <div d-show="{false}">
    FALSE
  </div>
</div>
```

This example prints "TRUE".

#### d-hide

This mixin is the opposite of `d-show`.

```html
<!-- App/index.html -->
<div class="app">
  <div d-hide="{true}">
    TRUE
  </div>
  <div d-hide="{false}">
    FALSE
  </div>
</div>
```

This example prints "FALSE".

#### d-node

Use `d-node` to get the HTML element itself. There are four
types of `d-node` syntax:

```html
<div d-node="divNode"/>
<div d-node(divNode)/>
<div d-node(divNode)="{scope}"/>
<div d-node="{(divNode) => doSomething(divNode)}"/>
```

In the first three cases the scope (in the third case the scope is
taken from the mixin value, otherwise `Mixin#parentTemplate` is
used) `divNode` property is set to the HTML element.
 
In the fourth case the function (which is taken from the mixin
value) is called with the HTML element argument.

`d-node` does not watch its value.

#### d-elem

`d-elem` is the same as `d-node`, except that it sets not HTML
element value but `Elem` wrapper instance of the node. See
[Elem API](/elem-api) for more info in this class.

#### d-style

Use `d-style` to set CSS styles dynamically. There are two types
of `d-style` syntax:

```html
<div d-style="{objectWithCSSProps}"/>
<div d-style="{stringLikeTheOneYouPassToUsualStyleAttribute}"/>
<div d-style(prop1,...,propN)="{value}"/>
```

Case 1 example:

```html
<!-- App/index.html -->
<div class="app">
  <div d-style="{{ marginTop: '5px', 'margin-bottom': '2px' }}"/>
</div>
```

If some value in the object equals `null` or `undefined` the
property is removed.

Case 2 example:

```html
<!-- App/index.html -->
<div class="app">
  <div d-style="marginTop: 5px; margin-bottom: 5px;"/>
</div>
```

Case 3 example:

```html
<!-- App/index.html -->
<div class="app">
  <div d-style(marginTop,margin-bottom)="0px"/>
  <div d-style(z-index)="2"/>
</div>
```

It's recommended to use the second one for static CSS properties
names because it's obviously more readable. Also when multiple
`d-style`'s have the same CSS properties names the behaviour
almost always will be unexpected.

#### d-attr

Use `d-attr` when you need to set some attributes dynamically
to the HTML element. It's almost the same as `d-style`, only
it changes the element attributes instead of styles.

It's not recommended to use it, because `d-rest` does almost
the same but it's far more powerful. `d-attr` does not set
mixins, unlike `d-rest`.

#### d-class

`d-class` is much like `d-style`. The main difference is that
it adds or removes classes instead of styles. Another difference
is that it excepts two more types of syntax. Here are all of them:

```html
<div d-class="{objectWithClassesKeysAndBooleanLikeValues}"/>
<div d-class="{arrayWithClassesItems}"/>
<div d-class="{stringOfClassesSeparatedWithSpaces}"/>
<div d-class(class1,...,classN)="{booleanLikeValue}"/>
```

In the first case you can pass an object with class keys and
some value. If the value is truthy the corresponding key is added
as a class, otherwise it's not.

In the second case you can pass an array of classes strings.
If an item is not a string it's skipped. Otherwise it's added
as a class.

The third case is much like the second one (because the string
value is split into multiple class strings which are added).

The last case accepts mixin args. If the mixin value is truthy
all of them are added, otherwise they're not.

In all cases if an updated value does not contain classes that
are already added by **this** particular mixin, they are removed.

> Warning: try not to use dynamic class or style attributes because
there can be `d-class` and `d-style` mixins, applied to the same
element, which behaviour will be broken if `class` or `style`
attributes are overridden because they are dynamic.  
`d-class` as well as `d-style` except arguments as if they are
passed to `class` and `style` attributes respectively, so you can
get rid of `class` and `style` attributes completely (though
there's nothing wrong in setting static `class` or `style`
attributes).

#### d-bind

`d-bind` sets an event listener (if the mixin is removed the
listener is removed as well). You should pass an event name as
an argument (there may be multiple events - all with the same
listener). The mixin value is an event listener. Example:

```html
<!-- App/index.html -->
<div class="app">
  <div d-bind(click)="{onClick}"/>
  <div d-bind(keypress,keyup)="{onKeyPressed}"/>
</div>
```

#### d-on

`d-on` is almost the same as `d-bind`, except the fact that its
value is evaluated when a corresponding event is fired. Example:

```html
<!-- App/index.html -->
<div class="app">
  <div d-on(click)="{onClick()}"/>
  <div d-on(keypress,keyup)="{onKeyPressed()}"/>
</div>
```

#### d-value

`d-value` lets you bind a variable to an input (all kinds of them)
and vice versa. There are many types of syntax:

```html
<input d-value="inputValue"/>
<div d-value(inputValue)/>
<div d-value(inputValue)="{scope}"/>
<div d-value="{(inputValue) => doSomething(inputValue)}"/>
```

In the first three cases the value for the input is taken from the
scope (in the third case the scope is a mixin value, otherwise
`Mixin#parentTemplate` is used) `inputValue` variable. The variable
is watched. The same variable is set when the input is changed
(proper events are handled by `d-value` itself).

In the fourth case the function from the mixin value is called every
time the input has been changed (no double-binding here).

The most frequent form is the first one. The third form is used
for passing mixins through `d-rest` with preserving the scope.

Example:

```html
<!-- App/index.html -->
<div class="app">
  <!-- works with usual inputs -->
  <input type="text" d-value="text"/>
  <!-- works with color inputs as well -->
  <input type="color" d-value="color"/>
  <!-- works with file inputs as well -->
  <!-- the value is a FileList instance -->
  <input type="file" d-value="file"/>
  <!-- works with radio inputs -->
  <input type="radio" name="radio" value="1" d-value="radio"/>
  <input type="radio" name="radio" value="2" d-value="radio"/>
  <input type="radio" name="radio" value="3" d-value="radio"/>
  <!-- as well as checkbox inputs -->
  <input type="checkbox" name="checkbox" value="1" d-value="checkbox"/>
  <input type="checkbox" name="checkbox" value="2" d-value="checkbox"/>
  <input type="checkbox" name="checkbox" value="3" d-value="checkbox"/>
  <!-- works with select's -->
  <select d-value="select">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <!-- as well as with multiple select's -->
  <select multiple d-value="select">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <!-- contentEditable elements are also supported -->
  <div contentEditable d-value="divContent"/>
</div>
```

All types of inputs can take default value (from the scope).
If the scope value is `null` or `undefined`, no default value
is used. In case of `input[type="radio"]` and
`input[type="checkbox"]` setting `checked` attribute will do
the job (for setting default values). For `select` this can be
achieved by setting `selected` attribute for `option`'s.

You can write your own mixin for setting the default value
(don't forget to put it before `d-value`!).

#### d-rest

`d-rest` is a very powerful mixin because it lets you pass multiple
attributes or mixins (as an object) to an element at once.

> It works for blocks as well (the only block mixin) which lets
you pass multiple arguments to a block.

It is also a unique mixin because it doesn't except arguments (you
can't write `<div d-rest(rest)="{restArgs}"/>`). But it supports
comments, so you can apply multiple `d-rest`'s (the same for
blocks) to one element (or block).

`d-rest` is also an important mixin because it can override some
previous attributes or mixins (that's why the comments were invented).
In case of blocks the behaviour is the same (`d-rest` arg may
override some other args before it).

> Note: the order matters a lot as it will be explained by the next
example.

Example:

```html
<!-- App/index.html -->
<div class="app">
  <input
    placeholder="Enter a text"
    type="text"
    d-rest="{{ type: 'email' }}"
  />
</div>
<div class="app">
  <input
    placeholder="Enter a text"
    d-rest="{{ type: 'email' }}"
    type="text"
  />
</div>
```

In this example result HTML is:

```html
<div class="app">
  <input
    placeholder="Enter a text"
    type="email"
  />
</div>
<div class="app">
  <input
    placeholder="Enter a text"
    type="text"
  />
</div>
```

In some cases it is an advantage because it lets you set default
mixin or attribute values. But be careful: you may not want such
behaviour, so if you pass some mixins and you don't want someone
to override them set a unique comment. And vice versa: if you don't
want `d-rest` to override your mixins set them a unique comment.

Example 2:

```html
<!-- Input/index.html -->
<!-- lodash _.omit function is used here for -->
<!-- omitting unneeded args -->
<input
  class="my-input"
  d-class#myInputOuterClass="{args.class}"
  d-style#myInputOuterStyle="{args.style}"
  d-rest="{_.omit(args, 'class', 'style')}"
/>
```

In this example we create an input wrapper (that could be more
complicated). Now you can use this to insert custom inputs as
usual ones, but they will have your custom class.

> Note: for passing `d-value`, `d-node` or `d-elem` in this case
you need to specify the scope.

Usage:

```html
<!-- App/index.html -->
<Input
  type="text"
  class="text-input"
  placeholder="Enter a text"
  d-value(text)="{this}"
  d-node(textInput)="{this}"
/>
<Input
  type="email"
  class="email-input"
  placeholder="Enter an email address"
  d-value(email)="{this}"
  d-elem(emailInput)="{this}"
/>
```

Result HTML is:

```html
<input
  type="text"
  class="my-input text-input"
  placeholder="Enter a text"
/>
<input
  type="email"
  class="my-input email-input"
  placeholder="Enter an email address"
/>
```
