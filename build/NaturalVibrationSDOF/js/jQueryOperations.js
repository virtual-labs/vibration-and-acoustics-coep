

var createGraph = function () {
	
        brd = JXG.JSXGraph.initBoard('graphSMD', {
            originX: 50,
            originY: 300,
            unitX: 90,
            unitY: 20,
            showCopyright: false,
            //grid: true,
        });
		var grid = brd.create('grid',[],{hasGrid:true,gridX:0.5});
		
        axisx = brd.create('axis', [
            [0, 0],
            [1, 0]
        ], {
            name: "Weight (kg)",
            withLabel: false
        });

        axisy = brd.create('axis', [
            [0, 0],
            [0, 1]
        ], {
            name: "V",
            withLabel: false
        });

        var text_Y = brd.create('text', [-0.5, 13, 'x (mm)'], {
            style: 5
        });
        var text_X = brd.create('text', [7.3, 0.8, 't (sec)'], {
            style: 5
        });
        var scale1 = brd.create('text', [6, 10, 'Scale:'], {
            style: 5
        });
        var scale2 = brd.create('text', [6.5, 9, 'X axis: 1 unit = 1 sec'], {
            style: 5
        });
        var scale3 = brd.create('text', [6.5, 8, 'Y axis: 1 unit = 5 mm'], {
            style: 5
        });
    }

function calcCc() {
    m = parseFloat($("#m").val());
    k = parseFloat($('#k').val());
    Cc = 2 * Math.sqrt(k * m);
    $("#cc").val(Cc);
}

function calculate() {
    $("#note").html("Move the Cursor on the points[red dots] plotted on the graph to see X and Y coordinates");
   var errorMsg = "";
    x0 = parseFloat($("#Xo").val());
    if ((x0 != null || x0 != 0) && (x0 >= 4 && x0 <= 8)) {
        x0 = x0;
        check1 += 1;
    } else {
        errorMsg += "Please Enter 'x<sub>o</sub>' between 4-8<br>";
		showDialog(errorMsg);
        check1 = 0;
    }

    m = parseFloat($("#m").val());

    if ((m != null || m != 0) && (m >= 4 && m <= 8)) {
        m = m;
        check1 += 1;
    } else {
		
        errorMsg += "Please Enter 'm' between 4-8<br>";
		showDialog(errorMsg);
        check1 = 0;
    }
    k = parseFloat($('#k').val());

    if ((k != null || k != 0) && (k >= 100 && k <= 200)) {
        k = k;
        check1 += 1;
    } else {
		    errorMsg += "Please Enter 'k' between 100-200<br>";
		showDialog(errorMsg);
		check1 = 0;
    }
    c = parseFloat($("#c").val());

    if (c <= Cc) {
        c = c;
        check1 += 1;
		 
    } else {
        errorMsg += "Please Enter 'c' Less than Cc<br>";
		showDialog(errorMsg);
        check1 = 0;
    }
    t = parseFloat($("#t").val());


    if ((t != null || t != 0) && (t >= 7 && t <= 12)) {
        t = t;
        check1 += 1;
    } else {
        errorMsg += "Please Enter 't' between 7-12<br>";
		showDialog(errorMsg);
        check1 = 0;
    }
    zeta = c / Cc;
    omegaN = Math.sqrt(k / m);
    omegaD = Math.sqrt(1 - (zeta * zeta)) * omegaN;
    pie = Math.atan(zeta / Math.sqrt(1 - (zeta * zeta)));

    if (check1 == 5) {
        display();
		 init();
        update();
        $("#run").attr('disabled', true);
    }
}
function showDialog(msg) {
	$("#Formula").html(msg)
	$("#Formula").dialog();
}
function showTitle(msg) {
	$("#Formula1").html(msg)
	$("#Formula1").dialog();
}

function display() {
    $("#zetaVal").val(zeta.toFixed(9));
    $("#omeganVal").val(omegaN.toFixed(9));
    $("#omegadVal").val(omegaD.toFixed(9));
}

function update(){
	d = t * 10;
	ti[0] = t / d;
    for (var i = 1; i < d; i++) {
        ti[i] = ti[i - 1] + t / d;
    }
}
/*function plotData() {
	for (var i = 0; i < d; i++) {
        y[i] = x0 * Math.exp(-zeta * omegaN * ti[i]) * (Math.cos(omegaD * ti[i]) + (zeta / Math.sqrt(1 - (zeta * zeta))) * Math.sin(omegaD * ti[i]));
	}

    for (var i = 0; i < ti.length; i++) {
        var t1 = ti[i];
        var y1 = y[i];
        p1[i] = brd.createElement('point', [ti[i], y[i]], {
            name: '',
            style: 3,
            strokeColor: 'white',
            fixed: true
        });
    }
    var li1 = brd.create('curve', [ti, y], {
        strokeColor: 'green',
        strokeWidth: 2,
        fixed: true
    });
	
}*/

function plotData() {
	for (var i = 0; i < d; i++) {
        y[i] = x0 * Math.exp(-zeta * omegaN * ti[i]) * (Math.cos(omegaD * ti[i]) + (zeta / Math.sqrt(1 - (zeta * zeta))) * Math.sin(omegaD * ti[i]));
        //console.log("red dot= "+y[i]);
	}
	var i =0;
	setInterval(function(){
	if(i<ti.length)
	{
		var t1 = ti[i];
            var y1 = y[i];
           console.log(t1 + "," + y1);
            p1[i] = brd.createElement('point', [ti[i], y[i]], {
                name: '',
                style: 3,
                strokeColor: 'white',
                fixed: true
            });
            i++;
	}
	},time);
	var li1 = brd.create('curve', [ti, y], {
        strokeColor: 'green',
        strokeWidth: 2,
        fixed: true
    });
}
$(document).ready(function () {
	$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) 
  {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur();

    $("#Showf").click(function () {
		var msg = '<label id="x">x = [X<sub>0</sub>e<sup>-&zeta;&omega;<sub>n</sub>t</sup>/&radic;1-&zeta;<sup>2</sup>]Sin(&omega;<sub>d</sub>t+&phi;)</label><br><label id="X">&phi;&nbsp;=&nbsp;tan<sup>-1</sup>(&zeta;/&radic;1-&zeta;<sup>2</sup>)<br/>&zeta;&nbsp;=&nbsp;C/C<sub>c</sub><br/>&omega;<sub>d</sub>&nbsp;=&nbsp;&omega;<sub>n</sub>&radic;1-&zeta;<sup>2</sup></label><br><label id="Pie">C<sub>c</sub>&nbsp;=&nbsp;2&radic;KM <br/> &omega;<sub>n</sub>&nbsp;=&nbsp;&radic;K/M</label>'
       showTitle(msg);
    });
	
	$("#reload").click(function(){
		var plc = $("#Xo").attr("placeholder");  
		$("#Xo").val(plc);
		var p = $("m").attr("placeholder");
		$("#m").val(p);
		var pl = $("k").attr("placeholder");
		$("#k").val(pl);
		$("#c").val("");
		var plch = $("#t").attr("placeholder");
		$("#t").val("");
		$("#zetaVal").val("");
		$("#cc").val("");
		$("#omeganVal").val("");
		$("#omegadVal").val("");
		window.location.href=window.location.href;
	})
	
});