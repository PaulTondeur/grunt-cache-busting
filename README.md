grunt-cache-busting
===================
> Cache busting files and updating references

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cache-busting --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cache-busting');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started#the-gruntfile


## Usage

```javascript
'cache-busting': {
	requirejs: {
		replace: ['tmp/**/*.html'],
		replacement: 'MainApp',
		file: 'tmp/deploy/js/app/MainApp.min.js'
	},
	css: {
		replace: ['tmp/**/*.html'],
		replacement: 'style.css',
		file: 'tmp/deploy/css/style.css',
		cleanup: true //Remove previously generated hashed files.
	}
},
```

Say that the index.html looks like this:

```html
<html>
<head>
	<link rel="stylesheet" href="css/style.css" />

	<script data-main="js/app/MainApp" src="js/vendors/requirejs/require.js"></script>
</head>
<body>

</body>
</html>
```

After running ```grunt cache-busting```, this file will look like this, and the files have changed accordingly on disk:
```html
<html>
<head>
	<link rel="stylesheet" href="css/style-HASH-OF-FILE-CONTENTS.css" />

	<script data-main="js/app/MainApp-HASH-OF-FILE-CONTENTS" src="js/vendors/requirejs/require.js"></script>
</head>
<body>

</body>
</html>
```

Optionally, you can pass the `get_param` option to simply append a parameter to the path of the file. This is useful if you need to change the contents of a file, but not the filename.

```javascript
'cache-busting': {
	css: {
		replace: ['tmp/**/*.html'],
		replacement: 'style.css',
		file: 'tmp/deploy/css/style.css',
		get_param: true,
	}
},
```

Will change the html above to this:
```html
<html>
<head>
	<link rel="stylesheet" href="css/style.css?v=HASH-OF-FILE-CONTENTS" />

	<script data-main="js/app/MainApp-HASH-OF-FILE-CONTENTS" src="js/vendors/requirejs/require.js"></script>
</head>
<body>

</body>
</html>
```


## API reference
### replace
*replace* is an array of source files that is searched for the strings to be replaced.
It supports [minimatch paths](https://github.com/isaacs/minimatch).

### replacement
*replacement* is a string for which we search and replace by the hash. If it contains an extension, the extension will be preserved.

### file
*file* is the file which will be renamed to filename-HASH-OF-FILE-CONTENTS.ext. The hash is generated based on the file
contents of this parameter.

## Credits
This plugin is build on top of [grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace/) and was inspired by [grunt-cache-bust](https://github.com/hollandben/grunt-cache-bust)
