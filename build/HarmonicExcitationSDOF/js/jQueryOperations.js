var brd;
var m,k,c,f0,omega1,omega2;
var Cc,zeta,omegaN,Xst;
var x=[];
var y=[];
var ti=[];
var smd_wave;
var brd;
var in_dataarray=[];
var start_pt=[];
var nr=0;
var maxX = 0.0;
var maxY = 0.0;
var minY = 10.0;
var p1=[];
var p2=[];
var d;
var omega=[];
var X=[];
var pie=[];
var Xx=[];
var Oomega=[];
var check=0;

function createGraph1()
{
		brd1 = JXG.JSXGraph.initBoard('graphHE1', {
		originX: 50,
		originY: 400,
		unitX:  100,// WEIGHT
		unitY: 100,  // VOLTAGE
		showCopyright:false,
		//grid:true,
	});
//var grid = brd1.create('grid',[],{hasGrid:true,gridX:1});
	axisx = brd1.create('axis', [
			[0, 0],
			[1, 0]
		]);

	axisy = brd1.create('axis', [
			[0, 0],
			[0, 1]
		]);

		var text_Y = brd1.create('text', [-0.4, 3.5, 'X/Xst'], {
			style: 5
		});
		var text_X = brd1.create('text', [3.2, -0.2, '&omega; / &omega;n'], {
			style: 5
		});
	/*	var scale1=brd1.create('text', [25, 2, 'Scale:'], {
			style: 5
		});
		var scale2=brd1.create('text', [25, 1.8, 'X axis: 1 unit = 1 sec'], {
			style: 5
		});
		var scale3=brd1.create('text', [25, 1.6, 'Y axis: 1 unit = 5 mm'], {
			style: 5
		});*/
}

function createGraph2()
{
brd2 = JXG.JSXGraph.initBoard('graphHE2', {
		originX: 50,
		originY: 400,
		unitX:  100,// WEIGHT
		unitY: 100,  // VOLTAGE,
		showCopyright:false,
		//grid:true,
	});
var grid = brd2.create('grid',[],{hasGrid:true,gridX:0.5});
		axisx = brd2.create('axis', [
			[0, 0],
			[1, 0]
		]);

		axisy = brd2.create('axis', [
			[0, 0],
			[0, 1]
		]);

		var text_Y = brd2.create('text', [-0.4, 3.5, '&phi;Rad'], {
			style: 5
		});
		var text_X = brd2.create('text', [3.2, -0.2, '&omega;/&omega;n'], {
			style: 5
		});
	/*	var scale1=brd2.create('text', [7, 2, 'Scale:'], {
			style: 5
		});
		var scale2=brd2.create('text', [8, 1.8, 'X axis: 1 unit = 5 unit'], {
			style: 5
		});
		var scale3=brd2.create('text', [8, 1.6, 'Y axis: 1 unit = 5 unit'], {
			style: 5
		});*/
}

function calcCc() {
    m = parseFloat($("#m").val());
    k = parseFloat($('#k').val());
    Cc = 2 * Math.sqrt(k * m);
    $("#cc").val(Cc.toFixed(3));
}
function showDialog(msg) {
	$("#Formula1").html(msg)
	$("#Formula1").dialog();
}
function calculate()
{
	//$("#Box1").html("");
	$("#note").html("Move the Cursor on the points[red dots] plotted on the graph to see X and Y coordinates");
	var errorMsg = "";
	m=parseFloat($("#m").val());
	  if( ( m!=null || m!=0 )&&(m>=50&&m<=100) )
			{
				m=m;
				check+=1;
			}
		else
			{
				errorMsg += "Please Enter m between 50-100<br>";
				//$("#Box1").append("Please Enter m between 50-100<br>")
				showDialog(errorMsg);
				check=0;
			}
	k=parseFloat($("#k").val());
	 if( ( k!=null || k!=0 )&&(k>=20000&&k<=100000))
			{
				k=k;
				check+=1;
			}
	else
			{
				errorMsg += "Please Enter 'k' between 20000-100000<br>";
				showDialog(errorMsg);
				check=0;
			}
  	c=parseFloat($("#c").val());
	 if( ( c!=null || c!=0 )&&(c>=1000&&c<=2500))
			{
				c=c;
				check+=1;
			}
	else
			{
				errorMsg += "Please Enter C between 2000-2500<br>";
				showDialog(errorMsg);
				// $("#Box1").append("Please Enter C between 2000-2500<br>")
				check=0;
			}
	f0=parseFloat($("#f").val());
	fa=parseFloat($("#f").val());
	 if( ( f0!=null || f0!=0 )&&(f0>=100&&f0<=1000))
			{
				if(f0>500){
					f0=500;
					check+=1;	
				}else{
					f0=f0;
					check+=1;
				}
				
			}
	else
			{
				errorMsg += "Please Enter f<sub>0</sub> between 100-1000<br>";
				showDialog(errorMsg);
				//$("#Box1").append("Please Enter f<sub>0</sub> between 100-1000<br>")
				check=0;
			}
	omega1=parseFloat($("#omega1").val());
	omega2=parseFloat($("#omega2").val());
	omegaChange=omega1;
	omegaChange1=omega1;
	Xst=f0/k;
	Xst1=fa/k;
	//omegaN=Math.sqrt(k/m);
	d=(omega2-omega1)/5000;
	Cc=2*Math.sqrt(k*m);
	//zeta = 0.1;
	zeta=c/Cc;
	for(var i=1;i<5000;i++)
	{
		omega[i]=omega1+(i-1)*d;
	}
	for(var i=1;i<omega.length;i++)
	{
		X[i]=f0/Math.sqrt(Math.pow((k-m*Math.pow(omega[i],2)),2)+Math.pow((c*omega[i]),2));
	}
	for(var i=1;i<omega.length;i++)
	{
		Oomega[i]=omega[i]/omegaN;
		Xx[i]=X[i]/Xst;
		pie[i]=Math.atan((c*omega[i])/(k-m*Math.pow(omega[i],2)));
		if(pie[i]<0){
			 pie[i] = pie[i]+Math.PI;
		 }
		y[i]=X[i]*Math.sin((omega[i]*ti)+pie[i]);
	}
	if(check==4)
	{
	excitationEffect();
	display();
	$("#run").attr('disabled',true);
	}
	
}

