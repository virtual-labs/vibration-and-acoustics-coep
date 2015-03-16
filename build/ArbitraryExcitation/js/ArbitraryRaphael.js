var paper;
var weight;
var springHookUp;
var springHookUp;
var spring;
var damp;
var dampEllips;
var dampHookUp;
var dampHookDown;
var springHookDown;
var connector1;
var connector2;
var road;
var newStepRoad;
var newHumpRoad;
var tyreImage1;
var tyreImage2;
var springMove;
var springMove1;
var moveSet;
var roadLines;
var height;
var weightHt;
var springHookUpHt;
var spingHt;
var springHookDownHt;
var conHt1;
var conHt2;
var dampHookUpHt;
var dampHt;
var dampHookDownHt;
var dampEllipsHt;
var move;
var u;
var roadSet;
var stepRoad;
var humpRoad;
var bounceVal;
var stepLines;
var line;
var fixRoad;
var fixedRoadLines = [];
var stepRoadLines = [];
var stepRoadLines1 = [];
var stepRoadLines2 = [];
var newStepRoadLines = [];
var verticalStepLines = [];
var humpRoadLines = [];
var sec = 500;
var bounceTime = 300;
var time = 0;
var y = 100;
var dx = 0;
var flag = false;
stop = false;
shape = "";
stop = false;
flag1 = false;
flag2 = false;
flag3 = false;
flag4 = false;

function getHeight() {
	height = parseFloat($("#stepHeight").val());
	stepLines = ((height * 100) + 240);

	if(height >= 0.1 && height <= 0.24) {
		weightHt = 30;
		springHookUpHt = 20;
		spingHt = 60;
		springHookDownHt = 130;
		conHt1 = 160;
		conHt2 = 180;
		dampHookUpHt = 20;
		dampHt = 70;
		dampHookDownHt = 135;
		dampEllipsHt = 90;
		move = 8;
		bounceVal = 2;
	} else if(height >= 0.25 && height <= 0.35) {
		weightHt = 10;
		springHookUpHt = 40;
		spingHt = 80;
		springHookDownHt = 150;
		conHt1 = 180;
		conHt2 = 200;
		dampHookUpHt = 40;
		dampHt = 90;
		dampHookDownHt = 155;
		dampEllipsHt = 110;
		move = 8;
		bounceVal = 2.5;
	} else if(height >= 0.36 && height <= 0.44) {
		weightHt = 5;
		springHookUpHt = 45;
		spingHt = 85;
		springHookDownHt = 155;
		conHt1 = 185;
		conHt2 = 205;
		dampHookUpHt = 45;
		dampHt = 95;
		dampHookDownHt = 160;
		dampEllipsHt = 115;
		move = 8;
		bounceVal = 3;
	} else if(height >= 0.45 && height <= 0.54) {
		weightHt = 0;
		springHookUpHt = 50;
		spingHt = 90;
		springHookDownHt = 160;
		conHt1 = 190;
		conHt2 = 210;
		dampHookUpHt = 50;
		dampHt = 100;
		dampHookDownHt = 165;
		dampEllipsHt = 120;
		move = 8;
		bounceVal = 3.5;
	} else if(height >= 0.55 && height <= 0.64) {
		weightHt = -10;
		springHookUpHt = 60;
		spingHt = 100;
		springHookDownHt = 170;
		conHt1 = 200;
		conHt2 = 220;
		dampHookUpHt = 60;
		dampHt = 110;
		dampHookDownHt = 175;
		dampEllipsHt = 130;
		move = 8;
		bounceVal = 4;
	} else if(height >= 0.65 && height <= 0.69) {
		weightHt = -20;
		springHookUpHt = 70;
		spingHt = 110;
		springHookDownHt = 180;
		conHt1 = 210;
		conHt2 = 230;
		dampHookUpHt = 70;
		dampHt = 120;
		dampHookDownHt = 185;
		dampEllipsHt = 140;
		move = 8;
		bounceVal = 4.5;
	} else if(height >= 0.70 && height <= 0.75) {
		weightHt = -30;
		springHookUpHt = 80;
		spingHt = 120;
		springHookDownHt = 190;
		conHt1 = 220;
		conHt2 = 240;
		dampHookUpHt = 80;
		dampHt = 130;
		dampHookDownHt = 195;
		dampEllipsHt = 150;
		move = 12;
		bounceVal = 5;
	}
}

