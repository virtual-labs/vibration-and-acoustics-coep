
THERMOCOUPLE.controller = (function() {
	var obj = {};
	 var i=1, stModel, tempResistArray = [], nxt = 0, graphDataContainer = [], storeDataStatic = [], staticGraphData = [], dynamicArray = [], WSarray = [], thermovelArray = []
	 var staticCollection = new THERMOCOUPLE.collection.staticCollection();
	 var DynamicModel = new THERMOCOUPLE.model.dynamicModel();
	  var DynamicCollection = new THERMOCOUPLE.collection.dynamicCollection();
	 var paper = new Raphael(document.getElementById('staticDiagram'), 396, 476);
	 
	obj.setID = function(){
    	stModel = new THERMOCOUPLE.model.staticModel();
    	stModel.set({'key' : i});
    }
    
    obj.setM = function(thermoCoupleType){
		stModel.set({thermoCoupleType : thermoCoupleType});
	}//setM
	
	obj.setR = function(refTemp){
		stModel.set({refTemp : refTemp});
	}//setR
	
	obj.drawStaticDiag = function(){
			var staticContainer = paper.path("M 110 200 l 0 250 l 153 0 l 0 -250").attr({stroke:'#000000'});
			var rect = paper.rect(111.5,270,149.5,179).attr({fill:'skyblue',stroke:'skyblue'});
			var rod = paper.path("M 184 213 l 0 220 l 10 0 l 0 -220").attr({stroke:'#000000',fill:'white'});
			var metalTip = paper.path("M 184 433 l 5 10 5 -10 ").attr({stroke:'#000000',fill:'white'});
			var head = paper.path("M 182 213 l 14 0 l 0 -18 l 11 -12 l 0 -40 l -36 0 l 0 40 l 11 12 l 0 18").attr({stroke:'#000000'});
			wireRight = paper.path("M 194 143 c 0,-70 40,40 60,-13").attr({stroke:"red"});
			 var negative = paper.text(200, 135, "-").attr({'font-size':14});
			wireLeft = paper.path("M 183 143 c 6,-90 55,25 63,-18").attr({stroke:"BlueViolet "});
			var positive = paper.text(177, 135, "+").attr({'font-size':14});
			var thermoText = paper.text(310,168,"Thermocouple with Head").attr({'font-size':14});
			
	}
	
	obj.thermoCoupleType = function(){
		var selectCase = stModel.get('thermoCoupleType');
		$("#T10").attr('value', selectCase);
		//selectCase = opt;
		wireLeft.remove();
		switch(selectCase){
				case "Select" :
				$("#thermo").html("");
				$("#showTempRange").html("");
				break;
				
				case "J" :
				$("#thermo").html("Iron(+)Versus Constantan(-)");
				$("#showTempRange").html("Temp: (0&degC to 760&degC)");
				bare = "DarkGray "
				break;
				
				case "K" :
				$("#thermo").html("Nickel-10% Chromium(+)Versus Nickel-5%(-)(Aluminum Silicon)");
				$("#showTempRange").html("Temp: (0&degC to 1370&degC)"); 
				bare = 'Gold '
				break;
				
				case "R" :
				$("#thermo").html("Platinum-13% Rhodium(+) Versus Platinum(-)");
				$("#showTempRange").html("Temp: (0&degC to 1000&degC)");
				bare = 'black'
				break;
				
				case "S" :
				$("#thermo").html("Platinum-10% Rhodium(+) Versus Platinum(-)");
				$("#showTempRange").html("Temp: (0&degC to 1750&degC)");
				bare = 'black'
				break;
				
				case "T" :
				$("#thermo").html("Copper(+) Versus Constantan(-)");
				$("#showTempRange").html("Temp: (-160&degC to 400&degC)");
				bare = 'blue'
				break;
				
				case "E" :
				$("#thermo").html("Nickel-10% Chromum(+)versus<br>Constant(-)");
				$("#showTempRange").html("Temp: (100&degC to 1000&degC)");
				bare = 'BlueViolet '
				break;
			}//End switch
			wireLeft = paper.path("M 183 143 c 6,-90 55,25 63,-18").attr({stroke:bare});
			metal = selectCase;
				$("#Static-Output").append("<label class='text'>Thermocouple Type: " + metal + "</label>");
			return true;
	}//thermoCoupleType
	
		obj.resist = function(){
				res = stModel.get('refTemp')
				//console.log('refTemp: '+Call.obj.res);
				$("#Static-Output").append("<br/><br/><label class='text'>Reference Temp: " + res + "</label>");
			}//resist
			
		obj.GetTemperature = function() {
			if(metal != "T" && metal != "E" && metal != "R")
					T1 = rand(0, 400); //400
				else if(metal == "E" )
					T1 = rand(-190, 200);
				else if(metal == "R")
					T1 = rand(0, 200);
				else if(metal == "T")
					T1 = rand(-190, 400);
				getConstants();
				
		}//GetTemperature
		
		rand = function(min, max){
			return Math.round(min + Math.random() * (max - min));
		}//rand
		
		getConstants = function(){
			
			if(!!metal && !! res) {
				var reftemp  = T1 - parseInt(res);
				switch(metal) {
					case "J" :
						if(T1 > 0 && T1 <= 200)
							P2 = -1.431 * Math.pow(10, 5), P1 = 1.974 * Math.pow(10, 4), P0 = -0.0217 - reftemp
						else if(T1 > 200 && T1 <= 400)
							P0 = 7.348 - reftemp, P1 = 1.776 * Math.pow(10, 4), P2 = 9883
						break;
		
					case "K":
						if(T1 > 0 && T1 <= 200)
							P2 = 1.672 * Math.pow(10, 5) , P1 = 2.269 * Math.pow(10, 4), P0 = 2.938- reftemp
						else if(T1 > 200 && T1 <= 400)
							P0 = -253.6 - reftemp, P1 = 6.955 * Math.pow(10, 4), P2 = -1.878 * Math.pow(10, 6) 
						break;
		
					case "R":
						if(T1 > 0 && T1 <= 200)
							P2 = -2.162 * Math.pow(10, 7) , P1 = 1.637 * Math.pow(10, 5), P0 = 3.199- reftemp
						
						break;
		
					case "S":
						if(T1 > 0 && T1 <= 200)
							P2 = -1.318 * Math.pow(10, 7), P1 = 1.571 * Math.pow(10, 5), P0 = 2.615- reftemp
						else if(T1 > 200 && T1 <= 400)
							P0 = 2.615 - reftemp, P1 = 1.571 * Math.pow(10, 5), P2 = -1.318 * Math.pow(10, 7) 
						break;
		
					case "T":
						if(T1 > 0 && T1 <= 200)
							P2 = -4.228 * Math.pow(10, 5), P1 = 2.515 * Math.pow(10, 4), P0 = 0.3198- reftemp//50microv step
							//Call.obj.P2 = -6.957 * Math.pow(10, 4), Call.obj.P1 = 2.32 * Math.pow(10, 4), Call.obj.P0 = 1.65- Call.obj.T1  1mv step
						else if(T1 > 200 && T1 <= 400)
							P0 = 0.3629 - reftemp, P1 = 2.498 * Math.pow(10, 4), P2 = -3.503 * Math.pow(10, 5) //50microv step
							//Call.obj.P0 = 1.65 - Call.obj.T1, Call.obj.P1 = 2.32 * Math.pow(10, 4), Call.obj.P2 = -6.957 * Math.pow(10, 4)  1mv step
						else if(T1 < 0 & T1 > -190)
							P2 = -1.93 * Math.pow(10, 6), P1 = 2.319 * Math.pow(10, 4), P0 = -0.5278
						break;
		
					case "E" :
						if(T1 > 0 && T1 < 200)
							P2 = -1.22 * Math.pow(10, 5), P1 = 1.64 * Math.pow(10, 4), P0 = 0.6736 - (T1 - res)
						else if(T1 < 0 & T1 > -190)
							P2 = -5.041 * Math.pow(10, 5), P1 = 1.643 * Math.pow(10, 4), P0 = -0.2504 - (T1 - res)
						//constants for 200 to 400 fluctuating...
						break;
				}//End switch
				
				$("#Temperature").html(T1);
				if(T1 >= 0)
				  {
				  	$("#Static-Output").append("<br/><br/><label class='text'>Measurement Temp: "+ T1 +"</label><br/>")
				  	T2 = calculateRoot();
				  } else
				  		 alert("Its a Negative Value. Please re-select")
				
				}
		}//getConstants
		
		calculateRoot = function() {
			var root = Math.pow(P1, 2) - (4 * P0 * P2)
		
			var answer1 = (((-P1 + (Math.sqrt(root))) / (2 * P2)) * Math.pow(10, 3)).toFixed(2);
			var answer2 = (((-P1 - (Math.sqrt(root))) / (2 * P2)) * Math.pow(10, 3)).toFixed(2);
			//alert("Root1: "+answer1+" Root2: "+answer2)
			if(answer1 > 0)
			{
			//alert(answer1)
				return answer1;}
			else
			{//alert(answer2)
				return answer2}
	}//calculateroot
	
	obj.userOutput = function(Ru){
	var val
		if(isNaN(Ru))
			alert("Please Enter Numerical Digit");
		else {
		$("#Static-Output").append("<br><label class='text'>Your Answer: "+ Ru +"</label>");
			}
		if((T2 == Ru) || ((T2 > (Ru - 0.05)) && (T2 < (Ru + 0.05)))) {
			$("#Submit").html("<span class='label'>Correct</span>");
			setTimeout(function(){$("#Submit").html("<span class='label'>Submit</span>");},3000);
			
			T1=parseInt(T1); T2=parseFloat(T2);
			tempResistArray.push([T2, T1]) 
		if(tempResistArray.length >= 3) {
				$("#PlotStatic, #nextSet, #NextLevel").attr('disabled', false);
				$("#PlotStatic, #nextSet, #NextLevel").addClass('greenbtn');
				stModel.set({staticGraphPts : tempResistArray});
						staticCollection.add([stModel]);
						//console.log('collection: '+ JSON.stringify(staticCollection));
			}
			val = true
		} else {
			$("#Submit").effect("shake", {times:2}, 60 );	
            	$("#Submit").html("<span class='label'>Re-Calculate</span>");
            	setTimeout(function(){$("#Submit").html("<span class='label'>Submit</span>");},3000);
				val = false
			}
			return val
	}//userOutput
	
	obj.next = function(){
			storeDataStatic = staticGraphData;
			nxt++;
			tempResistArray = [];
			i++;
			obj.setID();
	}
		
	obj.nxtLevel = function(){
		var temp = stModel.get('staticGraphPts')
		if(temp == [])
					alert('please complete static characteristics')
				else
				{
					$("#static").hide("slide",{ direction: "left" }, 1000);
	       					
	       			$("#dynamic").show("slide",{ direction: "right" }, 1000);
					
	       			paper1 = new Raphael(document.getElementById('dynamicDiagram'), 396, 676);
	       		}
	}// nxtLevel
	
	var	staticGraph = {
	
			chart : {
				renderTo : 'graph'
			},
			credits : {
				enabled : false
			},
			title : {
				text : "Temprature vs Resistance",
				x : -20
			},
			xAxis : {
				title : {
					text : "Temprature"
				},
				labels : {
					formatter : function() {
						return this.value;
					}
				}
			},
			yAxis : {
				title : {
					text : 'Resistance (ohm)'
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
	
	obj.plotStaticData = function(){
		staticGraph.series = [];
		staticGraphData = [];
		var id = staticCollection.length;
	           
		       var c = staticCollection.get(id);
		       //alert(c)
		       var Static = c.get('staticGraphPts')
		       
	        if (Static.length != 0 && nxt == 0) {
	            staticGraphData.push(Static);
	        } else {
	            staticGraphData = storeDataStatic;
	            staticGraphData.push(Static);
	        }
			
	        for (var i = 0; i < staticGraphData.length; i++) {
	            staticGraph.series.push({
	                name: '',
	                data: [],
	                type: ''
	            });
	            staticGraph.series[i].name = "Static Caracteristics " + (i + 1);
	            staticGraph.series[i].data = staticGraphData[i];
	            staticGraph.series[i].type = 'line';
	            
	        }
	        
	       // console.log(staticGraphData)
	        var chart = new Highcharts.Chart(staticGraph);
        }//obj.plotStaticData 
	
	
	obj.animateBare = function(){
		 bareElement();
			  paper1.path("M 160 420").animate({path: "M 160 420 l 30 0",stroke:'#000', opacity:1 },1000,function(){
			    paper1.path("M 190 420").animate({path: "M 190 420 l 0 90",stroke:'#000', opacity:1 },2000,function(){
			    	paper1.path("M 190 510").animate({path: "M 190 510 l -15 20",stroke:'#000', opacity:1 },1000,function(){
			    	paper1.path("M 175 530").animate({path: "M 175 530 l -15 -20",stroke:'#000', opacity:1 },1000,function(){
			    		paper1.path("M 160 510").animate({path: "M 160 510 l 0 -90",stroke:'#000', opacity:1 },2000,function(){
 			    			var bareElemWithSheathWire = paper1.path("M 170 420").animate({path : "M 170 420 l 0 -33",stroke: bare},1000,function(){
 								paper1.path("M 180 420").animate({path : "M 180 420 l 0 -33",stroke: "red"},1000);
			    		})
			    	 })
			    	})
			   	  }) 
			    })
			  })
			  
			}//animateBare	
			
		bareElement = function(){
			opt6 = $("#T10").val();
			var bare
				switch(opt6) {
					case "J":
						k = 46, row = 8535; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 345;
							
						break;
			
					case "K":
						k = 35, row = 8738; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 380;
						
						break;
			
					case "T":
						k = 160, row = 8902; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 316;
						
						break;
			
					case "E":
						k = 33, row = 8825; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 336;
						
						break;
					case "R":
						k = 55, row = 16628; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 99;
						
						break;
				
					case "S":
						k = 53, row = 16745; L = (100 / (10 * 10 * 10)), x1 = 1.25 / (10 * 10 * 10), s = 99;
						
						break;
					}
					
					value1();
		}//bareElemen
		
		value1 = function(){
			tough1 = ((x1 / k) * row * L * s);
				temp1 = (parseFloat(tough1)).toFixed(2);
				
				alert("The Time Constant is  " + temp1 + " seconds");
				$("#Dynamic-Output").append("<br><label>Time constant is: " + temp1 + "</label>");
				 var r = T1 * 0.632, u = temp1 * 5;
				 
				temp1 = parseFloat(temp1)
				dynamicArray.push([0,0],[temp1,r],[u,T1])
				 
		         DynamicModel.set({'bare':dynamicArray});
		        DynamicCollection.add([DynamicModel])
		}
		
		obj.animateSheath = function(){
			var t = "M 210 540 l 0 -310" + "M 140 230 l 0 310" + "M 160 550 l 30 0" + "M 160 550 s -10,0 -20,-10" + "M 190 550 s 10,0 20,-10" + "M 210 230 l 2 0 l 0 -30 l 18 -10 l 0 -40 l -110 0 l 0 40 l 18 10 l 0 30 l 2 0" + "M 150 378 l 0 152" +  "M 200 387 l 0 143" + "M 160 540 l 30 0" + "M 160 540 s -5,0 -10,-10" + "M 190 540 s 5,0 10,-10" + "M 140 380 c 20,-10 20,20 70,5" 	
			 
					
					paper1.path("M 175 230").animate({path :t,opacity:1},700,function(){
						var l1, l2
							for(var i = 400; i < 550; i += 10)
							{
								 l1 = paper1.path("M 210 " + i + " l -10 -10")
							}	
							
							for(var i = 390; i < 540; i += 10)
							{
								 l2 = paper1.path("M 150 " + i + " l -10 -10")
							}	
							var lines1 = paper1.path("M 203 545 l -9 -8" + "M 196 549 l -12 -10" + "M 185 550 l -12 -10" + "M 174 550 l-12 -10" + "M 162 550 l -23 -21");
							var  left =	paper1.path("M 170 150 l 0 -60").attr({stroke : bare}) 
			 				var  right =	paper1.path("M 180 150 l 0 -60").attr({stroke : "red"}) 	
					})	
		}//animate sheath
		
		
		obj.withsheathMaterial = function(){
			
			opt1 = $("#WS1").val();
				//alert(opt1)
				switch(opt1) {
					case "SS 304":
						L = (15 / (10 * 10 * 10)), k = 21.4, row = 8030, s = 500;
						break;
					case "SS 316":
						L = (15 / (10 * 10 * 10)), k = 21.4, row = 7990, s = 500;
						break;
					case "SS 410":
						L = (15 / (10 * 10 * 10)), k = 24.9, row = 7750, s = 460;
						break;
				}
				$("#Dynamic-Output").append("<label>Time constant for withsheath = (x/k)* &#961 *L*s</label><br>");
				$("#Dynamic-Output").append("<label>&tau; = &tau;_bareelement+&tau;_withair+&tau;_withsheath</label><br>");
				
		};
		
		obj.withsheathThickness = function(){
			opt2 = $("#WS2").val();
				x = parseFloat(opt2 / (10 * 10 * 10));
				
				tough2 = ((x / k) * row * L * s);
					air()
				temp3 = parseFloat(((tough1 + tough2 + temp2)).toFixed(2));
			
				alert("The Time Constant is  " + temp3 + " seconds..");
				//alert(temp3);
				$("#tempConstant").html("<br><label>At Time Constant : " + temp3 + "sec.</label>");
				$("#tempConstant").append("<br><label>Response Time : " + temp3 * 5 + "sec.</label>");
				$("#Dynamic-Output").append("<br><label>The time constant is: " + temp3 + " for " + opt1 + "</label>");
				$("#Dynamic-Output").append("<br><label>where x =" + x + ";k = " + k + ";&#961 = " + row + ";L = " + L + "; s" + s + "</label>");
				
				var r1 = T1 * 0.632, u1 = temp3 * 5;
				WSarray.push([0,0], [temp3, r1], [u1, T1]);
				
				
				DynamicModel.set({'withSheath':WSarray});
		        //console.log(WSarray)
		}
		
		air = function(){
				x = (0.2 / (10 * 10 * 10)), L = (15 / (10 * 10 * 10)), k = 0.025, row = 1.20, s = 1005;
				temp2 = ((x / k) * row * L * s);
			}
			
		obj.materialForThermowell = function(){
			opt3 = $("#T1").val();
				//alert(opt3)
				switch(opt3) {
					case "SS304":
						L = (15 / (10 * 10 * 10)), k = 21.4, row2 = 8030, s = 500;
						break;
					case "SS316":
						L = (15 / (10 * 10 * 10)), k = 21.4, row2 = 7990, s= 500;
						break;
					case "SS410":
						L = (15 / (10 * 10 * 10)), k = 24.9, row2 = 7750, s = 460;
						break;
				}
		}
		
		obj.thicknessForThermowell = function(){
			opt4 = $("#T2").val();
				//withthermo();
				x = parseFloat(opt4 / (10 * 10 * 10));
				//alert(x);
				tough3 = ((x / k) * row * L * s);
		}
		
		
		obj.fillmaterialForThermowell = function(){
			opt5 = $("#T3").val();
				switch(opt5) {
					case "MgO powder":
						L = (15 / (10 * 10 * 10)), x = (2.5 / (10 * 10 * 10)), k = 26.8, row = 3580, s = 877;
						break;
					case "Silicon Compound":
						L = (15 / (10 * 10 * 10)), k = 3, row = 3210, s = 800, x = (2.5 / (10 * 10 * 10)); // k value has to be changed
						break;
				}
				tough4 = ((x / k) * row * L * s);
				temp4 = parseFloat(((tough4 + tough1 + tough3 + tough2 + temp2)).toFixed(2));
				//alert(temp4)
				//alert("The Time Constant is" + temp4 + " seconds..");
				$("#Dynamic-Output").append("<br><label>Time constant is: " + temp4 + " sec." + " for " + opt1 + "</label>");
				$("#Dynamic-Output").append("<br><label>where x = " + x + ";k = " + k + ";&#961 = " +row + ";L = " + L + "; s=" + s + "</label>");
				
				var r2 = T1 * 0.632, u2 = temp4 * 5;
				thermovelArray.push([0,0], [temp4, r2], [u2, T1]);
				
				DynamicModel.set({'thermowell':thermovelArray});
		        
				//alert(JSON.stringify(thermovelArray))
		}
		
		obj.animateThermowell  = function () {
				var thermowelPath = " M 138 230 l -15 0 l 0 310 " + "M 212 230 l 15 0 l 0 310" + "M 200 565 s 25,0 27,-26" + "M 147,565 s -25,0 -24,-26" + "M 200 565 l -53 0"
				
				paper1.path("M 175 540").animate({path :thermowelPath},1000,function(){
					for(var i=235;i<550;i+=5)
					{
						paper1.circle(216,i,1).attr("fill","black");
						paper1.circle(135,i,1).attr("fill","black");
						i=i+5;
						
						paper1.circle(223,i,1).attr("fill","black")
						paper1.circle(128,i,1).attr("fill","black");
						
					}
					
				for(var i=140;i<210;i+=5)
					{
						paper1.circle(i,557,1).attr("fill","black");
						
						i+=5;
						
						paper1.circle(i,561,1).attr("fill","black")
					}
					
					paper1.circle(208,551,1).attr("fill","black")
					paper1.circle(214,558,1).attr("fill","black")
					paper1.circle(138,551,1).attr("fill","black")
					paper1.circle(132,556,1).attr("fill","black")
				});
			}
			
	var	dynamicChart = {
	        chart: {
	            renderTo: 'jxgbox_dynamic',
	            type: 'spline'
	        },
	        credits: {
	            enabled: false
	        },
	        title: {
	            text: 'Temperature Vs Time',
	            x: -20 //center
	        },
	        xAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            labels: {
	                formatter: function () {
	                    return this.value;
	                }
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Time (sec)'
	            },
	            labels: {
	                formatter: function () {
	                    return this.value;
	                }
	            }
	        },
	        tooltip: {
	            formatter: function () {
	            	return '<b>'+ this.series.name +'</b><br/>'+'X = ' + this.x + ' Y = ' + this.y.toFixed(2);
	                
	            }
	        },
	        series: [{
	        	name : 'Bare',
	        	data : []},
	        	{
	        	name : 'Withsheath',
	        	data : []},
	        	{
	        	name : 'Thermowell',
	        	data : []}]
    }//dynamic
    
    obj.plotDynamicData = function(){
			//dynamicChart.series = [];
			dynamicData = [];
			var bare = DynamicModel.get('bare');
			var ws = DynamicModel.get('withSheath');
			var th = DynamicModel.get('thermowell')
			if(ws.length == 0 && th.length == 0)
			{
				dynamicChart.series[0].data = bare;
			}
			else if(th.length == 0){
				dynamicChart.series[0].data = bare;
			    dynamicChart.series[1].data = ws;
			}
				else if(th.length != 0){
					dynamicChart.series[0].data = bare;
			   		 dynamicChart.series[1].data = ws;
			   		  dynamicChart.series[2].data = th;
				}
			
		        var chart = new Highcharts.Chart(dynamicChart);
		}
		
	return {
		obj : obj
	}
	
})();
