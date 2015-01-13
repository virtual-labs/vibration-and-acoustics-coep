var m;
var k;
var Cc;
var c;
var f0;
var v;
var check = 0;
var omegaN;
var omegaD;
var zeta;
var brd;
var H;
var A;
var V0;
var g = 9.81;
var THITA;
var t;
var d = 0;
var ti = [];
var X = [];
var p1 = [];
var plot;
var selectShape;
function createGraph() {
	brd = JXG.JSXGraph.initBoard('graph', {
		originX : 50,
		originY : 310,
		unitX : 100, // sec
		unitY : 100, // y(t)
		showCopyright : false,
	});
	axisx = brd.create('axis', [[0, 0], [1, 0]]);
	axisy = brd.create('axis', [[0, 0], [0, 1]]);

	var text_Y = brd.create('text', [-0.4, 3.5, 'y(t)'], {
		style : 5
	});
	var text_X = brd.create('text', [3.8, -0.3, 'time(sec)'], {
		style : 5
	});
}

function showFormula(msg) {
	$("#Formula").html(msg);
	$("#Formula").dialog();
}

function calcCc() {
	m = parseFloat($("#m").val());
	k = parseFloat($('#k').val());
	Cc = 2 * Math.sqrt(k * m);
	$("#cc").val(Cc.toFixed(3));
}

function showDialog(msg) {
	$("#Formula1").html(msg)
	$("#Formula1").dialog();
}

function calculate() {
	var errorMsg = "";
	m = parseFloat($("#m").val());
	if((m != null || m != 0 ) && (m >= 50 && m <= 100)) {
		m = m;
		check += 1;
	} else {
		errorMsg += "Please Enter m between 50-100<br>";
		showDialog(errorMsg);
		check = 0;
	}
	k = parseFloat($("#k").val());
	if((k != null || k != 0 ) && (k >= 20000 && k <= 100000)) {
		k = k;
		check += 1;
	} else {
		errorMsg += "Please Enter k between 20000-100000<br>";
		showDialog(errorMsg);
		check = 0;
	}
	c = parseFloat($("#c").val());
	if((c != null || c != 0 ) && (c >= 1000 && c <= 2500)) {
		c = c;
		check += 1;
	} else {
		errorMsg += "Please Enter C between 1000-2500<br>";
		showDialog(errorMsg);
		check = 0;
	}
	H = parseFloat($("#stepHeight").val());
	if((H != null || H != 0 ) && (H >= 0.1 && H <= 0.75)) {
		H = H;
		check += 1;
	} else {
		errorMsg += "Please Enter H between 0.1-0.75<br>";
		showDialog(errorMsg);
		check = 0;
	}
	selectShape = $('#shape :selected').val();
	if((selectShape == "Step" || selectShape == "Hump" )) {
		selectShape = selectShape;
		check += 1;
	} else {
		errorMsg += "Please Select the Shape<br>";
		showDialog(errorMsg);
		check = 0;
	}
	// Formulae calculations
	omegaN = Math.sqrt(k / m).toFixed(6);
	Cc = 2 * Math.sqrt(k * m);
	zeta = c / Cc;
	omegaD = Math.sqrt(1 - (zeta * zeta)) * omegaN;
	V0 = Math.sqrt(2 * g * H);
	A = Math.sqrt((H * H) + (((V0 + (zeta * omegaN * H)) / omegaD) * ((V0 + (zeta * omegaN * H)) / omegaD)));
	THITA = Math.atan((H * omegaD) / (V0 * zeta * omegaN * H));

}

function calculateOmegaN() {
	m = parseFloat($("#m").val());
	k = parseFloat($("#k").val());
	omegaN = Math.sqrt(k / m).toFixed(6);
	$("#omeganVal").val(omegaN);
}

function plotData() {
	d = 40;
	ti[0] = 0;
	ti[1] = 4 / ((d * 10) / 2);
	for(var i = 1; i < d; i++) {
		ti[i] = ti[i - 1] + 4 / ((d * 10) / 2);
	}

	for(var i = 0; i < d; i++) {
		X[i] = ((Math.exp(-zeta * omegaN * ti[i]) * A * Math.sin((omegaD * ti[i]) + THITA)) * 10).toFixed(2);
		//console.log(" X for :" + X[i]);
	}

	var i = 0;
	setInterval(function() {
		if(i < ti.length) {
			var t1 = ti[i];
			var y1 = X[i];
			//console.log(t1 + "," + y1);
			plot1 = brd.createElement('point', [t1, y1], {
				name : '',
				style : 0.1,
				strokeColor : 'white',
				fixed : true
			});
			if(X[i] == 0.00) {
				stop = true;
			}
			i++;
		}
	}, 500);
	p1[i] = brd.create('curve', [ti, X], {
		size : 4
	});
	plot2 = brd.create('spline', [ti, X], p1, {
		strokeColor : 'green',
		strokeWidth : 2,
		fixed : true
	});
}


$(document).ready(function() {

	$("#Showf").click(function() {
		$("#Formula").show();
		var msg = '<label id="ef">&nbsp;&nbsp;Force Excitation : <br>&nbsp;&nbsp;&nbsp;x(t) = F<sub>0</sub>/K [(1-e<sup>-&zeta;&omega;<sub>n</sub>t</sup>/&radic;1-&zeta;<sup>2</sup>)cos(&omega;<sub>d</sub>t-&phi;)]<br>&nbsp;&nbsp;&nbsp;&phi; = tan<sup>-1</sup>(&zeta;/&radic;1-&zeta;<sup>2</sup>)</label>'
		showFormula(msg);
	});

	$("#Hidef").click(function() {
		$("#Formula").hide();
	});

	$("#reload").click(function() {
		window.location.reload(true);
	});

	$("#play").click(function() {
		if(check == 5) {
			getHeight();
			if(shape == "Step") {
				stepAnimation();
				plotData();
			} else if(shape == "Hump") {
				humpAnimation();
			}
			$("#play").attr("disabled", "disabled");
			$("#shape").attr("disabled", "disabled");
		}
	});
});
