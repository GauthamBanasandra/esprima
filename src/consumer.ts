/**
 * Created by Gautham on 08-06-2017.
 */
import escodegen = require('../../escodegen/escodegen.js');
import estraverse = require('../../estraverse/estraverse.js');
import fs = require('fs');
import {parse, tokenize} from './esprima';

let filename = process.argv[2];
let code = fs.readFileSync(filename, 'utf-8');

let ast = parse(code, {sourceType: 'script'}, null);
estraverse.traverse(ast, {
    enter: function (node) {
        console.log('entered:' + node.type);
    },
    leave: function (node) {
        console.log('exit:' + node.type);
    },
    keys: {
        N1qlStatement: []
    }
});
console.log(ast.body[0]);
console.log(escodegen.generate(ast, {parse: parse}));
