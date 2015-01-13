  var springs = [];
var tiIndex = 0;
  var globalObject = {
      x: 200,
      y: 180,
      rad: 40,
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 420,
      startingAngle: 0.7 * Math.PI,
      endingAngle: 0.28 * Math.PI,
      counterclockwise: true,
      centerX: 170,
      centerY: 170,
      theta: 0
  }
//var no=3.6;
	//time=200;
  var numSpringSegments = 4;
  var startX = 120;
  var startY = 400;
  var amplitude = 100;
  var period = 1000;
  var myStage = null;
  var x = 20;
  var springHeight = 0;
  
  function SpringSegment(startX, startY, height) {
      this.startX = startX;
      this.startY = startY;
      this.height = height;
  }

  function drawSpring() {
      context.beginPath();
      for (n = 0; n < springs.length; n++) {
          var thisSpringSegment = springs[n];
          var springHeight = thisSpringSegment.height;
          var startX = thisSpringSegment.startX;
          var startY = thisSpringSegment.startY;
          var controlPointX1 = startX + 130;
          var controlPointY1 = startY+ 20;
          var controlPointX2 = startX - 140;
          var controlPointY2 = startY - springHeight;
          var endPointX = startX;
          var endPointY = startY - springHeight;
			
		  var controlPointX11 = startX + 145;
		  var controlPointY11 = startY + 20;
          var controlPointX21 = startX - 150;
          var controlPointY21 = startY - springHeight;
          context.moveTo(startX, startY);
          
          //context.shadowColor = “red”;
          context.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, endPointX, endPointY);
          context.shadowOffsetX = 0; 
          context.shadowOffsetY = 0; 
          context.shadowBlur = 10;
          context.font = '18pt Calibri';
          context.fillStyle = 'blue';
          //context.fillText("M", 50,185);
          context.fillText("K", 50,330);
          context.fillText("C", 290,330);
          //context.bezierCurveTo(-80, 210, 300, 120, 110, 120);
          //context.bezierCurveTo(-100, 130, 250,150, 100, 100);
		  //context.bezierCurveTo(controlPointX11, controlPointY11, controlPointX21, controlPointY21, endPointX, endPointY);
          context.lineWidth = 8;
          context.strokeStyle = "#555";
          context.stroke();
      }
  }

  function drawConnectors() {
      var firstSpringSegment = springs[0];
      var lastSpringSegment = springs[springs.length - 1];
      context.beginPath();

      context.moveTo(firstSpringSegment.startX, 420);
      context.lineTo(firstSpringSegment.startX, firstSpringSegment.startY);
      context.moveTo(lastSpringSegment.startX, lastSpringSegment.startY - lastSpringSegment.height);
      context.lineTo(lastSpringSegment.startX, lastSpringSegment.startY - lastSpringSegment.height - 15);

      context.lineCap = "round";
      context.lineWidth = 8;
      context.strokeStyle = "#555";
      context.stroke();
  }

  function drawWeight() {
      var squareLength = 200;

      var lastSpringSegment = springs[springs.length - 1];
      var squareStartX = lastSpringSegment.startX - 40;
      var squareStartY = lastSpringSegment.startY - lastSpringSegment.height - 66;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(squareStartX, squareStartY, squareLength, squareLength / 4);
	  context.font = '18pt Calibri';
      context.fillStyle = 'blue';
      context.fillText("M", squareStartX + 90,squareStartY + 35);
      context.lineCap = "round";
      context.lineWidth = 5;
      context.strokeStyle = "#555";
      context.stroke();
  }

  drawCylinder = function () {

      // var context = globalObject.context;
      var x = globalObject.x,
          y = globalObject.y,
          rad = globalObject.rad,
          x2 = globalObject.x2,
          y2 = globalObject.y2,
          startingAngle = globalObject.startingAngle,
          endingAngle = globalObject.endingAngle,
          counterclockwise = globalObject.counterclockwise,
          centerX = globalObject.centerX,
          centerY = globalObject.centerY;
      context.beginPath();
      context.moveTo(226, 260);
      context.lineTo(226, 380);
      context.arc(250, 355, rad, startingAngle, endingAngle, counterclockwise);
      context.lineTo(276, 260);

      context.moveTo(90, 420);
      context.lineTo(350, 420);

      for (i = 0; i < 25; i++) {
          context.moveTo(x2, y2);
          context.lineTo(x2 - 10, y2 + 20);
          x2 = x2 + 10;
          y2 = y2;
      }
      context.moveTo(250, 395);
      context.lineTo(250, 420);
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.stroke();
  }

  drawEllipse = function (x, y, w, h, color) {
      var ctx = context;
      var kappa = .5522848;
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w, // x-end
      ye = y + h, // y-end
      xm = x + w / 2, // x-middle
      ym = y + h / 2; // y-middle
      //animationGlobalPoint.yMid = ym,
      //animationGlobalPoint.xMid = xm,
      //controllingPoint.x = x;
      //controllingPoint.y = ym;
      ctx.beginPath();
      ctx.moveTo(x, ym);
      ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      ctx.lineWidth = 2;
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      ctx.stroke();
  }

  centerLine = function () {

      var lastSpringSegment = springs[springs.length - 1];
      var startX = lastSpringSegment.startX + 130;
      var startY = lastSpringSegment.startY - lastSpringSegment.height - 15;
      var lastY = startY + lastSpringSegment.height;
      context.moveTo(startX, startY);
      context.lineTo(startX, lastY + 60);
      context.lineWidth = 3;
      context.stroke();
      drawEllipse(startX - 24, startY + lastSpringSegment.height + 60, 50, 20, "black");
  }

  init = function () {
      canvas.width = canvas.width;
	  
      springHeight = x0 * Math.exp(-zeta * omegaN * ti[i]) * (Math.cos(omegaD * ti[i]) + (zeta / Math.sqrt(1 - (zeta * zeta))) * Math.sin(omegaD * ti[i]));
	  //alert(x0 + "-------" + omegaN );
      //console.log(springHeight);
      for (n = 0; n < numSpringSegments; n++) {
          var thisStartY = startY - (n * springHeight);
          var thisSpringSegment = new SpringSegment(startX, thisStartY, springHeight);
          springs.push(thisSpringSegment);
      }
      drawEllipse(226, 250, 50, 20, "white");
      drawSpring();
      drawConnectors();
      drawWeight();
      drawCylinder();
      centerLine();
      timer = window.setInterval(anim, 200);
  }

  start = function () {
     springHeight = (amplitude * Math.sin((2 * Math.PI * x) / period)) + 35 + amplitude;
	 //console.log(springHeight);
      for (n = 0; n < numSpringSegments; n++) {
          var thisStartY = startY - (n * springHeight);
          var thisSpringSegment = new SpringSegment(startX, thisStartY, springHeight);
          springs.push(thisSpringSegment);
      }
      drawEllipse(226, 250, 50, 20, "white");
      drawSpring();
      drawConnectors();
      drawWeight();
      drawCylinder();
      centerLine();
  }

  anim = function () {
   		amplitude =amplitude - 0.2;
   		
		springHeight = (amplitude * Math.sin((2 * Math.PI * ti[tiIndex])) ) + 35 + amplitude;
		//springHeight=springHeight-3;
		var dc=parseFloat($("#c").val());
		
		//alert(x0 + " " + zeta + " " + omegaN + " " + ti[tiIndex]+ " " +omegaD)
	   // springHeight = (x0 * Math.exp(-zeta * omegaN * ti[tiIndex]) * (Math.cos(omegaD * ti[tiIndex]) + (zeta / Math.sqrt(1 - (zeta * zeta))) * Math.sin(omegaD * ti[tiIndex])) ) * 10;
		//console.log(ti[tiIndex]);
		if(dc<15){
			no=4.2;
			time=150;
		}else if(dc>=15 && dc<=25){
			no=3.2;
			time=90;
		}else if(dc>=26 && dc<=40){
			no=2.0;
			time=60;
		}
		else if(dc>40) {
			no=0.6;
			time=20;
		}
		// else if(dc>25)
		// {
			// no=3.6;
			// time=150;
		// }
		if (ti[tiIndex] > no) {
          clearInterval(timer);
		 //  plotData();
		 
      } else{
	
      for (n = 0; n < springs.length; n++) {
          var thisStartY = startY - (n * springHeight);
          var thisSpringSegment = springs[n];
          thisSpringSegment.startY = thisStartY;
          thisSpringSegment.height = springHeight;
      }
		 canvas.width = canvas.width;
		 
 	  //console.log(ccc);
      drawEllipse(226, 250, 50, 20, "white");
      drawSpring();
      drawConnectors();
      drawWeight();
      drawCylinder();
      centerLine();
      plotData();
      //x--;
		}
	tiIndex++
  }