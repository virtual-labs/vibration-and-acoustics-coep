PH.controller = (function() {
	var obj = {};
	var dataSet = [], dataset1 = [], dataset2 = [];

	obj.setPh = function(pH) {
		calibrationModel = new PH.model.calibrationModel();
		calibrationModel.set({
			'pH' : pH
		});
	}

	obj.phValueForCalibration = function() {
		obj1 = {};
		var ph = calibrationModel.get('pH');
		obj1 = calibrationModel.get('constants');
		var E = (obj1.E1 + 2.3026 * (obj1.R * (obj1.T / obj1.F) * obj1.p));
		var s = parseFloat((E * 1000).toFixed(2));
		s = Math.round(s);
		var resist = calibrationModel.get('resist');
		$("#t1").html("0");
		$("#t2").html("414");
		$("#t7").html("14");
		$("#t8").html("-414");
		switch(ph) {
			case 4 :
				$("#t3").html("4");
				$("#t4").html(s);
				$("#t5").html("7");
				$("#t6").html("0");
				dataSet = [[resist[0], 414], [resist[1], s], [resist[2], 0], [resist[3], -414]];
				break;
			case 9.2:
				$("#t3").html("7");
				$("#t4").html("0");
				$("#t5").html("9.2");
				$("#t6").html(s);
				dataSet = [[resist[0], 414], [resist[1], 0], [resist[2], s], [resist[3], -414]];
		}
		calibrationModel.set({
			'graphData' : dataSet
		});
	}

	obj.setSample = function(sample) {
		measurementModel = new PH.model.measurementModel();
		measurementModel.set({
			'sample' : sample
		});
		phValueForMeasurent();
		$("#phSample").prop("disabled", true); 
	}
	phValueForMeasurent = function() {
		 ph=[]; 
		ph.push(parseFloat(measurementModel.get('ph')));
		var ph1 = parseFloat(measurementModel.get('ph1'));
		 s =[]; 
		s.push(measurementModel.get('sample'));
		
		var E1 = 0, R = 8.3144, T = 298.15, F = 96485;
		var E = (E1 + 2.3026 * (R * (T / F) * ph1));
		var g1 = parseFloat((E * 1000).toFixed(2));
		for(var i=0;i<s.length && ph.length ;i++)
				{
				pHtable='<tr>'+
									'<td align="center">'+s[i]+'</td>'+
									'<td align="center">'+ph[i]+'</td>'+
						'</tr>';
				}
				$("#phTable #sample").append(pHtable);	
		//alert(g1);
		for(var i=0;i<ph.length;i++)
		{
		$("#temp2").html(ph[i]);
		}
		measurementModel.set({
			'ans' : g1
		});
		for(var i=0;i<ph.length;i++)
		{
		dataset1 = [[7, 0], [0, 414], [14, -414], [ph[i], g1]];
		}
	}
	cnt=0;
	obj.checkUser = function(ans) {
		var g1 = parseFloat(measurementModel.get('ans'));
		 ans1=[];
		 ans1.push(parseFloat(measurementModel.get('ans')));
		var g2 = Math.round(g1);
		var high = g1 + 0.5;
		var low = g1 - 0.5;
		if(!(isNaN(ans))) {
			if(g1 == ans || g2 == ans || (ans <= high && ans >= low)) {
				$("#submitMeasure").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#submitMeasure").html("<span class='label'>Submit</span>");
				}, 3000);
				
				for(var i=0;i<ans1.length;i++)
				{
				pHtable='<tr>'+
									'<td>'+ans1[i]+'</td>'+
						'</tr>';
				}	
				$("#phTable #output").append(pHtable);
				$("#phSample").prop("disabled", false); 
				
			} else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer.Correct Answer is "+ g1);
					
					cnt=0;
				}
				$("#submitMeasure").addClass('redbtn');
				$("#submitMeasure").effect("shake", {
					times : 2
				}, 60);
				$("#submitMeasure").html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$("#submitMeasure").removeClass('redbtn');
					$("#submitMeasure").html("<span class='label'>Submit</span>");
				}, 4000);
			}
		} else {
			alert("Enter Numeric value");
		}
	};
	
	obj.getTemperature = function(){
		var temp = rand(0, 50);
		return temp;
	}
	
	function rand(min,max) 
	{ 
		return Math.round(min + Math.random()*(max-min));
	}
	
	obj.calculatePhTemp = function(){
		var t = parseInt($('#Temperature').html());
		var ph = parseFloat(measurementModel.get('ph'));
		var ph1 = parseFloat(measurementModel.get('ph1'));
		var	E1 = 0, R = 8.3144, T = 273.15 + t, F = 96485;
		var E = E1 + 2.3026 * (R * (T/F) * ph1);
		var g = parseFloat((E * 1000).toFixed(2));
		$("#temp1").html(t);
		$("#temp3").html(g);
		var g1 = parseFloat(((E1+2.3026*(R*(T/F)*7)) * 1000).toFixed(2));
		var g2 =  parseFloat(-(((E1+2.3026*(R*(T/F)*7)) * 1000).toFixed(2)));
		dataset2 = [[7, 0], [0, g1], [14, g2], [ph, g]];
	}
	
	var graphOne = {
		chart : {
			renderTo : 'jxgbox_gphone',
			type: 'line',
			zoomType: 'x',
		},
		rangeSelector : {
			selected : 1
		},
		credits : {
			enabled : false
		},
		title : {
			text : 'pH Vs Output(mV)',
			x : -20
		},
		xAxis : {
			title : {
				text : 'pH'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'output (mV)'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		tooltip : {
			formatter : function() {
				return 'X = ' + this.x + '  Y = ' + this.y.toFixed(2);
			}
		},
		series : []
	}

	obj.plott = function() {
		$('#measurementLevel').attr({
			'disabled' : false
		});
		$('#measurementLevel').addClass('greenbtn');
		graphOne.series = [];
		graphData = [];
		var data = calibrationModel.get('graphData');
		if(data != 0) {
			graphData.push(data);
		}

		for(var i = 0; i < graphData.length; i++) {
			graphOne.series.push({
				name : '',
				data : []
			});
			graphOne.series[i].name = "Graph " + (i + 1);
			graphOne.series[i].data = graphData[i];
		}

		var chart = new Highcharts.Chart(graphOne);
	}
	
	var graphTwo = {
			chart: {
				renderTo: 'jxgbox_gphtwo',
				type: 'line',
				zoomType: 'x',
			},
			rangeSelector: {
				selected : 1
			},
			credits: {
				enabled: false
			},
			title: {
				text: 'pH Vs Output(mV)',
				x: -20 
			},
			xAxis: {
				title: {
					text: 'pH'
				},
				labels: {
					formatter: function () {
						return this.value;
					}
				}
			},
			yAxis: {
				title: {
					text: 'Output(mV'
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
		} 
	
	obj.plotTemperature = function() {
		graphTwo.series = [];
		var data = [];
		dataset1 = dataset1.sort(function(a,b){return ((a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0));});
		data.push(dataset1);
		dataset2 = dataset2.sort(function(a,b){return ((a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0));});
		data.push(dataset2);
		for(var i = 0; i < data.length; i++) {
			graphTwo.series.push({
				name : '',
				data : []
			});
			graphTwo.series[i].name = "Graph " + (i + 1);
			graphTwo.series[i].data = data[i];
		}
		var chart = new Highcharts.Chart(graphTwo);
	}
	return {
		obj : obj
	}
})();
