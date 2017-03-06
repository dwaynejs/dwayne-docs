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
you can't declare class and instance methods.

In order to use a block put it as a regular HTML element
in some other block's template. This element will be replaced
with the block template. Block template may consist of any number
of actual elements. For example, built-in `d-if` block consists
of 0 real HTML elements, if its `if` arg is falsey, and consists
of the block children if the arg is truthy (if there's no
following `d-else-if` or `d-else` blocks). Example:

```html
<div id="div1">
  <d-if if="{true}">
    <span>Hel</span>
    <span>lo!</span>
  </d-if>
</div>
<div id="div2">
  <d-if if="{false}">
    <span>Hel</span>
    <span>lo!</span>
  </d-if>
</div>
```

Result HTML:

```html
<div id="div1">
  <span>Hel</span>
  <span>lo!</span>
</div>
<div id="div2">
</div>
```

### Arguments (args)

Any block can have args with any name (that is valid as a HTML
attribute according to HTML specs). There is only one special
arg: `d-rest`. It looks very much like `d-rest` mixin and
behaves the same way, only for blocks. It will be covered by
the `d-rest` mixin section.

You can access args in your controller through `this.args`. Also
you can explicitly change the argument in the controller, which
will cause watchers to be called and the template to be
re-rendered, but it's not recommended if it's not a wrapper
(we'll cover block wrappers in a couple of sections).

In HTML you can access args by simply using `args` (because
it's usual block instance property).

If in your HTML you omitted argument value its value is
Javascript `true` value (not a string).

### Built-in blocks

Built-in blocks exist for helping you not invent the wheel.
The built-in blocks are `d-if`, `d-switch`, `d-block` and `d-each`.
There is also one built-in block (`d-elements`) that you should
definitely not use. It's a low-level blocks and it is used by
all the built-in blocks. All of built-in blocks watch their args
if the opposite is not stated.

#### d-if

`d-if` block in your HTML should look like this:

```html
<d-if if="{someCondition}">
  <!-- put elements here -->
</d-if>
<!-- there may be 0 or more d-else-if blocks -->
<d-else-if if="{someOtherCondition}">
  <!-- put other elements here -->
</d-else-if>
<!-- there may be 0 or 1 d-else blocks -->
<d-else>
  <!-- put some other elements here -->
</d-else>
```

`d-else-if` are not necessary and there may be more than 1
of these. `d-else` is also not necessary. The block is rendered
as you except it to be rendered. Note that `d-if` block is
fully re-rendered when some condition (in `d-if` or `d-else-if`)
is changed (so the content should change). If you are not okay
with this behaviour consider using `d-show` or `d-hide` mixins.

Example:

```html
<!-- App/index.html -->
<div class="app">
  <div id="first">
    <d-if if="{1 === 1}">
      TRUE
    </d-if>
  </div>
  <div id="second">
    <d-if if="{1 === 2}">
      FALSE
    </d-if>
  </div>
  <div id="third">
    <d-if if="{1 === 2}">
      FALSE
    </d-if>
    <d-else>
      TRUE
    </d-else>
  </div>
  <div id="fourth">
    <d-if if="{1 === 2}">
      FALSE
    </d-if>
    <d-else-if if="{1 === 3}">
      FALSE
    </d-else-if>
  </div>
</div>
```

Result HTML:

```html
<div class="app">
  <div id="first">TRUE</div>
  <div id="second"></div>
  <div id="third">TRUE</div>
  <div id="fourth"></div>
</div>
```

#### d-switch

`d-switch` block in your HTML should look like this:

```html
<d-switch value="{someValue}">
  <!-- there may be 0 or more of these -->
  <d-case if="{valueToCompare}">
    <!-- put some elements here -->
  </d-case>
  <!-- there may be 0 or 1 of this -->
  <d-default>
    <!-- put default elements here -->
  </d-default>
</d-switch>
```

`d-switch` is very similar to `d-if` (it re-renders all of
its content when some important condition is changed) except
that it compares `d-switch` value to `d-case`'s values and
renders respectfully to this comparison (if all comparisons
are false `d-default` (if present) is rendered). Values are
compared with the `===` operator and `NaN` equals itself.

Example:

```html
<!-- App/index.html -->
<div class="app">
  <div id="first">
    <d-switch value="{1}">
      <d-case if="{1}">
        Equals 1
      </d-case>
    </d-switch>
  </div>
  <div id="second">
    <d-switch value="{1}">
      <d-case if="{2}">
        Equals 2
      </d-case>
    </d-switch>
  </div>
  <div id="third">
    <d-switch value="{1}">
      <d-case if="{2}">
        Equals 2
      </d-case>
      <d-default>
        Unknown
      </d-default>
    </d-switch>
  </div>
  <div id="fourth">
    <d-switch value="{1}">
      <d-case if="{2}">
        Equals 2
      </d-case>
      <d-case if="{3}">
        Equals 3
      </d-case>
    </d-switch>
  </div>
</div>
```

Result HTML:

```html
<div class="app">
  <div id="first">Equals 1</div>
  <div id="second"></div>
  <div id="third">Unknown</div>
  <div id="fourth"></div>
</div>
```

#### d-block

`d-block` is a powerful block and may be used in many ways:

1. Inserting children of the block.

  ```html
  <!-- Bold/index.html -->
  <b>
     <d-block/>
  </b>
  ```
  
  ```html
  <!-- App/index.html -->
  <div id="app">
     <Bold>
       <span>Hello, world!</span>
     </Bold>
  </div>
  ```
  
  Result HTML:
  
  ```html
  <div id="app">
     <b>
       <span>Hello, world!</span>
     </b>
  </div>
  ```
  
  All of block's children will be put instead of `d-block`.
  
  Note that the scope is preserved. So you can use embedded JS
  in children of the `Bold`. It will be executed in scope of
  `App`.

2. Inserting multiple children blocks.

  ```html
  <!-- Section/index.html -->
  <div class="section">
     <div class="section-header">
       <d-block:header/>
     </div>
     <div class="section-content">
       <d-block:content/>
     </div>
  </div>
  ```
  
  ```html
  <!-- App/index.html -->
  <div id="app">
     <Section>
       <d-block:header>
         Javascript
       </d-block:header>
       <d-block:content>
         Language that is primarily used in browser for
         creating interactive apps.
       </d-block:content>
     </Section>
     <Section>
       <d-block:header>
         PHP
       </d-block:header>
       <d-block:content>
         Language that is primarily used for creating server side
         of a web application.
       </d-block:content>
     </Section>
  </div>
  ```
  
  Result HTML:
  
  ```html
  <div id="app">
     <div class="section">
       <div class="section-header">
         Javascript
       </div>
       <div class="section-content">
         Language that is primarily used in browser for
         creating interactive apps.
       </div>
     </div>
     <div class="section">
       <div class="section-header">
         PHP
       </div>
       <div class="section-content">
         Language that is primarily used for creating server side
         of a web application.
       </div>
     </div>
  </div>
  ```
  
  This type of `d-block` is called "named d-block".
  
3. Inserting blocks (or HTML elements) with dynamic names.

  ```html
  <!-- Wrapper/index.html -->
  <d-block name="{args.name}">
     <d-block/>
  </d-block>
  ```
  
  ```html
  <!-- MyBlock/index.html -->
  <div class="my-block">
     <h1>MyBlock</h1>
     <d-block/>
  </div>
  ```
  
  ```html
  <!-- App/index.html -->
  <div id="app">
     <Wrapper name="div">
       Hello, world!
     </Wrapper>
     <Wrapper name="b">
       This is important!
     </Wrapper>
     <Wrapper name="MyBlock">
       MyBlock content
     </Wrapper>
  </div>
  ```
  
  Result HTML:
  
  ```html
  <div id="app">
     <div>
       Hello, world!
     </div>
     <b>
       This is important!
     </b>
     <div class="my-block">
       <h1>MyBlock</h1>
       MyBlock content
     </div>
  </div>
  ```
  
  It's very important to know that if in this case `d-block`
  receives some args besides `name`, they are passed to the
  HTML element (if the result is an HTML element) as mixins
  and attributes or args (if the result is a block). It is a
  very powerful behaviour if you use `d-rest` argument as well.
  
4. Creating dynamic templates without creating a block.

  ```html
  <!-- NumberInput/index.html -->
  <d-block:input>
     <input
       type="text"
       class="my-input"
       placeholder="{args.placeholder}"
       pattern="\d+"
       d-value="number"
     />
  </d-block:input>
  
  <d-if if="{args.wrap}">
     <div class="input-wrapper">
       <d-block:input/>
     </div>
  </d-if>
  <d-else>
     <d-block:input/>
  </d-else>
  ```
  
  ```html
  <!-- App/index.html -->
  <div id="app">
     <NumberInput placeholder="Type a number"/>
     <NumberInput placeholder="Type another number" wrap/>
  </div>
  ```
  
  Result HTML:
  
  ```html
  <div id="app">
     <input
       type="text"
       class="my-input"
       placeholder="Type a number"
       pattern="\d+"
       d-value="number"
     >
     <div class="input-wrapper">
       <input
         type="text"
         class="my-input"
         placeholder="Type another number"
         pattern="\d+"
         d-value="number"
       >
     </div>
  </div>
  ```
  
  In this case (when `d-block` has children and is not a child
  of another block) it is not rendered (in that place of the
  template).
  
  Note that the template (`d-block` children) can access
  all normal variables and can be changed if they are changed.
  
  Also if a block, which uses `NumberInput` block, passes
  a `d-block:input` child (like in case `2`) it will
  be used instead of `d-block:input` "template block". It may
  be a very convenient behaviour for default content though
  it's probably a rare usage case.
  
##### Summary (d-block)
  
1. If `d-block` has a name arg, it renders block (if a block
with this name is registered) with this name or an HTML element
(if the name is not registered as a block).

2. If `d-block` (named or not) is used as a normal block (not as
a child of some other block) **without children**, proper block
children will be rendered. If `d-block` is not named all of
the block children will be rendered.
 
3. If named `d-block` is used as a child of another block it will
be rendered **if** this block renders this named block in its
template, otherwise it won't be rendered, blocks inside these
children won't be created and embedded JS won't be executed.

4. Finally if `d-block` (it is recommended to name these kinds
of `d-block`) is inserted in HTML as a usual block **with**
children (as a template) it will be rendered if the block
(in which this `d-block` is located in) inserts a named block
(with this name) **without children**.

#### d-each

`d-each` block helps you iterate over arrays and objects
creating multiple blocks or HTML-elements in a way of some kind
of "HTML loop". Its value is a set of blocks or HTML elements
that are presented by `d-each` children. It's a very unique block
because some rules are not applied to this block.

> Each item may be presented by any number of blocks or HTML
elements.

##### `set` argument

The only required arg is `set` (though it's also not quite
required because the `d-each` will iterate over `undefined`).
It excepts `Array`, `Object` and `Number` types of arguments.

> In case of arrays `d-each` only iterates over number
properties (between `0` and the `array.length - 1`), in case of
objects it iterates over own keys and in case of numbers
it just creates an array of numbers between 0 and `number - 1`,
and the rest is the same as for arrays.

##### `item` argument

This argument excepts a string (default value is `'$item'`).
The value you pass (or default `'$item'`) here will be used
as an iteration item. This argument is not watched.

##### `index` argument

This argument excepts a string (default value is `'$index'`).
The value you pass (or default `'$index'`) here will be used
as an iteration index (array index or object key). This argument
is not watched.

##### `sortBy` argument

This argument excepts a function. The value you pass here will
be used for sorting the array (doesn't work for objects) before
rendering. The function is exactly the same as in `Array#sort`.

##### `filterBy` argument

This argument excepts a function or an array of functions.
The value you pass here will be used for filtering the array
(doesn't work for objects) before rendering.

##### `uid` argument

This argument is not a usual argument because it is executed
in the scope of the `d-each` item itself. So you can use
`item` and `index` variables here. It defines a unique number,
string, object or whatever JS value that is unique among the
`d-each` set. It is used for **not re-rendering** `d-each`
items when the set is changed (but most of the elements are
not). This argument is not watched so try to use nothing
but `item` and `index` variables or pure functions here.

Another exception of `d-each` is that it creates its own scope
for each item (with additional item and index variables with
names that you provided or default ones) that inherits from the
parent scope (the block scope or parent `d-each` if it exists).
This scope is also preserved when you insert blocks and HTML
elements using `d-block`.

Examples:

##### Basic example

```html
<!-- App/index.html -->
<div class="app">
  <d-each set="{['a', 'b', 'c']}" item="item">
    {item}
  </d-each>
</div>
```

Result HTML:

```html
<div class="app">
  abc
</div>
```

##### Multiple children example

```html
<!-- App/index.html -->
<div class="app">
  <d-each set="{['a', 'b', 'c']}" item="item">
    <span>
      {`${ $index }: `}
    </span>
    <span>
      {item}
    </span>
  </d-each>
</div>
```

Result HTML:

```html
<div class="app">
  <span>0: </span>
  <span>a</span>
  <span>1: </span>
  <span>b</span>
  <span>2: </span>
  <span>c</span>
</div>
```

##### 0 children in some cases

```html
<!-- App/index.html -->
<div class="app">
  <d-each set="{['a', 'b', 'c']}" item="item">
    <d-if if="{item !== 'b'}">
      {item}
    </d-if>
  </d-each>
</div>
```

Result HTML:

```html
<div class="app">
  ac
</div>
```

##### Nested `d-each`

```html
<!-- App/index.html -->
<div class="app">
  <d-each set="{[['a', 'b'], ['c', 'd']]}" item="row" index="y">
    <d-each set="{row}" item="item" index="x">
      <span>
        {`row: ${ y }; col: ${ x }; item: ${ item }`}
      </span>
    </d-each>
  </d-each>
</div>
```

Result HTML:

```html
<div class="app">
  <span>row: 0; col: 0; item: a</span>
  <span>row: 0; col: 1; item: b</span>
  <span>row: 1; col: 0; item: c</span>
  <span>row: 1; col: 1; item: d</span>
</div>
```

##### Table example

```html
<!-- App/index.html -->
<div class="app">
  <table>
    <thead>
      <tr>
        <d-each set="{['First col', 'Second col']}" item="heading">
          <th>{heading}</th>
        </d-each>
      </tr>
    </thead>
    <tbody>
      <d-each set="{[['a', 'b'], ['c', 'd']]}" item="row" index="y">
        <tr id="{`row-${ y }`}">
          <d-each set="{row}" item="cell" index="x">
            <td>
              {`row: ${ y }; col: ${ x }; item: ${ item }`}
            </td>
          </d-each>
        </tr>
      </d-each>
    </tbody>
  </table>
</div>
```

Result HTML:

```html
<div class="app">
  <table>
    <thead>
      <tr>
        <th>First col</th>
        <th>Second col</th>
      </tr>
    </thead>
    <tbody>
      <tr id="row-0">
        <td>row: 0; col: 0; item: a</td>
        <td>row: 0; col: 1; item: b</td>
      </tr>
      <tr id="row-1">
        <td>row: 1; col: 0; item: c</td>
        <td>row: 1; col: 1; item: d</td>
      </tr>
    </tbody>
  </table>
</div>
```

##### UID example

```html
<!-- App/index.html -->
<div class="app">
  <div class="users">
    <d-each set="{users}" item="user" uid="{user.id}">
      <div class="user">
        <img src="{user.avatarURL}"/>
        <span>{`${ user.firstName } ${ user.secondName }`}</span>
      </div>
    </d-each>
  </div>
</div>
```

Now when a user is added to the list, or a user is deleted from
the list, or a user is changed (in all cases `users` variable
should be reassigned to a new one) `uid` argument helps `d-each`
resolve, which element should be removed, which should be changed
and etc. It's strongly recommended setting `uid` always at least
to the set index, but `d-each` works without it as well.
