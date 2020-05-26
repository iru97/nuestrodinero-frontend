var parseString = require('xml2js').parseString;
var fs = require('fs');

fs.readFile('./input.xml', { encoding: 'utf8' }, onRead);


function onRead(err, xmlText) {

  if (err) {
    handleError(err);
  }

  parseString(xmlText, parserHandler);
}

function handleError(err) {
  console.warn(err);
}

function parserHandler(err, data) {
  if (err) {
    handleError(err);
  }

  console.dir(JSON.stringify(data));
}