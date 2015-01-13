CAPACITANCE.controller = (function() {
	var obj = {};
	var paper = new Raphael(document.getElementById('diagContainer'), 396, 668);
	var capModel = new CAPACITANCE.model.capacitanceModel();
	var CapCollection = new CAPACITANCE.collection.capacitanceCollection();
	var key = 1,  flag = -1, cnt = 0, key = 1, counter = 1;
	var a, b, c, d, x, y, z, w, p, r, rect = false, dielectricFreeSpace = 8.85e-12, dielectricAir = 1, constantValue = 2 * Math.PI * dielectricFreeSpace;
	var outputCapacitanceArray = [], currentArray = [], nextSetValue = 0, storeDataCurrent = [], storeDataCap = [], currentData = [], capData = [];
	obj.fainted = function(h, span) {
		paper.path("M 80 100 l 0 " + h + " l 230 0 l 0 " + -h).attr({
			opacity : 0.2
		});
		paper.path("M 169 100 l 0 " + span).attr({
			opacity : 0.2
		});
		paper.path("M 221 100 l 0 " + span).attr({
			opacity : 0.2
		});
		paper.rect(195, 100, 2, span).attr({
			fill : '#000',
			stroke : '#000',
			opacity : 0.2
		});
	}//End fainted

	obj.upperPart = function(op) {
		paper.rect(150, 60, 90, 40).attr({
			opacity : op
		});
		paper.path("M 150 77 l 90 0").attr({
			opacity : op
		});
		paper.path("M 240 88 l 110 0").attr({
			opacity : op
		});
		paper.path("M 192 60 l 0 -30 l 158 0").attr({
			opacity : op
		});
		paper.circle(355, 88, 5).attr({
			opacity : op
		});
		paper.circle(355, 30, 5).attr({
			opacity : op
		});

		var movex = 155;
		for(var i = 0; i < 18; i++) {
			var lines = paper.path("M" + movex + " 77"  + "l 0 23").attr({
				opacity : op
			});
			movex = movex + 5;
		}
		paper.text(345, 60, "CAPACITANCE").attr({
			'font-size' : 12,
			'font-family' : 'helvetica'
		});
	}

	obj.setHeight = function(ht) {
		capModel.set({
			'h' : ht
		});
		capModel.set({
			'key' : key
		});
		setSpanValue();
		changeHeightofTank();
		setLevel();
	};
	setSpanValue = function() {
		var h = capModel.get('h');
		sp = 0.9 * h - 5;
		$("#spanVal").html(sp);
	}
	changeHeightofTank = function() {

		var ht = capModel.get('h')
		if(!(flag == -1)) {
			if(!(x == undefined))
				a.stop(x);
			if(!(b == undefined))
				b.stop(y);
			if(!(c == undefined))
				c.stop(z);
			if(!(d == undefined))
				d.stop(w);
			paper.clear();
			p = undefined;
			flag = -1;
			
			 
			$("#spanVal").text(" ");
			setSpanValue();
			var ob = document.getElementById('selectBox4');
			ob.options.length = 0;
			$('#selectBox4').html('<option selected="0" >0 </option>')
		};
		
		$("#up").html("<label class='selectval'>Selected values :</label><br>");
		$("#up").append("<label class='featured'>Height of Tank:&nbsp;&nbsp;&nbsp;" + ht + " cm</label>");
		$("#up").append("<label class='featured'>Outer radius(r2): 2.5cm</label>");
		$("#up").append("<label class='featured' >Span Value:&nbsp;" + sp + "</label>")
		
		if(capModel.get('r1') != '' && capModel.get('service') != null){
			$("#up").append("<label class='featured' id='in'>Inner radius(r1):&nbsp;" + capModel.get('r1') + "cm</label>");
			s1 = document.getElementById('selectBox3');
			item = s1.options[s1.selectedIndex].text;
			$("#up").append("<label class='featured' id='change'>Service:&nbsp;" + item + "</label>");
			
		}
		changeHeight();
		if(capModel.get('r1') != ''){
				var rad = parseFloat(capModel.get('r1'));
				inRadius = rad;
				var n = document.getElementById('selectBox2').selectedIndex;
				changeInnerRadius(n);
			}
	}
	changeHeight = function() {
		paper.clear();
		var h = document.getElementById('selectBox1').selectedIndex;
		ht = 180 + (h * 33);
		span = parseInt(ht - 10);
		obj.fainted(ht, span);
		obj.upperPart(0.2);
		a = paper.path("M 80 100");
		flag++;
		cnt++;
		x = a.animate({
			path : "M 80 100 l 0 " + ht,
			stroke : '#000',
			opacity : 1
		}, 2000, function() {flag == 0 ? bottomLine() : flag--;
		});
	}
	bottomLine = function() {
		b = paper.path("M 80 " + (ht + 100))
		flag++;
		y = b.animate({
			path : "M 80 " + (ht + 100) + " l 230 0  ",
			stroke : '#000',
			opacity : 1
		}, 1400, function() {flag == 1 ? bottomUP() : flag--;
		});
	}
	bottomUP = function() {
		c = paper.path("M 310 " + (ht + 100));
		flag++;
		z = c.animate({
			path : "M 310 " + (ht + 100) + "l 0 " + -ht,
			stroke : '#000',
			opacity : 1
		}, 2000, function() {flag == 2 ? outerRadius() : flag--;
		});
	}
	outerRadius = function() {
		labelHt();
		d = paper.path("M 169 100");
		w = d.animate({
			path : "M 169 100 l 0 " + span,
			stroke : '#000',
			opacity : 1
		}, 2500, function() {
			obj.upperPart(1);
			labelProbe(y, y1);
		});
		paper.path("M 221 100").animate({
			path : "M 221 100 l 0 " + span,
			stroke : '#000',
			opacity : 1
		}, 2500);

		var y = ht + 115;
		var y1 = ht + 110;

	}
	labelHt = function() {
		var h = 100 + (ht / 2);
		paper.path("M 60 100 l 10 0").attr({
			stroke : '#3788AC'
		});
		paper.path("M 65 100 l 0 " + ht).attr({
			stroke : '#3788AC'
		});
		paper.text(56, h, "h").attr({
			stroke : '#3788AC',
			'font-size' : 15
		});
		paper.path("M 60 " + (ht + 100) + " l 10 0").attr({
			stroke : '#3788AC'
		});
	}
	//label for outer radius
	labelProbe = function(y, y1) {
		paper.path("M 168 " + y1 + " l 0 10").attr({
			stroke : '#3788AC'
		});
		paper.path("M 168 " + y + " l 26 0").attr({
			stroke : '#3788AC'
		});
		paper.path("M 194 " + y1 + " l 0 10").attr({
			stroke : '#3788AC'
		});
		paper.text(180, (y + 6), "r2").attr({
			stroke : '#3788AC',
			'font-size' : 15
		});
	}
	setLevel = function() {
		var levelCount = Math.round((span / 10));
		var temp = document.getElementById("selectBox4");
		var h = capModel.get('h');
		var s = (0.9 * h - 5);
		s = Math.round(s / 10);
		var ds = s;
		for(var i = 0; i < 10; i++) {
			$("#selectBox4").trigger("liszt:updated");
			temp.options[temp.options.length] = new Option(s);
			s = s + ds;
		}
	}//setLevel

	obj.setRadius = function(rad) {
		var height = capModel.get('h');
		if(counter == 1 && height == 0) {
			alert("Select height of tank");
			$("#selectBox2").val('').trigger("liszt:updated");
		} else {
			capModel.set({
				'r1' : rad
			});
			innerRadius();
		}
	}
	innerRadius = function() {
		var rad = parseFloat(capModel.get('r1'));
		inRadius = rad;
		var label = $('#in').html();
		if(label == null) {
			$("#up").append("<label class='featured' id='in'>Inner radius(r1):&nbsp;" + rad + "cm</label>");
		} else {
			$("#in").replaceWith("<label class='featured' id='in'>Inner radius(r1):&nbsp;" + rad + "cm</label>");
			if(p != undefined)
				p.remove();
		}
		var n = document.getElementById('selectBox2').selectedIndex;
		changeInnerRadius(n);
		rTwobyrOne = calculaterOneByrTwo(rad);
	}
	changeInnerRadius = function(n) {
		var span = parseInt(ht - 10);
		var height = capModel.get('h');
		inRadius = (inRadius * 2) / 0.1;
		var x;
		switch(n) {
			case 1 :
				x = 195;
				break;
			case 2 :
				x = 193;
				break;
			case 3 :
				x = 186;
				break;
			case 4 :
				x = 183;
				break;
			case 5 :
				x = 179;
				break;
			case 6 :
				x = 176;
				break;
			case 7 :
				x = 174;
				break;
			case 8 :
				x = 171;
				break;
		}
		r = paper.rect(x, 100, inRadius, 0).attr({
			fill : '#000',
			stroke : '#000',
			opacity : 1
		});
		p = r.animate({
			height : span
		}, 2500);
	}

	obj.setService = function(s, item) {
		capModel.set({
			'service' : s
		});
		var label = $('#change').html();
		service = s;
		if(label == null)
		{$("#up").append("<label class='featured' id='change'>Service:&nbsp;" + item + "</label>");}
		else{$("#change").replaceWith("<label class='featured' id='change'>Service:&nbsp;" + item + "</label>");}
	}

	obj.changeLevel = function(l) {
		level = l;
		if(rect == true) {
			rectangle.remove();
			rect = false;
		}
		var levelInTank = document.getElementById('selectBox4').selectedIndex;
		$('#userInput').attr({
			'value' : 'Enter your Output'
		})
		increaseLevel(levelInTank);
		rectangle.toBack();
	}
	//animate increase in level
	increaseLevel = function(l) {
		var span = (0.9 * ht - 5) / 10;
		l = span * l;
		var y1 = ht + 100;
		var x1 = 80;
		var rectHt = 0;
		var rectWd = 230;
		var shift = l;
		var fillColor = capModel.get('color');
		rectangle = paper.rect(x1, y1, rectWd, rectHt).attr({
			fill : fillColor,
			stroke : 'transparent',
			opacity : 0.9
		});
		y1 = y1 - shift + 0;
		t = rectangle.animate({
			y : y1,
			height : shift
		}, 3200, function() {
			paper.path("M 80 100 l 0 " + ht + " l 230 0 l 0 " + -ht).attr({
				stroke : '#000',
				opacity : 1
			});
		});
		rect = true;
		unFilledLevel = sp - level;
		correctOutputCapacitance = calculateCapacitance(level, unFilledLevel);

		//alert(correctOutputCapacitance);
	}
	calculaterOneByrTwo = function(rOne) {
		var rTwo = capModel.get('r2');
		var num = rTwo / rOne;
		rTwobyrOne = Math.log(num);
		return rTwobyrOne;
	}
	calculateCapacitance = function(l, unFilledLevel) {
		var num = constantValue / rTwobyrOne;
		var service = capModel.get('service');
		var anotherNum = ((1 * unFilledLevel) + (service * l));
		correctOutputCapacitance = num * anotherNum;
		correctOutputCapacitance = correctOutputCapacitance * Math.pow(10, 6)
		correctOutputCapacitance = parseFloat(correctOutputCapacitance.toFixed(4));
		return correctOutputCapacitance;
	}//calculateCapacitance
	calculateCurrent = function(l) {
		slop = 16 / sp;
		current = (slop * l) + 4;
		current = parseFloat(current.toFixed(4));
		return current;
	}//calculateCurrent
	cnt1=0;
	obj.userInput = function(userInputCapacitance) {
		var val;
		var tempoutputCapacitance = correctOutputCapacitance;

		if(isNaN(userInputCapacitance) || isNaN(tempoutputCapacitance)) {
			alert("Please Enter Numerical Digit");
		} else {

			var lower = tempoutputCapacitance - 0.05;
			var higher = tempoutputCapacitance + 0.05;
			var round = Math.round(tempoutputCapacitance);

			if((userInputCapacitance >= lower && userInputCapacitance <= higher) || userInputCapacitance == tempoutputCapacitance || userInputCapacitance == round) {
				$("#userCapacitance").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#userCapacitance").html("<span class='label'>Submit</span>");
				}, 3000);
				var id = capModel.get('key')
				var existingModel = CapCollection.get(id);
				level = parseInt(level);
				outputCapacitanceArray.push([level, tempoutputCapacitance]);
				outputCapacitanceArray = outputCapacitanceArray.sort(function(a,b){return a[1] - b[1];});
				
				var callCalculateCurrent = calculateCurrent(level);
				currentArray.push([level, callCalculateCurrent]);
				currentArray = currentArray.sort(function(a,b){return a[1] - b[1];});
				if(!existingModel) {
					capModel.set({
						'capArray' : outputCapacitanceArray
					});
					capModel.set({
						'curArray' : currentArray
					})

					if(outputCapacitanceArray.length >= 3) {
						$("#nextVal").attr('disabled', false)
						$('#nextVal').addClass("bluebtn");
						CapCollection.add([capModel]);
					}

					if(currentArray.length >= 3) {
						$('#plotcapacitanceGraph1').hide();
						$('#plotcapacitanceGraph').show();
						$('#plotCurrentGraph1').hide();
						$('#plotCurrentGraph').show();
						$("#plotcapacitanceGraph").attr('disabled', false)
						$('#plotcapacitanceGraph').addClass("greenbtn");
						$("#plotCurrentGraph").attr('disabled', false)
						$('#plotCurrentGraph').addClass("greenbtn");
						
					}
				} else {
					capModel.set({
						'capArray' : outputCapacitanceArray
					});
					capModel.set({
						'curArray' : currentArray
					})
				}
				val = true;
			}
		
		else {
			cnt1++;
				if(cnt1==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ correctOutputCapacitance);
					cnt1=0;
				}
			$("#userCapacitance").addClass('redbtn');
			$("#userCapacitance").effect("shake", {
				times : 2
			}, 30);
			$("#userCapacitance").html("<span class='label'>Re-Calculate</span>");
			setTimeout(function() {
				$("#userCapacitance").removeClass('redbtn');
				$("#userCapacitance").html("<span class='label'>Submit</span>");
			}, 4000);
			val = false;
		};
	  };
	  return val;
	};
	
	capacitorChart = {
        chart: {
            renderTo: 'jxgbox_capacitance',
            type: 'line',
            zoomType: 'x',
        },
        rangeSelector : {
				selected : 1
		},
        credits: {
            enabled: false
        },
        title: {
            text: 'Level vs Capacitance',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Level (cm)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Capacitance (µF)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return 'X = ' + this.x + '  Y = ' + this.y.toFixed(2);
            }
        },
        series: []
    }//capacitor chart
    
    currentChart = {
        chart: {
            renderTo: 'jxgbox_current',
            type: 'line',
            zoomType: 'x',
        },
        rangeSelector : {
				selected : 1
		},
        credits: {
            enabled: false
        },
        title: {
            text: 'Level Vs Current',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Level (cm)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Current (mA)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return 'X = ' + this.x + ' Y = ' + this.y.toFixed(2);
            }
        },
        series: []
    }//current
    
    obj.plotData_capacitance  = function () {
	        capacitorChart.series = [];
	        capData = [];
	           var id = CapCollection.length;
		       var c = CapCollection.get(id);
		       var Capacitane = c.get('capArray')
	        if (Capacitane.length != 0 && nextSetValue == 0) {
	            capData.push(Capacitane);
	        } else {
	            capData = storeDataCap;
	            capData.push(Capacitane);
	        }
			
	        for (var i = 0; i < capData.length; i++) {
	            capacitorChart.series.push({
	                name: '',
	                data: []
	            });
	            capacitorChart.series[i].name = "Capacitance Graph " + (i + 1);
	            capacitorChart.series[i].data = capData[i];
	        }
	        var chart = new Highcharts.Chart(capacitorChart);
    }//plotData_capacitance
    
    obj.plotData_current = function () {
		        currentChart.series = [];
		        currentData = [];
		       var id = CapCollection.length;
		       var c = CapCollection.get(id);
		       var Current=c.get('curArray')
		        if (Current.length != 0  && nextSetValue == 0) {
		            currentData.push(Current);
		        } else {
		            currentData = storeDataCurrent;
					//alert(currentData)
		            currentData.push(Current);
		        }
		
		        for (var i = 0; i < currentData.length; i++) {
		            currentChart.series.push({
		                name: '',
		                data: []
		            });
		           currentChart.series[i].name = "Current Graph " + (i + 1);
		           currentChart.series[i].data = currentData[i];
		        }
		        var chart = new Highcharts.Chart(currentChart);
		    }
		    
		createModel = function(){
			capModel = new CAPACITANCE.model.capacitanceModel();
			capModel.set({
				'h' : ht
			});
			capModel.set({
				'key' : key
			});
			capModel.set({
				'service' : service
			});
		}
		    
		obj.next = function(){
			key++
			alert("Change inner radius(r1) for Comparison");
			$("#selectBox2").val('').trigger("liszt:updated");
			$("#selectBox4").val('').trigger("liszt:updated");
			$('#userInput').attr({'value':'Enter your Output'});
			storeDataCurrent = currentData;
			storeDataCap = capData;
			outputCapacitanceArray = [];
        	currentArray = [];
			rectangle.remove();
			$("#over").hide("slide",{ direction: "right" }, 3000);
       		$("#exp").show("slide",{ direction: "left" }, 3000); 
       		$("#spanVal").attr('disabled', true);
       		$("#selectBox1").attr('disabled', true).trigger("liszt:updated");
       		CAPACITANCE.JSon.obj.htStatus = true;
       		$("#selectBox3").attr('disabled', true).trigger("liszt:updated");
       		$('#plotcapacitanceGraph').attr('disabled', true);
       		$('#plotcapacitanceGraph').removeClass('greenbtn');
       		$('#plotCurrentGraph').attr('disabled', true);
       		$('#plotCurrentGraph').removeClass('greenbtn');
       		CAPACITANCE.JSon.obj.servStatus = true;
       		counter++;
       		nextSetValue++
       		createModel();
       		$("#nextVal").attr('disabled', true)
		}//next
	$("#fomulabtn").click(function()
	{
		window.open("formula.html","Formula" ,"left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
	});
	return {
		obj : obj
	}
})();