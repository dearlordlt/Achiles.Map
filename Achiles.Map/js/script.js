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
var styles = ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."];
var firstClick = false;
var lastX = 0;
var lastY = 0;
var paper = new Raphael(0, 10, 820, 820);
var allMap = paper.rect(0, 0, 820, 820, 5);
var which_line_to_remove = -1;
var lines = [];
var lastDotClicked;
var isDeleting = false;
var isLabel = false;
var bigestUndeletableItemId = 0;
allMap.attr(1, "#fff");

var rects = paper.set();
for (var i=0; i < 32; i++) {
    for(var j=0; j < 32; j++) {
		var center = 25/2;
        var rect = paper.rect(i*25+10, j*25+10, 25, 25);
        rects.push(rect);
    }
} rects.attr( { fill : "#FFFFFF", stroke : "#CECECE" } ); // changes the fill of all cells

var dots = paper.set();

for (var i=0; i < 33; i++) {
    for(var j=0; j < 33; j++) {
		var center = 25/2;
        var dot = paper.circle(i*25+10, j*25+10, 7);
        dot.data( { id : i+"x"+j, xpos : i*25+10, ypos : j*25+10 } );
        dot.click(onDotClick);
		bigestUndeletableItemId = dot.id;
        dots.push(dot);
    }
}
dots.attr( { fill : "#FFFFFF", stroke : "#CECECE", opacity : 0 } ); // makes all dots invisible

/*
* Functions
*/
function onDotClick() {
	if(isLabel && $("#label").val() != "") {
		var labelText = paper.text(this.data("xpos"), parseInt(this.data("ypos"))-10, $("#label").val());
		labelText.attr({ fill : '#'+lineColor });
		line.mousedown(function() {
			if(isDeleting) labelText.remove();
		})
		return;
	}
	if(isDeleting) return;
	if(lastDotClicked != null) lastDotClicked.attr({ fill : "#FFFFFF", stroke : "#CECECE", opacity : 0 });
	this.attr({ fill : "#8F8F8F", stroke : "#CECECE", opacity : 1 });
	lastDotClicked = this;
	if(firstClick) {
		var firstPosX = lastX; var firstPosY = lastY;
		var secondPosX = this.data("xpos"); var secondPosY = this.data("ypos");
		var lineString = "M"+firstPosX+" "+firstPosY+"L"+secondPosX+" "+secondPosY;
		var line = paper.path(lineString).attr( { stroke : '#'+lineColor, "stroke-width" : $("#lineWidth").val(), "stroke-dasharray" : styles[$("#lineStyle").val()] } );
		line.mousedown(function() {
			if(isDeleting) line.remove();
		})
		lastX = this.data("xpos"); lastY = this.data("ypos");
		lines.push(line.id);
	} else {
		firstClick = !firstClick;
		lastX = this.data("xpos"); lastY = this.data("ypos");
	}
}

/*
* Events
*/
$("#newLineBtn").click(function() {
	firstClick = false;
	isLabel = false; isDeleting = false;
	$("#deleteLine").css('color','white'); $("#placeLabel").css('color','white');
	if(lastDotClicked != null) lastDotClicked.attr({ fill : "#FFFFFF", stroke : "#CECECE", opacity : 0 });
});
$("#undoLineBtn").click(function() {
	isLabel = false; isDeleting = false;
	$("#deleteLine").css('color','white'); $("#placeLabel").css('color','white');
	var lineToRemove = paper.getById(lines[lines.length-1]);
	lineToRemove.remove();
	lines.pop();
	firstClick = false;
	if(lines.length > 0 && lastDotClicked != null) lastDotClicked.attr({ fill : "#FFFFFF", stroke : "#CECECE", opacity : 0 });
})
$("#deleteLine").click(function(){
	isDeleting = !isDeleting;
	isLabel = false;
	if(isDeleting) {
		$(this).css('color','red');
	} else {
		$(this).css('color','white');
	}
});
$("#placeLabel").click(function() {
	isLabel = !isLabel;
	isDeleting = false;
});