ORIFICE.diagram = (function() {
var diag = {};
var paper;
		diag.paper = new Raphael(document.getElementById('canvas_container'), 750, 500);
	
diag.FlangeTapsDiagram = function(paper){
			var labelDiag = paper.text(375, 15, 'Flange Taps').attr({'font-size':'15','font-weight':'bold'})
			colorset1 = paper.set();
			colorset2 = paper.set();
			colorset3 = paper.set();
			var bottom_pipe1 = paper.path("m 382 355 l 330 0 l 0 10 l -290 0 l 0 45 l -40 0 z") //bottom right horizontal rod
			var bottom_pipe2 = paper.path("m 38.5, 355 l 334 0 l 0 55 l -40 0 l 0 -45 l -293 0 z")//bottom left horizontal rod
			var middle_blk = paper.path("m 352, 163 l 0  -33 l -3  -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 54 0 l-3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 0 33 z")//middle rectanle
			var middleBottom_rod = paper.path("m 381 405 l -8 0 l 0 -97 l 8 -8 z") //middle rod -bottom
			var middleUpper_rod  = paper.path("m 373 103 l 7 0 l 0 117 l -7 -7 z") //middle rod -upper
			
			var upper_pipe1 = paper.path("m338.5 155 l0  -25 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -13 0 l 0 51 l -290 0 l 0 10 l 300 0 z ")  //upper-left horizontal rod
			var upper_pipe2 = paper.path("m413 164 l0  -34 l -3  -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 13 0 l 0 51 l 290 0 l 0 10 z")			//upper-right horizontal rod
			//diag.paper.path("m455 170 l-100 0 ").attr({ stroke: '#C0C0C0', 'stroke-width': 1}); //helper
			
			var upper_left_holder1 = paper.rect(318,110,10,35)
			var upper_left_holder2 = paper.rect(295,120,23,15)	//upper left holder
			diag.paper.path("m295 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_left_holder1 = paper.rect(321,370,10,35)
			var bottom_left_holder2 = paper.rect(298,380,23,15)
			var connector = paper.rect(331,380,91,15) //bottom left holder-verticle
			paper.path("m298 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			paper.path("m331 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 ")
			var upper_right_holder1 = paper.rect(423,110,10,35)
			var upper_right_holder2 = paper.rect(433,120,23,15)  //upper right holder
			paper.path("m433 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_right_holder1 = paper.rect(423,370,10,35)
			var bottom_right_holder2 = paper.rect(433,380,23,15)  //bottom right holder-verticle
			paper.path("m433 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			
			colorset1.push(upper_pipe1,upper_pipe2,bottom_pipe1,bottom_pipe2,middle_blk).attr({ fill : '#999999'})
			colorset2.push(middleBottom_rod,middleUpper_rod).attr({ fill : '#666666'});
			colorset3.push(upper_left_holder1,upper_left_holder2,bottom_left_holder1,bottom_left_holder2,upper_right_holder1,upper_right_holder2,bottom_right_holder1,bottom_right_holder2,connector).attr({ fill : '#333333'});
			
			var plate = paper.text(430,80,"Orifice plate").attr({'font-weight':'bold'});
			var arrow1 = paper.path('m 401 80 l -20 20 l -2 -5');
						 paper.path('m 381 100 l 10 -3');
						 
			var pipeThreads = paper.text(330,80,"Pipe threads").attr({'font-weight':'bold'});
			var arrow = paper.path('m 340 83 l 7 25 l -4 -5');
						paper.path('m 347 108 l 4 -5');
			
			var stud = paper.text(471,387,"Stud").attr({'font-weight':'bold'});
			
			var nutLeft = paper.text(280,420,"Nut").attr({'font-weight':'bold'});
			var arrow2 = paper.path('m 292 418 l 25 -15 l -1 5');
						 paper.path('m 317 403 l -10 2');
						 
			var nutRight = paper.text(475,420,"Nut").attr({'font-weight':'bold'});
			var arrow3 = paper.path('m 463 418 l -25 -15 l -1 5');
						 paper.path('m 438 403 l 10 2');
						 
			
	}//FlangeTap diagram
	
	animateFlow = function(paper){
		p = [];
		
			var a = 195,b = 268,c = 210;
			
			for ( i = 0 ; i <= 14 ; i++ )
						{
							path = "M 40  " + a + " l 230 0 C 350, " + a + " 300," + b + " 700," + c +"";
							p[i] = animation(path ,1000, paper);
							a += 5;
							b += 5;
							c += 5;
							colorset2.push(p[i]);
						}
				
			var a = 320,b = 250,c = 320;
			q = [];
			for ( i=0 ; i <= 14; i++ )
						{
							path = "M 40  " + a + " l 230 0 C 350, " + a + " 300," + b + " 700," + c +"";
							q[i] = animation(path ,1000, paper);
							a -= 5;
							b -= 5;
							c -= 5;
							colorset2.push(q[i]);
						}
	}
	
	animation = function (pathstr , interval_length, paper){
			var path = arrowline(  pathstr, 9000, { stroke: '#87CEEB', 'stroke-width':3 } );
			function arrowline( pathstr, duration, attr, callback )
			{    
			var guide_path = paper.path( pathstr ).attr( { stroke: "none", fill: "none" } );
			var path = paper.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
		    var total_length = guide_path.getTotalLength( guide_path );
		    var start_time = new Date().getTime();
		    var interval_length = 25;
		    
		    var interval_id = setInterval( function()
		        {
		            var elapsed_time = new Date().getTime() - start_time;
		            var this_length = elapsed_time / duration * total_length;
		            var subpathstr = guide_path.getSubpath( 0, this_length );
		            attr.path = subpathstr;
		            path.animate( attr, interval_length );
		                                       
		            if ( elapsed_time >= duration )
		            {
		                clearInterval( interval_id );
		                if ( callback != undefined ) callback();
		            }           
			        }, interval_length );  
			    return path;    
			}
			return path;  
		}
	diag.FlangeTapsDiagram(diag.paper); 	
    animateFlow(diag.paper)
	diag.drawFlange = function(){
			diag.paper2 = new Raphael(document.getElementById('canvas_tapping'), 750, 500);
		var	colorset1 = diag.paper2.set();
		colorset = diag.paper2.set();
		var	colorset3 = diag.paper2.set();
			var bottom_pipe1 = diag.paper2.path("m 382 355 l 330 0 l 0 10 l -290 0 l 0 45 l -40 0 z") //bottom right horizontal rod
			var bottom_pipe2 = diag.paper2.path("m 38.5, 355 l 334 0 l 0 55 l -40 0 l 0 -45 l -293 0 z")//bottom left horizontal rod
			var middle_blk = diag.paper2.path("m 352, 163 l 0  -33 l -3  -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 54 0 l-3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 0 33 z")//middle rectanle
			var middleBottom_rod = diag.paper2.path("m 381 405 l -8 0 l 0 -97 l 8 -8 z") //middle rod -bottom
			var middleUpper_rod  = diag.paper2.path("m 373 103 l 7 0 l 0 117 l -7 -7 z") //middle rod -upper
			
			var upper_pipe1 = diag.paper2.path("m338.5 155 l0  -25 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -13 0 l 0 51 l -290 0 l 0 10 l 300 0 z ")  //upper-left horizontal rod
			var upper_pipe2 = diag.paper2.path("m413 164 l0  -34 l -3  -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 13 0 l 0 51 l 290 0 l 0 10 z")			//upper-right horizontal rod
			//diag.paper.path("m455 170 l-100 0 ").attr({ stroke: '#C0C0C0', 'stroke-width': 1}); //helper
			
			var upper_left_holder1 = diag.paper2.rect(318,110,10,35)
			var upper_left_holder2 = diag.paper2.rect(295,120,23,15)	//upper left holder
			diag.paper2.path("m295 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_left_holder1 = diag.paper2.rect(321,370,10,35)
			var bottom_left_holder2 = diag.paper2.rect(298,380,23,15)
			var connector = diag.paper2.rect(331,380,91,15) //bottom left holder-verticle
			diag.paper2.path("m298 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			diag.paper2.path("m331 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 ")
			var upper_right_holder1 = diag.paper2.rect(423,110,10,35)
			var upper_right_holder2 = diag.paper2.rect(433,120,23,15)  //upper right holder
			diag.paper2.path("m433 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_right_holder1 = diag.paper2.rect(423,370,10,35)
			var bottom_right_holder2 = diag.paper2.rect(433,380,23,15)  //bottom right holder-verticle
			diag.paper2.path("m433 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			
			colorset1.push(upper_pipe1,upper_pipe2,bottom_pipe1,bottom_pipe2,middle_blk).attr({ fill : '#999999'})
			colorset.push(middleBottom_rod,middleUpper_rod).attr({ fill : '#666666'});
			colorset3.push(upper_left_holder1,upper_left_holder2,bottom_left_holder1,bottom_left_holder2,upper_right_holder1,upper_right_holder2,bottom_right_holder1,bottom_right_holder2,connector).attr({ fill : '#333333'});
			
			diag.paper2.text(300,80,"Orifice plate"); 
		}
	diag.drawFlange()
	diag.CornerTapsDiagram = function(){
		if(diag.paper2 != undefined)
			{
				colorset.remove();
				diag.paper2.clear();
				diag.paper2 = new Raphael(document.getElementById('canvas_tapping'), 750, 500);
			}
			colorset1 = diag.paper2.set();
			colorset = diag.paper2.set();
			colorset3 = diag.paper2.set();
			
			var upper_pipe1 = diag.paper2.path("m 7 160 l 270 0 l 0 -12 l 60 0 l 0 -47 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -4 l -15 0 l 0 60 l -95 0 l 0 14 l -228 0 l 0 13z ")
			var upper_pipe2 = diag.paper2.path("m 417 148 l 0 -48 l -3 -3 l 3 -3 l -3 -3 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -4 -3 l 16 0 l 0 61 l 90 0 l 0 14 l 223 0 l 0 14 l -268 0 l 0 -14 z");
			var bottom_pipe1 = diag.paper2.path("m 382 445 l 0 -70 l 100 0 l 0 -15 l 260 0 l 0 12 l -220 0 l 0 18 l -90 0 l 0 55z") //bottom right horizontal rod
			
			var bottom_pipe2 = diag.paper2.path("m2, 360 l 270 0 l 0 15 l 100 0 l 0 70 l -50 0 l 0 -55 l -90 0 l 0 -18 l -230 0 z")//bottom left horizontal rod
			var middle_blk = diag.paper2.path("m354, 148 l 0  -48 l -3  -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 3 -3 l -3 -3 l 54 0 l-3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 3 3 l -3 3 l 0 48 z")//middle rectanle
			
			var bottom_rod = diag.paper2.path("m381 307 l 0 130 l -8 0 l 0 -122 z") //middle rod -bottom
			var upper_rod = diag.paper2.path("m381 210 l 0 -137 l -8 0 l 0 130 z") //middle rod -bottom
			
			var bottom_left_holder1 = diag.paper2.rect(312,400,10,35)
			var bottom_left_holder2 = diag.paper2.rect(289,410,23,15)
			var connector = diag.paper2.rect(323,410,109,15) //bottom left holder-verticle
			
			var upper_left_holder1 = diag.paper2.rect(314,87,10,35)
			var upper_left_holder2 = diag.paper2.rect(291,97,23,15)
			
			diag.paper2.path("m292 112 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			diag.paper2.path("m323 425 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 ")
			
			var bottom_right_holder1 = diag.paper2.rect(432,400,10,35)
			var bottom_right_holder2 = diag.paper2.rect(442,410,23,15)  //bottom right holder-verticle
			
			diag.paper2.path("m442 425 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			diag.paper2.path("m292 425 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			
			middleRodUpper = diag.paper2.rect(373, 74, 7, 28.5).attr({ fill : '#666666'});
			
			var upper_right_holder1 = diag.paper2.rect(430,87,10,35)
			var upper_right_holder2 = diag.paper2.rect(440,97,23,15)
			
			diag.paper2.path("m441 112 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			
			var breakUpperLeft = diag.paper2.path("m 230 148 l 6 -4 l 3 6 l 6 -5 l 3 7 l 6 -5 l 3 7 l 6 -5 l 3 7 l 6 -5 l 3 8")
			var breaklowerRight = diag.paper2.path("m 484 361 l 3 8 l 6 -5 l 3 8 l 6 -5 l 3 8 l 6 -5 l 4 8 l 7 -7 ")
			var breaklowerLeft = diag.paper2.path("m 271 361 l -5 8 l -5 -6 l -5 8 l -5 -5 l -4 7 l -4 -5 l -4 7 l -5 -7 l -2 7")
			var breakUpperRight = diag.paper2.path("m 518 148 l -4 5 l -4 -7 l -4 8 l -4 -7 l -4 8 l -4 -7 l -4 8 l -4 -6 l -4 8 l -4 -6 l -4 7")
			
			var rod1 = diag.paper2.path("m 277 160 l 90 0 l 0 -3 l -90 0").attr({fill: '#000'});//upper left
			var rod2 = diag.paper2.path("m 475 158 l -89 0 l 0 3 l 89 0").attr({fill: '#000'});//upper right
			var rod3 = diag.paper2.path("m 273 361 l 93 0 l 0 3 l -93 0").attr({fill: '#000'});//bottom left
			var rod4 = diag.paper2.path("m 482 361 l -94 0 l 0 3 l 94 0").attr({fill: '#000'});//bottom right
			
			colorset1.push(upper_pipe1,upper_pipe2,bottom_pipe1,bottom_pipe2,middle_blk).attr({ fill : '#999999'})
			colorset.push(bottom_rod,upper_rod).attr({ fill : '#666666'});
			colorset3.push(upper_left_holder1,upper_left_holder2,bottom_left_holder1,bottom_left_holder2,upper_right_holder1,upper_right_holder2,bottom_right_holder1,bottom_right_holder2,connector).attr({ fill : '#333333'});
	}	
	
	diag.DTapsDiagram = function(){
		if(diag.paper2 != undefined){
			colorset.remove();
			diag.paper2.clear();
			diag.paper2 = new Raphael(document.getElementById('canvas_tapping'), 750, 500);
		}
			
		
			colorset1 = diag.paper2.set();
			colorset = diag.paper2.set();
			colorset3 = diag.paper2.set();
			var bottom_pipe1 = diag.paper2.path("m 382 355 l 330 0 l 0 10 l -290 0 l 0 45 l -40 0 z") //bottom right horizontal rod
			var bottom_pipe2 = diag.paper2.path("m 38.5, 355 l 334 0 l 0 55 l -40 0 l 0 -45 l -293 0 z")//bottom left horizontal rod
			
			var middle_block = diag.paper2.path("m 373 163 l -180 0  l 3 -3 l -3 -3 l 3 -3 l 134 0 l 0 -52 l 93 0 l 0 52 l 80 0 l -3 3 l 3 3 l -3 3 l -123 0").attr({ fill : '#999999'})//middle rectanle
			 
			
			var middleBottom_rod = diag.paper2.path("m 381 405 l -8 0 l 0 -97 l 8 -8 z") //middle rod -bottom
			var middleUpper_rod  = diag.paper2.path("m 373 103 l 7 0 l 0 117 l -7 -7 z") //middle rod -upper
			
			var upper_pipe1 = diag.paper2.path("m 37.5 155  l 145 0 l -3 3 l 3 3 l -3 3 l  -143 0 l 0 -9")  //upper-left horizontal rod
			var upper_pipe2 = diag.paper2.path("m 517 155 l 197 0 l 0 9 l -200 0 l 3 -3 l -3 -3 l 3 -3")			//upper-right horizontal rod
			
			var connectorUpper = diag.paper2.rect(318, 120, 111, 15).attr({ fill : '#333333'});
			var x = 332;
			for(i=1; i<12; i++){
				diag.paper2.path("m " + x + " 135 l 7 -15 ");
				x= x+8;
			}
			
			var upper_left_holder1 = diag.paper2.rect(318,110,10,35)
			var upper_left_holder2 = diag.paper2.rect(295,120,23,15)	//upper left holder
			diag.paper.path("m295 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_left_holder1 = diag.paper2.rect(321,370,10,35)
			var bottom_left_holder2 = diag.paper2.rect(298,380,23,15)
			var connector = diag.paper2.rect(331,380,91,15) //bottom left holder-verticle
			diag.paper2.path("m298 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			diag.paper2.path("m331 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 l 7 -15 l -7 15 l 7 0 ")
			var upper_right_holder1 = diag.paper2.rect(423,110,10,35)
			var upper_right_holder2 = diag.paper2.rect(433,120,23,15)  //upper right holder
			diag.paper2.path("m433 135 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			var bottom_right_holder1 = diag.paper2.rect(423,370,10,35)
			var bottom_right_holder2 = diag.paper2.rect(433,380,23,15)  //bottom right holder-verticle
			diag.paper2.path("m433 395 l 7 -15 l 7 0 l -7 15 l 7 0 l 7 -15")
			
			colorset1.push(upper_pipe1,upper_pipe2,bottom_pipe1,bottom_pipe2).attr({ fill : '#999999'})
			colorset.push(middleBottom_rod,middleUpper_rod).attr({ fill : '#666666'});
			colorset3.push(upper_left_holder1,upper_left_holder2,bottom_left_holder1,bottom_left_holder2,upper_right_holder1,upper_right_holder2,bottom_right_holder1,bottom_right_holder2,connector).attr({ fill : '#333333'});
			
			diag.paper2.text(300,80,"Orifice plate");
	}	
		
	return {
		diag : diag
	}
	
})();
