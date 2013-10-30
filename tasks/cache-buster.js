module.exports = function (grunt) {
	var fs     = require('fs'),
		path   = require('path'),
		crypto = require('crypto'),
		gruntTextReplace = require('grunt-text-replace/lib/grunt-text-replace');

	grunt.registerMultiTask('cache-buster', 'Cache bust file and update references', function() {
		var fileContents = grunt.file.read(this.data.file),
			hash = crypto.createHash('md5').update(fileContents).digest("hex"),
			outputDir = path.dirname(this.data.file),
			fileExtension = path.extname(this.data.file),
			outputFile = outputDir + path.sep + this.data.replacement + "-" + hash + fileExtension;

		fs.rename(this.data.file, outputFile);

		gruntTextReplace.replace({
			src: this.data.replace,
			overwrite: true,
			replacements: [{
				from: this.data.replacement,
				to: this.data.replacement + "-" + hash
			}]
		});
	});
};
