import javascriptStringify from 'javascript-stringify';

// Like JSON.stringify but returns a exported js object
export default (data: any): string =>
  `module.exports = ${javascriptStringify(data, undefined, 2)};`;
