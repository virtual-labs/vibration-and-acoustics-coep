/**
 * Author : Prashant Lokhande
 * draw the diagram using raphael
 * create animation as per given specification. 
**/

var paper;
var spring1HookUp;
var spring2HookUp;
var spring1;
var spring2;
var middleSpring;
var spring1HookDown;
var spring2HookDown;
var baseLine;
var baseLines = [];
var u;
var v;
var u1;
var time = 250;
var move = 20;
var moveTime = 0;
var sec = 250;
var wtImage1;
var wtImage2;
var txt1;
var txt2;
var txt3;
var txt4;
var txt5;
var txt6;

function diagram() {
	paper = new Raphael(document.getElementById('diagram'), 500, 450);
	wtImage2 = paper.image("css/images/output.gif", 100, 25, 285, 105).attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	wtImage1 = paper.image("css/images/image.png", 100, 25, 285, 105).attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	spring1HookUp = paper.path("M 120 130 l 0 25").attr({
		"stroke-width" : 2
	});
	spring1 = paper.path("M 120 154 l -40 18 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 40 18 l 0 30").attr({
		"stroke-width" : 2
	});
	spring1HookDown = paper.path("M 120 369 l 0 50").attr({
		"stroke-width" : 2
	});
	middleSpring = paper.path("M 240 130 l 0 24 l -20 6 l 35 6 l -35 6 l 35 6 l -35 6 l 35 6 l -35 6 l 35 6 l -35 6 l 35 6 l -35 6 l 20 6 l 0 15 l 20 0 l 0 40 l -40 0 l 0 -40 20 0 ").attr({
		"stroke-width" : 2
	});
	spring2HookUp = paper.path("M 365 130 l 0 25").attr({
		"stroke-width" : 2
	});
	spring2 = paper.path("M 365 154 l -40 18 l 65 15l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 65 15 l -65 15 l 40 18 l 0 30").attr({
		"stroke-width" : 2
	});
	spring2HookDown = paper.path("M 365 369 l 0 50").attr({
		"stroke-width" : 2
	});
	baseLine = paper.path("M 45 420 l 375 0").attr({
		"stroke-width" : 2
	});
	txt1 = paper.text(40, 280, "k1/2").attr({
		"font-size" : 18
	});
	txt2 = paper.text(425, 280, "k1/2").attr({
		"font-size" : 18
	});
	txt3 = paper.text(190, 200, "k2").attr({
		"font-size" : 18
	});
	txt4 = paper.text(240, 305, "M2").attr({
		"font-size" : 18
	});
	txt5 = paper.text(240, 260, "M2").attr({
		"font-size" : 18
	});
	txt6 = paper.text(240, 287, "M2").attr({
		"font-size" : 18
	});

	txt4.hide();
	txt6.hide();

	for(var i = 60; i < 420; i = i + 15) {
		baseLines[i] = paper.path("M " + i + " 420 l -10 10").attr({
			"stroke-width" : 2
		});
	}
}

function springAnimationDown() {
	u = 15;
	v = 6;
	moveTime++;
	wtImage1.toBack();
	txt5.hide();
	var diff = 18;

	var sp1 = spring1.animate({
		path : "M 120 " + (154 + diff) + " l -40 " + (u - 6) + " l 65 " + (u - 6) + " l -65 " + (u - 5) + " l 65 " + (u - 5) + " l -65 " + (u - 4) + " l 65 " + (u - 3) + " l -65 " + (u - 2) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 40 " + (u + 3) + " l 0 30"
	}, time);
	var sp2 = spring2.animate({
		path : "M 365 " + (154 + diff) + "  l -40 " + (u - 6) + " l 65 " + (u - 6) + " l -65 " + (u - 5) + " l 65 " + (u - 5) + " l -65 " + (u - 4) + " l 65 " + (u - 3) + " l -65 " + (u - 2) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 65 " + (u - 1.5) + " l -65 " + (u - 1.5) + " l 40 " + (u + 3) + " l 0 30"
	}, time);
	var sp = middleSpring.animate({
		path : "M 240 " + (130 + diff) + " l 0 24  l -20 " + (v + 4.5) + " l 35 " + (v + 4) + " l -35 " + (v + 3.5) + " l 35 " + (v + 3) + " l -35 " + (v + 2.5) + " l 35 " + (v + 2) + " l -35 " + (v + 1.5) + " l 35 " + (v + 1) + " l -35 " + (v + 1) + " l 35 " + (v + 1) + " l -35 " + (v + 1) + " l 20 " + (v + 1) + " l 0 15 l 20 0 l 0 40 l -40 0 l 0 -40 20 0"
	}, (time));
	var image1 = wtImage1.animateWith(sp, sp1, {
		x : 100,
		y : (25 + diff)
	}, time);
	var image2 = wtImage2.animateWith(sp, sp1, {
		x : 100,
		y : (25 + diff)
	}, time);
	var shu1 = spring1HookUp.animateWith(sp, sp1, {
		path : "M 120 " + (130 + diff) + " l 0 25"
	}, time);
	var shu2 = spring2HookUp.animateWith(sp, sp1, {
		path : "M 365 " + (130 + diff) + " l 0 25"
	}, time);

	if(moveTime != move) {
		setTimeout("springAnimationUp()", sec);
	} else {
		calculateX1X2();
		wtImage2.toBack();
		wtImage1.toFront();
		setTimeout("txt4.show()", time);
	}
}

