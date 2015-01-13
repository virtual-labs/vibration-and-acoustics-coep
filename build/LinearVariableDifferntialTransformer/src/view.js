var LVDT = LVDT || {};

$(document).ready(function() {
	$("#fomulabtn").click(function()
				{
					window.open("formula.html","Formula" ,"left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
				});
	$('#configuration').hide();
	var graphView = new LVDT.view.graphView();
	var circuitDiagramView = new LVDT.view.circuitDiagramView();
	var configureLvdt = new LVDT.view.configureLvdt();
	
	 $('#reconfig').live("click",function(){
	 	LVDT.controller.obj.clearBoard();
 	 $('#lvdt').hide();
	 $('#configuration').show("slide",{ direction: "right" }, 1000);
	 
	 })
});

LVDT.view = (function() {
	 
	 
     var graphView = Backbone.View.extend({
     	el : '#lvdt',
		
		initialize : function() {
			//console.log('graph view')
			this.createGraphs();
		},
		
		createGraphs : function(){
			//voltage graph
			 voltageBoard = LVDT.controller.obj.createGraphBoard(450, 250, 20, 10);
					if(( LVDT.controller.obj.inputVoltsRMS=1)||( LVDT.controller.obj.signalFrequencyHz=1)){
					
	                //LVDT.controller.obj.drawVoltageGraph(voltageBoard);
                 }
              		LVDT.controller.obj.updateAllInputVoltage();
              		 
             //frequency graph 	
             acBoard = LVDT.controller.obj.createACBoard(10, 190, 10, 13);
			
					LVDT.controller.obj.outputGraph = LVDT.controller.obj.drawACGraph(acBoard);
				
					LVDT.controller.obj.updateAllFrequency();	
		}
     });//graphView
     
     var circuitDiagramView = Backbone.View.extend({
     		el : '.diagram',
     		
     		events : {
				'click button#panel' : 'openPanel',
				'change select#coil' : 'callChangeTurns',
				'change select#voltage': 'displayVoltage',
				'change select#frequency': 'displayFrequency'
			},
     		
     		initialize : function() {
				//console.log('circuitDiagramView');
				
				LVDT.controller.obj.createCircuitDiagram();
				$('#lvdt').hide();
	            $('#configuration').show("slide",{ direction: "right" }, 1000);
	           // $('#reConfigure').hide();
			},
	
			openPanel : function(){
				$('#lvdt').hide();
	            $('#configuration').show("slide",{ direction: "right" }, 1000);
	            //$('#reConfigure').hide();

			},//openPanel
		
			displayVoltage : function(){
				LVDT.controller.obj.voltage();
			},
			
			displayFrequency : function(){
				LVDT.controller.obj.frequency();
			},
			
			callChangeTurns : function(){
				LVDT.controller.obj.setCoils();
				LVDT.controller.obj.updateLVDT();
			}
     		
     });//circuitDiagramView
     
     	var configureLvdt = Backbone.View.extend({
     		el : '#configuration',
     		
     		events : {
				'click button#config' : 'changeMode',
				'change select#coil' : 'changeCoils',
				'change select#voltage': 'displayVoltage',
				'change select#frequency': 'displayFrequency'
			},
     		
     		initialize : function(){
     			//console.log('configureLvdt')
     			this.createPanel();
     		},
     		
     		createPanel : function(){
     			paperPri = new Raphael(document.getElementById('primaryCoil'), 249,100);
				paperSec = new Raphael(document.getElementById('SecondaryCoil'), 269,250);
				paperArm = new Raphael(document.getElementById('armature'), 246,54);
				
				var start = "c  0   0  5 8 10 8 ", end = "c 10 0 10 -10 10 -8 ", curve ="M 109 30 C 125 2 125 58  140 30";
				var st = "c   0   0   0 -10  10 -10 ", en = "c  10   0  18  8  15  10 ";
				
				LVDT.controller.obj.createPrimary(paperPri, 105, 30, 100, 60, 144, 18, 90, 6, start, end, curve, 1000);
				LVDT.controller.obj.createSecondary(paperSec, 30, 30, 242, 175, 238, 111, 205, 170, 262, st, en, 155, 140, 116, 60, 2, 1000);
				armature = paperArm.rect(50,30,150,25).attr({fill:"90-#000:5-#fff:55-#000:95"});
				
				this.dragCircuit();
     		},
     		
     		dragCircuit : function(){
     			LVDT.controller.obj.dragPrimary();
				LVDT.controller.obj.dragSecondary();
				LVDT.controller.obj.dragArmature();
     		},
     		
     		changeCoils : function(){
     			LVDT.controller.obj.animateCoils();
     		},
		
			displayVoltage : function(){
				LVDT.controller.obj.voltage();
			},
			
			displayFrequency : function(){
				LVDT.controller.obj.frequency();
			},
			
			changeMode : function(){
				//graphView = new LVDT.view.graphView();
				$('#configuration').hide();
				$('#lvdt').show("slide",{ direction: "left" }, 1000);
				$("#heading").replaceWith("<h4 style='margin-left:7em'> Diagram</h4>")
				//$('#controlPanel').html("");
				//$('#controlPanel').html($('#reConfigure').html());
				  LVDT.controller.obj.drawVoltageGraph(voltageBoard);
				  
				LVDT.controller.obj.graphFactor=0.01;
               switch($("#frequency").val()){
               	case "1000":
               	 			LVDT.controller.obj.graphFactor=0.01;
               				break;
               	case "1500":
               				LVDT.controller.obj.graphFactor=0.02;
               				break;
               	case "5000":
               				LVDT.controller.obj.graphFactor=0.05;
               				break;
               	case "7000":
               				LVDT.controller.obj.graphFactor=0.07;
               				break;
               	case "10000":
               				LVDT.controller.obj.graphFactor=0.09;
               				break;
               				
               }       
				$("#recoil").val($("#coil").val());
				$("#revoltage").val($("#voltage").val())
				$("#refrequency").val($("#frequency").val())
				
 				 /*$('#recoil > option').each(function(){
				
 				 if($(this).val()==$('#coil :selected').val()) $(this).parent('select').val($(this).val())
 				 })	
 				 $('#reConfigure').css({"display":"block"});
 				 $('#recoil').val($('#voltage :selected').val());
 				 
 				 $('#revoltage > option').each(function(){
 				 if($(this).val()==$('#voltage :selected').val()) $(this).parent('select').val($(this).val())
 				 })	
 				 $('#revoltage').attr('disabled', 'disabled');
 				 $('#refrequency > option').each(function(){
 				 if($(this).val()==$('#frequency :selected').val()) $(this).parent('select').val($(this).val())
 				 })		*/
				 //$('#controlPanel').append('<button class="bluebtn" style="margin:0.1em 1em" onclick="window.location.reload(true)"><span class="label">Reload</span></button>')
				//LVDT.controller.obj.updateLVDT();
			},
     	});//configureLvdt
	
	return {
		graphView : graphView,
		circuitDiagramView : circuitDiagramView,
		configureLvdt : configureLvdt
	}
})();