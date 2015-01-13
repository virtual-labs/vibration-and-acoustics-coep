var ORIFICE = ORIFICE || {};

$(document).ready(function() {
	$("#fomulabtn").click(function()
				{
					window.open("formula.html","Formula" ,"left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
				});
	$('select').chosen();
	$( ".slider" ).slider();
	
	var measurementView = new ORIFICE.view.measurementView();
	var serviceView = new ORIFICE.view.serviceView();
	var tappingView = new ORIFICE.view.tappingView();
	var temperatureView = new ORIFICE.view.temperatureView();
	var graphView = new ORIFICE.view.graphView();
	//var stateSavingView = new ORIFICE.view.stateSavingView();
	$("#plotMeasure").hide();
	$("#plotService").hide();
	$("#plotTemp").hide();
	$("#plotTapping").hide();
	
});
ORIFICE.view = (function() {
	var b1, d1, b2, d2, s, b3, d3, s1, t, te, b4, d4, s2
	
	var measurementView = Backbone.View.extend({
		el : '#measurementLevel',
		
		initialize : function(){
			ORIFICE.controller.obj.setMid();
		},
		events : {
			"change #betaMeasurement" : "setBeta",
			"change #dMeasurement" : "setd",
			"click #cdMeasurement" : "showCd",
			"click #configMeasurement" : "confirmBox",
			"click #submitMeasure" : "submitUserAns",
			"click #NextSet" : "nextSet",
			"click #level-2" : "service"
		},
		
		setBeta : function(){
			 b1 = parseFloat($('#betaMeasurement').val());
			 ORIFICE.JSon.obj.Betaindex = document.getElementById('betaMeasurement').selectedIndex;
			 $('.beta').html(b1);
			 $('#save').attr('disabled', false);
			ORIFICE.controller.obj.setBetaMeasurement(b1);
			if(d1 != undefined){
				ORIFICE.controller.obj.enable('#configMeasurement')
			}
		},
		
		setd : function(){
			d1 = parseFloat($('#dMeasurement').val());
			ORIFICE.JSon.obj.Dindex = document.getElementById('dMeasurement').selectedIndex;
			$('.d').html(d1 + "mm");
			ORIFICE.controller.obj.setdMeasurement(d1);
			if(b1 != undefined){
				ORIFICE.controller.obj.enable('#configMeasurement')
			}
		},
		 
		confirmBox : function(){
				$.confirm({
					'title'		: 'Configuration',
					'message'	:  'You have selected:<br/> <br/>&beta;:' + b1 + '<br/><br/>D:'
									+ d1 + 'mm<br/><br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function(){
		       					$("#measurement_controlpanel1").hide();
								$("#measurement_controlpanel2").show('slide', {
									direction : 'right'
									}, 700);
								    configuration='<br><h2 align="center">Configuration</h2>'
									+ '<pre>'
									+ '<label class="label1"><b>Calculation for water service with <br />flange taps :</b><br/> '
									+ '<table> '
									+ '<tr><td>&beta;          '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
									+ '<tr><td>D               '+'</td>'+'<td>:</td>' + '<td>' + d1 + 'mm</td></tr>'
								    +'</table>'
									+ '</label></pre>';
									$("#Confige").html(configuration);
							}
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
									}
								}
							}
						});
		},//confirmBox
		
		showCd : function(){
			var cd = $("#lpm").val();
			ORIFICE.JSon.obj.lpm[0] = cd;
			var id = "#showCd";
			ORIFICE.controller.obj.enable('#submitMeasure');
			ORIFICE.controller.obj.calculate(cd, id);
			ORIFICE.JSon.obj.showCd[0] =  $('#showCd').html();
		},
		
		submitUserAns : function(){
			var ans = $("#UserInput1").val();
			var id = "#submitMeasure", plot = "#plotMeasure", next = "#NextSet", level = "#level-2";
			ORIFICE.JSon.obj.userVal[0] = ans;
			ORIFICE.JSon.obj.eval[0] = ORIFICE.controller.obj.checkUserVal(ans, id, plot, next, level);
			var val = ORIFICE.JSon.obj.eval[0];
			if(val == 1){
				$("#submitMeasure").attr({
				'disabled' : true
			});
			
				$(id).removeClass('greenbtn');
			}
			
		},
		
		nextSet : function(){
			
			alert("Change beta & D")
			$("#measurement_controlpanel2").hide();
			$("#measurement_controlpanel1").show('slide', {
					direction : 'right'
			}, 700);
			ORIFICE.controller.obj.nextSetMeasure();
		},
		
		service : function(){
			ORIFICE.controller.obj.changeModel("service");
			$("#measurement_controlpanel2").hide();
			$("#serviceLevel").show();
			$("#service_controlpanel1").show('slide', {direction : 'right'}, 700);
		}
	});
	
	var serviceView = Backbone.View.extend({
		el : '#serviceLevel',
		
		
		events : {
			"click #link-1" : "measurement",
			"click #configService" : "confirmBox",
			"change #service" : "setService",
			"click #level-3" : "tapping",
			"click #submitService" : "submitUserAns",
			"click #NextSetService" : "nextSet",
			"click #cdService" : "showCd"
		},
		measurement : function(){
			ORIFICE.controller.obj.changeModel("measurement");
			$("#serviceLevel").hide();
			$("#measurement_controlpanel1").show('slide', {direction : 'left'}, 700);
		},
		
		tapping : function(){
			$("#canvas_container").hide();
			ORIFICE.controller.obj.changeModel("tapping");
			$("#canvas_tapping").show();
			$("#service_controlpanel2").hide();
			$("#tappingLevel").show();
			$("#tapping_controlpanel1").show('slide', {direction : 'right'}, 700);
		},
		
		setService : function(){
			s = ($('#service').val());
			ORIFICE.JSon.obj.serviceindex = document.getElementById('service').selectedIndex;
			$('.serv').html(s);
			ORIFICE.controller.obj.setService(s);
			ORIFICE.controller.obj.enable('#configService');
		},
		
		showCd : function(){
			var cd = $("#lpm1").val();
			var id = "#showCdService";
			ORIFICE.JSon.obj.lpm[1] = cd;
			ORIFICE.controller.obj.enable('#submitService');
			ORIFICE.controller.obj.calculate(cd, id);
			ORIFICE.JSon.obj.showCd[1] = $('#showCdService').html();
		},
		
		submitUserAns : function(){
			var ans = $("#UserInput2").val();
			var id = "#submitService", plot = "#plotService", next = "#NextSetService", level = "#level-3";
			ORIFICE.JSon.obj.userVal[1] = ans;
			ORIFICE.JSon.obj.eval[1] = ORIFICE.controller.obj.checkUserVal(ans, id, plot, next, level);
			
			var val = ORIFICE.JSon.obj.eval[1];
			if(val == 1){
				$("#submitService").attr({
				'disabled' : true
			});
			
				$(id).removeClass('greenbtn');
			}
		},
		
		nextSet : function(){
			$("#plotService").hide();
			$("#plotService1").show();
			alert("Change Service")
			$("#service_controlpanel2").hide();
			$("#service_controlpanel1").show('slide', {
					direction : 'right'
			}, 700);
			ORIFICE.controller.obj.nextSetService();
		},
		
		confirmBox : function(){
							
				$.confirm({
					'title'		: 'Configuration',
					'message'	:  'You have selected:<br/> <br/>&beta;:' + b1 + '<br/><br/>D:'
									+ d1 + 'mm<br/><br/>Service:'
									+ s +'<br/><br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function(){
		       					$("#service_controlpanel1").hide();
								$("#service_controlpanel2").show('slide', {
									direction : 'right'
									}, 700);
									
									switch(s){
											case "Dilute HCL":
														rvalue=1048;
														$( "#Slider1" ).slider( "option", "min", 1000 );
														$( "#Slider1" ).slider( "option", "max", 3000 );
														configuration1=configuration
														+ '<pre>'
														+ '<label class="label1"><b>Calculation for change in service with <br>flange taps :</b><br/> '
														+ '<table> '
														+ '<tr><td>&beta;            '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
														+ '<tr><td>D               '+'</td>'+'<td>:</td>' + '<td>' + d1 + 'mm</td></tr>'
														+ '<tr><td>&rho;           '+'</td>'+'<td>:</td>' + '<td>' + rvalue + 'Kg/m<sup>3</sup></td></tr>'
													    +'</table>'
														+ '</label></pre>';
														$("#Confige").html(configuration1);
														$('#unitLbl1').text("lph");
														$('#unitLbl2').text("lph");
														//$('#unitLbl3').text("lbh");
											break;
											case "Steam":
														rvalue=1.122;
														$( "#Slider1" ).slider( "option", "min", 5000 );
														$( "#Slider1" ).slider( "option", "max", 15000 );
														$( "#Slider2" ).slider( "option", "min", 5000 );
														$( "#Slider2" ).slider( "option", "max", 15000 );
														$( "#Slider3" ).slider( "option", "min", 5000 );
														$( "#Slider3" ).slider( "option", "max", 15000 );
														configuration1=configuration
														+ '<pre>'
														+ '<label class="label1"><b>Calculation for change in service with <br>flange taps :</b><br/> '
														+ '<table> '
														+ '<tr><td>&beta;            '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
														+ '<tr><td>D               '+'</td>'+'<td>:</td>' + '<td>' + d1 + 'mm</td></tr>'
														+ '<tr><td>Steam Temperature '+'</td>'+'<td>:</td>' + '<td>120 &deg C</td></tr>'
														+ '<tr><td>Steam Pressure '+'</td>'+'<td>:</td>' + '<td>1.987 bar</td></tr>'
														+ '<tr><td>Steam density &rho;           '+'</td>'+'<td>:</td>' + '<td>' + rvalue + 'Kg/m<sup>3</sup></td></tr>'
													    +'</table>'
														+ '</label></pre>';
														$("#Confige").html(configuration1);
														$('#unitLbl1').text("kg/hr");
														$('#unitLbl2').text("kg/hr");
														//$('#unitLbl3').text("kg/h");
											break;	
											case "Air":
														rvalue=3.5346;
														$( "#Slider1" ).slider( "option", "min", 2 );
														$( "#Slider1" ).slider( "option", "max", 6 );
														$( "#Slider2" ).slider( "option", "min", 2 );
														$( "#Slider2" ).slider( "option", "max", 6 );
														
														configuration1=configuration
														+ '<pre>'
														+ '<label class="label1"><b>Calculation for change in service with <br>flange taps :</b><br/> '
														+ '<table> '
														+ '<tr><td>&beta;            '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
														+ '<tr><td>D               '+'</td>'+'<td>:</td>' + '<td>' + d1 + 'mm</td></tr>'
														+ '<tr><td>Air Temperature '+'</td>'+'<td>:</td>' + '<td>20 &deg C</td></tr>'
														+ '<tr><td>Air density &rho;           '+'</td>'+'<td>:</td>' + '<td>' + rvalue + ' at 2 bar pressure</td></tr>'
													    +'</table>'
														+ '</label></pre>';
														$("#Confige").html(configuration1);
														$('#unitLbl1').text("cfm");
														$('#unitLbl2').text("cfm");
														//$('#unitLbl3').text("cfm");
											break;		
										}
										
									
									
							}
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
										
									}
								}
							}
						});
		},//confirmBox
	
	});
	
	var tappingView = Backbone.View.extend({
		el : '#tappingLevel',
		
		events : {
			"click #link-2" : "service",
			"click #configTapp" : "confirmBox",
			"change #Tapp" : "setTapp",
			"click #level-4" : "temperature",
			"click #cdTapping" : "showCd",
			"click #submitTapping" : "submitUserAns",
			"click #NextSetTapping" : "nextSet"
		},
		service : function(){
			$("#tappingLevel").hide();
			$("#service_controlpanel1").show('slide', {direction : 'left'}, 700);
			ORIFICE.controller.obj.changeModel("service");
			$("#canvas_container").show();
			$("#canvas_tapping").hide();
		},
		
		setTapp : function(){
			t = ($('#Tapp').val());
			ORIFICE.JSon.obj.tappindex = document.getElementById('Tapp').selectedIndex;
			 ORIFICE.controller.obj.setTapp(t);
				ORIFICE.controller.obj.enable('#configTapp');
		},
		
		showCd : function(){
			var cd = $("#lpm2").val();
			var id = "#showCdTapping";
			ORIFICE.JSon.obj.lpm[2] = cd;
			ORIFICE.controller.obj.enable('#submitTapping');
			ORIFICE.controller.obj.calculate(cd, id);
			ORIFICE.JSon.obj.showCd[2] = $('#showCdTapping').html();
						
		},
		
		submitUserAns : function(){
			var ans = $("#UserInput3").val();
			var id = "#submitTapping", plot = "#plotTapping", next = "#NextSetTapping", level = "#level-4";
			ORIFICE.JSon.obj.userVal[2] = ans;
			ORIFICE.JSon.obj.eval[2] = ORIFICE.controller.obj.checkUserVal(ans, id, plot, next, level);
			
			var val = ORIFICE.JSon.obj.eval[2];
			if(val == 1){
				$("#submitTapping").attr({
				'disabled' : true
			});
			
				$(id).removeClass('greenbtn');
			}
		},
		
		nextSet : function(){
			$("#plotTapping").hide();
			$("#plotTapping1").show();
			alert("Change Tapping")
			$("#tapping_controlpanel2").hide();
			$("#tapping_controlpanel1").show('slide', {
					direction : 'right'
			}, 700);
			ORIFICE.controller.obj.nextSetTapping();
		},
		
		confirmBox : function(){
							
				$.confirm({
					'title'		: 'Configuration',
					'message'	:  'You have selected:<br/> <br/>&beta;:' + b1 + '<br/><br/>D:'
									+ d1 + 'mm<br/><br/>Service:'
									+ s +'<br/><br/>Taps:'
									+ t +'<br/><br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function(){
		       					$("#tapping_controlpanel1").hide();
								$("#tapping_controlpanel2").show('slide', {
									direction : 'right'
									}, 700);
									configuration2=configuration1
									+ '<pre>'
									+ '<label class="label1"><b>Calculation for change in Tappings :</b><br/> '
									+ '<table> '
									+ '<tr><td>&beta;          '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
									+ '<tr><td>d               '+'</td>'+'<td>:</td>' + '<td>' + d1 + '</td></tr>'
									+ '<tr><td>services        '+'</td>'+'<td>:</td>' + '<td>' +  s + '</td></tr>'
									+ '<tr><td>&rho;           '+'</td>'+'<td>:</td>' + '<td>' + rvalue + '</td></tr>'
									+ '<tr><td>Taps            '+'</td>'+'<td>:</td>' + '<td>' +  t + '</td></tr>'
								    +'</table>'
									+ '</label></pre>';
									$("#Confige").html(configuration2);
							}
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
										
									}
								}
							}
						});
		},//confirmBox
		
		
		temperature : function(){
			$("#tapping_controlpanel2").hide();
			$("#temperatureLevel").show();
			$("#temperature_controlpanel1").show('slide', {direction : 'left'}, 700);
			
			$("#canvas_container").show();
			$("#canvas_tapping").hide();
			ORIFICE.controller.obj.changeModel("temperature");
			console.log("currentModel is: "+ORIFICE.controller.obj);
		}
	
	});
	
	var temperatureView = Backbone.View.extend({
		el : '#temperatureLevel',
		
		events : {
			"click #link-3" : "tapping",
			"click #configTemp" : "confirmBox",
			"change #TempService" : "setTempService",
			"change #Temp" : "setTemp",
			"click #cdTemp" : "showCd",
			"click #submitTemp" : "submitUserAns",
			"click #NextSetTemp" : "nextSet"
		},
		tapping : function(){
			$("#temperatureLevel").hide();
			$("#tapping_controlpanel1").show('slide', {direction : 'left'}, 700);
			ORIFICE.controller.obj.changeModel("tapping");
			$("#canvas_container").hide();
			$("#canvas_tapping").show();
		},
		
		setTempService : function(){
			servT = ($('#TempService').val());
			ORIFICE.JSon.obj.tempServindex = document.getElementById('TempService').selectedIndex;
			ORIFICE.controller.obj.setTempService(servT);
		},
		
		setTemp : function(){
			te = parseInt($('#Temp').val());
			ORIFICE.JSon.obj.tempindex = document.getElementById('Temp').selectedIndex;
			ORIFICE.controller.obj.setTemp(te);
			ORIFICE.controller.obj.enable('#configTemp')
		},
		showCd : function(){
			var cd = $("#lpm3").val();
			var id = "#showCdTemp";
			ORIFICE.JSon.obj.lpm[3] = cd;
			ORIFICE.controller.obj.enable('#submitTemp');
			ORIFICE.controller.obj.calculate(cd, id,"level4");
			ORIFICE.JSon.obj.showCd[3] = $('#showCdTemp').html();
		},
		
		submitUserAns : function(){
			var ans = $("#UserInput4").val();
			var id = "#submitTemp", plot = "#plotTemp", next = "#NextSetTemp", level = "";
			ORIFICE.JSon.obj.userVal[3] = ans;
			ORIFICE.JSon.obj.eval[3] = ORIFICE.controller.obj.checkUserVal(ans, id, plot, next, level);
			
				var val = ORIFICE.JSon.obj.eval[3];
			if(val == 1){
				$("#submitTemp").attr({
				'disabled' : true
			});
			
				$(id).removeClass('greenbtn');
			}
		},
		
		nextSet : function(){
			$("#plotTemp").hide();
			$("#plotTemp1").show();
			alert("Change Servive/Temperature")
			$("#temperature_controlpanel2").hide();
			$("#temperature_controlpanel1").show('slide', {
					direction : 'right'
			}, 700);
			ORIFICE.controller.obj.nextSetTemp();
		},
		
		confirmBox : function(){
			
				$.confirm({
					'title'		: 'Configuration-Level4',
					'message'	:  'You have selected:<br/> <br/>&beta;:' + b1 + '<br/><br/>D:'
									+ d1 + 'mm<br/><br/>Service:'
									+ servT +'<br/><br/>Temperature:'
									+ te +'&deg;C<br/><br/>Taps:'
									+t+'<br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function(){
		       					$("#temperature_controlpanel1").hide();
								$("#temperature_controlpanel2").show('slide', {
									direction : 'right'
									}, 700);
									
									switch(servT){
											case "Steam":
														rvalue=0.598;
														$( "#Slider3" ).slider( "option", "min", 5000 );
														$( "#Slider3" ).slider( "option", "max", 15000 );
														$('#unitLbl3').text("kg/hr");
											break;	
											case "Air":
														rvalue=1.2050;
														$( "#Slider3" ).slider( "option", "min", 2 );
														$( "#Slider3" ).slider( "option", "max", 6 );
														$('#unitLbl3').text("cfm");
											break;		
										}
										
									
									configuration3=configuration2
									+ '<pre>'
									+ '<label class="label1"><b>Effect of change in Temperature :</b><br/> '
									+ '<table> '
									+ '<tr><td>&beta;          '+'</td>'+'<td>:</td>' + '<td>' + b1 + '</td></tr>' 
									+ '<tr><td>D               '+'</td>'+'<td>:</td>' + '<td>' + d1 + '</td></tr>'
									+ '<tr><td>services        '+'</td>'+'<td>:</td>' + '<td>' + servT + '</td></tr>'
									+ '<tr><td>Taps        '+'</td>'+'<td>:</td>' + '<td>' + t + '</td></tr>'
									+ '<tr><td>&rho;           '+'</td>'+'<td>:</td>' + '<td>' + ORIFICE.JSon.obj.rhoVal + 'Kg/m<sup>3</sup></td></tr>'
									+ '<tr><td>Temperature     '+'</td>'+'<td>:</td>' + '<td>' + te + '&nbsp;&deg;C'+'</td></tr>'
									+ '<tr><td>Pressure     '+'</td>'+'<td>:</td>' + '<td>' + ORIFICE.JSon.obj.pressureVal + ' bar</td></tr>'
								    +'</table>'
									+ '</label></pre>';
									$("#Confige").html(configuration3);
									
							}
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
										
									}
								}
							}
						});
		},//confirmBox
	})
	
	var graphView = Backbone.View.extend({ 
			el: 'body',
			
			events : {
				"click #plotMeasure" : "initMeasure",
				"click #plotService" : "initService",
				"click #plotTapping" : "initTapping",
				"click #plotTemp" 	 : "initTemp",
				"click #plotMeasure1" : "plotAlert",
				"click #plotService1" : "plotAlert",
				"click #plotTapping1" : "plotAlert",
				"click #plotTemp1" 	 : "plotAlert"
			},
			
			initialize : function(){
				this.render();
			},
			
			render : function(){
				$(this.el).append("<div id='gph-modal-content'><div id='gph-modal-title'>Graph</div><div class='close'><a href='#' class='simplemodal-close'>x</a></div><div id='gph-modal-data'><div id='graph' style='width:770px; height:500px;z-index: 999999;'></div><p><button class='action simplemodal-close redbtn'><span class='label'>Close</span></button><span>(or press ESC or click the overlay)</span></p></div></div>");
			},
			
			initMeasure : function(e){
				e.preventDefault();
                $("#gph-modal-content").modal({
                    overlayId: 'gph-overlay',
                    containerId: 'gph-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openMeasure,
                    onClose: this.close,
                    minWidth: 800
                });
			},
		plotAlert : function(){
		alert("Please calculate minimum 4 values ");
		},
		openMeasure: function (e) {
			ORIFICE.controller.obj.plotDataMeasure();
             self = this;
             self.container = e.container[0];
              e.overlay.fadeIn('slow', function () {
	                $("#gph-modal-content",  self.container).show();
	                var title = $("#gph-modal-title",  self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
		                    setTimeout(function () {
		                        	var h = $("#gph-modal-data",  self.container).height() + title.height() + 20; // padding
			                        e.container.animate({
			                            height: h
			                        }, 200, function () {
			                            $("div.close",  self.container).show();
			                            $("#gph-modal-data",  self.container).show();
			                        });
		                    }, 300);
	                });
           	 })
        },
        
        initService : function(e){
				e.preventDefault();
			    plotid = e.target.id;
                $("#gph-modal-content").modal({
                    overlayId: 'gph-overlay',
                    containerId: 'gph-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openService,
                    onClose: this.close,
                    minWidth: 800
                });
			},
			
		openService: function (e) {
			ORIFICE.controller.obj.plotDataService();
             self = this;
             self.container = e.container[0];
              e.overlay.fadeIn('slow', function () {
	                $("#gph-modal-content",  self.container).show();
	                var title = $("#gph-modal-title",  self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
		                    setTimeout(function () {
		                        	var h = $("#gph-modal-data",  self.container).height() + title.height() + 20; // padding
			                        e.container.animate({
			                            height: h
			                        }, 200, function () {
			                            $("div.close",  self.container).show();
			                            $("#gph-modal-data",  self.container).show();
			                        });
		                    }, 300);
	                });
           	 })
        },
        
      initTapping : function(e){
				e.preventDefault();
			   plotid = e.target.id;
                $("#gph-modal-content").modal({
                    overlayId: 'gph-overlay',
                    containerId: 'gph-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openTapping,
                    onClose: this.close,
                    minWidth: 800
                });
			},
			
		openTapping: function (e) {
			ORIFICE.controller.obj.plotDataTapping();
             self = this;
             self.container = e.container[0];
              e.overlay.fadeIn('slow', function () {
	                $("#gph-modal-content",  self.container).show();
	                var title = $("#gph-modal-title",  self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
		                    setTimeout(function () {
		                        	var h = $("#gph-modal-data",  self.container).height() + title.height() + 20; // padding
			                        e.container.animate({
			                            height: h
			                        }, 200, function () {
			                            $("div.close",  self.container).show();
			                            $("#gph-modal-data",  self.container).show();
			                        });
		                    }, 300);
	                });
           	 })
        },  
        
        initTemp : function(e){
				e.preventDefault();
			   plotid = e.target.id;
                $("#gph-modal-content").modal({
                    overlayId: 'gph-overlay',
                    containerId: 'gph-container',
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
			
		openTemp: function (e) {
			ORIFICE.controller.obj.plotDataTemp();
             self = this;
             self.container = e.container[0];
              e.overlay.fadeIn('slow', function () {
	                $("#gph-modal-content",  self.container).show();
	                var title = $("#gph-modal-title",  self.container);
	                title.show();
	                e.container.slideDown('slow', function () {
		                    setTimeout(function () {
		                        	var h = $("#gph-modal-data",  self.container).height() + title.height() + 20; // padding
			                        e.container.animate({
			                            height: h
			                        }, 200, function () {
			                            $("div.close",  self.container).show();
			                            $("#gph-modal-data",  self.container).show();
			                        });
		                    }, 300);
	                });
           	 })
        },  
        
         close: function (e) {
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
						var arr = ORIFICE.JSon.obj.keys;
						if(arr.indexOf(key) != -1){
							alert('This Object Name already exists ! Save with Some other Name');
						}
						else{
							$('#open').attr('disabled', false);
							ORIFICE.JSon.obj.saveCurrentState(key);
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
								
								ORIFICE.JSon.obj.openSavedState(radioId);
								$(this).dialog('close');
					        }
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
			});
		},
		
		
	});
	
	
	return {
		measurementView : measurementView,
		serviceView : serviceView,
		tappingView : tappingView,
		temperatureView : temperatureView,
		graphView : graphView,
		stateSavingView : stateSavingView
	}
})();