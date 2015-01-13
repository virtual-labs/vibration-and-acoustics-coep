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
var k1l=1.875;
var k2l=4.694;
var k3l=7.855;
var fn1;
var fn2;
var fn3;

//HTML codings when file is loaded
function startLoad()
{
	var wT='<input type="text" size=6 id="width" value="0.0116" /> m';
	var hT='<input type="text" size=6 id="height" value="0.00325" /> m';
	var lT='<input type="text" size=6 id="length" value="0.190" /> m';
	var aT=': <input type="text" id="areaV" size=9  readonly="readonly"/> m<sup>2</sup> ';
	var iT=': <input type="text" id="inertiaV" size=9 readonly="readonly"/> m<sup>4</sup> ';
	var mS=': <select id="materialV" onchange="changeMaterial();"><option value="st"> stainless Steel </option></select>';
	var dT=': <input type="text" id="densityV" size=9 value="" readonly="readonly"/> kg/m<sup>3</sup>';
	var yT=': <input type="text" id="youngV" size=9 value="" readonly="readonly"/> x 10<sup>9</sup> N/m<sup>2</sup>' ;
	var nT='at Node : <select id="nodeV" onchange="changeNode();"><option value="0">Select</option><option value="2">Node 2</option><option value="3">Node 3</option><option value="4">Node 4</option><option value="5">Node 5</option><option value="6">Node 6</option><option value="7">Node 7</option></select>';
	var ta='<div id="textVal">Observations from the plot(Frequency Response Function,FRF)<br/>Record the frequencies corresponding to peaks in the graph and discuss with your teacher about the reasons for differences observed,if any: </div><textarea id="tArea"></textarea>';
	document.getElementById('widthT').innerHTML=wT;
	document.getElementById('heightT').innerHTML=hT;
	document.getElementById('lengthT').innerHTML=lT;
	document.getElementById('areaT').innerHTML=aT;
	document.getElementById('inertiaT').innerHTML=iT;
	document.getElementById('materialT').innerHTML=mS;
	document.getElementById('densityT').innerHTML=dT;
	document.getElementById('youngT').innerHTML=yT;
	document.getElementById('node').innerHTML=nT;
	document.getElementById('textArea').innerHTML=ta;
}

//Calculating the area and inertia from width, height and length
function calculateValues()
{
	width=parseFloat(document.getElementById('width').value);
	height=parseFloat(document.getElementById('height').value);
	length=parseFloat(document.getElementById('length').value);
	
	document.getElementById('densityV').value="7800";
	document.getElementById('youngV').value="210 ";
//CHANGES BY SUBH
	//document.getElementById('densityV').value="2700";
	//document.getElementById('youngV').value="70";
	
			
		//density=7800;
		//youngModulus=210000000000;
		document.getElementById('disp').innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;Select the node before press "<b>Hit The Hammer</b>" button';
			//density=2700,7800;
			//youngModulus=70000000000,210000000000;
		density=7800;
		youngModulus=210000000000;
	if(!isNaN(width)&&!isNaN(height)&&!isNaN(length))
	{
		if(width!=1&&height!=1&&length!=1)
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

}

//Changing and Selecting the material
function changeMaterial()
{
	materialValue=document.getElementById('materialV').value;
	materialChange();
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
	//document.getElementById('disp').innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;Select the node before press "<b>Hit The Hammer</b>" button';
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
	//tempNode=0;
	if(!isNaN(width)&&!isNaN(height)&&!isNaN(length)&&!isNaN(materialValue=="st")&&node!=0)
	{
	if(tempNode!=node)
	{
	hammerHit();
	hammer.translate(-5,0);
	hammer.rotate(15);
	document.getElementById('errormsg').innerHTML='';
	tempNode=node;
	document.getElementById('disp').innerHTML='Select the next node before press "<b>Hit The Hammer</b>" button';
	}
	else
	{
	document.getElementById('disp').innerHTML='<font color="red">Select the next node before press "<b>Hit The Hammer</b>" button</font>';
	}
	}
	else
	{
	document.getElementById('errormsg').innerHTML='Give all the Values then Click the Hammer button';
	}
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
	alert("1/12 x Width x Height\u00B3");
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