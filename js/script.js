var firstClick = false;

var paper = Raphael(10, 10, 800, 800);
var allMap = paper.rect(0, 0, 800, 800);
allMap.attr(1, "#fff");

var dots = paper.set();

for(var i=0; i < 32; i++) {
    for(var j=0; j < 32; j++) {
        var dot = paper.circle(i*25+10, j*25+10, 3);
        dot.data( { id : i+"x"+j, xpos:i*25+10, ypos:j*25+10 } );
        dot.click(onDotClick);
        dots.push(dot);
    }
}

dots.attr({fill: "black"}); // changes the fill of all dots

function onDotClick()
{
    console.log(this.data("id") + " " + firstClick);
    
    firstClick = !firstClick;
}