var BIOSENSOR = BIOSENSOR || {};

$(document).ready(function() {
	//console.log('document.ready');
	$("#big_area").hide();
	$("select").chosen();
	var calibrationView = new BIOSENSOR.view.calibrationView();
	var measurementView = new BIOSENSOR.view.measurementView();
	var errorView = new BIOSENSOR.view.errorView();
	
});

BIOSENSOR.view = (function() {
	
	var calibrationView = Backbone.View.extend({
		el : "#level-1",
		
		events: {
			"change #speed" : "selectSpeed",
			"click #startRotation" : "rotate",
			"click #measurement" : "levelTwo",
			"click #restart" : "start"
		},
		
		initialize : function(){
			//console.log('calibrationView');
			this.render();
		},
		
		render : function(){
			BIOSENSOR.controller.obj.levelOneDiagram();
			BIOSENSOR.controller.obj.drawCircle();
		},
		
		selectSpeed : function(){
			var speed = parseFloat($("#speed").val())
			if(speed != "--Select Speed--")
			{
				$("#startRotation").attr('disabled',false);
				$("#startRotation").addClass('greenbtn');
				BIOSENSOR.controller.obj.setSpeed(speed);
				BIOSENSOR.controller.obj.startRotation();
				
			}
			else
			{
				$("#startRotation").attr('disabled',true);
				$("#startRotation").removeClass('greenbtn');
			}
			
		},//selectSpeed
		
		rotate : function(){
			$("#speed").attr('disabled',true).trigger("liszt:updated");
			BIOSENSOR.controller.obj.rotateDisk();
			
		},
		
		levelTwo : function(){
			$("#level-1").hide();
			$("#level-2").show("slide",{ direction: "left" }, 1000);
			$("h3").html("Level-2 Measurement")
		},
		
		start : function(){
			$("#speed").attr('disabled',true).trigger("liszt:updated");
			$("#restart").attr('disabled',true);
			$("#restart").removeClass('bluebtn');
			BIOSENSOR.controller.obj.rotateDisk();
		}
		
	});//calibrationView 
	
	var measurementView = Backbone.View.extend({
		el : "#level-2",
		
		events : {
			"click #link-1" : "showLevelOne",
			"click #showError" : "levelThree",
			"change #age" : "ageChange",
			"click #showRange" : "show"
		},
		
		initialize : function(){
			//console.log('measurementView');
			this.render();
		},
		showLevelOne : function(){
			$("#level-2").hide();
			$("#level-1").show("slide",{ direction: "right" }, 1000);
			$("h3").html("Level-1 Calibration");
		},
		
		levelThree : function(){
			$("#level-2").hide();
			$("#level-3").show("slide",{ direction: "left" }, 1000);
			$("h3").html("Level-3 Error")
		},
		
		render : function(){
			BIOSENSOR.controller.obj.createDiagramTwo();
		},
		
		ageChange : function(){
					//paperTwo = new Raphael(document.getElementById('diagramContainerTwo'), 600, 250);
					BIOSENSOR.controller.obj.createDiagramTwo();
					$("#showRange").attr('disabled', false);
					$("#showRange").addClass('greenbtn')
					var age = $('#age').val();
					BIOSENSOR.controller.obj.setAge(age);
					BIOSENSOR.controller.obj.showBeats();
					
		},
		
		show : function(){
			BIOSENSOR.controller.obj.showBeatsRange();
			$("#showError").attr('disabled', false);
			$("#showError").addClass('greenbtn')
		}
	});
	
	var errorView = Backbone.View.extend({
		el : "#level-3",
		
		events : {
			"click #link-2" : "showLevelTwo",
			"change #error" : "showError"
		},
		
		initialize : function(){
			//console.log('errorView');
			//this.render();
		},
		
		showLevelTwo : function(){
			$("#level-3").hide();
			$("#level-2").show("slide",{ direction: "right" }, 1000);
			$("#display_counter_three").html("<div style='margin-top:30px;font-size:20px;text-align:center'>BPM <br/><div>");
			$("h3").html("Level-2 Measurement");
		},
		
		showError : function(){
			$("#big_area").show()
			errorOption = parseInt($('#error').val());
			if(1 == errorOption) {
				BIOSENSOR.controller.obj.misalignment();
			}
			else if(2 == errorOption){
				BIOSENSOR.controller.obj.strayLight();
			}
		}
	})
	
	return {
		calibrationView : calibrationView,
		measurementView : measurementView,
		errorView : errorView
	}
})();