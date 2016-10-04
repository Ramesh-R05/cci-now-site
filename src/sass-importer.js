var fs = require('fs');
var path = require('path');

function fileExists(filePath) {
    try  {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

module.exports = function(url, prev, done) {
    if (url.indexOf('../../node_modules')>=0 || prev.indexOf('node_modules')>=0) return done(null);

    var paths = this.options.file.split(path.sep);
    var baseName = path.basename(url);
    
    url = url.replace(baseName, `_${baseName}`);
    paths.pop();
    paths.push(url);
    
    var originalPath = paths.join(path.sep) + '.scss';
    var replacementPath = originalPath.replace(`src${path.sep}app${path.sep}styles${path.sep}`, `src${path.sep}app-${process.env.APP_KEY}${path.sep}styles${path.sep}`);

    if (fileExists(replacementPath)) {
        // enable for debugging only as the log text will appear in the stylesheet code
        console.log(`/* -> replacement found for ${originalPath}, using ${replacementPath} */`);
        done({ file: replacementPath });

    }
    else done(null);
};