function display()
{
	$("#xstVal").html(Xst1.toFixed(3));
	$("#zetaVal").html(zeta.toFixed(3));
	//$("#omeganVal").html(omegaN.toFixed(6));
}

function plotGraph1()
{

	/*for(var i=1;i<Oomega.length;i=i+20)
	{
			p1[i] = brd1.create('point',[Oomega[i],Xx[i]], {name:' ' ,style:3,strokeColor:'white',fixed:true});
	}*/
	var li1 = brd1.create('curve',[Oomega,Xx], {strokeColor:'green',strokeWidth:2,fixed:false});
}

function plotGraph2()
{

	/*for(var i=1;i<Oomega.length;i=i+20)
	{
			p2[i] = brd2.create('point',[Oomega[i],pie[i]], {name:' ',style:3,strokeColor:'white',fixed:true});
	}*/
	
	var li2 = brd2.create('curve',[Oomega,pie], {strokeColor:'green',strokeWidth:2,fixed:true});
}

function calculateomega()
{
	m=parseFloat($("#m").val());
	k=parseFloat($("#k").val());
	
	omegaN = Math.sqrt(k / m).toFixed(6);
	$("#omeganVal").val(omegaN);
	
	omega3=(0 * omegaN).toFixed(0);
	$("#omega1").val(omega3)
	
	omega4=(3*omegaN).toFixed(0);
	$("#omega2").val(omega4)
}

function showFormula(msg) {
	$("#Formula").html(msg);
	$("#Formula").dialog();
}

$(document).ready(function()
{
$("#Formula").hide();

$("#Showf").click(function()
{
$("#Formula").show();
var msg = '<label id="ef">Excitation Force f(t) = F<sub>0</sub>sin&omega;t<br>Response x(t) = Xsin(&omega;t-&phi;)<br>X = (F<sub>0</sub>/k)/&radic;[1-(&omega;/&omega;<sub>n</sub>)<sup>2</sup>]<sup>2</sup>+[2&zeta;(&omega;/&omega;<sub>n</sub>)]<sup>2</sup><br>tan&phi; = 2&zeta;(&omega;/&omega;<sub>n</sub>)/1-(&omega;/&omega;<sub>n</sub>)<sup>2</sup><br>X<sub>st</sub> = F<sub>0</sub>/k</label>'
       showFormula(msg);
});

$("#Hidef").click(function()
{
$("#Formula").hide();
});

$("#reload").click(function(){
		 var plc = $("#c").attr("placeholder");  
		 $("#c").val(plc);
		var p = $("f").attr("placeholder");
		$("#f").val(p);
		var pl = $("k").attr("placeholder");
		$("#k").val(pl);
		$("#c").val("");
		var plch = $("#t").attr("placeholder");
		$("#t").val("");
		$("#zetaVal").val("");
		$("#cc").val("");
		$("#omeganVal").val("");
		$("#omega1").val("");
		$("#omega2").val("");
		$("#xstVal").html("");
		$("#zetaVal").html("");
		window.location.href=window.location.href;
	})
});