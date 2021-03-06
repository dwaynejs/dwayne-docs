## Introduction

DwayneJS is a client Javascript framework heavily inspired by
[Angular](https://angularjs.org/) and especially
[React](https://facebook.github.io/react/).
Dwayne makes it very easy to write dynamic, flexible
apps with minimum amount of work. It is built using
[the MVVM pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
so both views and controllers are very easy to read.

The view is used for displaying application data that
comes from server or generated by the controller.
It consists of so-called "Block"s (built-in ones and
ones written by you) or usual HTML elements. It can
use variables from the controller.

The controller is used to bind data to the scope which can
then be used by the view.

For more productivity and readability it's recommended
to use ES6 classes syntax and, optionally, a couple of proposals.
All of the examples use ES6 syntax and the "class-properties"
proposal.
 
Enough of words, let's get into some code!
