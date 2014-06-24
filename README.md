#np-cli
> No-problem CLI library written in ES6.

##Introduction
This is yet another CLI utility library for [Node] but with the added twist of being written in [ECMAScript 6] syntax to the extent supported by [traceur] and my knownledge of current proposals.

##Installing
If you just want to **use** the library you do not have to install the traceur compiler. The published module is pre-compiled to ECMAScript 5 compatible code.

Simply install using [npm] in the root of your project folder, like any other module:
```sh
$ npm i np-cli --save
```

##Tinkering
If you want to poke around in the code and see what happens, you currently need to manually recompile in order to test your changes. A rudimentary build-script is included in source repository.

##Documentation
The most up-to-date documentation can be found on the [project website](http://zen-np.github.io/np-cli).

##License
[The Unlicense] because I'm just doing this to improve my ES6 kung-fu.

[Node]: http://nodejs.org/
[ECMAScript 6]: http://wiki.ecmascript.org/doku.php?id=harmony:harmony
[traceur]: https://github.com/google/traceur-compiler/
[npm]: https://npmjs.org/
[The Unlicense]: http://unlicense.org/
