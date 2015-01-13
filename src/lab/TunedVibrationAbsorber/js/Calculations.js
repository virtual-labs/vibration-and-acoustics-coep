/**
 * Author : Prashant Lokhande
 * validation given to all the fields
 * calculate required formulas
 **/

var m1;
var k1;
var m2;
var k2;
var mu;
var f0 = 70;
var x2;
var x1 = 0;
var check = 0;
var omega = "30.000000";
var omega1;
var omega2;

function cal() {
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
	m1 = parseFloat($("#m1").val());
	if((m1 != null || m1 != 0 ) && (m1 >= 80 && m1 <= 100)) {
		m1 = m1;
		check += 1;
	} else {
		errorMsg += "Please Enter m1 between 80-100<br>";
		showDialog(errorMsg);
		check = 0;
	}
	k1 = parseFloat($("#k1").val());
	if((k1 != null || k1 != 0 ) && (k1 >= 70000 && k1 <= 90000)) {
		k1 = k1;
		check += 1;
	} else {
		errorMsg += "Please Enter k1 between 70000-90000<br>";
		showDialog(errorMsg);
		check = 0;
	}
	m2 = parseFloat($("#m2").val());
	if((m2 != null || m2 != 0 ) && (m2 >= 8 && m2 <= 10)) {
		m2 = m2;
		check += 1;
	} else {
		errorMsg += "Please Enter m2 between 8-10<br>";
		showDialog(errorMsg);
		check = 0;
	}
	k2 = parseFloat($("#k2").val());
	if((k2 != null || k2 != 0 ) && (k2 >= 7000 && k2 <= 9000)) {
		k2 = k2;
		check += 1;
	} else {
		errorMsg += "Please Enter k2 between 7000-9000<br>";
		showDialog(errorMsg);
		check = 0;
	}

	// Formulae calculations
	omega1 = Math.sqrt(k1 / m1).toFixed(6);
	omega2 = Math.sqrt(k2 / m2).toFixed(6);

}

function calculateOmega1() {
	m1 = parseFloat($("#m1").val());
	k1 = parseFloat($("#k1").val());
	omega1 = Math.sqrt(k1 / m1).toFixed(6);
	$("#omega1").val(omega1);
}

function calculateOmega2() {
	m2 = parseFloat($("#m2").val());
	k2 = parseFloat($("#k2").val());
	omega2 = Math.sqrt(k2 / m2).toFixed(6);
	mu = m2 / m1;

	$("#omega2").val(omega2);
	$("#mu").val(mu);
}

function calculateX1X2() {
	if((omega == omega1) && (omega1 == omega2) && (omega == omega2)) {
		$("#x2").val((f0 / k2).toFixed(6));
		$("#x1").val(x1);
	} else {
		var omega4 = (omega * omega * omega * omega);
		var xx2 = (k2 - m2 * (omega * omega) * f0) / ((m1 * m2 * omega4) - ((m1 * k2) + (m2 * (k1 + k2))) * (omega * omega) + (k1 * k2));
		var xx1 = (k2 * f0) / ((m1 * m2 * omega4) - ((m1 * k2) + (m2 * (k1 + k2))) * (omega * omega) + (k1 * k2));
		$("#x2").val(xx2.toFixed(6));
		$("#x1").val(xx1.toFixed(6));
	}
}

$(document).ready(function() {
	$("#reload").click(function() {
		window.location.reload(true);
	});

	$("#run").click(function() {
		calculate();
		if(check == 4) {
			if((omega == omega1) && (omega1 == omega2) && (omega == omega2)) {
				animationDown();
			} else {
				springAnimationDown();
			}
			$("#run").attr("disabled", "disabled");
		}
	});
});
