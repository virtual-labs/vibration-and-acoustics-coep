var weightThree;
var weightTwo;
var weightOne;
var weightPath;
var weightFour;
var fillColor;
var springHookUp;
var dampHookUp;
var dampHookDown;
var coverPath;
var dampEllipOut;
var dampEllipIn;
var springHookDown;
var spring;
var base;
var lin=[];
var k;
var j;
var j1;
var d;
var u;
var s=0;
var sec=500;
var secs=10;
var temp=0;
var tempJ;
var anim =0;

function diagram()
{
	 r=new Raphael(document.getElementById('diagram'),365,503);
	 weightThree=r.path("M120 180l20 -20l0 30l-20 20l0 -30").attr("fill","#C0C0C0");
	 weightTwo=r.rect(140,160,100,30).attr("fill","#C0C0C0");
	 weightOne=r.rect(120,180,100,30).attr("fill","#C0C0C0");
	 weightPath=r.path("M120 180l20 -20l100 0l-20 20l-100 0").attr("fill","black");
	 weightFour=r.path("M220 180l20 -20l0 30l-20 20l0 -30").attr("fill","#C0C0C0");
	 fillColor=r.path("M175 300l0 120l47 0l0 -120s-23.5,-14 -47,0").attr({fill: 'white',	stroke: 'white'});
	 weightBox=r.set();
	 springHookUp=r.path("M140 210l0 50").attr({'stroke-width':4,'stroke':'#330000'});
	 springHookDown=r.path("M140 450l0 -53").attr({'stroke-width':4,'stroke':'#330000'});
	 spring=r.path("M140 398 l-15,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l16,-10").attr({'stroke-width':4,'stroke':'#330000'});
	 dampEllipIn=r.ellipse(198.5,355,22.5,7).attr({'stroke-width':3,'fill':'	#606060'});
	 dampHookUp=r.path("M199 210l0 145").attr({'stroke-width':3});
	 dampHookDown=r.path("M199 427l0 23").attr({'stroke-width':3});
	 coverPath=r.path("M175 300l0 120"+"M222 300l0 120").attr({'stroke-width':3});
	 dampEllipOut=r.ellipse(198.5,300,22.5,7).attr({'stroke-width':3});
	 dampBottom=r.path("M175 420s23.5,14 47,0").attr({'stroke-width':3,'fill':'white'});
	 base=r.path("M90 450l190 0").attr({'stroke-width':2});
	for(var i=100;i<280;i=i+10)
	{
		r.path("M"+i+" 450l-10 10");
	}
	
}
function dampingEffect()
{	
	k=x0*5.6;
	j=x0*Math.exp(-zeta*omegaN*s)*(Math.cos(omegaD*s)+(zeta/Math.sqrt(1-(zeta*zeta)))*Math.sin(omegaD*s));
	j1=j*5.6;
	d=10-(k/14);
	if(temp==0)
	{
		tempJ=j;
		temp++;
		s+=secs;
		anim=j*5.6;
		var an1=spring.animate({path:"M140 398 l-15,-"+d+" l30,-"+d+" l-30,-"+d+" l30,-"+d+" l-30,-"+d+" l30,-"+d+" l-30,-"+d+" l30,-"+d+" l-30,-"+d+" l30,-"+d+" l-30,-"+d+" l30,-"+d+" l-30,-"+d+" l16,-"+d+""},0);
		var an3=springHookUp.animateWith(an1,{path:"M140 "+(210+anim)+"l0 50"},0);
		var an4=dampEllipIn.animateWith(an1,{cy:355+anim},0)
		var an5=dampHookUp.animateWith(an1,{path:"M199 "+(210+anim)+"l0 145"},0);
		var an6=weightThree.animateWith(an1,{path:"M120 "+(180+anim)+"l20 -20l0 30l-20 20l0 -30"},0);
		var an7=weightTwo.animateWith(an1,{y:160+anim},0);
		var an8=weightOne.animateWith(an1,{y:180+anim},0);
		var an9=weightPath.animateWith(an1,{path:"M120 "+(180+anim)+"l20 -20l100 0l-20 20l-100 0"},0);
		var an10=weightFour.animateWith(an1,{path:"M220 "+(180+anim)+"l20 -20l0 30l-20 20l0 -30"},0);
		setTimeout("dampingEffect();",0);
	}
	else
	{
		if(tempJ>j)
		{
			if(j<0)
			{
				j1=-j1;
				j=-j;
			}
			u=10+(j1/14);
			anim=j*5.6;
			second();
		}
		else if(tempJ<j)
		{
			if(j<0)
			{
				j1=-j1;
				j=-j;
			}
			u=10-(j1/7);
			anim=j*5.6;
			first();
		}
		
	}
}
function first()
{
	var an1=spring.animate({path:"M140 398 l-15,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l16,-"+u+""},sec);
	var an3=springHookUp.animateWith(an1,{path:"M140 "+(210+anim)+"l0 50"},sec);
	var an4=dampEllipIn.animateWith(an1,{cy:355+anim},sec)
	var an5=dampHookUp.animateWith(an1,{path:"M199 "+(210+anim)+"l0 145"},sec);
	var an6=weightThree.animateWith(an1,{path:"M120 "+(180+anim)+"l20 -20l0 30l-20 20l0 -30"},sec);
	var an7=weightTwo.animateWith(an1,{y:160+anim},sec);
	var an8=weightOne.animateWith(an1,{y:180+anim},sec);
	var an9=weightPath.animateWith(an1,{path:"M120 "+(180+anim)+"l20 -20l100 0l-20 20l-100 0"},sec);
	var an10=weightFour.animateWith(an1,{path:"M220 "+(180+anim)+"l20 -20l0 30l-20 20l0 -30"},sec);
	setTimeout("dampingEffect()",sec);
	tempJ=j;
	s+=secs;
}
function second()
{
	var an1=spring.animate({path:"M140 398 l-15,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l16,-"+u+""},sec);
	var an3=springHookUp.animateWith(an1,{path:"M140 "+(210-anim)+"l0 50"},sec);
	var an4=dampEllipIn.animateWith(an1,{cy:355-anim},sec);
	var an5=dampHookUp.animateWith(an1,{path:"M199 "+(210-anim)+"l0 145"},sec);
	var an6=weightThree.animateWith(an1,{path:"M120 "+(180-anim)+"l20 -20l0 30l-20 20l0 -30"},sec);
	var an7=weightTwo.animateWith(an1,{y:160-anim},sec);
	var an8=weightOne.animateWith(an1,{y:180-anim},sec);
	var an9=weightPath.animateWith(an1,{path:"M120 "+(180-anim)+"l20 -20l100 0l-20 20l-100 0"},sec);
	var an10=weightFour.animateWith(an1,{path:"M220 "+(180-anim)+"l20 -20l0 30l-20 20l0 -30"},sec);
	setTimeout("dampingEffect()",sec);
	tempJ=j;
	s+=secs;
	
}
