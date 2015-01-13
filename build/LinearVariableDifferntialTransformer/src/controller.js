LVDT.controller = (function() {
	var obj = {
		inputVoltsRMS : 5, 
		signalFrequencyHz : 50,
		graphFactor:0
	};
	
	var inputVoltsPeak = obj.inputVoltsRMS * Math.SQRT2, signalTimePeriod = 2.5 / obj.signalFrequencyHz, outputVoltsPeak = 0, coreDisplacementMm = 0, coreLengthMm = 20, outputVoltsRMS = 0;
	var secCoils = [], counter = 0, pri, temp = 1,  rt=1, lt=1
	var paper1 = new Raphael(document.getElementById('configuration'), 582, 500);
	
	var lvdtModel = new LVDT.model.model();
	
	
	var  paper = new Raphael(document.getElementById('lvdtCircuit'), 286, 436);
	var pluspos=0;
	var minuspos=0;
	var initVal=0;
	var movingPoint;
	var arm;
	var l1;
	var l2;
	var l3;
	var l4;
	$("#Disp").html(0+" mm"); 
	obj.createCircuitDiagram = function(){
		var	s = "c  0   0  0 8 3 8 ";
				var	end = "c  5 0 5 -10 4 -8 ", curve = "M 131 25 C 145 2 145 53  160 25";
				primaryTurns = obj.createPrimary(paper, 125, 25, 110, 80, 164, 30, 105, 7, s, end, curve, 1000);
						paper.text(110, 38, "Vrms").attr({
			                    'font': '15px arial,sans-serif'
			                });
			            paper.text(175, 38, "Hz").attr({
		                    'font': '15px arial,sans-serif'
		               		 });
				arm = paper.rect(72,134,137,20).attr({fill:"90-#000:5-#fff:55-#000:95"});	
				arm.data({
					x:72,
					y:134
				})	
				var st = "c   -2   0   0 -6  2 -6 ", en = "c  3   0  3  6  2  6 ";
				secondaryTurns = obj.createSecondary(paper, 30, 185, 260, 175, 260, 123, 360, 325, 280, st, en, 165, 140, 124, 60, 3, 1000);
					secLeft = secondaryTurns[0]; secRight = secondaryTurns[1]
				//core = paper.rect(90,140,120,15).attr({fill:"90-#000:5-#fff:55-#000:95"});
				minus  = paper.text(7,140,"-").attr({fill : 'black',
											"font-size" : 25,
											'font-weight' : 'bold',
											'cursor':'pointer'});
	            plus = paper.text(279,140,"+").attr({fill : 'black',
											"font-size" : 25,
											'font-weight' : 'bold',
											'cursor':'pointer'});	
			
				plus.click(function(){
					if(initVal !=10){
					 initVal+=1;	
					 
					 if(initVal == 0){
					 	initVal = 1;
					 }
					 obj.move();
					 var trannsformString = "t"+(5*initVal)+",0";
					 arm.transform(trannsformString)
					if(undefined != movingPoint){//for 1st time
						voltageBoard.removeObject(movingPoint);
					}
					var voltage = outputVoltRMS(initVal).toFixed(2);
					 if(voltage < 0){//make it +ve
						voltage *=-1;
						//alert("The Output is "+voltage+" mV");
					 }
					 alert("The Output is "+voltage+" mV");
					 movingPoint = voltageBoard.create('point', [getCoreDisplacement, voltage], {
                   		 style: 5,
                    	name: 'p',
                   		 strokeColor: 'red'
                	})
					}
					
					
				});		
				
				
				minus.click(function(){
					if(initVal !=-10){
					 initVal-=1;
					 
					  if(initVal == 0){
					 	initVal = -1;
					 }
					 	
					 obj.move();
					  var trannsformString = "t"+(5*initVal)+",0";
					 arm.transform(trannsformString)
					 if(undefined != movingPoint){
						voltageBoard.removeObject(movingPoint);
					}
					 var voltage = outputVoltRMS(initVal).toFixed(2);
					 if(voltage < 0){
						voltage *=-1;
						//alert("The Output is "+voltage+" mV");
					 }
					 alert("The Output is "+voltage+" mV");
					 movingPoint = voltageBoard.create('point', [getCoreDisplacement, voltage], {
                   		 style: 5,
                    	name: 'p',
                   		 strokeColor: 'red'
                	})
					}
				});								
				//core.drag(move, start);
	}//createCircuitDiagram
	
			/*obj.start = function(){
	        	//console.log(1)
                    this.ox = this.attrs.x
                    this.oy = this.attrs.y
               } 
		*/
           	obj.move = function() {
                         //var px = dx / 10;
                       // if (initVal == 0) {                        	                          
							                           						
                            $("#Disp").html(initVal+" mm");                            
                            obj.movingcore(initVal);
                            obj.displaceCore(initVal);
                            obj.outputGraph.needsUpdate = true;
                            acBoard.update();
                           // movingPoint.needsUpdate = true;
                            //horizontalGuideLine.needsUpdate = true;
                            //verticalGuideLine.needsUpdate = true;
                            voltageBoard.update();							
                      //  }
           }//move
	
	obj.createACBoard = function(origin_x, origin_y, unitX, unitY) {
                acBoard = JXG.JSXGraph.initBoard('jxgbox', {
                    originX:origin_x,
                    //100,
                    originY: origin_y,
                    //200,
                    unitX: unitX,
                    //10,   milliseconds (ms)
                    unitY: unitY //20,   Volts
                });

                axisx = acBoard.create('axis', [
                    [0, 0],
                    [1, 0]
                ], {
                    name: "Time (ms)",
                    withLabel: false
                    
                });

                axisy = acBoard.create('axis', [
                    [0, 0],
                    [0, 1]
                ], {
                    name: "V",
                    withLabel: false,
                    drawLabels:false
                });
                axisy.removeTicks(axisy.defaultTicks)
                var text_Y = acBoard.create('text', [0.5, 13, 'Voltage'], {
                    style: 5
                });
                var text_X = acBoard.create('text', [70, 1, 'Time'], {
                    style: 7
                });
				
                return acBoard;
          }//createacBoard
          
          
    obj.createGraphBoard = function(origin_x, origin_y, unitX, unitY) {
    	
						
	               var voltageBoard = JXG.JSXGraph.initBoard('graph', {
	                    originX: origin_x,	                   
						originY: origin_y,
	                    unitX: unitX,
	                    boundingbox:[-25,100,25,10],
	                   // unitY: unitY //20,  // Volts
	                });
	
	                axisx = voltageBoard.create('axis', [
	                    [0, 0],
	                    [1, 0]
	                ], {
	                   // name: "V ",
	                   // withLabel: true
	                });
	
	                axisy = voltageBoard.create('axis', [
	                    [0, 0],
	                    [0, 1]
	                ], {
	                    //name: "Voltage (mV)",
	                   withLabel:true
	                });
				//	axisy.defaultTicks.ticksFunction = function () { return 10; };
					var textY = voltageBoard.create('text',[0.5,80,'Voltage (mV)'],{
						style:5 });
					var text_X = voltageBoard.create('text', [20, 3, 'x(mm)'], {
	                   style: 5
	                });
					voltageBoard.fullUpdate();
	               return voltageBoard;

           }//createGraphBoard
         
    obj.updateAllInputVoltage = function(inputVoltsRMS) {
            	obj.inputVoltsRMS = lvdtModel.get('supplyVoltage');
                //inputVoltsRMS = primaryVoltage;
                inputVoltsPeak = (obj.inputVoltsRMS * Math.SQRT2)/1.4; // actual voltage = 2.5 *inputpeakvoltage
								
              // console.log(inputVoltsRMS, inputVoltsPeak);
   	}//updateAllInputVoltage
   	
   	obj.drawACGraph = function(acBoard) {
			
	                var CONST = 2 * Math.PI / 1000;
	                acBoard.create('functiongraph', [function(ms) {
	                    return inputVoltsPeak * Math.sin(CONST * obj.signalFrequencyHz * ms)/1.3;
	                },
	                0, 2000 * signalTimePeriod], {
	                    stroke: 1
	                })
	
	                obj.outputGraph = acBoard.create('functiongraph', [function(ms) {
	                    return outputVoltsPeak * Math.sin(CONST * obj.signalFrequencyHz * ms);
	                },
	                0, 2000 * signalTimePeriod], {
	                    strokeColor: "RED",
	                });
	
	                return obj.outputGraph;

            }//drawACGraph
            
           obj.drawVoltageGraph = function(voltageBoard) {
           
             var yPosition=0;	
             yPosition = outputVoltRMS(0.01);
             var ans = yPosition;
             var p1 = voltageBoard.create('point',[0.01,yPosition], {size:0.1,strokeColor: '#00ff00'});
             p1.hideElement();
             yPosition = outputVoltRMS(5)+ans;
             var p2 = voltageBoard.create('point',[5,yPosition], {size:0.1,strokeColor: '#00ff00'});
              p2.hideElement();
             yPosition = outputVoltRMS(10)+ans;
             var p3 = voltageBoard.create('point',[10,yPosition], {size:0.1,strokeColor: '#00ff00'});
              p3.hideElement();
           	 l1 = voltageBoard.create('line',[p1,p2], {straightFirst:false, straightLast:false,strokeColor:'#00ff00',strokeWidth:2,dash:2});
              l2 = voltageBoard.create('line',[p2,p3], {straightFirst:false, straightLast:false,strokeColor:'#00ff00',strokeWidth:2,dash:2});
              
              //reverse
              yPosition = outputVoltRMS(-5);
             var p4 = voltageBoard.create('point',[-5,-yPosition], {size:0.1,strokeColor: '#00ff00'});
             p4.hideElement();
             yPosition = outputVoltRMS(-10);
             var p5 = voltageBoard.create('point',[-10,-yPosition], {size:0.1,strokeColor: '#00ff00'});
              p5.hideElement();
              l3 = voltageBoard.create('line',[p1,p4], {straightFirst:false, straightLast:false,strokeColor:'#00ff00',strokeWidth:2,dash:2});
              l4 = voltageBoard.create('line',[p4,p5], {straightFirst:false, straightLast:false,strokeColor:'#00ff00',strokeWidth:2,dash:2});
              
              //movingPoint
              
            }//drawVoltageGraph
            
           getCoreDisplacement = function() {
                         return Math.ceil(coreDisplacementMm);
           }
           
           outputVoltRMS = function(x) {
				/*var temp = coreDisplacementMm / coreLengthMm
				var call = outputVoltFraction(temp)
                return obj.inputVoltsRMS * call;*/
				
				
				var F = lvdtModel.get('supplyFrequency');
				var Ip =( lvdtModel.get('supplyVoltage'))/10000;
				var Np = lvdtModel.get('turns');
				var Ns = Np/2;
				var mue = 4*3.14*0.0000001;
				var b = 20*0.001;
				//var x  =Math.ceil(coreDisplacementMm)*0.001;
				x = x*0.001;
				var m = 0.01;
				var logeval=0.3010;
				var s1 = F*Ip*(4*3.14*Np*Ns*mue*b*x);
				var s2 = 3*m*0.3010;
				var s3 = 1-((x*x)/(2*b*b));
				var Vout = (s1*s3)/s2;
				return Vout*1000;
           }
           
           outputVoltFraction = function(displacementFraction) {
	                residualVoltage = 0.1;
	                displacementFraction = Math.abs(displacementFraction); // Graph is symmetrical
	                if (displacementFraction < 0.45) {
	                    // linear region
	                    return displacementFraction + residualVoltage;
	                } else if (displacementFraction < 0.55) {
	                    // Non-linear region. Gradually flatten
	                    return 10 - 5 * (0.55 - displacementFraction) * (0.55 - displacementFraction);
	                } else {
	                    // By convention, show a constant voltage
	                    return 10;
	                }
            }//outputVoltFraction
            
            obj.movingcore = function(newDisplacement) {
                    var predx;
                    predx = newDisplacement - coreDisplacementMm;
                    //core.translate(predx * 8, 0);
                    coreDisplacementMm = newDisplacement;

               }

              obj.displaceCore = function(position) {
                    var netSecondaryTurnsCovered = position / coreLengthMm;
                    outputVoltsRMS = obj.inputVoltsRMS * netSecondaryTurnsCovered;
                    outputVoltsPeak = inputVoltsPeak * netSecondaryTurnsCovered;
                }
         
         obj.updateAllFrequency = function(signalFrequencyHz) {
            	obj.signalFrequencyHz = lvdtModel.get('supplyFrequency');
            	
                //inputVoltsRMS = primaryVoltage;
                signalTimePeriod = 2.5 / (obj.signalFrequencyHz); // actual voltage = 2.5 *inputpeakvoltage
								
              // console.log(inputVoltsRMS, inputVoltsPeak);
              
            }//updateAllFrequency
          
        obj.setCoils = function(){
        	lvdtModel.set({'turns':$("#coil").val()});
        }
        
        
         obj.createPrimary = function(p, x, y, lX, lY, x1, coilX, coilY, iter, start, end, curve, coils){
         	var  primaryCircuitLeft, primaryCircuitRight, ac, ac1;
				
					 primaryCircuitLeft = p.path("M " + x + " " + y + " l " + -lX + "  0 l 0 " + lY + " l 15 0");
					 primaryCircuitRight = p.path("M " + x1 + " " + y + " l " + lX + " 0 l 0 " + lY + " l -14 0" );
					 ac = p.circle(x+20, y, 20).attr({stroke: 'blue','stroke-width': 1.5 });
					 ac1 = p.path(curve).attr({stroke: 'blue','stroke-width': 1.5 });
				
				 primaryCircuitCoil = drawPriTurns(p, coilX, coilY, iter, start, end, coils)
			 		
			 		
	                $("#showVolt").html("<span value ='7'>7</span>");
	           		 
               		$("#showFreq").html("<span value ='50'>50</span>");
				return primaryCircuitCoil 
         } //createPrimary
         
         drawPriTurns = function(p, coilX, coilY, iter, start, end, coils){
         	var pathCommand = "M " + coilX + " " + coilY;
				pathCommand += start;
				coils = parseInt(coils)
				switch (coils){
					case 1000:{
						
						for (var i = 0; i < iter; ++i) {
                        	pathCommand += "c  15   0  25 -20  15 -20 " + "c -10   0   0  20  17  20 ";
                   	 	}
					}
					break;
					
					case 2000:{
						for (var i = 0; i < iter; ++i) {
                        	pathCommand += "c  15   0  20 -20  10 -20 " + "c -10   0  -5  20  10  20 ";
                   	 	}
					}
					break;
					
					case 3000:{
						for (var i = 0; i < iter; ++i) {
                        	pathCommand += "c  10   0   17 -20  7 -20 " + "c  -7   0   -8  20  7  20 ";
                   	 	}
					}
					break;
				}//switch
				pathCommand += end;	
				primaryCircuitCoil  = p.path( pathCommand ).attr({stroke: '#000','stroke-width': 1.5 });
			 	return primaryCircuitCoil 
         }//drawPriTurns
         
         obj.createSecondary = function(r, x, y, lX, lY, x2, lX2, cy1, cy2, cx, st, en, x1, lY1, lX1, lY2, iter, coils){
				var secondaryCircuitLeft,secondaryCoil, right, left, secondaryCircuitRight, pCommand, c, c1, sCoil
			
				secondaryCircuitLeft = r.path("M " + x + "  " + y + " l -15 0 l 0 " + lY + " l " + lX + " 0");
				secondaryCircuitRight = r.path("M " + x2 + " " + y + " l 15 0 l 0 " + lY2 + " l " + -lX2 + " 0 ");
				right = r.path("M  " +x1 + " " + y + " l -15 0 l 0 " + lY1 + " l " + lX1 + " 0");
			 	left = r.path("M  " + (x1-40) + " " + y + " l 15 0 l 0 " + lY2 + " l 8 0");
				
				c = r.circle(cx, cy1, 5).attr({stroke: 'red'});
				c1 = r.circle(cx, cy2, 5).attr({stroke: 'red'});
				
				secCoils[0] = secondary(r,x, y, st, en, cx, cy1, iter, coils)
              
                     
                secCoils[1] = secondary(r, x1, y, st, en, cx, cy1, iter, coils)   
	                
		        return secCoils
               }//createSecondary
               
            secondary = function(r,x, y, st, en, cx, cy1, iter, coils){
            	
               		var	pathCommand = "M " + x + " " + y, sCoil
					pathCommand += st;
					coils = parseInt(coils)
					switch (coils){
						case 1000 : {
								for (var i = 0; i < iter; ++i) {
						                        pathCommand += "c  15   0  25  20  15  20 " + "c -15   0   0 -20  15 -20 "
						                    }
				            }
				            break ;
				            
				         case 2000 : {
								for (var i = 0; i < iter; ++i) {
						                        pathCommand += "c  15   0  20  20  10  20 " + "c -15   0  -5 -20  10 -20 "
						                    }
				            }
				            break ;
				            
				         case 3000 : {
								for (var i = 0; i < iter; ++i) {
						                        pathCommand += "c  10   0  12  20   7  20 " + "c -10   0  -3 -20   7 -20 "
						                    }
				            }
				            break ;
			         }//switch           
                     pathCommand += en;
                   
                    sCoil = r.path(pathCommand).attr({stroke: '#000','stroke-width': 1.5 });
                    
                    r.text((cx-40), (cy1-20), 'V').attr({
			                    'font': '15px arial,sans-serif'
				                });
			        r.text((cx-25), (cy1-20), "out").attr({
			                    'font': '15px arial,sans-serif'
			                	});
			       return sCoil
               }//secondary
          
    
    obj.dragPrimary = function(){
				$("#primaryCoil").draggable({
					helper: 'clone'
				});
				var start = "c  -5   0  6 8 12 8 ", end = "c 12 0 12 -10 15 -6 "  
				  
				var curve = "M 254 50 C 270 20 270 78 285 50";
			    
			    $("#dropPrimary").droppable({
			    	disabled: false,
			        accept :'#primaryCoil',
			        drop: function() { 
			    	pri1 = obj.createPrimary(paper1, 250, 50, 185, 100, 289, 82, 150, 11, start, end, curve, 1000)
				    	
				    	paper1.text(230, 70, "Vrms").attr({
		                    'font': '15px arial,sans-serif'
		                });
		                paper1.text(305, 74, "Hz").attr({
	                    'font': '15px arial,sans-serif'
	               		 });
	               	$("#dropPrimary").css('border','none')	
	               	$(".priCoil").css('display','none');
	               	$("#dropPrimary").droppable("option", "disabled", true );  
	               	counter++
	              	check();
	               }
			    });
		}//dragPrimary
		
      obj.dragSecondary = function(){
				$("#SecondaryCoil").draggable({
					helper: 'clone'
				});
				var st = "c   0   0   0 -10  10 -10 ", en = "c  10   0  10  10  10  10 "; //1000
				
				$("#dropSecondary").droppable({
					disabled: false,
					accept :'#SecondaryCoil',
					drop: function() { 
				 s =    obj.createSecondary(paper1, 77, 250, 441, 210, 456, 198, 460, 390, 507, st, en, 286, 140, 230, 60, 5, 1000);
				  s1 = s[0], s2 = s[1]  
			      	$("#dropSecondary").css('border','none')	
	               	$(".secCoil").css('display','none');
	               	$("#dropSecondary").droppable("option", "disabled", true ); 
	               counter++
	               check();
			      }//drop
				});
		}//dragSecondary
		
			obj.dragArmature = function(){
				$("#armature").draggable({
					helper: 'clone'
				});
				
				$("#droparmature").droppable({
					disabled: false,
					accept :'#armature',
					drop: function(event, ui) { 
						paper1.rect(190,190,150,25).attr({fill:"90-#000:5-#fff:55-#000:95"});
						$(".arm").css('display','none') 
						$("#droparmature").droppable("option", "disabled", true );
						counter++
						check();
					}
				});
				
			}//dragArmature   
			
			check = function(){
				if(counter == 3)
					{
						$('.selector').attr({'disabled': false});
						
						if($('#coil').val() != 'select' && $('#voltage').val() != 'select' && $('#frequency').val() != 'select')
						{
							$('#config').attr({'disabled': false});
							$('#config').addClass('greenbtn');
						}
					}
			}//check
			
			obj.animateCoils = function(){
				pri1.remove();
				s1.remove(); s2.remove();
				obj.setCoils();
				check();
				animateTurns();
			}//animateCoils
			
			animateTurns = function(){
			var t = lvdtModel.get('turns');
				if((pri)!= undefined){
						myPath.stop(pri);
						temp = 1;lt = 1; rt=1
						pri.remove();
						myPathSec.stop(secL);
						secL.remove();
						myPathSecR.stop(secR);
						secR.remove();
						}
						
				var sec=[], n, m;
					p = [{stroke : "M 82 150", time: 0}]; sleft = [{stroke : "M 77 250", time: 0}]; sright = [{stroke : "M 286 250", time: 0}];
					var pathCommand =[], j, k;
					switch(t){
				 	case "1000":
				 		{
				 			pathCommand[0] = "c  -5   0  6 8 12 8 "
					  			p.push({stroke : pathCommand[0], time: 100});
					  			for (var i = 0; i < 11; i++) {
				                    	k = 1;
				                        pathCommand[k] = "c  15   0  25 -20  15 -20 "  ;
				                        p.push({stroke : pathCommand[k], time: 100});
				                        j = 2
				                        pathCommand[j] = "c -10   0   0  20  17  20 ";
				                        p.push({stroke : pathCommand[j], time: 100});
				                        k = k+2; j = j+2
			                    	}
			                    pathCommand[5] = "c 12 0 12 -10 15 -6 "
			                    
			                  //sec
			                  
			                  sec[0] = "c   0   0   0 -10  10 -10 "
			                  
			                  sleft.push({stroke : sec[0], time: 210});
							  sright.push({stroke : sec[0], time: 210});
							  
							  for (var i = 0; i < 5; i++) {
                    			m = 1;
                    			sec[m] = "c  15   0  25  20  15  20 " 
                    			
                    			 sleft.push({stroke : sec[m], time: 210});
                        		 sright.push({stroke : sec[m], time: 210});
                        		 
                        		 n = 2;
		                        sec[n] = "c -15   0   0 -20  15 -20 "
		                        
		                        sleft.push({stroke : sec[n], time: 210});
		                        sright.push({stroke : sec[n], time: 210});
		                        
		                         m = m+2; n = n+2;
		                        }
		                    sec[5] = "c  10   0  10  10  10  10 ";
		                     
			             }
			                    break;
			                    
                   	case "1500":
                   		{
                   			pathCommand[0] = "c  -3   0  -1 8 10 8 "
					  			p.push({stroke : pathCommand[0], time: 100});
					  			for (var i = 0; i < 18; i++) {
				                    	k = 1;
				                        pathCommand[k] = "c  15   0  20 -20  10 -20 "  ;
				                        p.push({stroke : pathCommand[k], time: 100});
				                        j = 2
				                        pathCommand[j] = "c -10   0  -5  20  10  20 ";
				                        p.push({stroke : pathCommand[j], time: 100});
				                        k = k+2; j = j+2
			                    	}
			                    pathCommand[5] = "c 10 0 10 -10 8 -8 " 
			                    
			                  //sec
			                  
			                  sec[0] = "c   -1   0   -1 -10  6 -10 "
			                  
			                  sleft.push({stroke : sec[0], time: 210});
							  sright.push({stroke : sec[0], time: 210});
							  
							  for (var i = 0; i < 8; i++) {
                    			m = 1;
                    			sec[m] = "c  15   0  20  20  10  20 " 
                    			
                    			 sleft.push({stroke : sec[m], time: 210});
                        		 sright.push({stroke : sec[m], time: 210});
                        		 
                        		 n = 2;
		                        sec[n] = "c -15   0  -5 -20  10 -20 "
		                        
		                        sleft.push({stroke : sec[n], time: 210});
		                        sright.push({stroke : sec[n], time: 210});
		                        
		                         m = m+2; n = n+2;
		                        }
		                    sec[5] = "c  4   0  5  10  4  10 " 
                   		}	
			                    break;
			                    
			        case "3000": 
			        	{
                   			pathCommand[0] = "c  -7   0  8 10 14 8 "
					  			p.push({stroke : pathCommand[0], time: 100});
					  			for (var i = 0; i < 25; i++) {
				                    	k = 1;
				                        pathCommand[k] = "c  10   0   17 -20  7 -20 " ;
				                        p.push({stroke : pathCommand[k], time: 100});
				                        j = 2
				                        pathCommand[j] = "c  -7   0   -8  20  7  20 "
				                        p.push({stroke : pathCommand[j], time: 100});
				                        k = k+2; j = j+2
			                    	}
			                    pathCommand[5] = "c 12 0 12 -10 15 -6 " 
			                    
			                  //sec
			                  
				                  sec[0] = "c   0   0   0 -10  8 -10 "
				                  
				                  sleft.push({stroke : sec[0], time: 210});
								  sright.push({stroke : sec[0], time: 210});
								  
								  for (var i = 0; i < 11; i++) {
	                    			m = 1;
	                    			sec[m] = "c  10   0  12  20   7  20 "
	                    			
	                    			 sleft.push({stroke : sec[m], time: 210});
	                        		 sright.push({stroke : sec[m], time: 210});
	                        		 
	                        		 n = 2;
			                        sec[n] = "c -10   0  -3 -20   7 -20 "

			                        sleft.push({stroke : sec[n], time: 210});
			                        sright.push({stroke : sec[n], time: 210});
			                        
			                         m = m+2; n = n+2;
			                        }
			                    sec[5] = "c  7   0  7  10  8  10 "
                   		}	
			                    break;
			           }//switch         
					  	
						p.push({stroke : pathCommand[5], time: 100});
					  	drawnPath = p[0].stroke;
						myPath = paper1.path(drawnPath).attr({"stroke-width": 1.5,"stroke": "#000"});
						animatePrimaryCoil();
						
						sleft.push({stroke : sec[5], time: 210});
	                    sright.push({stroke : sec[5], time: 210});
	                    
	                    drawnPathSec = sleft[0].stroke;
	                    drawnPathSecR = sright[0].stroke;
	                    
	                    myPathSec =  paper1.path(drawnPathSec).attr({"stroke-width": 1.5,"stroke": "#000"});
	                    myPathSecR = paper1.path(drawnPathSecR).attr({"stroke-width": 1.5,"stroke": "#000"});
	                    
	                    animateSecL();
	                    animateSecR();
			}//animate
			
			 animatePrimaryCoil = function(){
			 	
					if (temp < p.length) {
				        drawnPath += p[temp].stroke;
				        
				        pri = myPath.animate({path: drawnPath}, p[temp].time, function(){animatePrimaryCoil();
				        	});
				        temp++;
					}
				}//animatePrimaryCoil
			
			animateSecL = function(){
				
				if (lt < sleft.length) {
						drawnPathSec += sleft[lt].stroke;
						
						secL = myPathSec.animate({path: drawnPathSec}, sleft[lt].time, function(){animateSecL();});
				        lt++;
					}
			}//animateSecL
			
			animateSecR = function(){
				
					if(rt < sright.length){
						drawnPathSecR += sright[rt].stroke;
						
						secR = myPathSecR.animate({path: drawnPathSecR}, sright[rt].time, function(){animateSecR();});
						rt++;
					}
				}//animateSecR
				
		obj.voltage = function(){
				lvdtModel.set({'supplyVoltage' : $("#voltage").val()});
				var inputVoltsRMS = lvdtModel.get('supplyVoltage');
				obj.updateAllInputVoltage(inputVoltsRMS);
				showVoltage();
				check();
		}//voltage
		
		
		obj.frequency = function(){
			lvdtModel.set({'supplyFrequency' : $("#frequency").val()});
				var signalFrequencyHz  = lvdtModel.get('supplyFrequency');
				obj.updateAllFrequency(signalFrequencyHz );
				showFrequency();
				check();
		}//frequency
		
		showVoltage = function(){
					
					var  volt = lvdtModel.get('supplyVoltage');
	               		 
					  	 switch(volt){
					  	 	case "0" :
							$(".changeVoltage").html("<span value ='0'>0</span>");
							break;
							
							case "1" :
							$(".changeVoltage").html("<span value ='1'>1</span>");
							break;
							
							case "2" :
							$(".changeVoltage").html("<span value ='2'>2</span>");
							break;
							
							case "3" :
							$(".changeVoltage").html("<span value ='3'>3</span>");
							break;
			
							case "4" :
								$(".changeVoltage").html("<span value ='4'>4</span>");
							break;
			
							case "5" :
							$(".changeVoltage").html("<span value ='5'>5</span>");
							break;
							case "6" :
							$(".changeVoltage").html("<span value ='6'>6</span>");
							break;
			
							case "7" :
							$(".changeVoltage").html("<span value ='7'>7</span>");	
							break;
			
							case "8" :
							$(".changeVoltage").html("<span value ='8'>8</span>");
							break;
							case "9" :
							$(".changeVoltage").html("<span value ='9'>9</span>");
							break;
			
							case "10" :
							$(".changeVoltage").html("<span value ='10'>10</span>");	
							break;
			
							case "11" :
							$(".changeVoltage").html("<span value ='11'>11</span>");
							break;
							case "12" :
							$(".changeVoltage").html("<span value ='12'>12</span>");
							break;
			
							case "13" :
							$(".changeVoltage").html("<span value ='13'>13</span>");	
							break;
			
							case "14" :
							$(".changeVoltage").html("<span value ='14'>14</span>");
							break;
							case "15" :
							$(".changeVoltage").html("<span value ='15'>15</span>");
							break;
					  	 }//switch
					  
				} //showVoltage
				
		showFrequency = function(){
					
				var freq = lvdtModel.get('supplyFrequency');
				$(".changeFrequency").html("<span value ="+freq+">"+freq+"</span>")
		           /* switch (freq)
					{
						case "50" :
							$(".changeFrequency").html("<span value ='50'>50</span>");
						break;
		
						case "100" :
								$(".changeFrequency").html("<span value ='100'>100</span>");
						break;
		
						case "150" :
							$(".changeFrequency").html("<span value ='150'>150</span>");
						break;
						
						case "200" :
							$(".changeFrequency").html("<span value ='200'>200</span>");
						break;
		
						case "250" :
								$(".changeFrequency").html("<span value ='250'>250</span>");
						break;
		
						case "300" :
							$(".changeFrequency").html("<span value ='300'>300</span>");
						break;
						case "350" :
							$(".changeFrequency").html("<span value ='350'>350</span>");
						break;
		
						case "400" :
								$(".changeFrequency").html("<span value ='400'>400</span>");
						break;
		
						case "450" :
							$(".changeFrequency").html("<span value ='450'>450</span>");
						break;
						case "500" :
							$(".changeFrequency").html("<span value ='500'>500</span>");
						break;
		
						case "550" :
								$(".changeFrequency").html("<span value ='550'>550</span>");
						break;
		
						case "600" :
							$(".changeFrequency").html("<span value ='600'>600</span>");
						break;
						case "650" :
							$(".changeFrequency").html("<span value ='650'>650</span>");
						break;
		
						case "700" :
								$(".changeFrequency").html("<span value ='700'>700</span>");
						break;
		
						case "750" :
								$(".changeFrequency").html("<span value ='750'>750</span>");
						break;
						case "800" :
								$(".changeFrequency").html("<span value ='800'>800</span>");
						break;
						case "850" :
								$(".changeFrequency").html("<span value ='850'>850</span>");
						break;
						case "900" :
								$(".changeFrequency").html("<span value ='900'>900</span>");
						break;
		
						case "950" :
									$(".changeFrequency").html("<span value ='950'>950</span>");
						break;
		
						case "1000" :
									$(".changeFrequency").html("<span value ='1000'>1000</span>");
						break;
						}//switch*/
					
				}//showFrequency
          
        obj.updateLVDT = function(){
        	var	coils  =  parseInt(lvdtModel.get('turns'));
        		
        		switch(coils){
						case 1000:
						{
							
							primaryTurns.remove();
							secLeft.remove(); secRight.remove();
							
							var start =  "c  0   0  0 8 3 8 ", end =  "c  5 0 5 -10 4 -8 "
							primaryTurns =drawPriTurns(paper, 30, 105, 7, start, end, coils);
							
							var st = "c   -2   0   0 -6  2 -6 ", en = "c  3   0  3  6  2  6 ";
							secLeft = secondary(paper, 30, 185, st, en, 280, 360, 3, coils);
							
							secRight = secondary(paper, 165, 185, st, en, 280, 360, 3, coils);
							
						}
						break;
						
						case 1500:
						{
							primaryTurns.remove();
							secLeft.remove(); secRight.remove();
							
							var start = "c  0   0  0 8 6 8 ", end =  "c  5 0 5 -10 6 -8 "
							primaryTurns = drawPriTurns(paper, 30, 105, 11, start, end, coils);
							
							var st = "c   0   0   0 -10  7 -10 ", en = "c  7   0  7  10  7  10 ";
							secLeft = secondary(paper, 30, 185, st, en, 280, 360, 4, coils);
							
							secRight = secondary(paper, 165, 185, st, en, 280, 360, 4, coils);
							
						}
						break;
						
						case 3000:
						{
							primaryTurns.remove();
							secLeft.remove(); secRight.remove();
							
							var start = "c  0   0  5 8 12 8 ", end =   "c 10 0 10 -10 8 -8 "
							primaryTurns = drawPriTurns(paper, 30, 105, 15, start, end, coils);
							
							var st = "c   0   0   0 -10  6 -10 ", en =  "c  7   0  7  10  6  10 ";
							secLeft = secondary(paper, 30, 185, st, en, 280, 360, 6, coils);
							
							secRight =secondary(paper, 165, 185, st, en, 280, 360, 6, coils);
							
						}
						break;
					}
				
			
        }
        obj.clearBoard = function(){
        	 voltageBoard.removeObject(l1);
        	 voltageBoard.removeObject(l2);
        	 voltageBoard.removeObject(l3);
        	 voltageBoard.removeObject(l4);
        	 voltageBoard.removeObject(movingPoint);
        	 
        }
          return {
          	obj : obj
          }
})();
