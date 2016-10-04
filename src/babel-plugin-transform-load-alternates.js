var fs = require('fs');
var path = require('path');
var cwd = process.cwd();

function fileExists(filePath) {
    try  {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

module.exports = function(babel) {

    var t = babel.types;

    function transformImportCall(nodePath, state) {
        // ignore if running unit tests, otherwise this will mess up stubbed imports
        if (process.env.APP_UNIT_TEST) return;
        // the string that represents the imported module
        // eg. in this code: `import module from './module';` ... the value of moduleArg.value is "./module".
        var moduleArg = nodePath.node.source;
        // string imports only (no variables)
        if (moduleArg.type !== 'StringLiteral') return;
        // no external modules
        if (moduleArg.value[0]!=='.') return;
        // do not find alternates for automation files, automation contentApi does it does it itself
        if (state.file.opts.filename.indexOf('automation')>=0) return;
        // config merge functionality looks after config, so ignore all its imports
        if (state.file.opts.filename.indexOf(path.sep+'config')>=0) return;
        // create the path to the potential alternate file
        var alternateFile = path.join(
            path.parse(state.file.opts.filename).dir.replace(cwd+path.sep+'app', cwd+path.sep+'app-'+process.env.APP_KEY),
            moduleArg.value + '.js' // add .js so we can check if the file is there on disk
        );
        // the replacement path should have app-{APP_KEY} in it, if not (for whatever reason), don't proceed, only replace app files
        if (alternateFile.indexOf('app-'+process.env.APP_KEY)<0) return;
        // only continue if the alternate file exists on disk
        if (!fileExists(alternateFile)) return;
        // format the import string for the alternate file as relative path
        var relativePathToAlternateFile = path.relative(path.parse(state.file.opts.filename).dir, alternateFile);
        // make sure its a relative path (files in the app root won't get a ./ added automatically)
        if (relativePathToAlternateFile.indexOf('.')!==0) relativePathToAlternateFile = '.' + path.sep + relativePathToAlternateFile
        // apply the transform to the ast
        nodePath.node.source = t.stringLiteral(relativePathToAlternateFile);
    }

    return {
        visitor: {
            ImportDeclaration: {
                exit: function(nodePath, state) {
                    return transformImportCall(nodePath, state);
                }
            }
        }
    };
};
