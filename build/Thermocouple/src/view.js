var THERMOCOUPLE = THERMOCOUPLE || {};

$(document).ready(function() {
	//console.log('document.ready');
	var staticView = new THERMOCOUPLE.view.staticView();
	var dynamicView = new THERMOCOUPLE.view.dynamicView();
	var staticGraphView = new THERMOCOUPLE.view.staticGraphView();
	var dynamicGraphView = new THERMOCOUPLE.view.dynamicGraphView();
});

THERMOCOUPLE.view = (function() {
	
	
	var staticView = Backbone.View.extend({
		el:'.container',
		
		events : {
			"change select" : "select",
			"click #Gettemp" : "GetTemperature",
			"click #Submit" : "SubmitAnswer",
			"click #nextSet" : "nextSetOfValues",
			"click #NextLevel" : "level2"
		},
		
		initialize: function() {
			//console.log('initialize')
			$("select").chosen();
			
			this.render();
		},//initialize
		
		render:function (){
			this.staticDiag();
			THERMOCOUPLE.controller.obj.setID() ;
		},//render
		
		staticDiag:function(){
			THERMOCOUPLE.controller.obj.drawStaticDiag();
			
		},//staticDiag
		
		select : function(event) {
			var target = event.target;
			var change = {};
			change[target.id] = target.value;
			var target = event.target;
			
			switch(target.id) {
				case "Mselect" :
				//setting value in model
					THERMOCOUPLE.controller.obj.setM($("#Mselect").val());
					
				//calling required function
					THERMOCOUPLE.controller.obj.thermoCoupleType();
					if($("#resistance").val() != '--Select--'){
						$("#Gettemp").attr("disabled", false);
						$("#Gettemp").addClass("greenbtn");
					}	
					break;
				case "resistance":
					THERMOCOUPLE.controller.obj.setR($("#resistance").val());
					
					THERMOCOUPLE.controller.obj.resist();
					if($("#Mselect").val() != '--Select--'){
						$("#Gettemp").attr("disabled", false);
						$("#Gettemp").addClass("greenbtn");
					}
					break;
			}//switch
			
		},//select
		
		GetTemperature : function(){
			if($("#Mselect").val() != '0' && $("#resistance") != '0'){
				$("#Mselect").attr("disabled", true).trigger("liszt:updated");
				$("#resistance").attr("disabled", true).trigger("liszt:updated");
				$("#Submit").attr("disabled", false);
				$("#Submit").addClass('greenbtn');
				THERMOCOUPLE.controller.obj.GetTemperature();
			}
		},//GetTemperature
		
		SubmitAnswer : function(){
			var	R = parseFloat($("#Rttext").val());
			var v = THERMOCOUPLE.controller.obj.userOutput(R);
			if(v == true)
			{
				$("#Submit").attr("disabled", true);
				$("#Submit").removeClass('greenbtn');
			}
			
		},//SubmitAnswer
		
		nextSetOfValues : function(){
				$("#Mselect").attr('disabled', false).trigger("liszt:updated");
				$("#Mselect").val('').trigger("liszt:updated");
				$("#resistance").val('').trigger("liszt:updated");
				$("#resistance").attr('disabled', false).trigger("liszt:updated");
				$("#PlotStatic").attr('disabled', true); $("#PlotStatic").removeClass('greenbtn');
				$('#Rttext').attr({'value':'Enter your Output'});
				
				THERMOCOUPLE.controller.obj.next();
		},//nextSetOfValues
		
		level2 :  function(){
			THERMOCOUPLE.controller.obj.nxtLevel();
		}
	});//staticView
	
	var staticGraphView = Backbone.View.extend({
		el : "body",
		
		events :
		{
			"click #PlotStatic" : "init"
		},
		
		initialize : function(){
			this.render();
		},
		
		render : function() {
			$(this.el).append("<div id='static-modal-content'><div id='static-modal-title'>Graph</div><div class='close'><a href='#' class='simplemodal-close'>x</a></div><div id='static-modal-data'><div id='graph' style='width:770px; height:500px;z-index: 999999;'></div><p><button class='action simplemodal-close redbtn'><span class='label'>Close</span></button><span>(or press ESC or click the overlay)</span></p></div></div>");
		},
		
		init : function(e){
			//THERMOCOUPLE.controller.obj.count = 1;
			
			e.preventDefault();
                $("#static-modal-content").modal({
                    overlayId: 'static-overlay',
                    containerId: 'static-container',
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
		
		open : function(e){
			 THERMOCOUPLE.controller.obj.plotStaticData();
	            self = this;
	            container = e.container[0];
	            e.overlay.fadeIn('slow', function () {
	                $("#static-modal-content", self.container).show();
	                var title = $("#static-modal-title", self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
	                    setTimeout(function () {
	                        var h = $("#static-modal-data", self.container).height() + title.height() + 20; // padding
	                        e.container.animate({
	                            height: h
	                        }, 200, function () {
	                            $("div.close", self.container).show();
	                            $("#static-modal-data", self.container).show();
	                        });
	                    }, 300);
	                });
            })
		},//open
		
		close : function(e){
			var self = this; // this = SimpleModal object
            e.container.animate({
                top: "-" + (e.container.height() + 20)
            }, 500, function () {
                $.modal.close(); // or $.modal.close();
            });
		}
	});//staticGraphView
	
	var dynamicView = Backbone.View.extend({
		el:'.container',
		 
		events : {
			'click input' : 'check',
			"change #WS1" : "MaterialForWithShealth",
			"change #WS2" : "withThickness",
			"change #T1" : "ThermowellMaterial",
			"change #T2" : "ThermowellThickness",
			"change #T3" : "fillmaterial",
			"click .link" : "level1"
		},
		
		check : function(e){
					var selectId = $(e.target).attr('id');
					if(selectId == 'check1')
						this.Bare();
					else if(selectId == 'check2')
						this.WithSheath();
						else if(selectId == 'check3')
							this.Thermowell();
			},//check
			
		Bare : function(){
			if(!($('#check1').attr('checked')))
					{
						//alert('unchecked');
						
					}
				else{
					var	k = 71.6, row = 21450, s = 130, L = 15 / (1000), x = 2.0 / (1000);
						//THERMOCOUPLE.controller.obj.bareElementTimeConstantValue(k, row, s, L, x)
						$("#b1").attr('disabled', false);
						$("#check2").attr('disabled', false);
						$("#Plotd").attr('disabled', false);
						$("#Plotd").addClass('greenbtn');
						THERMOCOUPLE.controller.obj.animateBare();
						//THERMOCOUPLE.controller.obj.bareGraph();
					}
		},//Bare
		
		WithSheath : function(){
			if(($('#check2').attr('checked')))
					{
						$("#WS1").attr('disabled', false).trigger("liszt:updated");
						$("#WS2").attr('disabled', false).trigger("liszt:updated");
						$("#check3").attr('disabled', false);
						
						THERMOCOUPLE.controller.obj.animateSheath();
					}
		},//withsheath
		
		MaterialForWithShealth : function(){
			THERMOCOUPLE.controller.obj.withsheathMaterial();
		},
		
		withThickness : function(){
			THERMOCOUPLE.controller.obj.withsheathThickness();
		},
		
		Thermowell : function(){
				if(($('#check3').attr('checked')))
				{
					THERMOCOUPLE.controller.obj.animateThermowell();
					$("#T1").attr('disabled', false).trigger("liszt:updated");
					$("#T2").attr('disabled', false).trigger("liszt:updated");
					$("#T3").attr('disabled', false).trigger("liszt:updated");
					
				}
			},//Thermowell
			
		ThermowellMaterial : function(){
			THERMOCOUPLE.controller.obj.materialForThermowell();
		},
		
		ThermowellThickness : function(){
			THERMOCOUPLE.controller.obj.thicknessForThermowell();
		},
		
		fillmaterial : function(){
			THERMOCOUPLE.controller.obj.fillmaterialForThermowell();
		},
		
		level1 : function(){
			$("#dynamic").hide();
	       					
	       $("#static").show();
		}
	});
	
	var dynamicGraphView = Backbone.View.extend({
		el : "body",
		
		events :
		{
			"click #Plotd" : "init"
		},
		
		init : function(e){
			//RTD.handler.obj.count = 1;
			e.preventDefault();
                $("#dynamic-modal-content").modal({
                    overlayId: 'dynamic-overlay',
                    containerId: 'dynamic-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.open,
                    onClose: this.close,
                    minWidth: 800
                });
		},//init
		
		open : function(e){
			THERMOCOUPLE.controller.obj.plotDynamicData();
	            self = this;
	            container = e.container[0];
	            e.overlay.fadeIn('slow', function () {
	                $("#dynamic-modal-content", self.container).show();
	                var title = $("#dynamic-modal-title", self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
	                    setTimeout(function () {
	                        var h = $("#dynamic-modal-data", self.container).height() + title.height() + 20; // padding
	                        e.container.animate({
	                            height: h
	                        }, 200, function () {
	                            $("div.close", self.container).show();
	                            $("#dynamic-modal-data", self.container).show();
	                        });
	                    }, 300);
	                });
            })
		},//open
		
		close : function(e){
			var self = this; // this = SimpleModal object
            e.container.animate({
                top: "-" + (e.container.height() + 20)
            }, 500, function () {
                $.modal.close(); // or $.modal.close();
            });
		}
	});//staticGraphView
	
	return {
		staticView : staticView,
		dynamicView : dynamicView,
		staticGraphView : staticGraphView,
		dynamicGraphView : dynamicGraphView
	}
})();
