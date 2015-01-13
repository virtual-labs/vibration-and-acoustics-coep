STRAIN.controller = (function() {
	var obj = {}, key = 1, nxt = 0,  s1, s2, bridge, outputVoltage = 0;
	var paper = new Raphael(document.getElementById('canvas_container'), 620, 620);
	obj.dSet = {};
	var measurementModel, posModel = new STRAIN.model.changePosModel(), tempModel = new STRAIN.model.temperatureModel();
	var measurementCollection = new STRAIN.collection.measurementCollection();
	var paths, pathsRes, weightBox1, weightext, path3938, tempR = 1, sres = [], p = [], graph1 = [], storeData = []
	var graphDataContainer = [], graphDataContainer1 = [], graphDataContainer2 = [],valueOfRgForl3Graph=0.0;
	//set id of the model
	obj.setId = function() {
		measurementModel = new STRAIN.model.measurementLevelModel();
		measurementModel.set({
			'key' : key
		});
	}
		rText1 = paper.text(225,140,"R").attr({"font-size": "12px"});
		rText2 = paper.text(220,290,"R").attr({"font-size": "12px"});
		rText3 = paper.text(375,140,"R").attr({"font-size": "12px"});
		rText4 = paper.text(370,290,"R").attr({"font-size": "12px"});
		rText1.hide();
		rText2.hide();
		rText3.hide();
		rText4.hide();
	
		sgText1 = paper.text(415,100,"S.G.").attr({"font-size": "12px"});
		sgText2 = paper.text(190,105,"S.G.").attr({"font-size": "12px"});
		sgText3 = paper.text(180,260,"S.G.").attr({"font-size": "12px"});
		sgText4 = paper.text(420,265,"S.G.").attr({"font-size": "12px"});
		sgText1.hide();
		sgText2.hide();
		sgText3.hide();
		sgText4.hide();
	
	//Function To draw circuit diagram
	obj.makeDiagram = function() {
			cantilever_vertical = paper.rect(3, 415, 20, 120).attr({
			fill : '#000'
		});
		straingauge = paper.rect(55, 470, 45, 10).attr({
			fill : '#00F'
		});
		slider = paper.rect(25, 485, 441, 17).attr({
			'fill' : '#000',
			'stroke-width' : '4'
		});
		voltageSpace = paper.path("M 50 210 l 0 35").attr({
			stroke : '#ddd',
			'stroke-width' : 1,
		});
		dashedEnclosedContainer = paper.path("M 5 410 l 460 0 l 0 -390 l -460 0 l 0 390 z").attr({
			stroke : '#000',
			'stroke-width' : 3,
			'stroke-dasharray' : "-.."
		});
		strainGaugeConnectorLine = paper.path("M 78 412 l 0 60").attr({
			stroke : '#000',
			'stroke-width' : 3,
			'stroke-dasharray' : "-"
		});
		var upperBatteryToBridge = paper.path("M 299 80 L 299 40 L 50 40 L 50 210  ").attr({//upper
			stroke : '#ddd',
			'stroke-width' : 1
		});
		var lowerBatteryToBridge = paper.path("M 50 245 L 50 385 L 299 385 L 299 350 ").attr({//lower
			stroke : '#ddd',
			'stroke-width' : 1
		});
		defaultStrain = paper.set();
		node1 = paper.path("m 299 80 l -50 50");
		volt1 = paper.path("m 249 130 l  0 10 l -10 0 l 0 10 l -10 0 l 0 10 l -10 0 ");
		node2 = paper.path("m 219 160 l -55 55 ");
		node3 = paper.path("m 164 215 l 50 50");
		volt2 = paper.path("m 214 265 l 0 10 l 10 0 l 0 10 l 10 0 l 0 10 l 10 0 ");
		node4 = paper.path("m 244 295 l 55 55 ");
		node5 = paper.path("m 299 350 l 50 -50");
		volt3 = paper.path("m 349 300 l 0 -10 l 10 0 l 0 -10 l 10 0 l 0 -10 l 10 0  ");
		node6 = paper.path("m 379 270 l 55 -55 ");
		node7 = paper.path("m 434 215 l -50 -50");
		volt4 = paper.path("m 384 165 l 0 -10 l -10 0 l 0 -10 l -10 0 l 0 -10 l -10 0  ");
		node8 = paper.path("m 354 135 l -55 -55 ");
		defaultStrain.push(node1, volt1, node2, node3, volt2, node4, node5, volt3, node6, node7, volt4, node8);
		defaultStrain.attr({
			stroke : '#ddd',
			'stroke-width' : 2
		});
		
		slider2 = paper.rect(24, 485, 441, 13).attr({
					'fill' : '#000',
				});
				slider3 = paper.rect(24, 500, 441, 6).attr({
					'fill' : 'grey',
					'stroke' : 'grey'
				});
				
	}//obj.makeDiagram
	
	obj.makeWBox = function(xPos,wt){
		// Drae wieghtBox
		
				xPos = eval(xPos);
				obj.dSet = paper.set();
				path3938 = paper.rect(xPos, 497, 20, 10).attr({
					'fill' : '#ddd',
					'stroke-width' : '1'
				});
				hook = paper.path("M "+(xPos+10)+" 508 l 0 10 c 0 0 13 0 13 13 c 0 0 0 13 -15 5").attr({
					stroke : "#000",
					'stroke-width' : 3
				});
				rop = paper.path("M "+(xPos+10)+" 537 l 0 10 ").attr({
					stroke : "#000",
					'stroke-width' : 3
				});
				weightBox1 = paper.path("M "+(xPos-10)+" 546 l 40 0 10 20 l -55 0 z").attr({
							stroke : "#000",
							'stroke-width' : 1,
							fill : '#000'
						});
				weightext = paper.text((xPos+10), 555, wt).attr({	
							stroke : "#eee",
							'font-size' : 13
				});
				obj.wtText = weightext;
				
						
			obj.dSet.push(path3938,hook,rop,weightBox1,weightext);		
	}//obj.makeWBox ends here
	
	
	obj.updateMaterial = function(material) {
		measurementModel.set({
			'material' : material
		});
		setMaterialColor();
	}//obj.updateMaterial
	setMaterialColor = function() {
		youngModulus = measurementModel.get('material');

		switch(youngModulus) {
			case 17000000:
				alpha = 0.004041;
				betag = 0.0000167;
				color = "#B87333";
				break;
			case 162000000:
				alpha = -0.000074;
				betag = 0.00001497;
				color = "brown";
				break;
			case 58000000:
				alpha = 0.0045;
				betag = 0.0000045;
				color = "green";
				break;
			case 15000000:
				alpha = 0.0013;
				betag = 0.0000085;
				color = "grey";
				break;
			case 20000000:
				alpha = 0.000145;
				betag = 0.000450;
				color = "silver";
				break;
		}
		if((paths) != undefined) {
			paths.attr({stroke : color});
		}
		if(pathsRes != undefined){
			pathsRes.attr({stroke : color});
		}
		if(bridge != undefined) {
				anim.attr({stroke : color});
				bridge.attr({stroke : color});
			}
	}

	obj.voltageChange = function(inputVoltage) {
		temp = 1;
		measurementModel.set({
			'inputVoltage' : inputVoltage
		});
		voltageSpace.remove();
		drawVoltage();

	}//obj.voltageChange
	drawVoltage = function() {
		var inputVoltage = measurementModel.get('inputVoltage');

		if((paths) != undefined) {
			myPath.stop(paths);
			temp = 1;
			paths.remove();
		}
		

		switch(inputVoltage) {
			case 5 :
				s = [{
					stroke : "M 30 210",
					time : 0
				}, {
					stroke : "l 45 0",
					time : 500
				}, {
					stroke : "M 40 218",
					time : 500
				}, {
					stroke : "l 20 0",
					time : 500
				}, {
					stroke : "M 50 218",
					time : 500
				}, {
					stroke : "l 0 166",
					time : 500
				}, {
					stroke : "l 249 0",
					time : 500
				}, {
					stroke : "l 0 -37",
					time : 500
				}, {
					stroke : "M 40 218",
					time : 500
				}, {
					stroke : "M 299 80",
					time : 500
				}, {
					stroke : "l 0 -40",
					time : 500
				}, {
					stroke : " l -249 0",
					time : 500
				}, {
					stroke : " l 0 170",
					time : 500
				}];
				drawnPath = s[0].stroke;
				myPath = paper.path(drawnPath).attr({
					"stroke-width" : 2,
					stroke : color
				});
				animateMyPath();
				break;
			case  10 :
				s = [{
					stroke : "M 30 210",
					time : 0
				}, {
					stroke : "l 45 0",
					time : 300
				}, {
					stroke : "M 40 218",
					time : 300
				}, {
					stroke : "l 20 0",
					time : 300
				}, {
					stroke : "M 30 226",
					time : 300
				}, {
					stroke : "l 45 0",
					time : 300
				}, {
					stroke : "M 40 234",
					time : 300
				}, {
					stroke : "l 20 0",
					time : 300
				}, {
					stroke : "M 50 235",
					time : 300
				}, {
					stroke : "l 0 150",
					time : 300
				}, {
					stroke : "l 249 0",
					time : 300
				}, {
					stroke : "l 0 -37",
					time : 300
				}, {
					stroke : "M 299 80",
					time : 300
				}, {
					stroke : "l 0 -40",
					time : 300
				}, {
					stroke : " l -249 0",
					time : 300
				}, {
					stroke : " l 0 170",
					time : 300
				}];
				drawnPath = s[0].stroke;
				myPath = paper.path(drawnPath).attr({
					"stroke-width" : 2,
					stroke : color
				});
				animateMyPath();
				break;
		}//switch

	};
	//drawVoltage

	animateMyPath = function() {
		if(temp < s.length) {
			drawnPath += s[temp].stroke;
			paths = myPath.animate({
				path : drawnPath
			}, s[temp].time, animateMyPath);
			temp++;
		}
	}//animateMyPath

	obj.resChange = function(resistance) {
		measurementModel.set({
			'resistance' : resistance
		});
		defaultStrain.remove();
		drawBridge();
		setBridgeOption();
	};
	//obj.resChange

	drawBridge = function() {
		var inputResistance = measurementModel.get('resistance');
		
		if((pathsRes) != undefined) {
			myPathRes.stop(pathsRes);
			tempR = 1;
			pathsRes.remove();
			if(bridge != undefined) {
				anim.remove();
				bridge.remove()
			}
		}
		switch(inputResistance) {
			case 120 :
				sgText1.hide();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				rText1.show();
				rText2.show();
				rText3.show();
				rText4.show();
				sres = [{
					stroke : "m 299 80",
					time : 0
				},{
					stroke : "l -57 57",
					time : 300
				}, {
					stroke : "l  0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -62 62",
					time : 300
				}, {
					stroke : "l 57 57",
					time : 300
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 62 62",
					time : 300
				}, {
					stroke : "l 57 -57",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 62 -62",
					time : 300
				}, {
					stroke : "l -57 -57",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -62 -62",
					time : 300
				}];
				break;
			case 350 :
				sgText1.hide();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				rText1.show();
				rText2.show();
				rText3.show();
				rText4.show();
				sres = [{
					stroke : "m 299 80",
					time : 0
				}, {
					stroke : "l -55 55",
					time : 300
				}, {
					stroke : "l  0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -60 60",
					time : 300
				}, {
					stroke : "l 55 55",
					time : 300
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 60 60",
					time : 300
				}, {
					stroke : "l 55 -55",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 60 -60",
					time : 300
				}, {
					stroke : "l -55 -55",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -60 -60",
					time : 300
				}];
				break;
			case 600 :
				sgText1.hide();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				rText1.show();
				rText2.show();
				rText3.show();
				rText4.show();
				sres = [{
					stroke : "m 299 80",
					time : 0
				}, {
					stroke : "l -50 50",
					time : 300
				}, {
					stroke : "l  0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -55 55",
					time : 300
				}, {
					stroke : "l 50 50",
					time : 300
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 55 55",
					time : 300
				}, {
					stroke : "l 50 -50",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 55 -55",
					time : 300
				}, {
					stroke : "l -50 -50",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l -55 -55",
					time : 300
				}];
				
				break;
			case 700 :
				sgText1.hide();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				rText1.show();
				rText2.show();
				rText3.show();
				rText4.show();
				sres = [{
					stroke : "m 299 80",
					time : 0
				}, {
					stroke : "l -47 47",
					time : 300
				}, {
					stroke : "l  0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -52 52",
					time : 300
				}, {
					stroke : "l 47 47",
					time : 300
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 52 52",
					time : 300
				}, {
					stroke : "l 47 -47",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 52 -52",
					time : 300
				}, {
					stroke : "l -47 -47",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -52 -52",
					time : 300
				}];
				break;
			case 1000 :
				sgText1.hide();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				rText1.show();
				rText2.show();
				rText3.show();
				rText4.show();
				sres = [{
					stroke : "m 299 80",
					time : 0
				}, {
					stroke : "l -43 43",
					time : 300
				}, {
					stroke : "l  0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l -45 45",
					time : 300
				}, {
					stroke : "l 43 43",
					time : 300
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 5",
					time : 100
				}, {
					stroke : "l 45 45",
					time : 300
				}, {
					stroke : "l 42 -42",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l 45 -45",
					time : 300
				}, {
					stroke : "l -42 -42",
					time : 300
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : " l -5 0",
					time : 100
				}, {
					stroke : "l 0 -5",
					time : 100
				}, {
					stroke : "l -45 -45",
					time : 300
				}];
				break;
		}//switch

		drawResPath = sres[0].stroke;
		myPathRes = paper.path(drawResPath).attr({
			"stroke-width" : 2,
			stroke : color
		});

		animateMyPathResis();

	}//drawBridge
	animateMyPathResis = function() {
		if(tempR < sres.length) {
			drawResPath += sres[tempR].stroke;
			pathsRes = myPathRes.animate({
				path : drawResPath
			}, sres[tempR].time, animateMyPathResis);
			tempR++;
		}
	}//animateMyPath
	setBridgeOption = function() {
		option = "<option>--select--</option>"
		var configVal = measurementModel.get('configVal');
		var n = 0;
		_.each(configVal, function(result) {
			option += "<option>" + configVal[n] + "</option>";
			n++;
		});
		$('#config').html(option);
		$('#config').trigger("liszt:updated");
	}

	obj.configChange = function(config) {
		measurementModel.set({
			'configuration' : config
		});
		setConfiguration();
	}//obj.configChange
	setConfiguration = function() {
		config = measurementModel.get('configuration');
		if(bridge != undefined) {
			bridge.remove();
			anim.remove();
		}
		switch(config) {
			
			case 'Quarter Bridge':
				rText1.show();
				rText2.show();
				rText3.hide();
				rText4.show();
				sgText1.show();
				sgText2.hide();
				sgText3.hide();
				sgText4.hide();
				removeResistanceQuarter();
				node = paper.path("m 354 135 ");
				a = node.animate({
					path : "m 354 135  l 30 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 32 l -67 0 "
				}, 500);
				a.attr({
					"stroke-width" : 2,
					stroke : color
				});
				anim = paper.set();
				anim.push(a);
				config=null;
				break;
			case 'Half Bridge Adjacent Arms':
				rText1.hide();
				rText2.show();
				rText3.hide();
				rText4.show();
				sgText1.show();
				sgText2.show();
				sgText3.hide();
				sgText4.hide();
				removeResistanceAdjArm();
				node = paper.path("m 354 135 ");
				a = node.animate({
					path : "m 363 145  l 30 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 32 l -69 0 "
				}, 500);
				nodes = paper.path("m 239 140 ");
				a1 = nodes.animate({
					path : "m 239 140  l -30 0" + " l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -10 0 l 0 32 l 66 0"
				}, 500);
				anim = paper.set();
				anim.push(a, a1);
				anim.attr({
					"stroke-width" : 2,
					stroke : color
				});
				break;
			case 'Half Bridge Opposite Arms':
				rText2.hide();
				rText3.hide();
				rText1.show();
				rText4.show();
				sgText1.show();
				sgText2.hide();
				sgText3.show();
				sgText4.hide();
				removeResistanceOppArm();
				node = paper.path("m 354 135 ");
				a = node.animate({
					path : "m 354 135  l 30 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 34 l -66 0 "
				}, 500);
				nodes = paper.path("m 222 275 ");
				a1 = nodes.animate({
					path : "m 222 275  l -79 0" + "l 0 34 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 42 0 "
				}, 500);
				anim = paper.set();
				anim.push(a, a1);
				anim.attr({
					"stroke-width" : 2,
					stroke : color
				});
				break;
			case 'Full Bridge':
				rText1.hide();
				rText2.hide();
				rText3.hide();
				rText4.hide();
				sgText3.show();
				sgText1.show();
				sgText2.show();
				sgText4.show();
				removeResistanceFullBridge();
				node21 = paper.path("m 354 135 ");
				a1 = node21.animate({
					path : "m 354 135  l 30 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 34 l -66 0 "
				}, 500);
				node22 = paper.path("m 249 130 ");
				a2 = node22.animate({
					path : "m 239 140 l -30 0" + " l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -10 0 l 0 34 l 66 0 "
				}, 500)
				node23 = paper.path("m 233 275 ");
				a3 = node23.animate({
					path : "m 233 275  l -79 0" + "l 0 34 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 10 0 l 0 20 l 10 0 l 0 -20 l 36 0 "
				}, 500)
				node24 = paper.path("m 379 270 ");
				a4 = node24.animate({
					path : "m 369 280  l 79 0 l 0 34" + "l -10 0 l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -10 0 l 0 20 l -10 0 l 0 -20 l -43 0 "
				}, 500)
				anim = paper.set();
				anim.push(a1, a2, a3, a4);
				anim.attr({
					"stroke-width" : 2,
					stroke : color
				});
				config=null;
				break;
			}//switch
	}//setConfiguration
	removeResistanceQuarter = function() {
		var inputResistance = measurementModel.get('resistance');
		pathsRes.remove();
		bridge = paper.set();
		switch(inputResistance) {
			case 120 :
				s1 = paper.path("m 354 135 l -55 -55 l -57 57 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l -62 62 l 57 57 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 62 62 l 57 -57 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 62 -62 l -67 -67");
				break;
			case 350 :
				s1 = paper.path("m 354 135 l -55 -55 l -55 55 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l -60 60 l 55 55 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 60 60 l 55 -55 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 60 -60 l -68 -68");
				break;
			case 600 :
				s1 = paper.path("m 354 135 l -55 -55 l -50 50 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0  l 0 5 l -5 0 l 0 5 l -5 0 l -55 55 l 50 50 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 55 55 l 50 -50 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0  l 55 -55 l -68 -68")
				break;
			case 700 :
				s1 = paper.path("m 354 135 l -55 -55 l -47 47 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0  l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -52 52 l 47 47 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 52 52 l 47 -47 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 52 -52 l -62 -67")
				break;
			case 1000 :
				s1 = paper.path("m 354 135 l -55 -55 l -43 43 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0  l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5  l -45 45 l 43 43 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 5 0 l 0 5 l 45 45 l 43 -43 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 45 -45 l -61 -66")
				break;
		}//switch
		bridge.push(s1)
		bridge.attr({
			"stroke-width" : 2,
			stroke : color
		});
	}//removeResistance
	removeResistanceAdjArm = function() {
		var inputResistance = measurementModel.get('resistance');
		pathsRes.remove();
		bridge = paper.set();
		switch(inputResistance) {
			case 120 :
				s1 = paper.path("m 226 152 l -62 62 l 57 57 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l l 62 62  l 57 -57  0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 62 -62 l -57 -57 ");
				s2 = paper.path("m 364 145 l -65 -65 l -60 60");
				break;
			case 350 :
				s1 = paper.path("m 226 152 l -62 62 l 57 57 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l 58 56  l 57 -57 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 58 -58 l -60 -55 ");
				s2 = paper.path("m 364 145 l -65 -65 l -60 60");
				break;
			case 600 :
				s1 = paper.path("m 226 152 l -62 62 l 57 57  l 0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0  l  0 5 l 5 0 l  0 5 l 5 0 l  48 46  l 50 -50 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 50 -50 l -60 -55")
				s2 = paper.path("m 364 145 l -65 -65 l -60 60");
				break;
			case 700 :
				s1 = paper.path("m 226 152 l -62 62 l 53 53 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0  l  0 5 l 5 0 l  0 5 l 5 0 l   0 5 l 52 48 l 55 -55 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 42 -42 l -57 -56")
				s2 = paper.path("m 364 145 l -65 -65 l -60 60");
				break;
			case 1000 :
				s1 = paper.path("m 226 152 l -65 65 l 53 51 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0  l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 5 0 l  0 5 l 44 36 l 43 -43 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 45 -45 l -57 -54")
				s2 = paper.path("m 364 145 l -65 -65 l -60 60");
				break;
		}//switch
		bridge.push(s1, s2)
		bridge.attr({
			"stroke-width" : 2,
			stroke : color
		});
	}
	removeResistanceOppArm = function() {
		var inputResistance = measurementModel.get('resistance');
		pathsRes.remove();
		bridge = paper.set();
		switch(inputResistance) {
			case 120 :
				s1 = paper.path("m 354 135 l -55 -55  l -57 57 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l -63 63 l 58 59");
				s2 = paper.path("m 234 288 l 65 61 l 50 -50 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 69 -69 l -65 -67");
				break;
			case 350 :
				s1 = paper.path("m 354 135 l -55 -55  l -55 55 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l -60 60 l 58 59");
				s2 = paper.path("m 234 288 l 65 61 l 55 -55 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 60 -60 l -66 -66");
				break;
			case 600 :
				s1 = paper.path("m 354 135 l -55 -55  l -50 50 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l -55 55 l 58 59")
				s2 = paper.path("m 234 288 l 65 61  l 50 -50 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 55 -55 l -65 -65");
				break;
			case 700 :
				s1 = paper.path("m 354 135 l -55 -55  l -47 47 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -55 55 l 56 58")
				s2 = paper.path("m 234 288 l 65 61   l 47 -47 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 55 -55 l -63 -63");
				break;
			case 1000 :
				s1 = paper.path("m 354 135 l -55 -55  l -43 43 l  0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -5 0 l 0 5 l -50 50 l 56 58")
				s2 = paper.path("m 234 288 l 65 61  l 43 -43 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 5 0 l 0 -5 l 49 -49 l -63 -63");
				break;
		}//switch
		bridge.push(s1, s2)
		bridge.attr({
			"stroke-width" : 2,
			stroke : color
		});
	}
	removeResistanceFullBridge = function() {
		pathsRes.remove();
		bridge = paper.set();
		s1 = paper.path("m 354 135 l -55 -55  l -60 60 ")
		s2 = paper.path("m  224 155  l -55 55  l 64 64")
		s3 = paper.path("m 240 290 l 59 59 l 57 -57   ")
		s4 = paper.path("m 369 279 l 65 -65 l -65 -65")

		bridge.push(s1, s2, s3, s4)
		bridge.attr({
			"stroke-width" : 2,
			stroke : color
		});
	}

	obj.gaugefactorChange = function(gauge) {
		measurementModel.set({
			'gaugeFactor' : gauge
		});
		setGaugeFactor();
	}//gaugefactorChange
	
	setGaugeFactor = function(){
		if(anim != undefined){
			var gauge = measurementModel.get('gaugeFactor');
			switch(gauge){
				case 0.9 :
					anim.attr({'stroke-width':1});
					break;
				case 2 :
					anim.attr({'stroke-width':1.5});
					break;
				case 3.5 :
					anim.attr({'stroke-width':2});
					break;
				case 4.5 :
					anim.attr({'stroke-width':2.5});
					break;
				case 5.5 :
					anim.attr({'stroke-width':3});
					break;
				case 6.5 :
					anim.attr({'stroke-width':3.5});
					break;
				case 7.5 :
					anim.attr({'stroke-width':4});
					break;
				case 8.5 :
					anim.attr({'stroke-width':4.5});
					break;
				case 9.9 :
					anim.attr({'stroke-width':5});
					break;
			}
		}
	}

	obj.weightChange = function(inputWeight) {
		gaugeFactor = parseFloat(measurementModel.get('gaugeFactor'))
		measurementModel.set({
			'weight' : inputWeight
		});
		//changeWeightSize();
		valueOfRG = updateRGValue(inputWeight);
		
		outputVoltage = calculateOutputVoltage();
		outputVoltage = (outputVoltage) * 1000;
		outputVoltageforrefrenceTemp = outputVoltage = parseFloat(outputVoltage.toFixed(2));
		STRAIN.JSon.obj.outputV = outputVoltageforrefrenceTemp;
		//alert(outputVoltage)

	}//obj.weightChange
	
	obj.changeWeightSize = function(val) {
		//obj.dSet.remove();
		obj.wtText.attr("text" , $("#inputWeight option:selected").text());
		obj.currentWT = $("#inputWeight option:selected").text();
		//obj.makeWBox(val,$("#inputWeight option:selected").text());
		//obj.draggableset.remove();
		
			
		//put slider code here
		
	}
	updateRGValue = function(inputWeight) {
		inputResistance = measurementModel.get('resistance');
		gaugeFactor = parseFloat(gaugeFactor)
		distance = 16;
		bendMove = (inputWeight * 9.81) * (distance / 100);
		Z = parseFloat((1 / 6) * 0.02 * 0.004 * 0.004);
		strain = parseFloat(bendMove / (Z * youngModulus * 6894.76));
		changeResistanceByResistance = gaugeFactor * strain;
		changeResistance = gaugeFactor * strain * inputResistance;
		valueOfRG = changeResistance + inputResistance;
		$('#valueRG').val(valueOfRG.toFixed(4));
		obj.valueOfRgForl3Graph = parseFloat(valueOfRG.toFixed(2));
	}
	calculateOutputVoltage = function() {
		inputVoltage = measurementModel.get('inputVoltage');
		gaugeFactor = measurementModel.get('gaugeFactor');
		var config = measurementModel.get('configuration');

		switch(config) {
			case 'Quarter Bridge':
				outputVoltage = parseFloat(0.25 * (changeResistance / inputResistance) * inputVoltage);
				break;
			case 'Half Bridge Adjacent Arms':
				outputVoltage = 0;
				break;
			case 'Half Bridge Opposite Arms':
				outputVoltage = parseFloat(0.5 * (changeResistance / inputResistance) * inputVoltage);
				break;
			case 'Full Bridge':
				outputVoltage = parseFloat((changeResistance / inputResistance) * inputVoltage);
				break;
		}
		
		
		return outputVoltage;
	}//calculateOutputVoltage
	cnt=0;
	obj.checkUserVoltage = function(inputValue) {
		
		var tempOutputVoltagehigher = Math.round(outputVoltage * 10) / 10;
		if(isNaN(inputValue)) {
			alert("Please Enter Numerical Digit");
			return false
		} else {
			STRAIN.JSon.obj.userVal = inputValue;
			if((inputValue == outputVoltage) || (inputValue == tempOutputVoltagehigher  )) {
				$("#Submit").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#Submit").html("<span class='label'>Submit</span>");
				}, 3000);
				//$('#valueRG').val("");

				var id = measurementModel.get('key')

				var existingModel = measurementCollection.get(id);
				var y = parseFloat(measurementModel.get('weight'));
				graphDataContainer.push([y, outputVoltage]);

				if(!existingModel) {
					measurementModel.set({
						graph1 : graphDataContainer
					});
					if(graphDataContainer.length >= 3) {
						measurementCollection.add(measurementModel);
						$('#plotGraph').attr({
							'disabled' : false
						});
						$('#plotGraph').addClass('greenbtn');
						$('#plotGraph11').hide();
						$('#plotGraph').show();
					}
				} else {
					measurementModel.set({
						graph1 : graphDataContainer
					});
				}
				STRAIN.JSon.obj.eval = 1;
				return true
			} 
			else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ outputVoltage);
					cnt=0;
				}
				$("#Submit").addClass('redbtn');
				$("#Submit").effect("shake", {
					times : 2
				}, 30);
				
				$("#Submit").html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$("#Submit").removeClass('redbtn');
					$("#Submit").html("<span class='label'>Submit</span>");
				}, 3000);
				STRAIN.JSon.obj.eval = 0;
				return false;
			}
		}
	}//obj.checkUserVoltage
	var graphOne = {
		chart : {
			renderTo : 'graph',
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
			text : '',
			x : -20
		},
		xAxis : {
			title : {
				text : ''
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

	obj.plotData = function() {
		$('#nextsetvalue, #nextlevel').attr({
			'disabled' : false
		});
		$('#nextsetvalue, #nextlevel').addClass('greenbtn');
		graphOne.series = [];
		GraphData = [];
		graphOne.title.text = "Weight (Kg) Vs Output (mV)";
		graphOne.xAxis.title.text = "Weight (Kg)";
		var id = measurementModel.get('key');
		var c = measurementCollection.get(id);
		//alert(c)
		var graphPt = c.get('graph1')
		if(graphPt.length != 0 && nxt == 0) {
			GraphData.push(graphPt);
		} else {
			GraphData = storeData;
			GraphData.push(graphPt);
		}

		for(var i = 0; i < GraphData.length; i++) {
			graphOne.series.push({
				name : '',
				data : []
			});
			graphOne.series[i].name = "Measurement Graph " + (i + 1);
			graphOne.series[i].data = GraphData[i];
		}
		var chart = new Highcharts.Chart(graphOne);
	}

	obj.next = function() {
		storeData = GraphData;
		graphDataContainer = []
		key++;
		obj.setId();
		nxt++;
		$('select').val('').trigger("liszt:updated");
		$('#plotGraph').attr({
			'disabled' : true
		});
		$('#plotGraph').removeClass('greenbtn');
		$('#InputVoltage, #resistance').attr({
			'disabled' : true
		}).trigger("liszt:updated");
	}//next
	//level-2 drag weight


	obj.dragWeight = function() {
	
		obj.dSet.remove();
		var val = $('#dragWt :selected').text();
		obj.makeWBox($('#dragWt').val(),obj.currentWT);
		
		pos1 = STRAIN.JSon.obj.pos;
		distance = pos1;
		bendMove = (inputWeight * 9.81) * (distance / 100);
		Z = (1 / 6) * 0.02 * 0.004 * 0.004;
		strain = bendMove / (Z * youngModulus * 6894.76);
		toTemp = strain;
		changeResistanceByResistance = gaugeFactor * strain;
		changeResistance = gaugeFactor * strain * inputResistance;
		valueOfRG = inputResistance - changeResistance;
		
		outputVoltage = calculateOutputVoltage();
		outputVoltage = (outputVoltage) * 1000;
		outputVoltage = parseFloat(outputVoltage.toFixed(2));
		
		
		$("#UserVoltagepos").val(outputVoltage);
		STRAIN.JSon.obj.op1 = outputVoltage;
		
		var y = outputVoltage;
		graphDataContainer1.push([eval(pos1), y]);
		posModel.set({
			'graph2' : graphDataContainer1
		})
		if(graphDataContainer1.length >= 3) {
			$('#plotGraph12').hide();
			$('#plotGraph1').show();
			$('#plotGraph1').addClass('greenbtn');
			$('#plotGraph1').attr('disabled', false);
			$("#level3").attr("disabled", false);
			$("#level3").addClass('greenbtn');
		}
		
		//var bb = draggableset.getBBox();
		
		//draggableset.translate(bb.x+1 , bb.x2+1 );
		 // bb.x = bb.x-240;
		// bb.x2 =bb.x2-240;
		//console.log("bb : "+bb.x);
		
		//weightBox1.hide()
	}

	obj.plotDataWeightChange = function() {
		graphOne.series = [];
		GraphDataPos = [];
		graphOne.title.text = "Position (cm) Vs Output (mV)";
		graphOne.xAxis.title.text = "Position (cm)";
		var graphPt = posModel.get('graph2');
		GraphDataPos.push(graphPt);
		for(var i = 0; i < GraphDataPos.length; i++) {
			graphOne.series.push({
				name : '',
				data : []
			});
			graphOne.series[i].name = "Weight Position Graph";
			graphOne.series[i].data = GraphDataPos[i];
		}
		var chart = new Highcharts.Chart(graphOne);
	}
	//temperature level
	obj.setTemp = function(t) {
		tempModel.set({
			'temp' : t
		})
	}

	obj.calculateTemp = function() {
		temperature = parseInt(tempModel.get('temp'));
		finalAlpha = alpha;
		finalBetas = tempModel.get('betas');
		finalBetag = betag;
		temp = ((finalAlpha / gaugeFactor) + (finalBetas - finalBetag)) * (20-temperature);
		newStrain = temp + strain;
		changeResistance = gaugeFactor * newStrain * inputResistance;
		changeResistanceByResistance = gaugeFactor * newStrain;
		valueOfRG = inputResistance + changeResistance;
		$('#valueRG').text(valueOfRG.toFixed(4));
		$("#UserVoltagetemp").val(valueOfRG.toFixed(2))
		
		//outputVoltage = calculateOutputVoltage(config) ;
		//outputVoltage = parseFloat(outputVoltage.toFixed(2));
		//$("#UserVoltagetemp").val(outputVoltage);
		
		graphDataContainer2.push([temperature, valueOfRG]);
		tempModel.set({
			'graph3' : graphDataContainer2
		})
		if(graphDataContainer2.length > 2) {
			$('#plotGraph21').hide();
			$('#plotGraph2').show();
			$('#plotGraph2').attr('disabled', false);
			$('#plotGraph2').addClass('greenbtn');
		}
	}
	
	obj.setIngraphDataContainer2 = function(){
		//graphDataContainer2.push([20, obj.valueOfRgForl3Graph]);
	}

	obj.plotDataTemp = function() {
		graphOne.series = [];
		GraphDataTemp = [];
		graphOne.title.text = "Temperature (c) Vs Rg(Ohm)";
		graphOne.yAxis.title.text = "Rg (Ohm)";
		graphOne.xAxis.title.text = "Temperature (Deg.C)";
		var graphPt = tempModel.get('graph3');
		GraphDataTemp.push(graphPt);
		for(var i = 0; i < GraphDataTemp.length; i++) {
			graphOne.series.push({
				name : '',
				data : []
			});
			graphOne.series[i].name = "The graph nature(linear/non-linear)depends on the strain guage material";
			graphOne.series[i].data = GraphDataTemp[i];
		}
		var chart = new Highcharts.Chart(graphOne);
	}
	return {
		obj : obj
	}

})();
