var m0,r0,l,a,r,m,J0,J,g=9.81,pi=22/7,T=0.975;
$(document).ready(function()
{
picture()
m0=parseFloat($("#textbox1").val(0.010));
m=parseFloat($("#textbox2").val(0.450));
r=parseFloat($("#textbox3").val(0.150));
a=parseFloat($("#textbox4").val(0.140));
l=parseFloat($("#textbox5").val(1.50));
$("#reload").click(function(){
	$("#textbox6").val("");
	$("#textbox7").val("");
	window.location.href=window.location.href;
})
});

function clickTrial1()
{
m0=parseFloat($("#textbox1").val());
m=parseFloat($("#textbox2").val());
r=parseFloat($("#textbox3").val());
a=parseFloat($("#textbox4").val());
l=parseFloat($("#textbox5").val());
J0=((1/2)*m0*r*r).toFixed(5);
$("#textbox6").val(J0);
$("#button2").attr("disabled",false);
$("#button2").addClass('greenbtn');
}
function clickTrial5()
{
J=(parseFloat( ( g * T * T * a * a * (m + m0) )   / (4 * (pi) * (pi) * l ) ) -  J0).toFixed(5);
$("#textbox7").val(J);

}