function diagram() {
	paper = new Raphael(document.getElementById('diagram'), 500, 450);
	weight = paper.path("M 50 50 l 130 0 l 0 50 l -130 0 z").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	tyreImage2 = paper.image("css/images/tyre01.jpg", 40, 190, 150, 150);
	tyreImage1 = paper.image("css/images/tyre01.jpg", 40, 190, 150, 150);
	springHookUp = paper.path("M 70 " + y + " l 0 40").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	spring = paper.path("M 70 " + (y + 40) + " l -15 8 l 30 8 l -30 8 l 30 8 l -30 8 l 30 8 l -30 8 l 30 8 -16 8").attr({
		"stroke-width" : 2
	});
	damp = paper.path("M 145 " + (y + 50) + " l 30 0 l 0 65 l -30 0 z").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	dampEllips = paper.ellipse(160, (y + 70), 15, 5).attr({
		'stroke-width' : 2,
		'fill' : '	#606060'
	});
	dampHookUp = paper.path("M 160 " + y + " l 0 70").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	dampHookDown = paper.path("M 160 " + (y + 115) + " l 0 25").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	springHookDown = paper.path("M 70 " + (y + 112) + " l 0 28").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	connector1 = paper.path("M 70 " + (y + 140) + " l 30 25").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	connector2 = paper.path("M 130 " + (y + 165) + " l 30 -25").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	fixRoad = paper.path("M 0 " + (y + 240) + " l 500 0 ").attr({
		"stroke-width" : 2
	});
	stepRoad = paper.path("M 0 " + (y + 240) + " l 285 0 l 0 30 l 220 0").attr({
		"stroke-width" : 2
	});
	humpRoad = paper.path("M 0 " + (y + 240) + " l 225 0 q 85 -65 180 0 l 95 0 ").attr({
		"stroke-width" : 2,
		fill : "#C0C0C0"
	});
	line = paper.path("M 225 340 l 180 0").attr({
		"stroke-width" : 2
	});
	line.hide();
	stepRoad.hide();
	humpRoad.hide();
	for(var i = 0; i < 510; i = i + 10) {
		fixedRoadLines[i] = paper.path("M" + i + " " + (y + 240) + " l -10 10").attr({
			"stroke-width" : 2
		});
	}
	//alert(spring.getTotalLength());
	$('#shape').change(function() {
		shape = $("#shape").val();
		switch(shape) {
			case "Step" :
				drawStep();
				break;
			case "Hump" :
				drawHump();
				break;
		}
	});
}

function drawStep() {
	fixRoad.hide();
	line.hide();
	humpRoad.hide();
	stepRoad.show();
	for(var i = 0; i < 510; i = i + 10) {
		fixedRoadLines[i].remove();
		if(flag == true) {
			humpRoadLines[i].remove();
		}
	}
	for(var i = 0; i < 285; i = i + 10) {
		stepRoadLines[i] = paper.path("M" + i + " " + (y + 240) + " l -10 10").attr({
			"stroke-width" : 2
		});
		stepRoadLines1[i] = paper.path("M" + (i + 286) + " " + (y + 270) + " l -10 10").attr({
			"stroke-width" : 2
		});
	}
	for(var i = 0; i < 20; i = i + 10) {
		stepRoadLines2[i] = paper.path("M" + (285) + " " + (y + (i + 248)) + " l -10 10").attr({
			"stroke-width" : 2
		});
	}
}

function drawHump() {
	flag = true;
	fixRoad.show();
	stepRoad.hide();
	line.show();
	humpRoad.show();
	for(var i = 0; i < 510; i = i + 10) {
		humpRoadLines[i] = paper.path("M" + i + " " + (y + 240) + " l -10 10").attr({
			"stroke-width" : 3
		});
	}
}

