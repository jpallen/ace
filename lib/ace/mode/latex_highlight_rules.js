define(function(require, exports, module) {

var oop = require("pilot/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var LatexHighlightRules = function()
{   
    this.$rules = {
        "start" : [
            {
                token : "keyword",
                regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
            },
            {
                token : "keyword",
                regex : "(?:(?:\\{)|(?:\\}))"
            },
            {
                token : "string", // Inline math $...$
                regex : "\\$(?:(?:\\\\.)|(?:[^\\$\\\\]))*?\\$"
            },
            {
                token : "comment",
                regex : "\\%.*$"
            }
        ]
    };
};

oop.inherits(LatexHighlightRules, TextHighlightRules);

exports.LatexHighlightRules = LatexHighlightRules;

});
