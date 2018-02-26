## Development notes

Develop a component

```sh
$ npm run dev --module=NameOfModule
```

Test component

```sh
$ npm run test --module=NameOfModule
```

Test all

```sh
$ npm run test:all
```

Test lib

```
$ npm run test:lib
```

Test single run component

```sh
$ npm run test:single-run --module=NameOfModule
```

Build component complete (js + css)

```sh
$ npm run lib --module=NameOfModule
```

Build component js

```sh
$ npm run lib:js --module=NameOfModule
```

Individual component style

```sh
$ npm run lib:style --module=NameOfModule
```

Build component themes

```sh
$ npm run lib:themes --module=NameOfModule
```

Individal component style themes

## Note

TO run `lib:all` task you need `node 5`

## Proposed commit guideline

[scope=?scopeName][type] subject
<BLANK LINE>

<body>
<BLANK LINE>
<footer>

[cmp=ComboBox][fix] fix overflow bug, fixes #123

### type

* feat
* fix
* docs
* perf
* test
* chore
* style

### scope

* docs
* cmp
* demo
* build

### scope name

* component name. e.g ComboBox

## body

more information about the change

## footer

include _Breaking Changes_, starts with `BREAKING CHANGE:`

## Style

### ClassName definition

zippy-react-toolkit-[componentName]

### SASS variable Naming

`ZIPPY*COMPONENT_NAME*[VARIABLE_NAME]`

Lib folder structure:

* base.css
* index.css
* theme/<THEME-Name>.css

### Theme builder

* themeBuilder
  Takes a config object with the names of all the themes and generates a file
  with the folowing variables:
* ZIPPY\_<COMPONENT_NAME>\_THEME_NAME
* ZIPPY\_<COMPONENT_NAME>\_MAIN_COLOR
* ZIPPY\_<COMPONENT_NAME>\_SECONDARY_COLOR

Imports default theme, and then generates the it's css.

#### [MIT](./LICENSE)
