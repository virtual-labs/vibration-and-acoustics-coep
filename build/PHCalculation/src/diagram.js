PH.diagram = (function() {
	var diag = {};
	
	diag.phcalib = function()
	{
	var r = new  Raphael(document.getElementById('calibrationDiagram'),375,450);
	var ph = r.path("M 89 240 l 0 150" + "M 91 395 l 112 0" + "M 205 240 l 0 150"); 
	var ph1 = r.path("M 89 390 s 0 5 5,5" + "M 205 390 s 0 5 -3,5");
	var color1 = r.path("M 90 314.5 l 114 0 l 0 79.5 l -114 0 l 0 -79.5").attr({fill:"#306EEF",stroke:"#306EEF"});
	color1.toBack();
	var circle = r.circle(170,350, 9, 9).attr({fill:"white"});
	var ph2 = r.path("M 163 178 l 0 165 l 14 0 l 0 -165 l -14 0").attr({fill:"white"});
	var ph4 = r.ellipse(170, 168, 10, 22).attr({fill:"white"});
	var ph5 = r.ellipse(170, 170, 8, 22).attr({fill:"white",stroke:"white"});
	var ph3 = r.path("M 168 198 l 0 125 l 3 0 l 0 -125");
	var ph4 = r.rect(169, 292, 2, 30).attr({fill:"black"});
	var conductor2 = r.path("M 168 146 l 0 -50 l 85 0 l 0 5 l -80 0 l 0 45 l -5 0").attr({fill:"red"});
	var circle = r.circle(170, 350, 9, 9).attr({fill:"white"});
	var ph10 = r.path("M 160 168 l 20 0" + "M 179.5 248 l 50 0" + "M 186 240 l -8 8 l 8 8" + "M 188 375 l 43 0" + "M 196 367 l -8 8 l 8 8" + "M 93 120 l 73 0" + "M 159 128 l 8 -8 l -8 -8" + "M 188 340 l -8 8 l 8 8" + "M 180 348.5 l 53 0");
	var t = r.text(100, 105, "Connecting Wire").attr({'font-size':14});
	var t1 = r.text(280, 248, "pH Electrode").attr({'font-size':14});
	var t2 = r.text(270, 348, "Glass bulb").attr({'font-size':14});
	var t3 = r.text(290, 375, "Standard Solution").attr({'font-size':14});
	var t5 = r.path("M 170 320 l 3 22");
	}
	
	diag.phmeasurement = function(){
		var r = new  Raphael(document.getElementById('measureDiagram'),375,650);
		var ph8 = r.path("M20 330 l 0 160" + "M22 495 l 137 0" + "M162 330 l 0 160"); 
		var ph9 = r.path("M20 490 s 0 5 5,5" + "M162 490 s 0 5 -3,5");
		diag.color1 = r.path("M21 384.5 l 140 0 l 0 109.5 l -140 0 l 0 -109.5").attr({fill:"#33FFFF",stroke:"transparent"});
		
		var rect1 = r.rect(80,70,80,55);
		var rect2 = r.rect(180,80,80,35);
		var rect3 = r.rect(280,80,80,35);
		
		var ph2 = r.path("M 43 318 l 0 145 l 14 0 l 0 -145 l -14 0").attr({fill:"white"});
		var ph4 = r.ellipse(50, 308, 10, 22).attr({fill:"white"});
		var ph5 = r.ellipse(50, 310, 8, 22).attr({fill:"white",stroke:"white"});
		var ph3 = r.path("M 48 338 l 0 105 l 3 0 l 0 -105");
		var ph4 = r.rect(49, 412, 2, 30).attr({fill:"black"});
		var ph10 = r.path("M 160 98 l 20 0" + "M 260 98 l 20 0");
		var ph14 = r.path("M 50 287 l 0 -188 l 30 0");
		var ph10 = r.path("M 58 343 l 110 0" + "M65 335 l -8 8 l 8 8");
		var t5 = r.text(210,345,"pH Electrode").attr({'font-size':14});
		var t5 = r.path("M 48 440 l 3 22");
		var circle = r.circle(50,460, 9, 9).attr({fill:"white"});
		
		var t6 = r.text(118,82,"High").attr({'font-size':14});
		var t6 = r.text(118,98,"Impedance").attr({'font-size':14});
		var t7 = r.text(120,115,"Buffer").attr({'font-size':14});
		var t8 = r.text(222,98,"Amplifer").attr({'font-size':14});
		var t9 = r.text(322,98,"Display").attr({'font-size':14});
	}
	
	diag.phtemp = function(){
		var r = new  Raphael(document.getElementById('tempDiagram'),375,650);
		var ph8 = r.path("M20 330 l 0 160" + "M22 495 l 137 0" + "M162 330 l 0 160"); 
		var ph9 = r.path("M20 490 s 0 5 5,5" + "M162 490 s 0 5 -3,5");
		diag.color2 = r.path("M21 384.5 l 140 0 l 0 109.5 l -140 0 l 0 -109.5").attr({fill:"#33FFFF",stroke:"transparent"});
		
		var rect1 = r.rect(80,70,80,55);
		var rect2 = r.rect(180,80,80,35);
		var rect3 = r.rect(280,80,80,35);
		
		var ph2 = r.path("M 43 318 l 0 145 l 14 0 l 0 -145 l -14 0").attr({fill:"white"});
		var ph4 = r.ellipse(50, 308, 10, 22).attr({fill:"white"});
		var ph5 = r.ellipse(50, 310, 8, 22).attr({fill:"white",stroke:"white"});
		var ph3 = r.path("M 48 338 l 0 105 l 3 0 l 0 -105");
		var ph4 = r.rect(49, 412, 2, 30).attr({fill:"black"});
		var ph10 = r.path("M 160 98 l 20 0" + "M 260 98 l 20 0");
		var ph14 = r.path("M 50 287 l 0 -188 l 30 0");
		var ph10 = r.path("M 58 343 l 110 0" + "M65 335 l -8 8 l 8 8");
		var t5 = r.text(210,345,"pH Electrode").attr({'font-size':14});
		var t5 = r.path("M 48 440 l 3 22");
		var circle = r.circle(50,460, 9, 9).attr({fill:"white"});
		
		var t6 = r.text(118,82,"High").attr({'font-size':14});
		var t6 = r.text(118,98,"Impedance").attr({'font-size':14});
		var t7 = r.text(120,115,"Buffer").attr({'font-size':14});
		var t8 = r.text(222,98,"Amplifer").attr({'font-size':14});
		var t9 = r.text(322,98,"Display").attr({'font-size':14});
	}
	
	return {
		diag : diag
	}
})();