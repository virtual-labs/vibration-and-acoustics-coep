//This file for Diagram
//Declaring the variables
var r;
var m;
var cantilever;
var hammer;
var hammerWire;
var acceleratorWire;
var hammerWireSet;
var accelerometerWireSet;
var timer1;
var timer2;
var imageUp;
var imageDown;
var d1;
var d2;
var distance;
var distancey=20;
var distancex=5;
var distancex1=5;
var distancex2=5;
var distancex3=5;
var distancex4=5;

var accelerometer;
var translationAccel;
var translationFirst;
var translationSecond;
var analyzerDown;
var bottomline1;
var bottomline2;
var rect1;
var rect2;
var rect3;
var rect4;
var rect5;
var wire;
//Drawing the Raphael diagram
function drawDiagram()
{
	r=new Raphael(document.getElementById('diagram'),900,600);
	var j=7;
	
	var bottomline=r.path("M20 420 l 363 0 l 0 -30 l -50 0 l 0 -150 l -30 0 l 0 60 l -30 0 l 0 30 l 30 0 l 0 60 l -203 0 l 0 -60 l 30 0 l 0 -30 l -30 0 l 0 -60 l -30 0 l 0 150 l -50 0 l 0 30").attr({'fill':'#330000'});
	var text = r.text(200, 430 ,"Vibration Shaker");
	/*var bottomline=r.path("M84 350 l 20 0")
	var bottomline=r.path("M84 370 l 20 0")
	
	var bottomline=r.path("M252 350 l 20 0")
	var bottomline=r.path("M252 370 l 20 0")*/
	
	rect1=r.rect(175,205,50,40).attr({'fill':'#6E6E6E'});
	rect2=r.rect(152,230,100,70).attr({'fill':'#507786'});
	rect3=r.rect(130,265,143,100).attr({'fill':'white'});
	var text = r.text(120, 220, "Shaker Table");
	rect4=r.rect(185,190,30,8).attr({'fill':'black'});
	var text = r.text(320,190, "Cantilever");
	rect5=r.rect(451,190,30,8);
	var text = r.text(430,180 , "Accelerometer");
	//var bottomline=r.rect(183,198,30,6).attr({'fill':'black'});
	
	
		cantilever=r.path("M183 201  l 50 0 c 50,0 50,0 100, 0  s1,1 150,1").attr({"stroke-width":6,"stroke":"#00008B"});
		//var cantilever2=r.path("M183 201  l 50 0 c 50,-20 50,20 100,0 s 50,10 70,0 ").attr({"stroke-width":6,"stroke":"black"});
	
	//var cantilever3=r.path("M183 201  l 50 0 c 50,20 50,-20 100,0 s 50,-10 68,0 ").attr({"stroke-width":6,"stroke":"black"});
	
	
	
	
	wire=r.path("M470 189 c  0   0  -10 -20  15 -20  c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 L 535 170").attr({"stroke-width":3,"stroke":"GREEN"});
	
	m=145;
	var vibrationAnalyzer=r.rect(536,20,350,500);
	var analayzerPartUp=r.rect(540,46,342,430).attr({'fill':'white'}); 
	
	//imageUp=r.image("images/Node1.jpg",540,25,340,225);
	//imageDown=r.image("images/Hit at node1.jpg",540,25,340,225);
	var analyzerText=r.text(696,507,"Vibration Analyzer").attr({'stroke':'#000066','font-size':12});
	//cantileverVibrationFirst();
	
	
	
}

//Animation on hammer when cick hit button
function cantileverHit()
{
   
	d=distancey;
	
	cantileverVibrationFirst();

}


//Animation for cantilever
function cantileverVibrationFirst()
{
	


	var an1=cantilever.animate({path:"M183 "+(201+distancex)+"  l 50 0 c 50,-"+(distancey)+" 50,"+(distancey)+" 100,0 s 50,"+(distancey)+" 150,0 "},50);
	var an2=rect1.animateWith(an1,{y:205+(distancex)},50);
	var an3=rect2.animateWith(an1,{y:230 +(distancex1)},50);
	var an4=rect4.animateWith(an1,{y:190 +(distancex2)},50);
	var an4=rect5.animateWith(an1,{y:190 +(distancex3)},50);
	var an5=wire.animateWith(an1,{path:"M470  "+(189+distancex4)+" c  0   0  -10 -20  15 -20  c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 L 535 170"},50);
	timer1=setTimeout("cantileverVibrationSecond()",50);
	
	
	
}

//Animation for cantilever
function cantileverVibrationSecond()
{
	

	var an1=cantilever.animate({path:"M183  "+(201-distancex)+"   l 50 0 c 50,"+(distancey)+" 50,-"+(distancey)+" 100,0 s 50,-"+(distancey)+" 150,0"},50);		
	var an2=rect1.animateWith(an1,{y:205 -(distancex) },50);
	var an3=rect2.animateWith(an1,{y:230 -(distancex1)},50);
	var an4=rect4.animateWith(an1,{y:190 -(distancex2)},50);
	var an4=rect5.animateWith(an1,{y:190 -(distancex3)},50);
	var an5=wire.animateWith(an1,{path:"M470 "+(189-distancex4)+" c  0   0  -10 -20  15 -20  c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 L 535 170"},50);
	distancey-=0.5/2;
	distancex-=0.125/4;
	distancex1-=0.125/4;
	distancex2-=0.125/4;
	distancex3-=0.125/4;
	distancex4-=0.125/4;
	if(distancey>0)
	timer2=setTimeout("cantileverVibrationFirst()",50);
	//alert(timer2);
	if(distancey == 0){
		document.getElementById('analyzerUp').innerHTML='<img src="images/upperImg.jpg"/>';
		analyzerDown='<img src="images/lowerImg.jpg"/>';
		document.getElementById('analyzerDown').innerHTML=analyzerDown;
		var graphText=r.text(675,28,"Use Scroll bar to see the complete graph").attr({fill:'red','font-size':15});
	}
	
}