function stepAnimation() {
	stepRoad.hide();
	newStepRoad = paper.path("M 0 " + (y + 240) + " l 285 0 l 0 " + (height * 100) + " l 220 0").attr({
		"stroke-width" : 2
	});
	for(var i = 0; i <= 220; i = i + 10) {
		stepRoadLines1[i].remove();
	}
	for(var i = 0; i < 20; i = i + 10) {
		stepRoadLines2[i].remove();
	}
	for(var i = 0; i < 285; i = i + 10) {
		newStepRoadLines[i] = paper.path("M" + (i + 286) + " " + (y + stepLines) + " l -10 10").attr({
			"stroke-width" : 2
		});
	}
	for(var i = 0; i <= ((height * 100) - 10); i = i + 10) {
		verticalStepLines[i] = paper.path("M" + (285) + " " + (y + (i + 248)) + " l -10 10").attr({
			"stroke-width" : 2
		});
	}
	springMove = tyreImage1.animate({
		rotation : 360,
		translation : 250
	}, 1000);
	springMove1 = tyreImage2.animate({
		rotation : -360,
		translation : 250
	}, 1000);
	moveSet = paper.set();
	moveSet.push(weight, springHookUp, spring, springHookDown, dampHookUp, damp, dampHookDown, dampEllips, connector1, connector2);
	moveSet.animate({
		rotation : 0,
		translation : 250
	}, 1000);
	u = 8;
	setTimeout("bounce()", 1000);
}

function bounce() {
	time++;
	var Diff = 0;
	springMove.hide();

	if(flag3 == true) {
		Diff += 1;
		flag4 = true;
	} else if(flag1 == true) {
		Diff += bounceVal;
		flag2 = true;
	} else {
		Diff += 10;
	}

	var tyreBounce = springMove1.animate({
		rotation : 360,
		translation : '0 0',
		x : (290 + dx),
		y : (190 + (height * 100))
	}, bounceTime);
	var sp = spring.animate({
		path : "M " + (320 + dx) + " " + (y + spingHt + Diff) + " l -15 " + (u - 3.5) + " l 30 " + (u - 3) + " l -30 " + (u - 2) + " l 30 " + (u - 1) + " l -30 " + u + " l 30 " + u + " l -30 " + u + " l 30 " + u + " -16 " + u + ""
	}, bounceTime);
	var w = weight.animateWith(sp, {
		path : "M " + (300 + dx) + " " + (y - weightHt + Diff) + " l 130 0 l 0 50 l -130 0 z"
	}, bounceTime);
	var shu = springHookUp.animateWith(sp, {
		path : "M " + (320 + dx) + " " + (y + springHookUpHt + Diff) + " l 0 40"
	}, bounceTime);
	var c1 = connector1.animateWith(sp, {
		path : "M " + (320 + dx) + " " + (y + conHt1) + " l 30 20"
	}, bounceTime);
	var c2 = connector2.animateWith(sp, {
		path : "M " + (380 + dx) + " " + (y + conHt2) + " l 30 -20"
	}, bounceTime);
	var dhu = dampHookUp.animateWith(sp, {
		path : "M " + (410 + dx) + " " + (y + dampHookUpHt + Diff) + " l 0 70"
	}, bounceTime);
	var d = damp.animateWith(sp, {
		path : "M " + (395 + dx) + " " + (y + dampHt) + " l 30 0 l 0 65 l -30 0 z"
	}, bounceTime);
	var de = dampEllips.animateWith(sp, {
		cx : (410 + dx),
		cy : (y + dampEllipsHt + Diff)
	}, bounceTime);
	var dhd = dampHookDown.animateWith(sp, {
		path : "M " + (410 + dx) + " " + (y + dampHookDownHt) + " l 0 25"
	}, bounceTime);
	tyreBounce.animate({
		rotation : 0,
		translation : 0
	}, 3500);

	if(flag1 == true) {
		u += 0.5;
		var shd = springHookDown.animateWith(sp, {
			path : "M " + (320 + dx) + " " + ((y - 6) + springHookDownHt) + " l 0 36.5"
		}, bounceTime);
	} else {
		u += 2;
		var shd = springHookDown.animateWith(sp, {
			path : "M " + (320 + dx) + " " + (y + springHookDownHt) + " l 0 30"
		}, bounceTime);
	}

	if(dx >= 44) {
		dx = 44;
	} else {
		dx += 11;
	}

	if(time != move && stop != true) {
		setTimeout("bounceUp()", sec);
	}
}

