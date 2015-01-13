var brd;
var m,k,c,f0,omega1,omega2;
var Cc,zeta,omegaN,Xst;
var x=[];
var y=[];
var ti=[];
var smd_wave;
var brd2;
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
	 JXG.Options.grid.gridColor = "#000000";
		brd1 = JXG.JSXGraph.initBoard('graphHE1', {
		
         originX: 45,
		originY: 370,
		unitX:  100,// WEIGHT
		unitY: 100,  // VOLTAGE,
		showCopyright:false,
		grid:true,
		showNavigation:true
	});

	axisx = brd1.create('axis', [
			[0, 0],
			[1, 0]
		]);

	axisy = brd1.create('axis', [
			[0, 0],
			[0, 1]
		]);

		var text_Y = brd1.create('text', [-.30, 3, 'X/Xst'], {
			style: 5
		});
		var text_X = brd1.create('text', [3, -0.2, '&omega; / &omega;n'], {
			style: 5
		});
		var scale1=brd1.create('text', [2.6, 3.2, 'Scale:'], {
			style: 5
		});
		var scale2=brd1.create('text', [2.6, 3, 'X axis: 1 unit = 1 sec'], {
			style: 5
		});
		var scale3=brd1.create('text', [2.6, 2.8, 'Y axis: 1 unit = 5 mm'], {
			style: 5
		});
}

function createGraph2()
{
 JXG.Options.text.display = 'internal';
 JXG.Options.grid.gridColor = "black";
brd2 = JXG.JSXGraph.initBoard('graphHE2', {
		originX: 45,
		originY: 370,
		unitX:  100,// WEIGHT
		unitY: 100,  // VOLTAGE,
		showCopyright:false,
		grid:true
	});

		axisx = brd2.create('axis', [
			[0, 0],
			[1, 0]
		]);
		
		axisy = brd2.create('axis', [
			[0, 0],
			[0, 1]
		]);
	
		var text_Y = brd2.create('text', [-.35, 3,'&phi;' ], {
			style: 5
		});
		var text_Rad = brd2.create('text', [-.40,2.8, 'Rad'], {fontSize:15});
		
		var tRot = brd2.create('transform', [30.0*Math.PI/180.0, -.25,.50], {type:'rotate'}); 
		tRot.bindTo(text_Rad);	
		var text_X = brd2.create('text', [3, -0.2, '&omega;/&omega;n'], {
			style: 5
		});
}

function calculate()
{
	var errorMsg = "";
	m=parseInt($("#m").val());
	if( ( m!=null || m!=0 || !isNaN(m))&&(m>=50&&m<=100) ){
		m = m;
		check += 1;
	}else{
		check = 0;
	    errorMsg += "Please Enter m between 50-100<br/>";
		showDialog(errorMsg);
	}
	
	k = parseFloat($("#k").val());
	if( ( k!= null || k!=0 )&&(k!=0) && !isNaN(k)){
		k = k;
		check += 1;
	}else{	
		check = 0;
		errorMsg += "Please give the k values except 0 <br/>";
		showDialog(errorMsg);
	}
  	c=parseFloat($("#c").val());
	 if( ( c!=null || c!=0 )&&(c>=2000&&c<=2500))
			{
				c=c;
				check+=1;
			}
	else
			{
				check=0;
				errorMsg +="Please Enter C between 2000-2500<br>";
				showDialog(errorMsg);
			}
	f0=parseFloat($("#f").val());
	 if( ( f0!=null || f0!=0 )&&(f0>=100&&f0<=1000))
			{
				f0=f0;
				check+=1;
			}
	else
			{
				errorMsg += "Please Enter f<sub>0</sub> between 100-1000";
				showDialog(errorMsg);
			}
	omega1=parseFloat($("#omega1").val());
	omega2=parseFloat($("#omega2").val());
	omegaChange=omega1;
	Xst=f0/k;
	d=(omega2-omega1)/5000;
	Cc=2*Math.sqrt(k*m);
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
		Oomega[i]=(omega[i]/omegaN);
		Xx[i]=X[i]/ Xst;
		pie[i]=Math.atan((c*omega[i])/(k-m*Math.pow(omega[i],2)));
		if(pie[i]<0){
			pie[i] = pie[i]+Math.PI;
		}
		y[i]=Xx[i]*Math.cos((omega[i]*ti)+ pie[i]);
		
	}
	if(check==4)
	{
	excitationEffect();
	display();
	$("#run").attr('disabled',true);
	}
	
}
function showDialog(msg) {
	$("#Formula").html(msg);
	$("#Formula").dialog();
}
function display()
{
	$("#xstVal").html(Xst.toFixed(8));
	$("#zetaVal").html(zeta.toFixed(9));
}

function plotGraph1()
{
	var li1 = brd1.create('curve',[Oomega,Xx], {strokeColor:'black',strokeWidth:4,fixed:true});
}

function plotGraph2()
{
	var li2 = brd2.create('curve',[Oomega,pie], {strokeColor:'green',strokeWidth:4,fixed:true});
}
function calculateomega()
{
m=parseFloat($("#m").val());
k=parseFloat($("#k").val());
omegaN=Math.sqrt(k/m).toFixed(6);
$("#omeganVal").val(omegaN);
omega3=(omegaN/6).toFixed(0);
$("#omega1").val(omega3)
omega4=(3*omegaN).toFixed(0);
$("#omega2").val(omega4)
}

$(document).ready(function()
{
	$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur();
		$("#reload").click(function(){
		var plc = $("#m").attr("placeholder");  
		$("#m").val(plc);
		var p = $("k").attr("placeholder");
		$("#k").val(p);
		var pl = $("c").attr("placeholder");
		$("#c").val(pl);
		var pl = $("f").attr("placeholder");
		$("#f").val(pl);
		$("#omeganVal").val("");
		$("#omega1").val("");
		$("#omega2").val("");
		$("#xstVal").val("");
		$("#zetaVal").val("");
		window.location.href=window.location.href;
	})

	$("#Showf").click(function()
	{
		msg = '<label id="x">x = Xcos(&omega;t+&phi;)</label><br/><label id="X">X = F<sub>0</sub>/&radic;[K-M&omega;<sup>2</sup>]<sup>2</sup>+[C&omega;]            					<sup>2</sup></label></br><label id="Pie">&phi; = tan<sup>-1</sup>[C&omega;/K-M&omega;<sup>2</sup>]</label></div>'
		showDialog(msg);
	});

});