var r,an1,an2,patch1,sec=243,t,object1,s=0;
var check,second=0,se,ms=0,osi=0;
function picture()
{
r=new Raphael(document.getElementById('picture'),800,520);
ellipse1 = r.ellipse(230, 300, 130, 50).attr({fill:"gray",'stroke-width':3});
curve =r.path("M100 300 s 0 40 10 45 s110,60 240,0  ").attr({'stroke-width':3});
curve2 =r.path("M360 300 s 0 40 -10 45").attr({'stroke-width':3});
object1= r.path("M40 240 s10,20,20,-5,s10,-20 -30,-30,s10,50 20,40").attr({fill:"brown"});
smallcircle1 =r.circle(115 ,305,4);
smallcircle3 =r.circle(267 ,268,4);
smallcircle2 =r.circle(278 ,330,4);
line1 = r.path(" M115 75 l0 230").attr({'stroke-width':3});
line2= r.path(" M278 100 l0 230").attr({'stroke-width':3});
line3 = r.path(" M267 40 l0 230").attr({'stroke-width':3});
patch = r.path(" M290 365 l0 -20, l25 -7, l0 20,l-20 7").attr({fill:"black"});
decoder = r.path("M340 360 l-20 8 ,l0 14, l25 5 , l 0 -8,  l -25 -11 ,l20 -8 ,l 15 17, l -11 2 ,l 0 8 ,l 10 -2 , l 1-9 ").attr({fill:"black"});
rect = r.rect(440, 70, 350, 250).attr({'stroke':'#000066','stroke-width':3,fill:"#3BB9FF"});
rect = r.rect(465, 120, 110, 70).attr({'stroke':'#000066','stroke-width':3,fill:"black"});
rect = r.rect(670, 120, 110, 70).attr({'stroke':'#000066','stroke-width':3,fill:"black"});
rect = r.rect(670, 230, 110, 70).attr({'stroke':'#000066','stroke-width':3,fill:"black"});
text1 = r.text (525, 105,"No. Of Oscillations").attr({'font-size':16,'font-weight':'bold'});
text2 = r.text (725, 105,"Clock").attr({'font-size':16,'font-weight':'bold'});
text3 = r.text (535, 275,"Period Of Oscillation, T").attr({'font-size':16,'font-weight':'bold'});
text4 = r.text (280, 385,"Decoder").attr({'font-size':16,'font-weight':'bold'});
wire = r.path("M 354 380 s50,70 30,-100,s80,-40,50,-74").attr({'stroke-width':3});
}

function rotatediskSecond()
{
$("#button4").attr("disabled",true);
check=2;
var an1=patch.animate({path:" M338 348 l 2 -20, l 17 -12, l0 23, l -20 12"},sec);
var an2=line1.animateWith(an1,{path:" M115 75 l35 250"},sec);
var an3=line2.animateWith(an1,{path:" M278 100 l42 220"},sec);
var an4=line3.animateWith(an1,{path:" M267 40 l-30 225"},sec);
var an5=smallcircle1.animateWith(an1,{cx:150 , cy:325},sec);
var an6=smallcircle3.animateWith(an1,{cx:237 ,cy:265},sec);
var an7=smallcircle2.animateWith(an1,{cx:320 ,cy:320},sec);
var an8=object1.animateWith(an1,{rotation:"-45"},sec);
$("#oscil").html(s);
second+=sec;
se=parseInt(second/1000);
ms=second%100;
$("#timer").html("0"+se+":"+ms+" s");
s++;
object1.rotate(45);
setTimeout("rotatediskThird()",sec)
}

function rotatediskFirst()
{
	check=1;
    var an1=patch.animate({path:" M238 374 l0 -23, l20 -2,l0 24,l-20 0 "},sec);
    var an2=line1.animateWith(an1,{path:" M115 75 l35 200"},sec);
	var an3=line2.animateWith(an1,{path:" M278 100 l-43 235"},sec);
	var an4=line3.animateWith(an1,{path:" M267 40 l33 240"},sec);
	var an5 =smallcircle1.animateWith(an1,{cx:150,cy:275},sec);
	var an6=smallcircle3.animateWith(an1,{cx:300 ,cy:280},sec);
	var an7=smallcircle2.animateWith(an1,{cx:235 ,cy:335},sec);
	var an8=object1.animateWith(an1,{rotation:"45"},sec);
	$("#oscil").html(s);
	second+=sec;
	se=parseInt(second/1000);
	ms=second%100;
	$("#timer").html("0"+se+":"+ms+" s");
	setTimeout("rotatediskThird();",sec);
	
 }
 
 function rotatediskThird()
 {
	var an1=patch.animate({path:" M290 365 l0 -20, l25 -7, l0 20,l-20 7"},sec);
	var an2=line1.animateWith(an1,{path:" M115 75 l10 225"},sec);
	var an3=line2.animateWith(an1,{path:" M278 100 l0 230"},sec);
	var an4=line3.animateWith(an1,{path:" M267 40 l0 230"},sec);
	var an5 =smallcircle1.animateWith(an1,{cx:125,cy:300},sec);
	var an6=smallcircle3.animateWith(an1,{cx:267 ,cy:270},sec);
	var an7=smallcircle2.animateWith(an1,{cx:278 ,cy:330},sec);
	var an8=object1.animateWith(an1,{rotation:"0"},sec);
	$("#oscil").html(s);
	second+=sec;
	se=parseInt(second/1000);
	ms=second%100;
	$("#timer").html("0"+se+":"+ms+" s");
	osi+=0.5;
	
	if(osi<10)
	{
	if(check==1)
	{
		setTimeout("rotatediskSecond()",sec);
	}
	else
	{
		//s = r.text(300,100,"Raph");
		setTimeout("rotatediskFirst()",sec);
	}
	}
	else
	{
		$("#timer").html("09:75 s");
		$("#period").html("0.975 s");
		$("#button5").attr("disabled",false);
		$("#button5").addClass('bluebtn');
		
	}	
}
 function clickTrial2()
{
 var an15=object1.animate({path:"M160 300 s10,20,20,-5,s10,-20,-30,-30,s10,50,20,40"},1000);
 $("#button2").attr("disabled",true);
 $("#button3").addClass('greenbtn');
 $("#button3").attr("disabled",false);
} 
function clickTrial3()
{
var an16=object1.animate({path:"M240 310 s10,20,20,-5,s10,-20,-30,-30,s10,50,20,40"},500);
$("#button3").attr("disabled",true);
$("#button4").attr("disabled",false);
$("#button4").addClass('greenbtn');
}

 
