const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

function buildStyle(inputFile, outputFile) {
  sass.render(
    {
      outputFile,
      file: inputFile,
      importer: (url, file, done) => {
        if (url.startsWith('~')) {
          const parts = url.split(path.sep);
          const nodeModulePaths = path.resolve(process.cwd(), 'node_modules');
          const filePath = parts.reduce(
            (acc, part, index) => {
              if (index === 0) {
                part = part.slice(1);
              }
              return path.resolve(acc, part);
            },
            nodeModulePaths
          );
          done({
            file: filePath,
            // this is needed in order to inline the contents of css files, and not output @import(filename.css) in the resulting css
            contents: fs.readFileSync(filePath, 'utf8')
          });
        } else {
          done({ file: url });
        }
      }
    },
    (err, result) => {
      if (err) {
        console.error('FAILED');
        console.error(err.formatted);
        process.exitCode = 1;
      } else {
        fs.writeFile(outputFile, result.css, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Style complete ${inputFile}.`);
          }
        });
      }
    }
  );
}

module.exports = buildStyle;
