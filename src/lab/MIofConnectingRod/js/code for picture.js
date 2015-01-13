var leftScrew;
var rightScrew;
var outlineRod;
var lowerCircle;
var upperCircle;
var outerRect;
var innerRect;
var smallRect;
var pendulum;
var check;
var sec=700;
var secs=700;
function picture()
{
r=new Raphael(document.getElementById('picture'),800,520);
pendulum=r.set();
leftScrew = r.path("M235 322 l15 0 , l-5 40,  l-5 0, l-5 -40").attr({fill:"black"});

rightScrew = r.path("M450 322 l15 0 , l-5 40,  l-5 0, l-5 -40").attr({fill:"black"});
outlineRod = r.path("M320 93 l-45,230 s-3,10 -10,10 , l-40 0 ,s -20,15 15,12     ,l 70 ,0 ,l-84,0 ,   s -20,15 15,12 , l 27 ,0 , s60,110 170,1 , l 40 ,-0 ,s 20,-15 -18,-12 ,   l -70,0 ,l85,-0 ,    s 20,-15 -15,-12 ,l-20 0 ,s -10,2 -10,-10, l-50,-230, s-30,-40 -60,0 ").attr({fill:"grey"}); 

lowerCircle = r.circle(350, 340, 40).attr({fill:"white"});

upperCircle = r.circle(350, 100, 20).attr({fill:"white"});

outerRect= r.path("M340 140 l-25,150 l 70 ,0, l-25,-150, l-20,0").attr({fill:"#6D6968"});

innerRect= r.path("M345 145 l-23,140 l 55 ,0, l-23,-140, l-10,0").attr({fill:"white"});

//leftScrew.translate(160,20)
//leftScrew.rotate(-35);

//rightScrew.translate(-159,23)
//rightScrew.rotate(35);

//outerRect.translate(-65,-20)
//outerRect.rotate(35);

//innerRect.translate(-65,-20)
//innerRect.rotate(35);

//lowerCircle.translate(-100,-50)
//lowerCircle.rotate(45);


smallRect= r.path("M350 80 l-8,15,l15,0, l-7,-15").attr({fill:"black"});
//pendulum.push(outlineRod,lowerCircle,upperCircle,outerRect,innerRect,smallRect);
//outlineRod.translate(-80,-20)
//outlineRod.rotate(35);

//leftScrew2 = r.path("M128 221 l12 10 ,l-26 28, l-5 -2 l19 -35").attr({fill:"black"});
//rightScrew2 = r.path("M305 345 l12 9,l-29 29 l-4 -4 ,l20 -33").attr({fill:"black"});

//outlineRod2= r.path("M320 90 l-155,150 , s-8,10 -20,2 ,l-30 -20 s -28,-1 14,23, l 55 ,35 , l -74 ,-49 s -30,-1 14,25 ,l 12 ,10, s-8,130 140,96, l 28 ,22, s 25,4 7,-10 l -65 ,-45 ,l 68 ,47 ,s 12,4 5,-11, l -29 ,-20 ,s -10,0 -1,-15, l90,-214 , s-7,-67 -59,-25 "); 

//outerRect2 = r.path("M320 128 l-106,108, l 57 ,40, l66,-137, l-17,-12").attr({fill:"#6D6968"});
//innerRect2 = r.path("M321 135 l-100,102 ,l 46 ,30, l61,-127,l-8,-5").attr({fill:"white"});
//lowerCircle2 = r.circle(216, 303, 40).attr({fill:"white"});

//right picture

//outlineRod.translate(80,-20)
//outlineRod.rotate(-35);

//outerRect.translate(65,-20)
//outerRect.rotate(-35);

//innerRect.translate(65,-20)
//innerRect.rotate(-35);

//rightScrew.translate(120,-100)
//rightScrew.rotate(-35);
//outlineRod3 = r.path("M320 115 l 95,214,s5,14 -9,19,l-25 18, s -10,21 14,4 , l 65 ,-45 ,l -74 ,52,s 1,15 14,5 ,l 30 ,-22,s108,60 139,-97,l 30 ,-20,s 14,-20 -10,-8 l -67 ,47 ,l 70 ,-48,s 7,-19 -12,-7 , l -25 ,18,s -7,4 -14,-6,l-170,-157,s-50,-20 -50,35");
//outerRect3 = r.path("M364 140 l65,136,l 57 ,-40,l-107,-108,l-15,11");
//innerRect3 = r.path("M370 140 l63,129,l 45 ,-33,l-100,-100,l-8,5");
//leftScrew3 = r.path("M385 350 l12 -10 ,l18 36,l-3 5,l-28 -32");
//rightScrew3 = r.path("M560 230 l12 -10,l19 37,l-4 4 ,l-26 -30");
//lowerCircle3 = r.circle(493, 303, 40).attr({fill:"white"});
//lower curve
var c = r.path("M130 430 s160,100 452,0,l 0,11,s-250,100 -452,3,l 0,-14").attr({fill:"#C8BBBE"});
var c = r.path("M350 487 l 0,-14");
var c = r.path("M280 470 l -2,14");
var c = r.path("M210 459 l -2,14");
var c = r.path("M150 440 l -2,14");
var c = r.path("M555 437 l 2,14");
var c = r.path("M490 455 l 2,14");
var c = r.path("M425 467 l 2,14");
//first();
}
function first()
{
	check=1;
	var an1=outlineRod.animate({path:"M320 90 l-155,150 , s-8,10 -20,2 ,l-30 -20 s -28,-1 14,23, l 55 ,35 , l -74 ,-49 s -30,-1 14,25 ,l 12 ,10, s-8,130 140,96, l 28 ,22, s 25,4 7,-10 l -65 ,-45 ,l 68 ,47 ,s 12,4 5,-11, l -29 ,-20 ,s -10,0 -1,-15, l90,-214 , s-7,-67 -59,-25 "},sec)
	var an2=lowerCircle.animateWith(an1,{cx:216,cy:303},sec);
	var an3=innerRect.animateWith(an1,{path:"M321 135 l-100,102 ,l 46 ,30, l61,-127,l-8,-5"},sec);
	var an4=outerRect.animateWith(an1,{path:"M320 128 l-106,108, l 57 ,40, l66,-137, l-17,-12"},sec);
	var an5=leftScrew.animateWith(an1,{path:"M128 221 l12 10 ,l-26 28, l-5 -2 l19 -35"},sec);
	var an6=rightScrew.animateWith(an1,{path:"M305 345 l12 9,l-29 29 l-4 -4 ,l20 -33"},sec);
	setTimeout("third()",secs);
}
function second()
{
	check=2;
	var an1=outlineRod.animate({path:"M320 115 l 95,214,s5,14 -9,19,l-25 18, s -10,21 14,4 , l 65 ,-45 ,l -74 ,52,s 1,15 14,5 ,l 30 ,-22,s108,60 139,-97,l 30 ,-20,s 14,-20 -10,-8 l -67 ,47 ,l 70 ,-48,s 7,-19 -12,-7 , l -25 ,18,s -7,4 -14,-6,l-170,-157,s-50,-20 -50,35"},sec);
	var an2=lowerCircle.animateWith(an1,{cx:493,cy:303},sec);
	var an3=innerRect.animateWith(an1,{path:"M370 140 l63,129,l 45 ,-33,l-100,-100,l-8,5"},sec);
	var an4=outerRect.animateWith(an1,{path:"M364 140 l65,136,l 57 ,-40,l-107,-108,l-15,11"},sec);
	var an5=leftScrew.animateWith(an1,{path:"M385 350 l12 -10 ,l18 36,l-3 5,l-28 -32"},sec);
	var an6=rightScrew.animateWith(an1,{path:"M560 230 l12 -10,l19 37,l-4 4 ,l-26 -30"},sec);
	setTimeout("third()",secs);
	secs-=20;
}
function third()
{
	var an1=outlineRod.animate({path:"M320 93 l-45,230 s-3,10 -10,10 , l-40 0 ,s -20,15 15,12 l 70 ,0 ,l-84,0 ,   s -20,15 15,12 , l 27 ,0 , s60,110 170,1 , l 40 ,-0 ,s 20,-15 -18,-12 ,   l -70,0 ,l85,-0 ,    s 20,-15 -15,-12 ,l-20 0 ,s -10,2 -10,-10, l-50,-230, s-30,-40 -60,0" },sec);
	var an2=lowerCircle.animateWith(an1,{cx:350,cy:340},sec);
	var an3=innerRect.animateWith(an1,{path:"M345 145 l-23,140 l 55 ,0, l-23,-140, l-10,0"},sec);
	var an4=outerRect.animateWith(an1,{path:"M340 140 l-25,150 l 70 ,0, l-25,-150, l-20,0"},sec);
	var an5=leftScrew.animateWith(an1,{path:"M235 322 l15 0 , l-5 40,  l-5 0, l-5 -40"},sec);
	var an6=rightScrew.animateWith(an1,{path:"M450 322 l15 0 , l-5 40,  l-5 0, l-5 -40"},sec);
	if(secs>0)
	{
	if(check==1)
	setTimeout("second()",secs-5);
	else
	setTimeout("first()",secs-5);
	}
	
}