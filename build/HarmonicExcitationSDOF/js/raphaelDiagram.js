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
var d;
var u;
var omegaChange;
var XChange;
var pieChange;
var minusChange;
var oOmegaChange;
var xXChange;
var point1=[];
var point2=[];
var s=1;
var sec=500;
var secs=1;
var temp=0;
var tempJ;
var anim;
var animDuplicate;
var t=1;
var multi=4000;
var h=0;
var arrow;
function diagram()
{
	 r=new Raphael(document.getElementById('diagram'),365,503);
	 weightThree=r.path("M80 180l20 -20l0 30l-20 20l0 -30").attr("fill","#C0C0C0");
	 weightTwo=r.rect(70,160,100,30).attr("fill","#C0C0C0");
	 weightOne=r.rect(50,180,100,30).attr("fill","#C0C0C0");
	 weightPath=r.path("M50 180l20 -20l100 0l-20 20l-100 0").attr("fill","black");
	 weightFour=r.path("M150 180l20 -20l0 30l-20 20l0 -30").attr("fill","#C0C0C0");
	 fillColor=r.path("M105 300l0 120l47 0l0 -120s-23.5,-14 -47,0").attr({fill: 'white',	stroke: 'white'});
	 weightBox=r.set();
	 springHookUp=r.path("M70 210l0 50").attr({'stroke-width':4,'stroke':'#330000'});
	 springHookDown=r.path("M70 450l0 -53").attr({'stroke-width':4,'stroke':'#330000'});
	 spring=r.path("M70 398 l-15,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l30,-10 l-30,-10 l16,-10").attr({'stroke-width':4,'stroke':'#330000'});
	 dampEllipIn=r.ellipse(128.5,355,22.5,7).attr({'stroke-width':3,'fill':'#606060'});
	 dampHookUp=r.path("M129 210l0 145").attr({'stroke-width':3});
	 dampHookDown=r.path("M129 427l0 23").attr({'stroke-width':3});
	 coverPath=r.path("M105 300l0 120"+"M152 300l0 120").attr({'stroke-width':3});
	 dampEllipOut=r.ellipse(128.5,300,22.5,7).attr({'stroke-width':3});
	 dampBottom=r.path("M105 420s23.5,14 47,0").attr({'stroke-width':3,'fill':'white'});
	 base=r.path("M20 450l190 0").attr({'stroke-width':2});
	 // arrow=r.path("M0,0 l0,0");
	
	 $("#run").attr('disabled',false);
	for(var i=30;i<210;i=i+10)
	{
		r.path("M"+i+" 450l-10 10");
	}
}

function excitationEffect()
{
	if(omegaChange<=omega2)
	{
		$("#omegaDisplayValue").html(omegaChange.toFixed(2)+" rad/s");
		XChange=f0/Math.sqrt(Math.pow((k-m*Math.pow(omegaChange,2)),2)+Math.pow((c*omegaChange),2));
		pieChange=Math.atan((c*omegaChange)/(k-m*Math.pow(omegaChange,2)));
		//pieChange=Math.sqrt
		j=XChange*Math.sin(omegaChange*t+pieChange);
		oOmegaChange=omegaChange/omegaN;
		xXChange=XChange/Xst;
		console.log(j);
		if(j<0)
		{
		j=-j;
		}
		var addomega = (omega4-omega3)/15;
		console.log("Addomega:"+addomega);
		omegaChange+=addomega;
		//omegaChange+=5;;
		//j1=j+0.007;
		anim=j*multi;
		
		 if(j!=0)
				  { 
					  anim = anim+10;
				  }
		 
		minusChange=anim*0.1;
		animDuplicate=anim;
		u=10-(anim/14);
		console.log(" u : "+u);
		point1[h] = brd1.create('point',[oOmegaChange,xXChange], {name:' ' ,style:3,strokeColor:'white',fixed:true});
		
		 if(pieChange<0){
			 pieChange = pieChange+Math.PI;
			 
		 }
		 //pieChange1=pieChange-0.2;
		point2[h] = brd2.create('point',[oOmegaChange,pieChange], {name:' ',style:3,strokeColor:'white',fixed:true});
		//console.log("oOmegaChange:"+oOmegaChange+"pieChange:"+pieChange);
		h++;
		first();
	}
	else
	{
		plotGraph1();
		plotGraph2();
	}
}

