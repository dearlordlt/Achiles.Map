/*
* Colorpicker initialisation
*/
var lineColor = "000000";

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

/*
* Map initialisation
*/
var lines = Array();
var firstClick = false;
var lastX = 0;
var lastY = 0;
var paper = new Raphael(0, 10, 800, 800);
var allMap = paper.rect(0, 0, 800, 800, 5);
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
dots.attr( { fill : "black" } ); // changes the fill of all dots

/*
* Functions
*/
function onDotClick() {
    console.log(this.data("id") + "POS:"+lastX+":"+lastY + " Line color:" + lineColor);
	if(firstClick) {
		var firstPosX = lastX;
		var firstPosY = lastY;
		var secondPosX = this.data("xpos");
		var secondPosY = this.data("ypos");
		var lineString = "M"+firstPosX+" "+firstPosY+"L"+secondPosX+" "+secondPosY;
		var line = paper.path(lineString).attr({stroke:'#'+lineColor});;
		lastX = this.data("xpos"); lastY = this.data("ypos");
		lines.push(line);
	} else {
		firstClick = !firstClick;
		lastX = this.data("xpos"); lastY = this.data("ypos");
	}
}

/*
* Events
*/
$("#newLineBtn").click(function(){
	firstClick = false;
});