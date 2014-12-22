module.exports = function (grunt) {
	var fs     = require('fs'),
		path   = require('path'),
		crypto = require('crypto'),
		glob = require('glob'),
		gruntTextReplace = require('grunt-text-replace/lib/grunt-text-replace');

	grunt.registerMultiTask('cache-busting', 'Cache bust file and update references', function() {
		var fileContents = grunt.file.read(this.data.file),
			hash = crypto.createHash('md5').update(fileContents).digest("hex"),
			outputDir = path.dirname(this.data.file),
			fileExtension = path.extname(this.data.file),
			replacementExtension = path.extname(this.data.replacement),
			replacementWithoutExtension = this.data.replacement.slice(0, this.data.replacement.length - replacementExtension.length),
			outputFile = outputDir + path.sep + replacementWithoutExtension + "-" + hash + fileExtension;

		if (this.data.get_param){

			gruntTextReplace.replace({
				src: this.data.replace,
				overwrite: true,
				replacements: [{
					from: new RegExp(this.data.replacement + "(\\?v=)?([a-z0-9]+)*"),
					to: this.data.replacement + "?v=" + hash
				}]
			});

		} else {
			if (this.data.cleanup) {
				var files = glob.sync(outputDir + path.sep + replacementWithoutExtension + "-*" + fileExtension);
				files.forEach(function(file){
					fs.unlink(file);
				})
			}
			fs.rename(this.data.file, outputFile);

			gruntTextReplace.replace({
				src: this.data.replace,
				overwrite: true,
				replacements: [{
					from: new RegExp(replacementWithoutExtension + "((\-?)(.+)*)" + replacementExtension),
					to: replacementWithoutExtension + "-" + hash + replacementExtension
				}]
			});

		}
	});
};
