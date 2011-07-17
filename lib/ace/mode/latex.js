define(function(require, exports, module) {

var oop = require("pilot/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var LatexHighlightRules = require("ace/mode/latex_highlight_rules").LatexHighlightRules;
var Range = require("ace/range").Range;

var Mode = function()
{
    this.$tokenizer = new Tokenizer(new LatexHighlightRules().getRules());
};
oop.inherits(Mode, TextMode);

(function()
{
    // Code adapted from ruby.js
    this.toggleCommentLines = function(state, doc, startRow, endRow) {
        var outdent = true;
        var outentedRows = [];
        var re = /^(\s*)\%/;

        for (var i=startRow; i<= endRow; i++) {
            if (!re.test(doc.getLine(i))) {
                outdent = false;
                break;
            }
        }

        if (outdent) {
            var deleteRange = new Range(0, 0, 0, 0);
            for (var i=startRow; i<= endRow; i++)
            {
                var line = doc.getLine(i);
                var m = line.match(re);
                deleteRange.start.row = i;
                deleteRange.end.row = i;
                deleteRange.end.column = m[0].length;
                doc.replace(deleteRange, m[1]);
            }
        }
        else {
            doc.indentRows(startRow, endRow, "%");
        }
    };
    
    // Maintain the indent of the previous line
    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;

});
