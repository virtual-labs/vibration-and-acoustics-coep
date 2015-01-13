var CONDUCTIVITY = CONDUCTIVITY || {};

$(document).ready(function() {
	//$('select').chosen();
	var measurementView = new CONDUCTIVITY.view.measurementView();
	var temperatureView = new CONDUCTIVITY.view.temperatureView();
	var contaminationView = new CONDUCTIVITY.view.contaminationView();
	var graphView = new CONDUCTIVITY.view.graphView();
	$("#plotMeasure").hide();
	$('#plotTemp').hide();
});

CONDUCTIVITY.view = (function() {
	var paper1 = new  Raphael(document.getElementById('measurementDiagram'),416,240);
	var paper2 = new  Raphael(document.getElementById('tempDiagram'),416,240);
	var diag = 0
	var measurementView  = Backbone.View.extend({
		el : '#level-1',
		
		events:{
			"click #tempLevel" : "temperatureLevel",
			'change #subs-opt-for-measurement' : 'changeSubstance',
			'change #concen-opt-for-measurement' : 'changeConcentration',
			'click button#submitMeasure' : 'submit',
			'click button#nextSetMeasure' : 'nextSetValue'
		},
		
		initialize : function(){
			CONDUCTIVITY.controller.obj.measurementDiag(paper1);
			CONDUCTIVITY.controller.obj.contaminationDiag();
			CONDUCTIVITY.controller.obj.changeSubs(1,"HCL");
		},
		
		temperatureLevel : function(){
			var index = document.getElementById("concen-opt-for-measurement").selectedIndex;
			document.getElementById("Conc3").selectedIndex = eval(index);
		
			//from temperatureView.changeConcentration
			
			var opt = parseInt($('#Conc3').val());
			CONDUCTIVITY.controller.obj.setConcentration(opt);
			$('#console2').append("<br><label>Selected Concentration is " + opt + "</label>");
				$("#Gettemp").attr("disabled", false);
				$("#Gettemp").addClass("greenbtn");
			
			
			
			$('#level-1').hide();
			$('#level-2').show("slide",{ direction: "left" }, 1000);
			$('#fomulabtnMeasurement').hide();
			$('#fomulabtnContam').hide();
			$('#fomulabtnTemp').show();
			
			$('h3').html("Level-2 Temperature");
			if(diag == 0)
			{
				CONDUCTIVITY.controller.obj.measurementDiag(paper2);
				CONDUCTIVITY.controller.obj.changeSubs(2,"HCL");
			}
			diag++;
		},
		
		changeSubstance : function() {
			var option = ""
				this.substance = $('#subs-opt-for-measurement', this.el).val();
				CONDUCTIVITY.controller.obj.setSubstance(this.substance);
				CONDUCTIVITY.controller.obj.changeSubs(this.substance);
				if(this.substance == "--Select--"){
					$('#concen-opt-for-measurement').html(option);
					$('#concen-opt-for-measurement').trigger("liszt:updated");
				}
				$('#tempSample').html($('#subs-opt-for-measurement', this.el).val());
				$('#contSample').html($('#subs-opt-for-measurement', this.el).val());
				$('#console1').append("<br><label>Selected Substance is " + this.substance + "</label>");
				
				CONDUCTIVITY.controller.obj.setOptions();
				$('#plotMeasure').attr({'disabled': true});
				$('#plotMeasure').removeClass('greenbtn');
		},//changeSubstance
		
		changeConcentration : function() {
				var conc = parseInt($('#concen-opt-for-measurement', this.el).val());
				CONDUCTIVITY.controller.obj.showConcentration(conc);
				$('#submitMeasure').attr({'disabled': false});
				$('#submitMeasure').addClass('greenbtn');
				CONDUCTIVITY.controller.obj.calculateSpecificConductance();
				$('#subs-opt-for-measurement').attr('disabled', true).trigger("liszt:updated");
				$('#console1').append("<br><label>Selected Concentration is " + conc + "</label>")
			},
			
		submit : function() {
			var userInput = parseFloat($("#measurement-input").val());
			var optvalue = parseInt($('#concen-opt-for-measurement', this.el).val());
			$('#console1').append("<br><label>Your Answer : " + userInput + "</label>");
			CONDUCTIVITY.controller.obj.checkUserInput(userInput);
			$('#nextSetMeasure').attr({'disabled': false});
			$('#nextSetMeasure').addClass('greenbtn');	
			
			
			
		},
		
		nextSetValue : function() {
			$("#plotMeasure1").show();
			$("#plotMeasure").hide();
			$('#subs-opt-for-measurement').attr('disabled', false).trigger("liszt:updated");
			CONDUCTIVITY.controller.obj.next();
		}
	});//measurementView
	
	var temperatureView  = Backbone.View.extend({
		el : '#level-2',
		
		events:{
			"click #link-1" : "measurementLevel",
			"click #contaminLevel" : "contLevel",
			'change #Conc3' : 'changeConcentration',
			'click #Gettemp' : 'getTemp',
			'click #nextSetTemp' : 'nextSetValue',
			'click #submitTemp' : 'submit'
		},
		
		measurementLevel : function(){
			$('#level-2').hide();
			$('#level-1').show("slide",{ direction: "right" }, 1000);
			$('h3').html("Level-1 Measurement");
			$('#fomulabtnMeasurement').show();
			$('#fomulabtnContam').hide();
			$('#fomulabtnTemp').hide();
		},
		
		contLevel : function(){
			
			$('#level-2').hide();
			$('#level-3').show("slide",{ direction: "left" }, 1000);
			$('h3').html("Level-3 Contamination");
			$('#fomulabtnMeasurement').hide();
			$('#fomulabtnContam').show();
			$('#fomulabtnTemp').hide();
			$("#Sc").html($("#measurement-input").val());
			
			var index = document.getElementById("concen-opt-for-measurement").selectedIndex;
			document.getElementById("ContConc2").selectedIndex = eval(index);
		},
		
		changeConcentration : function(){
		
			var opt = parseInt($('#Conc3').val());
			CONDUCTIVITY.controller.obj.setConcentration(opt);
			$('#console2').append("<br><label>Selected Concentration is " + opt + "</label>");
				$("#Gettemp").attr("disabled", false);
				$("#Gettemp").addClass("greenbtn");
		},
		
		getTemp : function(){
			$("#Conc3").attr('disabled',true).trigger("liszt:updated");
			$("#Subs2").attr('disabled',true).trigger("liszt:updated");
			var temp = CONDUCTIVITY.controller.obj.getTemperature();
			$('#Temperature').html(temp + "&deg;C");
			$('#submitTemp').attr({'disabled': false});
			$('#submitTemp').addClass('greenbtn');
		},
		
		submit : function() {
			var userInput = parseFloat($("#temperature-input").val());
			$('#console2').append("<br><label>Your Answer : " + userInput + "</label>");
			var v = CONDUCTIVITY.controller.obj.checkCondunctivityAtInterest(userInput);
			$('#nextSetTemp').attr({'disabled': false});
			$('#nextSetTemp').addClass('greenbtn');	
			if(v == true)
			{
				//$("#l2Ans").html(userInput);
				$("#submitTemp").attr("disabled", true);
				$("#submitTemp").removeClass('greenbtn');
			}
		},
		
		nextSetValue : function() {
			$('#Subs2').attr('disabled', false).trigger("liszt:updated");
			$('#Conc3').attr('disabled', false).trigger("liszt:updated");
			CONDUCTIVITY.controller.obj.nextSet();
		},
	});
	
	var contaminationView = Backbone.View.extend({
		el : '#level-3',
		
		events:{
			"click #link-2" : "tempLevel",
			'change #ContConc2' : 'changeConcentration',
			'change #Cont' : 'changeContamination',
			"click #submitCont":"submit"
		},
		
		tempLevel : function(){
			$('#level-3').hide();
			$('#level-2').show("slide",{ direction: "right" }, 1000);
			$('h3').html("Level-2 Temperature");
			$('#fomulabtnMeasurement').hide();
			$('#fomulabtnContam').hide();
			$('#fomulabtnTemp').show();
		},
		
		changeConcentration : function(){
			var opt = parseInt($('#ContConc2').val());
			CONDUCTIVITY.controller.obj.setConcentrationForContamination(opt);
			$('#console3').append("<br><label>Selected Concentration is " + opt + "%</label>");
			
		},
		
		changeContamination : function(){
			var opt = parseFloat($('#Cont').val());
			CONDUCTIVITY.controller.obj.setContamination(opt);
			$('#console3').append("<br><label>Selected Contamination is " + opt + "</label>");
		},
		
		submit : function(){
			var ans = parseFloat($('#MCond').val());
			CONDUCTIVITY.controller.obj.checkContamination(ans);
		}
		
	});
	
	var graphView = Backbone.View.extend({
		el : 'body',
		
		events : {
			"click button#plotMeasure" : "init",
			"click button#plotTemp" : "initTemp",
			"click button#plotMeasure1" : "plotAlert",
			"click button#plotTemp1" : "plotAlert"
		},
		
		init: function (e) {
                e.preventDefault();
                $("#gphone-modal-content").modal({
                    overlayId: 'gphone-overlay',
                    containerId: 'gphone-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.open,
                    onClose: this.close,
                    minWidth: 800
                });
        },
        open : function(d){
        	CONDUCTIVITY.controller.obj.plotMeasurement();
            var self = this;
	            self.container = d.container[0];
	            d.overlay.fadeIn('slow', function () {
                $("#gphone-modal-content", self.container).show();
                var title = $("#gphone-modal-title", self.container);
                title.show();
                d.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#gphone-modal-data", self.container).height() + title.height() + 20; // padding
                        d.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close", self.container).show();
                            $("#gphone-modal-data", self.container).show();
                        });
                    }, 300);
                });
            });
        },//open
        plotAlert:function(){
        	alert("Please calculate minimum 3 values ");
        },
        close: function (d) {
            var self = this; 
            d.container.animate({
                top: "-" + (d.container.height() + 20)
            }, 500, function () {
                self.close();
            });
        },
        
       initTemp : function (e) {
                e.preventDefault();
                $("#gphtwo-modal-content").modal({
                    overlayId: 'gphtwo-overlay',
                    containerId: 'gphtwo-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openTemp,
                    onClose: this.close,
                    minWidth: 800
                });
        },
        openTemp : function(d){
        	CONDUCTIVITY.controller.obj.plotTemperature();
            var self = this;
	            self.container = d.container[0];
	            d.overlay.fadeIn('slow', function () {
                $("#gphtwo-modal-content", self.container).show();
                var title = $("#gphtwo-modal-title", self.container);
                title.show();
                d.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#gphtwo-modal-data", self.container).height() + title.height() + 20; // padding
                        d.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close", self.container).show();
                            $("#gphtwo-modal-data", self.container).show();
                        });
                    }, 300);
                });
            });
        },//open
	});
	
	return {
		measurementView : measurementView,
		temperatureView : temperatureView,
		contaminationView : contaminationView,
		graphView : graphView
	}
})();
	