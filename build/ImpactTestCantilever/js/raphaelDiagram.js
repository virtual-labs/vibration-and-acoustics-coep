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
var accelerometer;
var translationAccel;
var translationFirst;
var translationSecond;
var analyzerDown;

//Drawing the Raphael diagram
function drawDiagram()
{
	r=new Raphael(document.getElementById('diagram'),900,540);
	var j=7;
	var tableLeg1=r.path("M28 277 l0,120").attr({'stroke-width':10,'stroke':'#CC9933','fill':'#CC9933'});
	var tableLeg2=r.path("M320 277 l0,120").attr({'stroke-width':10,'stroke':'#CC9933','fill':'#CC9933'});
	var tableLeg3=r.path("M370 237 l0,120").attr({'stroke-width':10,'stroke':'#CC9933','fill':'#CC9933'});
	var tableLeg3=r.path("M78 237 l0,120").attr({'stroke-width':10,'stroke':'#CC9933','fill':'#CC9933'});
	var table=r.path("M7 277 l320,0 l70,-40 l-320,0 l-70,40").attr({'stroke-width':7,'stroke':'#CC9966','fill':'#CC9933'});
	var cantiHolder=r.path("M60 200 l70,0 l0,-25 l-110,0 l0,100 l230,0 l0,-20 l-120,0 l0,-25 l-70 0 l0,-30").attr('fill','#707070' );
	candilines();
	var cantiScrewLeft=r.path("M60 160 l20,0 l4,-3 l-4,-3 l-20,0 l-4,3 l4,3"+"M67 160 l0,50 l6,0 l0,-50").attr('fill','#484848');
	var cantiScrewRight=r.path("M100 160 l20,0 l4,-3 l-4,-3 l-20,0 l-4,3 l4,3"+"M107 160 l0,50 l6,0 l0,-50").attr('fill','#484848');
	var baseScrewLeft=r.path("M150 255 l25,0 l0,-7 l-25,0 l0,7"+"M159 255 l0,28 l3.5,4 l3.5,-4 l0,-28").attr('fill','#484848');
	var baseScrewRight=r.path("M210 255 l25,0 l0,-7 l-25,0 l0,7"+"M219 255 l0,28 l3.5,4 l3.5,-4 l0,-28").attr('fill','#484848');
	cantilever=r.path("M60 217 l70 0 l250,0 l0,13 l-250,0 l-70,0").attr('fill','#484848');
	accelerometerWire=r.path("M295 233 s10,100 74,90 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  38 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
	accelerometer=r.path("M280 230 l30,0 l0,3 l-7,0 l0,5 l-2.5,0 l0,5 l-10,0 l0,-5 l-2.5,0 l0,-5 l-7,0 l0,-3").attr({'stroke':'#330033','fill':'#330033'});
	//var imt=r.image("images/tem.jpg",540,25,340,225);
	var adjuster=r.rect(60,209,70,8).attr({'fill':'#888888'});
	for(var i=65;i<=130;i=i+5)
	{
		var adjusterLines=r.path("M"+i+" 209 l-5,8");
	}
	for(var i=379;i>140;i=i-41.35)
	{
		var nodeLine=r.path("M"+i+" 130 l0,110").attr({'stroke':'#B0B0B0'});
		var nodeText=r.text(i,120,j);
		j-=1;
	}
	m=145;
	var vibrationAnalyzer=r.rect(536,15,350,520);
	var analayzerPartUp=r.rect(540,40,342,233).attr({'fill':'white'});
	var analayzerPartDown=r.rect(540,275,342,235).attr({'fill':'white'});
	//imageUp=r.image("images/Node1.jpg",540,25,340,225);
	//imageDown=r.image("images/Hit at node1.jpg",540,25,340,225);
	var analyzerText=r.text(696,527,"Vibration Analyzer").attr({'stroke':'#000066','font-size':12});
	hammerWire=r.path("M"+(m+115)+" 172 c40,0 80,8 100,1 c  15   0  25 -20  15 -20 c -10   0   0  20  25  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  35 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
	hammer=r.path("M"+m+" 160 l5,30 l11,0 l5,-30 l-21,0"+"M"+(m+20)+" 167 l100,0 l0 10 l-102,0"+"M"+(m+90)+" 163 l25,0 l0,18 l-25,0 l0,-18").attr({'fill':'#339966','stroke':'#339966'});
	
}

//Animation when Material change
function materialChange()
{
	switch(materialValue)
	{
		case 'st':
			cantilever.attr({'fill':'#663333','stroke':'#663333'})
			break;
		case 'al':
			cantilever.attr({'fill':'#333366','stroke':'#333366'})
			break;
		default:
			cantilever.attr({'fill':'#484848','stroke':'#484848'})
			break;
	}
}

//Animation on Changing the position of Hammer when node is selected
function changeHammer()
{
	switch(node)
	{
		case 2:
			m=163;
			distance=10;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 c40,0 80,1 80,1 c  15   0  25 -20  15 -20 c -10   0   0  20  25  20 c  15   0  25 -20  15 -20 c -10   0   0  20  18  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  35 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
			
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node2.jpg"/>';
			//analyzerDown='<img src="images/Hit at node2.jpg"/>';
			break;
		case 3:
			m=204;
			distance=11;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 c40,0 80,1 70,1 c  10   0  25 -20  10 -20 c -10   0   0  20  20  20 c  10   0  25 -20  10 -20 c -10   0   0  20  18  20 c  10   0  25 -20  10 -20 c -10   0   0  20  15  20 c  10   0  25 -20  10 -20 c -10   0   0  20  15  20 c10   0  25 -20  30 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
			document.getElementById('analyzerUp').innerHTML=''
			document.getElementById('analyzerDown').innerHTML=''
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node3.jpg"/>'
			//analyzerDown='<img src="images/Hit at node3.jpg"/>';
			break;
		case 4:
			m=245;
			distance=12;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 c40,0 50,1 50,1 c  10   0  25 -20  7 -20 c -10   0   0  20  15  20 c  10   0  25 -20  7 -20 c -10   0   0  20  15  20 c  10   0  25 -20  7 -20 c -10   0   0  20  15  20 c  10   0  25 -20  7 -20 c -10   0   0  20  15  20 c10   0  25 -20  27 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
			document.getElementById('analyzerUp').innerHTML=''
			document.getElementById('analyzerDown').innerHTML=''
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node4.jpg"/>'
			//analyzerDown='<img src="images/Hit at node4.jpg"/>';
			break;
		case 5:
			m=285;
			distance=13;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 c40,0 40,2 40,1c  10   0  25 -20  5 -20 c -10   0   0  20  15  20 c  10   0  25 -20  5 -20 c -10   0   0  20  15  20 c  10   0  25 -20  5 -20 c -10   0   0  20  15  20 c  10   0  25 -20  3 -20 c -10   0   0  20  15  20 l17,0").attr({"stroke-width":3,"stroke":"#000099"});
			document.getElementById('analyzerUp').innerHTML=''
			document.getElementById('analyzerDown').innerHTML=''
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node5.jpg"/>'
			//analyzerDown='<img src="images/Hit at node5.jpg"/>';
			break;
		case 6:
			m=328;
			distance=14;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 l15,0c  10   0  20 -20  3 -20 c -7   0   0  20  15  20 c  10   0  20 -20  3 -20 c -7   0   0  20  15  20 c  10   0  20 -20  3 -20 c -7   0   0  20  15  20 c  10   0  20 -20  2 -20 c -7   0   0  20  15  20 l7,0").attr({"stroke-width":3,"stroke":"#000099"});
			document.getElementById('analyzerUp').innerHTML=''
			document.getElementById('analyzerDown').innerHTML=''
			
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node6.jpg"/>'
			//analyzerDown='<img src="images/Hit at node6.jpg"/>';
			break;
		case 7:
			m=368;
			distance=15;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 l5,0 c  10   0  20 -20  5 -20 c -7   0   0  20  10  20 c  10   0  20 -20  5 -20 c -7   0   0  20  10  20 c  10   0  20 -20  5 -20 c -7   0   0  20  5  20  l7,0").attr({"stroke-width":3,"stroke":"#000099"});
			document.getElementById('analyzerUp').innerHTML=''
			document.getElementById('analyzerDown').innerHTML=''
			document.getElementById('FRF').disabled=false;
			
			//document.getElementById('analyzerUp').innerHTML='<img src="images/Node7.jpg"/>'
			//analyzerDown='<img src="images/Hit at node7.jpg"/>';
			break;
		default:
			m=145;
			hammerWire.remove();
			hammerWire=r.path("M"+(m+115)+" 172 c40,0 80,8 100,1 c  15   0  25 -20  15 -20 c -10   0   0  20  25  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  35 0 l10,0").attr({"stroke-width":3,"stroke":"#000099"});
			//document.getElementById('analyzerUp').innerHTML=''
			//document.getElementById('analyzerDown').innerHTML=''
			analyzerDown='';
			break;
	}
	
	
	hammer.remove();
	hammer=r.path("M"+m+" 160 l5,30 l11,0 l5,-30 l-21,0"+"M"+(m+20)+" 167 l100,0 l0 10 l-102,0"+"M"+(m+90)+" 163 l25,0 l0,18 l-25,0 l0,-18").attr({'fill':'#339966','stroke':'#339966'});
	
	
}

function showFRF()
{
	document.getElementById('analyzerUp').innerHTML='<img src="images/FRF Phase.jpg"/>';
	document.getElementById('analyzerDown').innerHTML='<img src="images/FRF Magnitude.jpg"/>';
	document.getElementById('naturalButton').disabled=false;
}

//Animation on hammer when cick hit button
function hammerHit()
{

	switch(distance)
		{
			case 15:
				translationAccel=10;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node2.jpg"/>';
				analyzerDown='<img src="images/Hit at node2.jpg"/>';
			break;
			case 14:
				translationAccel=9.4;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node3.jpg"/>'
				analyzerDown='<img src="images/Hit at node3.jpg"/>';
			break;
			case 13:
				translationAccel=8.8;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node4.jpg"/>'
				analyzerDown='<img src="images/Hit at node4.jpg"/>';
			break;
			case 12:
				translationAccel=8.2;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node5.jpg"/>'
				analyzerDown='<img src="images/Hit at node5.jpg"/>';
			break;
			case 11:
				translationAccel=7.6;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node6.jpg"/>'
				analyzerDown='<img src="images/Hit at node6.jpg"/>';
				
			break;
			case 10:
				translationAccel=7;
				document.getElementById('analyzerUp').innerHTML='<img src="images/Node7.jpg"/>'
				analyzerDown='<img src="images/Hit at node7.jpg"/>';
			break;
			default:
				translationAccel=0;
				document.getElementById('analyzerUp').innerHTML=''
				document.getElementById('analyzerDown').innerHTML=''
			break;
		}
	hammer.translate(5,14);
	hammer.rotate(-15);
	var downT=hammer.animate({translation:"0,-14",rotation:"0"},200);
	//var downR=hammer.animateWith(downT,{rotation:"0"},200);
	d1=0;
	d2=0;
	translationFirst=translationAccel;
	translationSecond=translationAccel;
	d=distance;
	cantileverVibrationFirst();
	document.getElementById('analyzerDown').innerHTML=analyzerDown;
	var graphText=r.text(680,24,"Use Scroll bar to see the complete graph").attr({fill:'red','font-size':15});
	
}


//Animation for cantilever
function cantileverVibrationFirst()
{
	if(d1<d+1)
	{
	var dist=d;
	var an1=cantilever.animate({path:"M60 217 l70 0 l250,"+(dist-d1)+" l0,13 l-250,-"+(dist-d1)+" l-70,0"},100);
	var an2=accelerometer.animateWith(an1,{path:"M280 "+(230+translationFirst)+" l30,0 l0,3 l-7,0 l0,5 l-2.5,0 l0,5 l-10,0 l0,-5 l-2.5,0 l0,-5 l-7,0 l0,-3"},100);
	var an3=accelerometerWire.animateWith(an2,{path:"M295 "+(230+translationFirst)+" s10,100 74,90 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  38 0 L537,325"},100);
	timer1=setTimeout("cantileverVibrationSecond()",100);
	d1++;
	translationFirst-=0.6;
	}
	
}

//Animation for cantilever
function cantileverVibrationSecond()
{
	if(d2<d+1)
	{
	var dist=d;
	var an1=cantilever.animate({path:"M60 217 l70 0 l250,-"+(dist-d2)+" l0,13 l-250,"+(dist-d2)+" l-70,0"},100);		
	var an2=accelerometer.animateWith(an1,{path:"M280 "+(230-translationSecond)+" l30,0 l0,3 l-7,0 l0,5 l-2.5,0 l0,5 l-10,0 l0,-5 l-2.5,0 l0,-5 l-7,0 l0,-3"},100);
	var an3=accelerometerWire.animateWith(an2,{path:"M295 "+(230-translationFirst)+" s10,100 74,90 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c  15   0  25 -20  15 -20 c -10   0   0  20  15  20 c15   0  25 -20  38 0 L537,325"},100);
	timer2=setTimeout("cantileverVibrationFirst()",100);
	d2++;
	translationSecond-=0.6;
	}
}
