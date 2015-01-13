var RTD = RTD || {};

$(document).ready(function() {
	
	$('select').chosen();
	var staticView = new RTD.view.staticView();
	var staticGraphView = new RTD.view.staticGraphView();
	var dynamicView = new RTD.view.dynamicView();
	var	dynamicGraphView = new RTD.view.dynamicGraphView();
	//var	stateSavingView  = new RTD.view.stateSavingView();
	var	formulaView  = new RTD.view.formulaView();
	$("#check3").attr('enabled', true);
	$("#Plot").hide();
});

RTD.view = (function() {
	var paper, stModel, k, s, L, x, row
	cnt=false;
	var staticView = Backbone.View.extend({
		el : '#static',
		
		events : {
			"change select" : "select",
			"click #Gettemp" : "GetTemperature",
			"click #Submit" : "SubmitAnswer",
			"click #nextsetvalue" : "nextSetValue",
			"click #level2" : "dynamicLevel",
			"click #Button1" : "refresh",
			"click #Plot1" : "plotAlert"
		},
		
		initialize: function() {
			 paper = new Raphael(document.getElementById('staticDiagram'), 400, 500);
			 this.staticDiag();
			 this.render();
		},
		
		render : function(){
			RTD.handler.obj.setID() ;
		},
		
		refresh : function(){
			window.location.reload(true)
		},
		
		staticDiag:function(){
			var staticContainer = paper.path("M 110 200 l 0 250 l 153 0 l 0 -250").attr({stroke:'#000000'});
			var rect = paper.rect(111.5,270,149.5,179).attr({fill:'skyblue',stroke:'skyblue'});
			var rod = paper.path("M 184 213 l 0 220 l 10 0 l 0 -220").attr({stroke:'#000000',fill:'white'});
			var metalTip = paper.path("M 184 433 l 5 10 5 -10 ").attr({stroke:'#000000',fill:'white'});
			var head = paper.path("M 182 213 l 14 0 l 0 -18 l 11 -12 l 0 -40 l -36 0 l 0 40 l 11 12 l 0 18").attr({stroke:'#000000'});
			var wire = paper.path("M 194 143 c 0,-70 40,40 60,-13" + "M 183 143 c 6,-90 55,25 63,-18").attr({stroke:"green"});
			var thermoText = paper.text(280,168,"RTD with Head").attr({'font-size':14});
			var staticCharac = paper.text(185,470,"Static Characteristics").attr({'font-size':14});
		},//staticDiag
		
		plotAlert : function(){
			alert("Please calculate minimum 3 values ");
		},
		select : function(event) {
		var target = event.target;
		var change = {};
		change[target.id] = target.value;
		var target = event.target;
		
		switch(target.id) {
			case "Material" :
			RTD.JSon.obj.Mindex = document.getElementById('Material').selectedIndex;
				RTD.handler.obj.setM($("#Material").val());
				$('#save').attr("disabled", false);
			//calling required function
				RTD.handler.obj.selectMaterial();
				break;
			case "resistance":
			RTD.JSon.obj.Rindex = document.getElementById('resistance').selectedIndex;
			$('#save').attr("disabled", false);
				RTD.handler.obj.setR($("#resistance").val());
				RTD.handler.obj.Resistance();
				break;
		}//switch
		},//select
		
		GetTemperature : function(){
			if($("#Material").val() != '0' && $("#resistance") != '0'){
				
				$("#Material").attr("disabled", true).trigger("liszt:updated");
				$("#resistance").attr("disabled", true).trigger("liszt:updated");
					var x = $("#Temperature").val();
				RTD.handler.obj.GetTemperature(x);
				RTD.JSon.obj.gTemp = parseInt($("#Temperature").html());
				$("#Submit").attr("disabled", false);
				$("#Submit").addClass('greenbtn');
			}
		},//GetTemperature
		
		SubmitAnswer : function(){
			var val = $("#Rttext").val();
			var v = RTD.handler.obj.calculateRtd(val);
			RTD.JSon.obj.userVal = val;
			
			if(v == true)
			{	
				$("#Submit").attr("disabled", true);
				$("#Submit").removeClass('greenbtn');
			}
		},//SubmitAnswer
		
		nextSetValue : function(){
			$("#Plot").hide();
			$("#Plot1").show();
			RTD.handler.obj.next()
			$("select").val(0);
			$("#Alpha").html("");
			$("#Range").html("");
			$("#Temperature").html("");
			$("#Rttext").val("");
			$("#Material").attr("disabled", false).trigger("liszt:updated");
			$("#resistance").attr("disabled", false).trigger("liszt:updated");
			
		},//nextSetValue
		
		dynamicLevel : function(){
			
			if(RTD.handler.obj.count == 0)
				alert('Please complete Static characteristics')
			else
			{
					$('#fomulabtnStatic').hide();
					$('#fomulabtnDynamic').show();
					$("#static").hide('slide');
					$("#dynamic").show("slide", {
						direction : "right"
					}, 1000);
	       		}
		}
		
	});//staticView
	 
	var staticGraphView = Backbone.View.extend({
		el : "body",
		
		events :
		{
			"click #Plot" : "init",
		},
		
		initialize : function(){
			this.render();
		},
		
		render : function() {
			$(this.el).append("<div id='static-modal-content'><div id='static-modal-title' >Graph</div><div class='close'><a href='#' class='simplemodal-close'>x</a></div><div id='static-modal-data'><div id='graph' style='width:770px; height:500px; z-index: 999999; '></div><p><button class='action simplemodal-close redbtn'><span class='label'>Close</span></button><span>(or press ESC or click the overlay)</span></p></div></div>");
		},
		init : function(e){
			RTD.handler.obj.count = 1;
			
			$('#nextsetvalue').attr("disabled", false);
			$('#level2').attr("disabled", false);
			$('#level2').addClass('greenbtn');
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
			 RTD.handler.obj.plotStaticData();
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
		// },//open
		// close : function(e){
			// var self = this; // this = SimpleModal object
            // e.container.animate({
                // top: "-" + (e.container.height() + 20)
            // }, 500, function () {
                // $.modal.close(); // or $.modal.close();
            // });
		 }
	});//staticGraphView
	
		
	var dynamicView = Backbone.View.extend({
		el : "#dynamic",
		
		events : {
			'click input' : 'check',
			"change #WS1" : "MaterialForWithShealth",
			"change #WS2" : "withThickness",
			"change #T1" : "ThermowellMaterial",
			"change #T2" : "WithShealthThickness",
			"change #T3" : "fillmaterial",
			"click #Reloadd" : "refresh",
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
						
						RTD.JSon.obj.checkB = false;
						$("#b1").attr('disabled', true);
					}
				else{
					var	k = 71.6, row = 21450, s = 130, L = 15 / (1000), x = 2.0 / (1000);
						RTD.handler.obj.bareElementTimeConstantValue(k, row, s, L, x);
						$("#Plotd").attr('disabled', false);
						$("#Plotd").addClass('greenbtn');
						$("#b1").attr('disabled', false);
						$("#check2").attr('disabled', false);
						RTD.JSon.obj.checkB = true;
						RTD.handler.obj.animateBare();
						RTD.handler.obj.bareGraph();
					}
		},//Bare
		
		WithSheath : function(){
			if(($('#check2').attr('checked')))
					{
						$("#check3").attr('disabled', false);
						$("#WS1").attr('disabled', false).trigger("liszt:updated");
						$("#WS2").attr('disabled', false).trigger("liszt:updated");
						RTD.JSon.obj.checkW = true;
						RTD.handler.obj.animateSheath();
					}
			else{
				RTD.JSon.obj.checkW = false;
				$("#WS1").attr('disabled', true).trigger("liszt:updated");
				$("#WS2").attr('disabled', true).trigger("liszt:updated");
			}
		},//withsheath
		
		Thermowell : function(){
				if(($('#check3').attr('checked')))
				{
					RTD.JSon.obj.checkT = true;
					RTD.handler.obj.animateThermowell();
					$("#T1").attr('disabled', false).trigger("liszt:updated");
					$("#T2").attr('disabled', false).trigger("liszt:updated");
					$("#T3").attr('disabled', false).trigger("liszt:updated");
					
				}
				else{
					RTD.JSon.obj.checkT = false;
					$("#T1").attr('disabled', true).trigger("liszt:updated");
					$("#T2").attr('disabled', true).trigger("liszt:updated");
					$("#T3").attr('disabled', true).trigger("liszt:updated");
				}
			},//Thermowell
		
		MaterialForWithShealth : function(){
			var	opt1 = $("#WS1").val();
			RTD.JSon.obj.materialW = document.getElementById('WS1').selectedIndex;
			RTD.handler.obj.WSMaterial(opt1);
		},//MaterialForWithShealth 
		
		withThickness : function(){
			RTD.JSon.obj.thicknessW = document.getElementById('WS2').selectedIndex;
			var opt2 = parseFloat($("#WS2").val());
			RTD.handler.obj.WSThickness(opt2);
		},
		
		ThermowellMaterial : function(){
			RTD.JSon.obj.materialT = document.getElementById('T1').selectedIndex;
			var opt3 = $("#T1").val();
			RTD.handler.obj.withthermo(opt3);
		},
		
		WithShealthThickness : function(){
			RTD.JSon.obj.thicknessT = document.getElementById('T2').selectedIndex;
			var opt4 = $("#T2").val();
			RTD.handler.obj.withthick(opt4);
		},
		
		fillmaterial : function(){
			RTD.JSon.obj.fillMaterial = document.getElementById('T3').selectedIndex;
			var opt5 = $("#T3").val();
			RTD.handler.obj.FillMaterial(opt5);
		},
		
		refresh : function(){
			window.location.reload(true)
		},
		
		level1 : function(){
			$('#fomulabtnStatic').show();
			$('#fomulabtnDynamic').hide();
			$("#dynamic").hide();
	       					
	       $("#static").show("slide",{ direction: "left" }, 1000);
		}
	});//dynamicView
	
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
			RTD.handler.obj.plotDynamicData();
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
	});
		
	var stateSavingView = Backbone.View.extend({
		el : ".primary1",
		
		events:{
			"click #save" : "savestate",
			"click #open" : "openstate"
		},
		
		savestate : function(){
			$('#saveDialog').dialog({
				title:'Save your State',
				modal : true,
				show: 'fade',
    			hide: 'fade',
				buttons:[{
					text:'Save',
					'class': 'bluebtn',
					click : function(){
						var key = $('#savetxt').val();
						var arr = RTD.JSon.obj.keys;
						if(arr.indexOf(key) != -1){
							alert('This Name already exists ! Save with Some other Name');
						}
						else{
							$('#open').attr('disabled', false);
							RTD.JSon.obj.saveCurrentState(key);
							$(this).dialog('close');
						}
						
					}
				},
				
				{
					text:"Cancel",
					'class':'redbtn',
					click : function(){
						$(this).dialog('close');
					}
				}],
				open: function()
			    {
			        $(".ui-widget-overlay", this).hide().fadeIn();
			    },
			    close: function()
			    {
			        $(".ui-widget-overlay").fadeOut();
			    }
			})
		},
		
		openstate : function(){
			$('#openDialog').dialog({
				title:'open',
				modal : true,
				show: 'fade',
    			hide: 'fade',
				buttons:[{
					text:'Open',
					'class': 'greenbtn',
					click : function(){
						var radios = document.getElementsByName('openCheck');
					    for (var i = 0; i < radios.length; i++) 
					    {
					        if (radios[i].checked) 
					        {
								radioId = radios[i].id;
					            break;
					        }
					    }
						RTD.JSon.obj.openSavedState(radioId);
						$(this).dialog('close');
					}
				},
				{
					text:"Cancel",
					'class':'redbtn',
					click : function(){
						$(this).dialog('close');
					}
				}],
				open: function()
			    {
			        $(".ui-widget-overlay", this).hide().fadeIn();
			    },
			    close: function()
			    {
			        $(".ui-widget-overlay").fadeOut();
			    }
			})
			
		}
	});
	
	var formulaView = Backbone.View.extend({
		el : ".formula",
		
		events:{
			"click #fomulabtnStatic" : "staticFormula",
			"click #fomulabtnDynamic" : "dynamicFormula"
		},
		
		staticFormula : function(){
			window.open("formula_static.html","Formula" ,"left=20,top=20,width=500,height=350,toolbar=1,resizable=0,scrollable=yes");
		},
		
		dynamicFormula : function(){
			window.open("formla_dynamic.html","Formula" ,"left=20,top=20,width=900,height=900,toolbar=1,resizable=0,scrollable=yes");
		}
	});
	
	return {
		staticView : staticView,
		staticGraphView : staticGraphView,
		dynamicView : dynamicView,
		dynamicGraphView  : dynamicGraphView,
		stateSavingView : stateSavingView,
		formulaView : formulaView 
	}
})();