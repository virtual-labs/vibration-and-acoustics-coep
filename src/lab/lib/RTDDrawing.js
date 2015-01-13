var r,titleText,set1,set2,set3,setfor1,setfor2,setfor3,setfor4,bareElementRect,bareElementWire,coverElementPath;
var sheathHandler,sheathElementPath,sheathElementCurve,bareElemWithSheath,bareElemWithSheathWire,sheathHandlerWire;
var lines1,thermowelPath;

$(document).ready(function()
{
board1 = JXG.JSXGraph.initBoard('dynamic',{originX:5, originY:500, unitX:5, unitY:0.5, axis:true});
	r = new Raphael(document.getElementById('rtddynamicpict'),200,540);
      //dynamicRTDPicture(r);
     set1=r.set();
	set2=r.set();
	set3=r.set();
	setfor1=r.set();
	setfor2=r.set();
	setfor3=r.set();
	setfor4=r.set();
});
function fun1()
{
		for(i=350;i<500;i+=10)
		{
			setfor1.push(r.path("M110 "+i+"l-10 -10"));
		}
		for(i=340;i<490;i+=10)
		{
			setfor1.push(r.path("M50 "+i+"l-10 -10"));
		}
}
function fun2()
{
	for(i=350;i<500;i+=10)
	{
	setfor2.push(r.path("M110 "+i+"l-10 -10"));
	}
	for(i=340;i<490;i+=10)
	{
	setfor2.push(r.path("M50 "+i+"l-10 -10"));
	}
	for(i=185;i<490;i+=5)
	{
		setfor2.push(
		r.circle(116,i,1).attr("fill","black"),
		r.circle(35,i,1).attr("fill","black"));
		i=i+5;
		setfor2.push(
		r.circle(123,i,1).attr("fill","black"),
		r.circle(28,i,1).attr("fill","black"),r.circle(119,498,1).attr("fill","black"),
		r.circle(117,493,1).attr("fill","black"),
		r.circle(28,498,1).attr("fill","black"),
		r.circle(36,503,1).attr("fill","black"),
		r.circle(38,495,1).attr("fill","black"),
		r.circle(438,294,1).attr("fill","black"));//020554121
	}
	for(i=40;i<120;i+=5)
	{
		setfor2.push(r.circle(i,510,1).attr("fill","black"));
		i+=5;
		setfor2.push(r.circle(i,503,1).attr("fill","black"),
		r.circle(435,345,1).attr("fill","black"),
		r.circle(433,352,1).attr("fill","black"),
		r.circle(428,348,1).attr("fill","black"));
	}
}
function dynamicRTDPicture()
{
      
	
//Bare Element
	bareElementRect = r.rect(60,220,50,190);
	bareElementWire=r.path("M80 220l0 -50"+"M90 220l0 -50").attr("stroke","green");
	set1.push(bareElementRect,bareElementWire);
	set1.hide();
//Sheath
	coverElementPath=r.path("M110 490l0 -310"+"M110 180l-70 0"+"M40 180l 0 310"+"M60 500l30 0"+"M60 500s -10,0 -20,-10"+"M90 500s10,0 20,-10");
	sheathHandler=r.path("M110 180l2 0l0 -30l18 -10l0 -40l-110 0l0 40l18 10l0 30l2 0");
	sheathElementPath=r.path("M50 328l0 152"+"M100 337l0 143"+"M60 490l30 0"+"M60 490s-5,0 -10,-10"+"M90 490s5,0 10,-10");
	sheathElementCurve=r.path("M40 330c20,-10 20,20 70,5");
	bareElemWithSheath=r.rect(60,370,30,110);
	bareElemWithSheathWire=r.path("M70 370l0 -33"+"M80 370l0 -30").attr("stroke","green");
    sheathHandlerWire=r.path("M70 100l0 -60"+"M80 100l0 -60").attr("stroke","green");
	lines1=r.path("M103 495l-9 -8"+"M96 499l-12 -10"+"M85 500l-12 -10"+"M74 500l-12 -10"+"M62 500l-23 -21");
	set2.push(coverElementPath,sheathHandler,sheathElementPath,sheathElementCurve,bareElemWithSheath,bareElemWithSheathWire,sheathHandlerWire,lines1,fun1());
	set2.hide();
	setfor1.hide();

//Thermovel

	coverElementPath=r.path("M110 490l0 -310"+"M40 180l 0 310"+"M60 500l30 0"+"M60 500s -10,0 -20,-10"+"M90 500s10,0 20,-10");
	sheathHandler=r.path("M110 180l2 0l0 -30l18 -10l0 -40l-110 0l0 40l18 10l0 30l2 0");
	sheathElementPath=r.path("M50 328l0 152"+"M100 337l0 143"+"M60 490l30 0"+"M60 490s-5,0 -10,-10"+"M90 490s5,0 10,-10");
	sheathElementCurve=r.path("M40 330c20,-10 20,20 70,5");
	bareElemWithSheath=r.rect(60,370,30,110);
    bareElemWithSheathWire=r.path("M70 370l0 -33"+"M80 370l0 -30").attr("stroke","green");
	sheathHandlerWire=r.path("M70 100l0 -60"+"M80 100l0 -60").attr("stroke","green");
	lines1=r.path("M103 495l-9 -8"+"M96 499l-12 -10"+"M85 500l-12 -10"+"M74 500l-12 -10"+"M62 500l-23 -21");
	thermowelPath=r.path("M112 180l15 0l0 310"+"M38 180l-15 0l0 310"+"M100 515l-53 0"+"M100 515s25,0 27,-26"+"M47,515s-25,0 -24,-26");
	set3.push(coverElementPath,sheathHandler,sheathElementPath,sheathElementCurve,bareElemWithSheath,bareElemWithSheathWire,sheathHandlerWire,lines1,fun2(),thermowelPath);
	set3.hide();
	setfor2.hide();
     
};
function bare()
{

	set1.show();
	set2.hide();
	set3.hide();
	setfor1.hide();
	setfor2.hide();
}
function withSheath()
{

	set1.hide();
	set2.show();
	set3.hide();
	setfor1.show();
	setfor2.hide();

}
function withThermowell()
{
	set1.hide();
	set2.hide();
	set3.show();
	setfor1.hide();
	setfor2.show();
}

function staticRTDPicture()
{
	var paper=new  Raphael(document.getElementById('rtdstaticpict'),400,400);
	var staticContainer=paper.path("M98 121 l 0 200 l 153 0 l 0 -200");
	var metalHandle=paper.path("M169 120l0 -20l-10 -10l0 -40l32 0l0 40l-10 10l0 20l-12 0");
	var Limit=paper.path("M100 170c20,-15 40,30 60,0c20,-15 40,30 60,0c20,-15 20,15 30,0").attr({stroke:"skyblue",fill:"skyblue"});
	var insideContainer=paper.path("M100 170l150 0l0 150l-150 0l0 -150").attr({fill:"skyblue",stroke:"skyblue"});
	var staticMetal=paper.path("M170 295l0 -175l10 0l0 175 ").attr("fill","white");
	var metalCurve=paper.path("M170 295s5,9 10,0").attr("fill","white");
	var wire=paper.path("M180 50c0,-70 40,40 60,-10"+"M170 50c6,-90 55,25 63,-15").attr({stroke:"green"});
	var titleText=paper.text(170,350,"Static characteristics").attr({'font-size':16});
	var RTDText=paper.text(280,75,"RTD with Head").attr({'font-size':14});

};