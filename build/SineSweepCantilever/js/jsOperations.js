	// This file contains functionalities using Javascript.
//Declaring the Variables
var height;
var width;
var length;
var area;
var inertia;
var material;
var youngModulus;
var density;
var youngD;
var node=0;
var materialValue;
var tempNode=0;
var cantilever;
var k1l=1.875;
var k2l=4.694;
var k3l=7.855;
var fn1;
var fn2;
var fn3;
var msg= "";
//HTML codings when file is loaded
function startLoad()
{/*
	var wT='<input type="text" size=6 id="width" value="0.315" /> m';
	var hT='<input type="text" size=6 id="height" value="0.005" /> m';
	var lT='<input type="text" size=6 id="length" value="0.325" /> m';
	var aT=': <input type="text" id="areaV" size=9 readonly="readonly"/> m<sup>2</sup> ';
	var iT=': <input type="text" id="inertiaV" size=9 readonly="readonly"/> m<sup>4</sup> ';
	var mS=': <select id="materialV" onchange="changeMaterial();"><option value="al"> Aluminium </option></select>';
	var dT=': <input type="text" id="densityV" size=9 value="" readonly="readonly"/> kg/m<sup>3</sup>';
	var yT=': <input type="text" id="youngV" size=9 value="" readonly="readonly"/> x 10<sup>9</sup> N/m<sup>2</sup>' ;
	var ta='<div id="textVal">Observations from FRF, first three natural frequencies:</div><textarea id="tArea"></textarea>';
	
	document.getElementById('widthT').innerHTML=wT;
	document.getElementById('heightT').innerHTML=hT;
	document.getElementById('lengthT').innerHTML=lT;
	document.getElementById('areaT').innerHTML=aT;
	document.getElementById('inertiaT').innerHTML=iT;
	document.getElementById('materialT').innerHTML=mS;
	document.getElementById('densityT').innerHTML=dT;
	document.getElementById('youngT').innerHTML=yT;
	document.getElementById('textArea').innerHTML=ta;
*/	
}

//Calculating the area and inertia from width, height and length
function calculateValues()
{
	width=parseFloat(document.getElementById('width').value);
	height=parseFloat(document.getElementById('height').value);
	length=parseFloat(document.getElementById('length').value);

	density=2700;
	youngModulus=70000000000;
	document.getElementById('densityV').value="2700";
	document.getElementById('youngV').value="70";
	if(!isNaN(width)&&!isNaN(height)&&!isNaN(length))
	{
		if(width!=0&&height!=0&&length!=0)
		{
			area=height*width;
			inertia=(width*Math.pow(height,3))/12;
			document.getElementById('errormsg').innerHTML='';
			document.getElementById('areaV').value=String(area);
			document.getElementById('inertiaV').value=String(inertia);
			document.getElementById('areaFormula').disabled=false;
			document.getElementById('inertiaFormula').disabled=false;
		}
		else
		{
			document.getElementById('errormsg').innerHTML='Please give the values except "0" '
		}
	}
	else
	{
		document.getElementById('errormsg').innerHTML='Give all the Values of width, height and Length';
	}
	$("#areaFormula").addClass('greenbtn');
	$("#inertiaFormula").addClass('greenbtn');

}

//Changing and Selecting the material
function changeMaterial()
{
	materialValue=document.getElementById('materialV').value;
	switch(materialValue)
	{
		case "st":
			density=7800;
			youngModulus=210000000000;
			document.getElementById('densityV').value="7800";
			document.getElementById('youngV').value="210 ";
			break;
		case "al":
			density=2700;
			youngModulus=70000000000;
			document.getElementById('densityV').value="2700";
			document.getElementById('youngV').value="70";
			break;
		default:
			document.getElementById('densityV').value="";
			document.getElementById('youngV').value="";
			break;
	}
	
}
function naturalFrequency()
{

			fn1=(1/(2*3.14))*(k1l*k1l)*Math.sqrt((youngModulus*inertia)/(density*area*Math.pow(length,4)));
			fn2=(1/(2*3.14))*(k2l*k2l)*Math.sqrt((youngModulus*inertia)/(density*area*Math.pow(length,4)));
			fn3=(1/(2*3.14))*(k3l*k3l)*Math.sqrt((youngModulus*inertia)/(density*area*Math.pow(length,4)));

			document.getElementById('fn1Val').value=fn1;
			document.getElementById('fn2Val').value=fn2;
			document.getElementById('fn3Val').value=fn3;

}
// Changing the Node
function changeNode()
	{
	node=parseInt(document.getElementById('nodeV').value);
	changeHammer();
	}

//Function for hitting the hammer

function hitHammer()
	{
	
		cantileverHit();
	
	
	}
	//Display the formula for area
function areaFormulaDisplay()
	{
	alert("Width x Height");
	
	}

//Display the formula for inertia
function inertiaFormulaDisplay()
	{
	var c="3";
	c=c.sup();
	alert("1/12 x Width x Height\u00B3")

	}
	


	$('a[name=modal]').click(function(e) {
					//Cancel the link behavior
					e.preventDefault();
					
					//Get the A tag
					var id = $(this).attr('href');
				
					//Get the screen height and width
					var maskHeight = $(document).height();
					var maskWidth = $(window).width();
				
					//Set heigth and width to mask to fill up the whole screen
					$('#mask').css({'width':maskWidth,'height':maskHeight});
					
					//transition effect		
					$('#mask').fadeIn(1000);	
					$('#mask').fadeTo("slow",0.8);	
				
					//Get the window height and width
					var winH = $(window).height();
					var winW = $(window).width();
						  
					//Set the popup window to center
					$(id).css('top',  winH/2-$(id).height()/2);
					$(id).css('left', winW/2-$(id).width()/2);
				
					//transition effect
					$(id).fadeIn(2000); 
					
				});
				
$(document).ready(function(){
$("#showList").hide();
	$("#tabs").tabs();
	drawDiagram();
	$("#reset").click (function(){
		$("#areaV").val("");
		$("#inertiaV").val("");
		$("#densityV").val("");
		$("#youngV").val("");
		$("#fn1Val").val("");
		$("#fn2Val").val("");
		$("#fn3Val").val("");
		window.location.href=window.location.href;
	})
	$("#Showf").click(function(){
		$("#showList").show();
	})
	$("#Hidef").click(function()
{
$("#showList").hide();
});
	/*$("#areaFormula").click(function(){
		var msg = "Width * Height";
		showDialog(msg);
	});*/
})