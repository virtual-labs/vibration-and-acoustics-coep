var t1,t2,t3,t4,t5,t6,m,l,T,pi,J;
var g=9.81;
var L=0.30;
var pi=22/7;
var timeTen1,timeTen2,timeTen3;
var time1,time2,time3;
var Jg;
var t,clicked;

$(document).ready(function()
{
picture();
	$("#submit1,#submit2").attr("disabled",true);
	$("#reload").click(function(){ 
		$("#textbox3").val("");
		$("#textbox4").val("");
		$("#textbox5").val("");
		$("#textbox6").val("");
		$("#textbox7").val("");
		$("#textbox8").val("");
		$("#textbox10").val("");
		$("#textbox9").val("");
		$("#textbox11").val("");
		window.location.href=window.location.href;
	})
});

function calculateTime()
{
t2=parseFloat($("#textbox4").val());
t4=parseFloat($("#textbox6").val());
t6=parseFloat($("#textbox8").val());
T=((t2+t4+t6)/3).toFixed(5);
$("#textbox10").val(T);
}

function moment()
{
m=parseFloat($("#textbox1").val());
l=parseFloat($("#textbox2").val());
t1=parseFloat($("#textbox3").val());
t2=parseFloat($("#textbox4").val());
t3=parseFloat($("#textbox5").val());
t4=parseFloat($("#textbox6").val());
t5=parseFloat($("#textbox7").val());
t6=parseFloat($("#textbox8").val());
J=((m*g*L*T*T)/(4*pi*pi)).toFixed(3);
$("#textbox9").val(J);
}
function clickTrial1()
{
	clicked = "trialOne";
	$("#submit,#submit1,#submit2").attr("disabled",true);
	$("#submit,#submit1,#submit2").removeClass('bluebtn');
	timeTen1=14.2;
	time1=1.42;
	r.remove();
	picture();
	oscillation();
	
}

function clickTrial2()
{
	clicked = "trialTwo";
	$("#submit,#submit1,#submit2").attr("disabled",true);
	$("#submit1,#submit2").removeClass('bluebtn');
	timeTen2=14.8;
	time2=1.48;
	r.remove();
	picture();
	oscillation();
}
function clickTrial3()
{
	clicked = "trialThree";
	$("#submit,#submit1,#submit2").attr("disabled",true);
	$("#submit2").addClass('bluebtn');
	timeTen3=13.9;
	time3=1.39;
	r.remove();
	picture();
	oscillation();
}
function click1()
{
	document.getElementById('textbox3').value=timeTen1;
	document.getElementById('textbox4').value=time1;
}
function click2()
{
	document.getElementById('textbox5').value=timeTen2;
	document.getElementById('textbox6').value=time2;
}
function click3()
{
	document.getElementById('textbox7').value=timeTen3;
	document.getElementById('textbox8').value=time3;
}
function calculateCg()
{
	Jg=J-(m*l*l).toFixed(5);
	$("#textbox11").val(Jg);
}
