var PH = PH || {};

$(document).ready(function() {
	$("#fomulabtn").click(function() {
		window.open("formula.html", "Formula", "left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
	});
	//$('select').chosen();
	var calibrationView = new PH.view.calibrationView();
	var measurementView = new PH.view.measurementView();
	var temperatureView = new PH.view.temperatureView();
	var graphView = new PH.view.graphView();
	$("#plotCalibration").hide();
	$("#measurementLevel").hide();
	$("#plotTemp").hide();
	
	//flag=false;
});

PH.view = (function() {

	var calibrationView = Backbone.View.extend({
		el : '#level-1',

		events : {
			"click #measurementLevel" : "measurement",
			"change #phValue" : "phValueCalibration",
		},

		initialize : function() {
			PH.diagram.diag.phcalib();
		},
		
		measurement : function() {
			$('h3').html("Level-2 Measurement");
			$('#level-1').hide();
			$('#level-2').show("slide", {
				direction : "right"
			}, 1000);
		},
		
		phValueCalibration : function(){
			$("#plotCalibration1").hide();
			$("#plotCalibration").show();
			$("#measurementLevel").show();
			$("#measurementLevel1").hide();
			var ph = parseFloat($('#phValue').val());
			$('#plotCalibration').attr({'disabled': false});
			$('#plotCalibration').addClass('greenbtn');
			PH.controller.obj.setPh(ph);
			PH.controller.obj.phValueForCalibration();
			
		}
	});
	//contaminationView

	var measurementView = Backbone.View.extend({
		
		el : '#level-2',

		events : {
			"click #link-1" : "calibration",
			"click #temperatureLevel" : "temperature",
			"change #phSample" : "selectSample",
			"click #submitMeasure" : "submit"
		},
		
		initialize : function(){
			PH.diagram.diag.phmeasurement();
		},

		calibration : function() {
			$('h3').html("Level-1 Calibration");
			$('#level-2').hide();
			$('#level-1').show("slide", {
				direction : "left"
			}, 1000);
		},
		
		temperature : function(){
			$('h3').html("Level-3 Temperature");
			$('#level-2').hide();
			$('#level-3').show("slide", {
				direction : "right"
			}, 1000);
			$('#l2Ans').html(measurementModel.get('ans'));
		},
		
		selectSample : function(){
			//flag=true;
			var sample = $('#phSample').val();
			$('#sampleTemp').html(sample);
			$('#submitMeasure').attr({'disabled': false});
			$('#submitMeasure').addClass('greenbtn');
			$("#temp1").html('');
			$("#temp2").html('');
			$("#temp3").html('');
			$("#Temperature").html('');
			PH.controller.obj.setSample(sample);
		},
		
		submit : function(){
			var ans = parseFloat($('#submit').val());
			PH.controller.obj.checkUser(ans);
			$('#temperatureLevel').attr({'disabled': false});
			$('#temperatureLevel').addClass('greenbtn');
			$('#submit').val("");
		}
	});
	//measurementView

	var temperatureView = Backbone.View.extend({
		el : '#level-3',

		events : {
			"click #link-2" : "temperature",
			"click #Gettemp" : "get"
		},
		
		initialize : function(){
			PH.diagram.diag.phtemp();
		},

		temperature : function() {
			$('h3').html("Level-2 Measurement");
			$('#level-3').hide();
			$('#level-2').show("slide", {
				direction : "left"
			}, 1000);
			
		},
		
		get : function(){
			 $("#plotTemp").show();
			 $("#plotTemp1").hide();
			 var temp = PH.controller.obj.getTemperature();
			 $('#Temperature').html(temp + '&deg;C');
			 PH.controller.obj.calculatePhTemp();
			 $('#plotTemp').attr({'disabled': false});
			 $('#plotTemp').addClass('greenbtn');
		}
		
	});
	//temperatureView

	var graphView = Backbone.View.extend({
		el : 'body',
		
		events : {
			"click #plotCalibration" : "init",
			"click #plotTemp" : "initTemp",
			"click #plotCalibration1" : "plotAlert",
			"click #plotTemp1" : "plotAlert1",
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
        plotAlert:function() {
         	 alert("Please select pH value");
        },
        plotAlert1:function() {
         	 alert("Please select Temperature");
        },
        open : function(d){
        	PH.controller.obj.plott();
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
        	PH.controller.obj.plotTemperature();
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
        
        close: function (d) {
            var self = this; 
            d.container.animate({
                top: "-" + (d.container.height() + 20)
            }, 500, function () {
                self.close();
            });
        },

	});

	return {
		calibrationView : calibrationView,
		measurementView : measurementView,
		temperatureView : temperatureView,
		graphView : graphView
	}
})();
