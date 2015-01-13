var screwX;
var screwY;
var outlineRod;
var lowerCircle;
var upperCircle;
var outerRect;
var innerRect;
var smallRect;
var pendulum;
var check;
var sec;
var secs;
var ruler;
var rotationDegree;
var centerX;
var centerY;
var topTriangle;
var topMiddleCircle;
var topOuterCircle;
var bottomMiddleCircle;
var bottomOuterCircle;
var outLine;
var check;
function picture()
{
	sec=500;
	secs=500;
	rotationDegree=20;
	r=new Raphael(document.getElementById('picture'),805,520);
	outLine=r.path("M385 35 l-20,355 l70,0 l-20,-355 l-30,0").attr({fill:"#484848"});
	gText=r.text(400,250,"G").attr({'font-size':14});
	rText=r.text(400,260,"+").attr({'font-size':14});
	topOuterCircle=r.circle(400,35,20).attr({fill:"#808080"});
	r.text(400,7,"O").attr({'font-size':14});
	topMiddleCircle=r.circle(400,35,15).attr({'stroke-width':4,fill:"white"});
	topTriangle=r.path("M400,20 l5,10 l-10,0 l5,-10").attr({fill:"black"});
	screwPath=r.path("M330 365 l5,0 l0,-10 l20,0 l0,10 l90,0 l0,-10 l20,0 l0,10 l5,0 l0,60 l-5,0 l0,3 l-4,0 l0,3 l-4,0 l0,3 l-4,0 l0,-3 l-4,0 l0,-3 l-4,0 l0,-3 l-90,0 l0,3 l-4,0 l0,3 l-4,0 l0,3 l-4,0 l0,-3 l-4,0 l0,-3 l-4,0 l0,-3 l-5,0 l0,-60").attr({fill:"	#404040"});
	bottomOuterCircle=r.circle(400,390,50).attr({fill:"#808080"});
	rulerPath1=r.path("M650 395 s-250,176,-512,-10,");
	rulerPath2=r.path("M657 408 s-252,178,-526,-8,");
	bottomMiddleCircle=r.circle(400,390,35).attr({'stroke-width':5,fill:"#EEEEEE"});
	ruler();
}

function oscillation()
{
	switch(rotationDegree)
	{
		case 35:
			xPosition=105;
			xPosition1=115;
			yPosition=32;
			centerX=193;
			centerY=327;
			screwX=211;
			screwY=63;
		break;
		
		case 30:
			xPosition=90;
			xPosition1=100;
			yPosition=24;
			centerX=220;
			centerY=342;
			screwX=183;
			screwY=47;
		break;
		
		case 25:
			xPosition=75;
			xPosition1=85;
			yPosition=16;
			centerX=250;
			centerY=357;
			screwX=153;
			screwY=32;
		break;
		
		case 20:
			xPosition=59;
			xPosition1=69;
			yPosition=9;
			centerX=280;
			centerY=370;
			screwX=122;
			screwY=19;
		break;
		
		case 15:
			xPosition=45;
			xPosition1=55;
			yPosition=6;
			centerX=308;
			centerY=377;
			screwX=95;
			screwY=11;
		break;
		
		case 10:
			xPosition=30;
			xPosition1=40;
			yPosition=3;
			centerX=337;
			centerY=385;
			screwX=64;
			screwY=5;
		break;
		
		case 5:
			xPosition=15;
			xPosition1=25;
			yPosition=2;
			centerX=369;
			centerY=390;
			screwX=32;
			screwY=0;
		break;
	}
	v=outLine.animate({rotation:""+rotationDegree,translation:"-"+xPosition+",-"+yPosition},500);
	var g=gText.animate({rotation:""+rotationDegree,translation:"-"+xPosition1+",-"+yPosition},500);
	var r=rText.animate({rotation:""+rotationDegree,translation:"-"+xPosition1+",-"+yPosition},500);
	var an2=bottomOuterCircle.animateWith(v,{cx:centerX,cy:centerY},500);
	var an3=bottomMiddleCircle.animateWith(v,{cx:centerX,cy:centerY},500);
	var an4=screwPath.animateWith(v,{rotation:""+rotationDegree,translation:"-"+screwX+",-"+screwY},500);
	setTimeout(function(){
		second();
	},500);
}

function first()
{
	v=outLine.animate({rotation:"-"+rotationDegree,translation:""+xPosition+",-"+yPosition},500);
	var g=gText.animate({rotation:"-"+rotationDegree,translation:""+xPosition1+",-"+yPosition},500);
    var r=rText.animate({rotation:"-"+rotationDegree,translation:""+xPosition1+",-"+yPosition},500);
	var an2=bottomOuterCircle.animateWith(v,{cx:(400-centerX)+400,cy:centerY},500);
	var an3=bottomMiddleCircle.animateWith(v,{cx:(400-centerX)+400,cy:centerY},500);
	var an4=screwPath.animateWith(v,{rotation:"-"+rotationDegree,translation:""+screwX+",-"+screwY},500);
	setTimeout(function(){
		third();
	},500);
}
function second()
{
	v=outLine.animate({rotation:"0",translation:""+xPosition+","+yPosition},500);
	var g=gText.animate({rotation:"0",translation:""+xPosition1+","+yPosition},500);
	var r=rText.animate({rotation:"0",translation:""+xPosition1+","+yPosition},500);
	var an2=bottomOuterCircle.animateWith(v,{cx:400,cy:390},500);
	var an3=bottomMiddleCircle.animateWith(v,{cx:400,cy:390},500);
	var an4=screwPath.animateWith(v,{rotation:"0",translation:""+screwX+","+screwY},500);
	setTimeout(function(){
		first();
	},500);
}
function third()
{
	v=outLine.animate({rotation:"0",translation:"-"+xPosition+","+yPosition},500);
	var g=gText.animate({rotation:"0",translation:"-"+xPosition1+","+yPosition},500);
	var r=rText.animate({rotation:"0",translation:"-"+xPosition1+","+yPosition},500);
	var an2=bottomOuterCircle.animateWith(v,{cx:400,cy:390},500);
	var an3=bottomMiddleCircle.animateWith(v,{cx:400,cy:390},500);
	var an4=screwPath.animateWith(v,{rotation:"0",translation:"-"+screwX+","+screwY},500);
	rotationDegree-=5;
	if(rotationDegree>0){
		setTimeout(function(){
			oscillation();
		},500)
	}
	else{
		setTimeout(function(){
		setSubmitButton();
		},2000); 
	}
}

function setSubmitButton()
{
	if(clicked == "trialOne"){
		$("#textbox3").val(timeTen1);
		$("#textbox4").val(time1);
		$("#submit1").attr("disabled",false);
		$("#submit,#submit1").addClass('bluebtn');
		
	} else if(clicked == "trialTwo"){
		$("#textbox5").val(timeTen2);
		$("#textbox6").val(time2);
		$("#submit2").attr("disabled",false);
		$("#submit2,#submit1").addClass('bluebtn');
	} else if(clicked == "trialThree"){
		$("#textbox7").val(timeTen3);
		$("#textbox8").val(time3);
		$("#submit2,#submit1","#submit").addClass('bluebtn');
	} 
	$("#submit").attr("disabled",false);
	$("#submit1").attr("disabled",false);
	$("#submit2").attr("disabled",false);
}




