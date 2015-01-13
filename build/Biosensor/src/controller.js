BIOSENSOR.controller = (function() {
	var obj = {};
	var model = new BIOSENSOR.model.model();
	var paperOne = new Raphael(document.getElementById('diagramContainerOne'), 900, 350);
	var paperTwo = new Raphael(document.getElementById('diagramContainerTwo'), 900, 350);
	var paperThree = new Raphael(document.getElementById('diagramContainerThree'), 900, 350);
	var circle = [], text1, time, dispTime, kl = 0, i = 1, j = 0, age = 0, age1 = 0;
	var rangMin = "-", rangMax = "-", strayLight1, strayLight2, strayLight3;
	var intialPosition = 0, photoDiode, phDiode, myInterval
	var position = 0;
	var errorBlink = 0;
	var previousPosition
	var IntialCondition = errorBlink;

	var options = {
		timeNotation : '12h',
		am_pm : true,
		fontFamily : 'Verdana, Times New Roman',
		fontSize : '20px',
		foreground : 'black',
	};
	$('.jclock').jclock(options);

	obj.levelOneDiagram = function() {
		var light = paperOne.path("M 80 190 l 10 10 M 90 200 l -5 0 M 90 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paperOne.path("M 80 200 l 10 10 M 90 210 l -5 0 M 90 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paperOne.circle(60, 60, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paperOne.path("M 60 65 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paperOne.path("M 60 186 l 15 0 l -15 15 l -15 -15 z M 45 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		circuit(paperOne);

		var lines = paperOne.path("M 60 201 l 0 40 M 45 241 l 30 0 M 50 246 l 20 0 M 55 251 l 10 0 M 57 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var cur = paperOne.path("M200 250s50,55 0,140" + "M160 250s50,55 0,140" + "M160 250l40 0" + "M160 390l40 0");
		//.attr("fill","black");

		var cir1 = paperOne.circle(188, 263, 10);
		var cir2 = paperOne.circle(200, 291, 10);
		cir3 = paperOne.circle(204, 323, 10).attr("fill", "red");
		var cir4 = paperOne.circle(199, 352, 10);
		var cir5 = paperOne.circle(187, 376, 10);
		var set1 = paperOne.set();
		set1.push(cur, cir1, cir2, cir3, cir4, cir5);
		set1.translate(-65, -135);

	}//levelOneDiagram()
	circuit = function(paper) {
		var coil = paper.path("m 200,169 -0.0689,6.52192 -15.37494,0.1932 c -0.86524,0.1004 -1.67343,0.61308 -2.13297,1.35305 -0.45953,0.73996 -0.56075,1.69168 -0.26714,2.51175 0.31903,0.89107 1.10036,1.60202 2.0175,1.83577 l 32.35005,0.0482 c 0.68031,0.2131 1.28792,0.65164 1.70447,1.23019 0.41655,0.57855 0.63972,1.29388 0.62603,2.00665 -0.0118,0.61681 -0.19963,1.22927 -0.53556,1.74671 -0.33593,0.51745 -0.81894,0.93824 -1.37753,1.2001 l -32.69788,-0.33787 c -0.67575,0.19028 -1.28127,0.62061 -1.68317,1.19622 -0.4019,0.5756 -0.59728,1.2923 -0.5431,1.99224 0.0476,0.6152 0.28625,1.21426 0.67467,1.6937 0.38841,0.47945 0.92492,0.83719 1.51685,1.01142 l 32.5934,0.33854 c 0.63603,0.2239 1.19557,0.65934 1.56883,1.22089 0.37327,0.56156 0.55814,1.24603 0.51835,1.91915 -0.0332,0.56154 -0.22113,1.11316 -0.53769,1.57816 -0.31655,0.46499 -0.76084,0.84209 -1.27111,1.07886 l -33.39353,-0.43477 c -0.53783,0.30705 -0.99554,0.75306 -1.31641,1.28275 -0.32087,0.5297 -0.50419,1.14193 -0.52725,1.7608 -0.0454,1.21885 0.56468,2.44278 1.5653,3.14022 l 17.35765,0.38645 -0.0344,5.21758").attr({
			stroke : '#F00',
			'stroke-width' : 2

		});
		var photodetector = paper.ellipse(200, 190, 30, 22).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var line = paper.path("M 200 167 l 0 -20 l 40 0 M 200 213 l 0 20 l 40 0 M 346 190 l 40 0 M 386 190 l -10 -10 M 386 190 l -10 10").attr({
			stroke : '#000',
			'stroke-width' : 3
		});

		var rect = paper.rect(240, 137, 106, 106).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var text = paper.text(293, 190, "Signal\nConditioning\nCircuit").attr({
			'font-size' : 18
		});
	}

	obj.drawCircle = function() {
		var OuterCircle = paperOne.circle(690, 163, 142).attr({
			fill : "BLACK"
		});

		var OuterCircle1 = paperOne.circle(690, 163, 60).attr({
			fill : "WHITE"
		});
		//OuterCircle1.toBack();
		var angle = 0;
		var k = 0;
		while(angle < 360) {(function(a) {
				//alert(a)
				circle[k] = paperOne.circle(815, 220, 7).attr({
					rotation : a + " 690 163",
					fill : "WHITE"
				});
			})(angle);
			angle += 6;
			k++;
		}
		OuterCircle.toBack();
	}

	obj.setSpeed = function(speed) {
		model.set({
			'rpm' : speed
		});
	}

	obj.startRotation = function() {
		speedType = model.get('rpm');
		switch (speedType) {
			case 0.5:
				speed = 122000;
				time = 121;
				dispTime = 30;
				$('#systemMsg').text("Speed is 0.5 rpm");
				$('#showSpeed').show();
				break;
			case 1:
				speed = 61000;
				time = 61;
				dispTime = 60;
				$('#systemMsg').text("Speed is 1.0 rpm");
				$('#showSpeed').show();
				break;
			case 2:
				speed = 30000
				time = 31;
				dispTime = 120;
				$('#systemMsg').text("Speed is 2.0 rpm");
				$('#showSpeed').show();
				break;
			default:
				speed = 0;
				time = 0;
				$('#systemMsg').text("Select Speed of Ring");
				$('#showSpeed').hide();
		}
		if(time == 0) {
			dispText("Display");
		} else {
			$("#display_counter").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM<br/><span style='color:#ff0000'><BLINK>" + dispTime + "</BLINK><span><div>");
		}
	}//startRotation
	function dispText(time) {
		text1.remove();
		text1 = paperOne.text(435, 150, "BPM\n" + time).attr({
			fill : 'black',
			'font-size' : 18
		});
	}//dispText


	obj.rotateDisk = function() {
		if(myInterval != undefined) {
			clearInterval(myInterval);
		}
		runTimer(time);
		$('#startRotation').attr('disabled', true);
		$("#startRotation").removeClass('greenbtn');
		myInterval = window.setInterval(function(a, b) {

			circle[i].attr({
				fill : "red"

			});

			switch(kl) {
				case 0:
					cir3.attr("fill", "white");
					kl = 1;
					break;
				case 1:
					cir3.attr("fill", "red");
					kl = 0;
					break;
			}
			i++;
			if(i == circle.length) {
				i = 0;
			}

			if(j == circle.length) {
				j = 0;
				circle[j].attr({
					fill : "white"
				});
			}
			circle[j].attr({
				fill : "white"
			});
			j++;
		}, 1000);

		window.setTimeout(function(a, b) {
			clearInterval(myInterval);
		}, speed);
	};
	//rotateDisk

	runTimer = function(time) {

		$('.timer').spriteTimer({
			//'digitImagePath': 'numbers.png',
			everySecondCallback : function(sec) {
				//alert(sec)
				$('#seconds').html(sec - 1);
				if(sec == 1) {
					$('#startRotation').attr('disabled', false);
					$("#startRotation").addClass('greenbtn');
					$('#speed').attr('disabled', false).trigger("liszt:updated");
					$('#seconds').html(0);
					$("#restart").attr('disabled', false);
					$("#restart").addClass('bluebtn');
					$('#measurement').attr('disabled', false);
					$("#measurement").addClass('greenbtn');
				}
			},
			'isCountDown' : true,
			'seconds' : time
		});

		$('#stopMe').bind('mouseover', function() {
			$(' .timer').trigger('stopTimer');
		});
		$('#startMe').bind('mouseover', function() {
			$(' .timer').trigger('startTimer');
		});
		$('#resetMe').bind('mouseover', function() {
			$(' .timer').trigger('resetTimer');
		});
	}//runTimer
	obj.setAge = function(age) {
		model.set({
			'age' : age
		})
	}

	obj.createDiagramTwo = function() {
		age = parseInt($('#age').val());
		ran = randomBeats(age);
		// alert('ran '+ ran)
		if(phDiode != undefined) {
			clearPaper(phDiode);
		}

		clearPaper(paperTwo);
		clearPaper(paperThree);
		paperTwo = new Raphael(document.getElementById('diagramContainerTwo'), 900, 350);
		paperThree = new Raphael(document.getElementById('diagramContainerThree'), 900, 350);

		switch (age) {
			case 1:
				newBorn(ran, paperTwo);
				diode = newBorn(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : New Born")
				break;
			case 2:

				infant(ran, paperTwo);
				diode = infant(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : 1-12 months")
				break;
			case 3:

				twoYears(ran, paperTwo);
				diode = twoYears(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : 1-2 years")
				break;
			case 4:

				sixYears(ran, paperTwo);
				diode = sixYears(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : 2-6 years")
				break;
			case 5:

				tweleveYears(ran, paperTwo);
				diode = tweleveYears(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : 6-12 years")
				break;
			case 6:

				adult(ran, paperTwo);
				diode = adult(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : 12 years - Adult")
				break;
			case 7:
				adultAthelets(ran, paperTwo);
				diode = adultAthelets(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
				$("#selectedRange").html("Selected Range is : Adult Athelete")
				break;

			default:

				adultAthelets(ran, paperTwo);
				diode = adultAthelets(ran, paperThree);
				$("#display_counter_two").html("<div style='margin-top:30px;font-size:20px;text-align:center'> BPM<br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
		}
		$('#showHeartBeat').html("");

	}//createDiagramTwo
	randomBeats = function(age) {
		if(1 == age) {
			var num = rand(160, 120);
			x = num;
			return (num);
		} else if(2 == age) {
			var num = rand(140, 80);
			x = num
			return (num);
		} else if(3 == age) {
			var num = rand(130, 80);
			x = num;
			return (num);
		} else if(4 == age) {
			var num = rand(120, 75);
			x = num;
			return (num);
		} else if(5 == age) {
			var num = rand(110, 75);
			x = num;
			return (num);
		} else if(6 == age) {
			var num = rand(100, 60);
			x = num;
			return (num);
		} else if(7 == age) {
			var num = rand(70, 40);
			x = num;
			return (num);
		} else {
			return ("display...");
		}

	}//randomBeats
	rand = function(max, min) {
		return Math.round(min + Math.random() * (max - min))
	}//rand

	obj.showBeats = function() {
		var val = parseInt(model.get('age'))
		switch (val) {
			case 1:
				rangMin = 120;
				rangMax = 160;
				break;
			case 2:
				rangMin = 80;
				rangMax = 140;
				break;
			case 3:
				rangMin = 80;
				rangMax = 130;
				break;
			case 4:
				rangMin = 75;
				rangMax = 120;
				break;
			case 5:
				rangMin = 75;
				rangMax = 110;
				break;
			case 6:
				rangMin = 60;
				rangMax = 100;
				break;
			case 7:
				rangMin = 40;
				rangMax = 70;
				break;

			default:
				rangMin = "-";
				rangMax = "-";

		}

	}//showBeats
	clearPaper = function(paper) {
		var paperDom = paper.canvas;
		paperDom.parentNode.removeChild(paperDom);
	}//clearPaper
	//NEW BORN FINGER
	newBorn = function(ran, paper) {
		var light = paper.path("M 100 190 l 10 10 M 110 200 l -5 0 M 110 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 100 200 l 10 10 M 110 210 l -5 0 M 110 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(80, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 80 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 80 186 l 15 0 l -15 15 l -15 -15 z M 65 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 80 201 l 0 40 M 65 241 l 30 0 M 70 246 l 20 0 M 75 251 l 10 0 M 77 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper);

		var fingure = paper.path("M 220 130 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 4
		});

		var nail = paper.path("M 134 164 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});

		fingure.scale(0.4, 0.4);
		nail.scale(0.4, 0.4);

		return photoDiode
	};
	//newBorn

	//infant
	infant = function(ran, paper) {
		var light = paper.path("M 100 190 l 10 10 M 110 200 l -5 0 M 110 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 100 200 l 10 10 M 110 210 l -5 0 M 110 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(80, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 80 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 80 186 l 15 0 l -15 15 l -15 -15 z M 65 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 80 201 l 0 40 M 65 241 l 30 0 M 70 246 l 20 0 M 75 251 l 10 0 M 77 256 l 5 00").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper)

		var fingure = paper.path("M 220 130 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 4
		});

		var nail = paper.path("M 127 170 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});

		fingure.scale(0.5, 0.5);
		nail.scale(0.5, 0.5);

		return photoDiode

	};
	//two years
	twoYears = function(ran, paper) {
		var light = paper.path("M 100 190 l 10 10 M 110 200 l -5 0 M 110 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 100 200 l 10 10 M 110 210 l -5 0 M 110 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(80, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 80 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 80 186 l 15 0 l -15 15 l -15 -15 z M 65 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 80 201 l 0 40 M 65 241 l 30 0 M 70 246 l 20 0 M 75 251 l 10 0 M 77 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});
		circuit(paper);

		var fingure = paper.path("M 220 130 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 4
		});

		var nail = paper.path("M 122 174 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});

		fingure.scale(0.6, 0.6);
		nail.scale(0.6, 0.6);

		return photoDiode
	};
	//six years
	sixYears = function(ran, paper) {
		var light = paper.path("M 100 190 l 10 10 M 110 200 l -5 0 M 110 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 100 200 l 10 10 M 110 210 l -5 0 M 110 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(80, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 80 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 80 186 l 15 0 l -15 15 l -15 -15 z M 65 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 80 201 l 0 40 M 65 241 l 30 0 M 70 246 l 20 0 M 75 251 l 10 0 M 77 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper);

		var fingure = paper.path("M 225 110 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 4
		});

		var nail = paper.path("M 123 161 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});

		fingure.scale(0.7, 0.7);
		nail.scale(0.7, 0.7);

		return photoDiode
	};
	//twelve years
	tweleveYears = function(ran, paper) {
		var light = paper.path("M 80 190 l 10 10 M 90 200 l -5 0 M 90 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 80 200 l 10 10 M 90 210 l -5 0 M 90 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(60, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 60 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 60 186 l 15 0 l -15 15 l -15 -15 z M 45 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 60 201 l 0 40 M 45 241 l 30 0 M 50 246 l 20 0 M 55 251 l 10 0 M 57 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper);
		var fingure = paper.path("M 220 110 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 4
		});

		var nail = paper.path("M 110 169 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});

		fingure.scale(0.8, 0.8);
		nail.scale(0.8, 0.8);

		return photoDiode
	};
	//ADULT FINGER
	adult = function(ran, paper) {
		var light = paper.path("M 80 190 l 10 10 M 90 200 l -5 0 M 90 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 80 200 l 10 10 M 90 210 l -5 0 M 90 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});
		var circle = paper.circle(60, 65, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 60 70 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 60 186 l 15 0 l -15 15 l -15 -15 z M 45 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var line = paper.path("M 60 201 l 0 40 M 45 241 l 30 0 M 50 246 l 20 0 M 55 251 l 10 0 M 57 246 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper);

		var fingure = paper.path("M 230 90 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 3
		});

		var nail = paper.path("M 115 155 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});
		fingure.scale(0.9, 0.9);
		nail.scale(0.9, 0.9);

		return photoDiode
	};
	//ADULT ATHELET FINGER

	adultAthelets = function(ran, paper) {
		var circle = paper.circle(60, 60, 5).attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var resistance = paper.path("M 60 65 l 0 40 l 6 3 l -12 6 l 12 6 l -12 7 l 12 6 l -12 6 l 6 3 l 0 80").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		var photoDiode = paper.path("M 60 186 l 15 0 l -15 15 l -15 -15 z M 45 201 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});

		var light = paper.path("M 80 190 l 10 10 M 90 200 l -5 0 M 90 200 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var light = paper.path("M 80 200 l 10 10 M 90 210 l -5 0 M 90 210 l 0 -5").attr({
			stroke : "#F00",
			'stroke-width' : 2
		});

		var line = paper.path("M 60 201 l 0 40 M 45 241 l 30 0 M 50 246 l 20 0 M 55 251 l 10 0 M 57 256 l 5 0").attr({
			stroke : '#000',
			'stroke-width' : 2
		});

		circuit(paper);

		var fingure = paper.path("M 230 90 c 6 4 -40 22 -45 18 c -10 19 -11 23 -30 37 c -11 28 3 61 -30 72 c -15 0 -16 -3 -24 -12 c 2 -4 3 -26 4 -30 c 2 -8 6 -19 4 -28 c -4 -16 6 -33 11 -42 c 10 -20 13 -43 32 -51 c 20 -8 39 -18 68 -31").attr({
			stroke : "#000",
			fill : "#eddfc3",
			'stroke-width' : 3
		});

		var nail = paper.path("M 110 160 c 0 1 -1 3 -1 5 l -4 23 c -1 7 -2 14 -3 17 c 0 0 0 0 1 0 c 2 1 7 -1 9 -2 c 4 -1 3 -7 3 -10 -10 c 0 -4 0 -6 0 -10 c 0 -4 0 -6 2 -10 c 0 -4 -1 -7 -3 -10 c -2 -2 -2 -2 -4 -3 z").attr({
			stroke : "#000",
			fill : "#f3d4be",
			'stroke-width' : 2
		});
		fingure.scale(1.0, 1.0);
		nail.scale(1.0, 1.0);
		//fingure.scale(0.5,0.5);

		return photoDiode
	};

	obj.showBeatsRange = function() {
		var rang1 = "-", range2 = "-";
		var value = returnRange();
		var valArray = value.split(",");
		rang1 = valArray[0];
		rang2 = valArray[1];
		fixedRangeOne = parseInt(rang1);
		fixedRangeTwo = parseInt(rang2);
		//console.log(rang1 + ' ' + rang2)
		$('#showHeartBeat').html("Heart beats in this group are: " + rang1 + " to " + rang2);

		//$('#tabs-3').show();

	}
	var setAge = function(age) {
		if(age == 0) {
			$('#showHeartBeat').text("Age is not selected");
		} else if(age == 1) {
			$('#showHeartBeat').text("New Born");
		} else if(age == 2) {
			$('#showHeartBeat').text("1 - 12 Months");
		} else if(age == 3) {
			$('#showHeartBeat').text("1 - 2 Years");
		} else if(age == 4) {
			$('#showHeartBeat').text("2 - 6 Years");
		} else if(age == 5) {
			$('#showHeartBeat').text("6 - 12 Years");
		} else if(age == 6) {
			$('#showHeartBeat').text("12 Years - Adult");
		} else if(age == 7) {
			$('#showHeartBeat').text(" Adult Athletes");
		}

	}
	returnRange = function() {
		var value = rangMin + "," + rangMax;
		return (value)
	}
	var createDiode = function(paper) {

		var photoDiode = paper.path("M 60 136 l 15 0 l -15 15 l -15 -15 z M 45 151 l 30 0 ").attr({
			fill : "BLACK",
			'stroke-width' : 2
		});
	}

	obj.misalignment = function() {

		var age = parseInt(model.get('age'));

		diode.remove();

		$('#alignment').show();
		if(age == 5 || age == 6 || age == 7) {
			$("#big_area").html('<div id = "handler"><div id = "photo_diode" style="position:relative;margin-left:-46px"></div></div>');
			phDiode = new Raphael(document.getElementById('photo_diode'), 200, 200);
		} else {
			$("#big_area").html('<div id = "handler"><div id = "photo_diode" style="position:relative;"></div></div>');
			phDiode = new Raphael(document.getElementById('photo_diode'), 200, 200);
		}

		if(phDiode != undefined) {
			clearPaper(phDiode);
		}
		phDiode = new Raphael(document.getElementById('photo_diode'), 200, 200);
		
		if(strayLight1 != undefined && strayLight2 != undefined) {
			photoDiode.remove();
			strayLight1.remove();
			strayLight2.remove();
			strayLight3.remove();
		}
		createDiode(phDiode);
		$("#alignment").html("Drag LED to Read Error");
		$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + ran + "</BLINK><span><div>");
		errorBlink = ran;

		var revertFlag = false;

		$("#photo_diode").draggable({
			axis : "y",
			containment : '#big_area',
			stop : function(event, ui) {
				if(ui.position.top > -80 && ui.position.top < 53) {
					previousPosition = position;
					if(ui.position.top == intialPosition) {
						$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + IntialCondition + "</BLINK><span><div>");

					} else if(ui.position.top > 0) {
						position = ui.position.top;
						if(previousPosition > position) {
							errorBlink = errorBlink + 2;
							$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + errorBlink + "</BLINK><span><div>");
							previousPosition = position;
							position = ui.position.top;
						} else if(previousPosition < position) {
							errorBlink = errorBlink - 2;
							$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + errorBlink + "</BLINK><span><div>");
							previousPosition = position;
							position = ui.position.top;
						}
					}else if(ui.position.top < 0) {
						position = ui.position.top;
						if(previousPosition > position) {
							errorBlink = errorBlink - 2;
							$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + errorBlink + "</BLINK><span><div>");
							previousPosition = position;
							position = ui.position.top;
						} else if(previousPosition < position) {
							errorBlink = errorBlink + 2;
							$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + errorBlink + "</BLINK><span><div>");
							previousPosition = position;
							position = ui.position.top;
						}
					}
				} else {
					//revertFlag = true;
				}
			}
		});

		/*
		$("#big_area").droppable({
					drop : function(event, ui) {
						if(revertFlag == true) {
							ui.draggable.draggable("option", "revert", true);
							revertFlag = false;
						} else {
							ui.draggable.draggable("option", "revert", false)
						}
					}
		})*/
	}

	obj.strayLight = function() {
		var age = parseInt(model.get('age'));

		var x = "1---"
		if(age == 5 || age == 6 || age == 7) {
			photoDiode = paperThree.path("M 60 186 l 15 0 l -15 15 l -15 -15 z M 45 201 l 30 0 ").attr({
				fill : "BLACK",
				'stroke-width' : 2
			});
		} else {
			photoDiode = paperThree.path("M 80 186 l 15 0 l -15 15 l -15 -15 z M 65 201 l 30 0 ").attr({
				fill : "BLACK",
				'stroke-width' : 2
			});
		}

		$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><span style='color:#ff0000'><BLINK>" + x + "</BLINK><span><div>");
		$('#alignment').hide();

		$("#big_area").hide();
		strayLight1 = paperThree.path("M 130 110 l 40 40 M 190 110 l 0 30 l 5 -5 M 190 140 l -5 -5").attr({
			stroke : '#F00',
			'stroke-width' : 2
		});
		strayLight2 = paperThree.path("M 130 250 l 40 -40 M 190 260 l 0 -30 l 5 5 M 190 230 l -5 5").attr({
			stroke : '#F00',
			'stroke-width' : 2
		});
		strayLight3 = paperThree.path("M 170 150 l -10 0 M 170 150 l 0 -10 M 170 210 l -10 0 M 170 210 l 0 10").attr({
			stroke : '#F00',
			'stroke-width' : 2
		});
		strayLight1.toBack();
		strayLight2.toBack();
		strayLight3.toBack();
		//clearPaper(paperThree)
		//paperThree = new Raphael(document.getElementById('diagramContainerThree'), 900, 350);
	}
	
	return {
		obj : obj
	}
})();