function bounceUp() {
	var Diff = 0;

	if(flag4 == true) {
		Diff -= 1;
	} else if(flag2 == true) {
		Diff -= bounceVal;
		flag3 = true;
	} else {
		Diff -= 10;
		flag1 = true;
	}

	var tyreBounce = springMove1.animate({
		rotation : 360,
		translation : '0 0',
		x : (290 + dx),
		y : (190 + (height * 100))
	}, bounceTime);
	var sp = spring.animate({
		path : "M " + (320 + dx) + " " + (y + spingHt + Diff) + " l -15 " + (u - 3.5) + " l 30 " + (u - 3) + " l -30 " + (u - 2) + " l 30 " + (u - 1) + " l -30 " + u + " l 30 " + u + " l -30 " + u + " l 30 " + u + " -16 " + u + ""
	}, bounceTime);
	var w = weight.animateWith(sp, {
		path : "M " + (300 + dx) + " " + (y - weightHt + Diff) + " l 130 0 l 0 50 l -130 0 z"
	}, bounceTime);
	var shu = springHookUp.animateWith(sp, {
		path : "M " + (320 + dx) + " " + (y + springHookUpHt + Diff) + " l 0 40"
	}, bounceTime);
	var c1 = connector1.animateWith(sp, {
		path : "M " + (320 + dx) + " " + (y + conHt1) + " l 30 20"
	}, bounceTime);
	var c2 = connector2.animateWith(sp, {
		path : "M " + (380 + dx) + " " + (y + conHt2) + " l 30 -20"
	}, bounceTime);
	var dhu = dampHookUp.animateWith(sp, {
		path : "M " + (410 + dx) + " " + (y + dampHookUpHt + Diff) + " l 0 70"
	}, bounceTime);
	var d = damp.animateWith(sp, {
		path : "M " + (395 + dx) + " " + (y + dampHt) + " l 30 0 l 0 65 l -30 0 z"
	}, bounceTime);
	var de = dampEllips.animateWith(sp, {
		cx : (410 + dx),
		cy : (y + dampEllipsHt + Diff)
	}, bounceTime);
	var dhd = dampHookDown.animateWith(sp, {
		path : "M " + (410 + dx) + " " + (y + dampHookDownHt) + " l 0 25"
	}, bounceTime);
	tyreBounce.animate({
		rotation : 0,
		translation : 0
	}, 3500);

	if(flag2 == true) {
		u -= 0.5;
		var shd = springHookDown.animateWith(sp, {
			path : "M " + (320 + dx) + " " + ((y - 6) + springHookDownHt) + " l 0 36.5"
		}, bounceTime);
	} else {
		u -= 2;
		var shd = springHookDown.animateWith(sp, {
			path : "M " + (320 + dx) + " " + (y + springHookDownHt) + " l 0 30"
		}, bounceTime);
	}

	if(dx >= 44) {
		dx = 44;
	} else {
		dx += 11;
	}

	if(time != move && stop != true) {
		setTimeout("bounce()", sec);
	}
}

function humpAnimation() {
	tyreImage2.hide();
	springMove = tyreImage1.animate({
		rotation : 360,
		translation : 80
	}, 1500);
	moveSet = paper.set();
	moveSet.push(weight, springHookUp, spring, springHookDown, dampHookUp, damp, dampHookDown, dampEllips, connector1, connector2);
	moveSet.animate({
		rotation : 0,
		translation : 80
	}, 1500);
}