function first()
{
	//arrow.remove();
	//arrow=r.path("M104,80 l16,0 l0,30 l7,0 l-15,20 l-15,-20 l7,0 l0,-30 ").attr("fill","black");
	var EDownDiff=0;
	var an1=spring.animate({path:"M70 398 l-15,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l16,-"+u+""},sec);
	
	var checkEllipseDown= 355+anim;
	//console.log("cy : "+checkEllipseDown);
	if(checkEllipseDown>420)
	{
		//checkEllipseDown=420;
		EDownDiff=checkEllipseDown-420;
		EDownDiff=EDownDiff.toFixed(0);
		
	}
	//console.log("DiffDown : "+EDownDiff);
	var an3=springHookUp.animateWith(an1,{path:"M70 "+(210+anim-EDownDiff)+"l0 50"},sec);
	var an4=dampEllipIn.animateWith(an1,{cy:checkEllipseDown-EDownDiff},sec)
	var an5=dampHookUp.animateWith(an1,{path:"M129 "+(210+anim-EDownDiff)+"l0 145"},sec);
	var an6=weightThree.animateWith(an1,{path:"M80 "+(180+anim-EDownDiff)+"l20 -20l0 30l-20 20l0 -30"},sec);
	var an7=weightTwo.animateWith(an1,{y:160+anim-EDownDiff},sec);
	var an8=weightOne.animateWith(an1,{y:180+anim-EDownDiff},sec);
	var an9=weightPath.animateWith(an1,{path:"M50 "+(180+anim-EDownDiff)+"l20 -20l100 0l-20 20l-100 0"},sec);
	var an10=weightFour.animateWith(an1,{path:"M150 "+(180+anim-EDownDiff)+"l20 -20l0 30l-20 20l0 -30"},sec);
	u=10+((anim+EDownDiff)/14);
	//u=u-EDownDiff;
	setTimeout("second()",sec);

}

function second()
{
	
	//arrow.remove();
	//arrow=r.path("M104,80 l16,0 l0,-30 l7,0 l-15,-20 l-15,20 l7,0 l0,30").attr("fill","black");
	var EUpDiff=0;
	var an1=spring.animate({path:"M70 398 l-15,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l30,-"+u+" l-30,-"+u+" l16,-"+u+""},sec);
	
	var checkEllipseUp= 355-anim;
	//console.log("cyUp : "+checkEllipseUp);
	if(checkEllipseUp<300)
	{
		//checkEllipseUp=305;
		EUpDiff=300-checkEllipseUp;
		EUpDiff=EUpDiff.toFixed(0);
	//	var an5=dampHookUp.animateWith(an1,{path:"M129 "+(210-anim)+"l0 155"},sec);
	}
	//console.log("DiffUP : "+EUpDiff);
	var an3=springHookUp.animateWith(an1,{path:"M70 "+(210-anim+EUpDiff)+"l0 50"},sec);
	var an4=dampEllipIn.animateWith(an1,{cy:checkEllipseUp+EUpDiff},sec);
	var an5=dampHookUp.animateWith(an1,{path:"M129 "+(210-anim+EUpDiff)+"l0 145"},sec);
	var an6=weightThree.animateWith(an1,{path:"M80 "+(180-anim+EUpDiff)+"l20 -20l0 30l-20 20l0 -30"},sec);
	var an7=weightTwo.animateWith(an1,{y:160-anim+EUpDiff},sec);
	var an8=weightOne.animateWith(an1,{y:180-anim+EUpDiff},sec);
	var an9=weightPath.animateWith(an1,{path:"M50 "+(180-anim+EUpDiff)+"l20 -20l100 0l-20 20l-100 0"},sec);
	var an10=weightFour.animateWith(an1,{path:"M150 "+(180-anim+EUpDiff)+"l20 -20l0 30l-20 20l0 -30"},sec);
	//console.log("animDuplicate:"+animDuplicate);
	animDuplicate-=(minusChange+EUpDiff);
	u=10-((anim+EUpDiff)/14);
	//u=u+EUpDiff;
	if(animDuplicate>0)
	setTimeout("first()",sec);
	else
	{
	  excitationEffect();
	sec-=50;
	console.log("sec : "+sec);
	}
}
