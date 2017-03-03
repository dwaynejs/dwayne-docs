## Embedded Javascript

In your block templates you can use embedded JavaScript (that comes
from local variables, args or globals). There are a couple ways
of achieving that:

1. Using embedded JS as a pure text. For this you just need to
wrap your JS into "{" and "}" right inside your HTML.

2. Using embedded JS as a value of HTML attribute, mixin value
or block argument. For this you need to wrap **whole** attribute
value, mixin value or block argument in "{" and "}".

```html
<!-- case 1: -->

<!-- prints "Hello, world!" if who instance variable is "world" -->
<div>
  Hello, {who}!
</div>

<!-- case 2: -->

<!-- attribute value: type becomes equal to args.inputType value -->
<input type="{args.inputType}"/>

<!-- mixin value: prints bold "Bar" text -->
<div d-style="{{ fontWeight: 'bold' }}">
  Bar
</div>

<!-- block argument: prints globals.user.name if globals.user is truthy -->
<d-if if="{globals.user}">
  User: {globals.user.name}
</d-if>
```

### Variables binding

It's very important to note that if you use JS embedded expression
it's value is bound by default to the real expression value.
This means that if some variables (that affect the expression
result at the moment) change the expression gets recalculated
(template changes, blocks args change).

### Valid expressions

Here is a **full** list of supported JavaScript code that
you can use as embedded:

* Numbers (all valid js numbers, `NaN` and `Infinity`). `NaN` and
`Infinity` require `window.NaN` and `window.Infinity`
* Strings (including escaping, Unicode characters)
* Primitive values (`undefined`, requires `window.undefined`)
* Keywords (`true`, `false`, `null`, `this` (`this` is simply
transformed to $, which is equals to the block instance))
* Regular expressions (including flags and escaping)
* Variables (which then transformed to block variables, i.e.
`abc` is transformed to `$.abc` (`$` is a block instance))
* ES6 template strings (including proper escaping, infinite
expressions nesting and multi-line strings)
* Array literals
* Object literals
* ES6 object shorthand properties
* ES6 arrow functions (without curly braces surrounding their
body)
* Parentheses around expressions
* Binary operators (`+`, `-`, `*`, `/`, `%`, `&&`, `||`, `>`,
`<`, `>=`, `<=`, `==`, `===`, `!=`, `!==`, `=`, `+=`, `-=`,
`*=`, `/=`, `%=`, `&`, `|`, `^`, `<<`, `>>`, `>>>`, `&=`, `|=`,
`^=`, `<<=`, `>>=`, `>>>=`, `,`)
* Unary operators (`+`, `-`, `~`, `!`)
* Ternary operator (`?:`)
* Property accessors (`.`, `[]`)
* Function call

### Try it out
