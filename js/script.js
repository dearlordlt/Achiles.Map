var lineColor = "";

$('#picker').colpick({
	flat : true,
	layout : 'hex',
	submit : 0,
	color : "000000",
	colorScheme : 'dark',
	onChange : function (hsb, hex, rgb, fromSetColor) {
		lineColor = hex;
	}
});

var firstClick = false;
var prevDot = "";

var paper = new Raphael(0, 10, 800, 800);
var allMap = paper.rect(0, 0, 800, 800);
allMap.attr(1, "#fff");

var dots = paper.set();

for (var i=0; i < 32; i++) {
    for(var j=0; j < 32; j++) {
        var dot = paper.circle(i*25+10, j*25+10, 3);
        dot.data( { id : i+"x"+j, xpos:i*25+10, ypos:j*25+10 } );
        dot.click(onDotClick);
        dots.push(dot);
    }
}

dots.attr( {fill : "black"} ); // changes the fill of all dots

function onDotClick() {
    console.log(this.data("id") + " " + firstClick);
	if(!firstClick) {
		//TODO: Draw line to	
	}
    firstClick = !firstClick;
}