function springAnimationUp() {
	u1 = 15;
	v = 6;
	wtImage1.toBack();
	var diff = 0;

	var sp1 = spring1.animate({
		path : "M 120 " + (154 - diff) + " l -40 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 40 " + (u1 + 3) + " l 0 30"
	}, time);
	var sp2 = spring2.animate({
		path : "M 365 " + (154 - diff) + "  l -40 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 65 " + (u1) + " l -65 " + (u1) + " l 40 " + (u1 + 3) + " l 0 30"
	}, time);
	var sp = middleSpring.animate({
		path : "M 240 " + (130 + diff) + " l 0 24  l -20 " + (v - 4.5) + " l 35 " + (v - 4) + " l -35 " + (v - 3.5) + " l 35 " + (v - 3) + " l -35 " + (v + 2.5) + " l 35 " + (v - 2) + " l -35 " + (v - 1.5) + " l 35 " + (v - 1) + " l -35 " + (v - 1) + " l 35 " + (v - 1) + " l -35 " + (v - 1) + " l 20 " + (v - 1) + " l 0 15 l 20 0 l 0 40 l -40 0 l 0 -40 20 0"
	}, (time));
	var image1 = wtImage1.animateWith(sp, sp1, {
		x : 100,
		y : (25 - diff)
	}, time);
	var image2 = wtImage2.animateWith(sp, sp1, {
		x : 100,
		y : (25 - diff)
	}, time);
	var shu1 = spring1HookUp.animateWith(sp, sp1, {
		path : "M 120 " + (130 - diff) + " l 0 25"
	}, time);
	var shu2 = spring2HookUp.animateWith(sp, sp1, {
		path : "M 365 " + (130 - diff) + " l 0 25"
	}, time);

	setTimeout("springAnimationDown()", sec);
}

function animationDown() {
	v = 6;
	moveTime++;
	wtImage1.toBack();
	txt5.hide();
	var diff = 18;

	var sp = middleSpring.animate({
		path : "M 240 130 l 0 24  l -20 " + (v + 4.5) + " l 35 " + (v + 4) + " l -35 " + (v + 3.5) + " l 35 " + (v + 3) + " l -35 " + (v + 2.5) + " l 35 " + (v + 2) + " l -35 " + (v + 1.5) + " l 35 " + (v + 1) + " l -35 " + (v + 1) + " l 35 " + (v + 1) + " l -35 " + (v + 1) + " l 20 " + (v + 1) + " l 0 15 l 20 0 l 0 40 l -40 0 l 0 -40 20 0"
	}, (time));

	if(moveTime != move) {
		setTimeout("animationUp()", sec);
	} else {
		calculateX1X2();
		wtImage2.toBack();
		wtImage1.toFront();
		setTimeout("txt6.show()", time);
	}
}

function animationUp() {
	v = 6;
	wtImage1.toBack();
	var diff = 0;

	var sp = middleSpring.animate({
		path : "M 240 130 l 0 24  l -20 " + (v) + " l 35 " + (v) + " l -35 " + (v) + " l 35 " + (v) + " l -35 " + (v) + " l 35 " + (v) + " l -35 " + (v) + " l 35 " + (v) + " l -35 " + (v) + " l 35 " + (v) + " l -35 " + (v) + " l 20 " + (v) + " l 0 15 l 20 0 l 0 40 l -40 0 l 0 -40 20 0"
	}, (time));

	setTimeout("animationDown()", sec);
}