var STRAIN = STRAIN || {};

$(document).ready(function() {
	$("select").chosen();
	
	$("#fomulabtn").click(function() {
		window.open("formula.html", "Formula", "left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
	});


	var meaurementConfigurationView = new STRAIN.view.meaurementConfigurationView();
	var graphView = new STRAIN.view.graphView();
	var DragWeightView = new STRAIN.view.DragWeightView();
	var tempView = new STRAIN.view.tempView();
	//var stateSavingView = new STRAIN.view.stateSavingView();
	$("#plotGraph").hide();
	$("#plotGraph1").hide();
	$("#plotGraph2").hide();
});

STRAIN.view = (function() {
	var m = '', voltage = '', config = '', gauge = '', resistance = '', wt = '', userVoltage = '';
	var meaurementConfigurationView =  Backbone.View.extend({
		el:'#controlpanel',
		
		events : {
			"change select" : "select",
			"click #NextButton" : "confirmBox",
			"click #Submit" : "callcheckUserVoltage",
			"click #nextlevel" : "nextlevel",
			// "click #nextlevel" : "confirmBox1",
			"click #nextsetvalue" : "nextSet",
			"change #inputWeight": "changeWeightSize"
		},
		
		initialize: function() {
			STRAIN.controller.obj.setId()
			this.render();
		},//initialize
		
		render:function (){
			//starting dashed diagram
				STRAIN.controller.obj.makeDiagram();
				STRAIN.controller.obj.makeWBox(420,"10 Kg");
			
		},//render
		
		select : function(event) {
			var target = event.target;
			var change = {};
			change[target.name] = target.value;
			var target = event.target;
			switch(target.id) {
				case "material" :
				STRAIN.JSon.obj.Mindex = document.getElementById('material').selectedIndex;
					material = parseInt($("#material").val());
					s1 = document.getElementById('material');
				    m = s1.options[s1.selectedIndex].text;
					//m = $("#material").val()
					STRAIN.controller.obj.updateMaterial(material);
					$('#InputVoltage, #resistance').attr({'disabled': false}).trigger("liszt:updated");
					break;
				case "InputVoltage" :
				STRAIN.JSon.obj.inputVolt = document.getElementById('InputVoltage').selectedIndex;
					voltage = parseInt($("#InputVoltage").val());
					STRAIN.controller.obj.voltageChange(voltage);
					break;
				case "resistance" :
				STRAIN.JSon.obj.Rindex = document.getElementById('resistance').selectedIndex;
					resistance = parseInt($("#resistance").val());
					STRAIN.controller.obj.resChange(resistance);
					break;
				case "config" :
				STRAIN.JSon.obj.config = document.getElementById('config').selectedIndex;
					config = $("#config").val();
					STRAIN.controller.obj.configChange(config);
					break;
				case "gaugefactor" :
				STRAIN.JSon.obj.gauge = document.getElementById('gaugefactor').selectedIndex;
					gauge = parseFloat($("#gaugefactor").val());
					STRAIN.controller.obj.gaugefactorChange(gauge);
					$('#NextButton').attr({'disabled': false});
					$('#NextButton').addClass('greenbtn');
					break;
				case "inputWeight" :
				STRAIN.JSon.obj.wt = document.getElementById('inputWeight').selectedIndex;
					inputWeight = parseFloat($("#inputWeight").val());
					wt = inputWeight;
					STRAIN.controller.obj.weightChange(inputWeight);
					userVoltage = $("#UserVoltage").val();
					$('#Submit').attr({'disabled': false});
					$('#Submit').addClass('greenbtn');
					break;
			}
	},//select
	
		callcheckUserVoltage : function() {
			var userInputVoltage = $("#UserVoltage").val();
			var v = STRAIN.controller.obj.checkUserVoltage(userInputVoltage);
			if(v == true) {
				$('#Submit').attr({
					'disabled' : true
				});
				$('#Submit').removeClass('greenbtn');
				$("#l1Ans").html(userInputVoltage);
			}
		},

		changeWeightSize : function(){
				//alert($("#inputWeight").val())
				STRAIN.controller.obj.changeWeightSize($("#inputWeight").val());
			},

		confirmBox : function(){
		  if(m == '' || voltage== '' || resistance == '' || gauge == '' || config == '' )
			alert("Please Select Values");
		else{
				$.confirm({
					'title'		: 'Configuration',
					'message'	:  'You have selected:<br/><br/> Material:' + m + '<br/>Input Voltage :'
									+voltage + '<br/>Resistance :'
									+resistance +'<br/>Gauge Factor :'
									+gauge+ '<br/>Configuration :'
									+config +'<br/><br/>Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function()
							{
		       					$("#slide1").hide('slide', {
								direction : 'left'
								}, 700);
								$("#slide2").show('slide', {
								direction : 'right'
								}, 700);
								var configuration='<br><h2 align="center">Configuration</h2>'
									+ '<pre>'
									+ '<label class="label1"><b> You have selected:</b><br/> '
									+ '<table> '
									+ '<tr><td>Material        '+'</td>'+'<td>:</td>' + '<td>' + m + '</td></tr>' 
									+ '<tr><td>Input Voltage   '+'</td>'+'<td>:</td>' + '<td>' + voltage + '</td></tr>'
									+ '<tr><td>Resistance      '+'</td>'+'<td>:</td>' + '<td>' + resistance + '</td></tr>' 
									+ '<tr><td>Gauge Factor    '+'</td>'+'<td>:</td>' + '<td>' + gauge + '</td></tr>' 
									+ '<tr><td>Configuration   '+'</td>'+'<td>:</td>' + '<td>' + config + '</td></tr>' +'</table>'
									+ '</label></pre>';
									$("#Confige").html(configuration);
							}
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
										window.location.reload(true);//important for user's re-selection
									}
								}
							}
						});
			}
		},//confirmBox
		
		
	nextlevel : function() {
		
			$('#system').hide();
			$("#container").hide('slide', {
				direction : 'left'
			}, 700);
			$("#container2").show('slide', {
				direction : 'right'
			}, 700);
			$('#system').hide();
			//STRAIN.controller.obj.dragWeight();
			
			if(m == '' || voltage== '' || resistance == '' || gauge == '' || config == '' || wt == '' || userVoltage == '')
			alert("Please Select Values");
		else{
				$.confirm({
					'title'		: 'Configuration',
					'message'	:  'You have selected:<br/><br/> Material:' + m + '<br/>Input Voltage :'
									+voltage + '<br/>Resistance :'
									+resistance +'<br/>Gauge Factor :'
									+gauge+ '<br/>Configuration :'
									+config +'<br/>Weight : '
									+wt+' Kg <br/>Output Voltage : '
									+STRAIN.JSon.obj.outputV+'<br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons'	: {
						'Yes'	: {
							'class'	: 'blue',
							'action': function()
							{
		       					$("#slide1").hide('slide', {
								direction : 'left'
								}, 700);
								$("#slide2").show('slide', {
								direction : 'right'
								}, 700);
								var configuration='<br><h2 align="center">Configuration</h2>'
									+ '<pre>'
									+ '<label class="label1"><b> You have selected:</b><br/> '
									+ '<table> '
									+ '<tr><td>Material        '+'</td>'+'<td>:</td>' + '<td>' + m + '</td></tr>' 
									+ '<tr><td>Input Voltage   '+'</td>'+'<td>:</td>' + '<td>' + voltage + '</td></tr>'
									+ '<tr><td>Resistance      '+'</td>'+'<td>:</td>' + '<td>' + resistance + '</td></tr>' 
									+ '<tr><td>Gauge Factor    '+'</td>'+'<td>:</td>' + '<td>' + gauge + '</td></tr>' 
									+ '<tr><td>Configuration   '+'</td>'+'<td>:</td>' + '<td>' + config + '</td></tr>' 
									+ '<tr><td>Weight          '+'</td>'+'<td>:</td>' + '<td>' + wt + '</td></tr>'
									+ '<tr><td>Output Voltage  '+'</td>'+'<td>:</td>' + '<td id="outputV">' + STRAIN.JSon.obj.outputV + '</td></tr></table>'
									+ '</label></pre>';
									$("#Confige").html(configuration);
									
							}
							
							
						},
						'No'	: {
							'class'	: 'gray',
							'action': function(){
										window.location.reload(true);//important for user's re-selection
									}
								}
							}
						});
			}
		},
	
	nextSet : function(){
					$("#plotGraph").hide();
					$("#plotGraph11").show();
					$("#slide2").hide('slide', {
							direction : 'left'
						}, 700);
					$("#slide1").show('slide', {
							direction : 'right'
						}, 700);
					STRAIN.controller.obj.next();
					m = '', voltage = '', config = '', gauge = '', resistance = ''
	}
	
		
	});//meaurementConfigurationView
	 
	var DragWeightView =  Backbone.View.extend({
		el : '#container2',
		
		initialize : function(){
			
		},
		
		events : {
			
			"click #link-1" : "measurementLevel",
			"click #level3" : "nextlevel",
			"change #dragWt" :"dragWt" 
		},
		
		dragWt:function () {
			//pos1 = parseInt($('#dragWt').val());
			pos1 = $('#dragWt :selected').text();
			STRAIN.JSon.obj.pos = pos1;
			STRAIN.controller.obj.dragWeight();
		},
		measurementLevel : function(){
			$("#container2").hide('slide', {
			direction : 'left'
			}, 700);
			$("#container").show('slide', {
				direction : 'right'
			}, 700);
			$('#system').show();
		},
		
		nextlevel : function(){
			$('#outputV').html(STRAIN.JSon.obj.op1);
			STRAIN.controller.obj.setIngraphDataContainer2();
			$("#container2").hide('slide', {
			direction : 'left'
			}, 700);
			$("#container3").show('slide', {
				direction : 'right'
			}, 700);
			$("#rgValAtLevel1").html($("#valueRG").val());
			
			//changeWeightSize();
		}
	});

	var tempView = Backbone.View.extend({
		el : '#container3',
		
		events : {
			
			"click #link-2" : "weightLevel",
			"change #tempchange1" : "tempchange",
		},
		
		weightLevel : function(){
			$("#container3").hide('slide', {
			direction : 'left'
			}, 700);
			$("#container2").show('slide', {
				direction : 'right'
			}, 700);
		},
		
		tempchange : function(){
			var temp = $('#tempchange1').val();
			STRAIN.JSon.obj.temp = document.getElementById('tempchange1').selectedIndex;
			STRAIN.controller.obj.setTemp(temp);
			STRAIN.controller.obj.calculateTemp();
		}
	});

var graphView = Backbone.View.extend({
	el : "body",
	initialize : function() {
		this.render();
	},
	events : {
		"click #plotGraph" : "init",
		"click #plotGraph1" :"init1",
		"click #plotGraph2" : "init2",
		"click #plotGraph11" : "plotAlert",
		"click #plotGraph12" :"plotAlert1",
		"click #plotGraph21" : "plotAlert2"
	},
	render : function() {
		$(this.el).append("<div id='cur-modal-content'><div id='cur-modal-title'>Graph</div><div class='close'><a href='#' class='simplemodal-close'>x</a></div><div id='cur-modal-data'><div id='graph' style='width:770px; height:500px;z-index: 999999;'></div><p><button class='action simplemodal-close redbtn'><span class='label'>Close</span></button><span>(or press ESC or click the overlay)</span></p></div></div>");
	},
	init : function(e){		
		e.preventDefault();
                $("#cur-modal-content").modal({
                    overlayId: 'cur-overlay',
                    containerId: 'cur-container',
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
	plotAlert : function(){
			alert("Please calculate minimum 3 values ");
		},
	plotAlert1 : function(){
		alert("Please Drag WeightBox minimum 3 times ");
	},
	plotAlert2 : function(){
		alert("Please select minimum 3 values ");
	},
	init1 : function(e){
		e.preventDefault();
                $("#cur-modal-content").modal({
                    overlayId: 'cur-overlay',
                    containerId: 'cur-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.open1,
                    onClose: this.close,
                    minWidth: 800
                });
	},
	init2 : function(e){
		e.preventDefault();
                $("#cur-modal-content").modal({
                    overlayId: 'cur-overlay',
                    containerId: 'cur-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.open2,
                    onClose: this.close,
                    minWidth: 800
                });
	},
	 open: function (d) {
	 	//$("#nextsetvalue").show();
            STRAIN.controller.obj.plotData();
            self = this;
             self.container = d.container[0];
            d.overlay.fadeIn('slow', function () {
                $("#cur-modal-content",  self.container).show();
                var title = $("#cur-modal-title",  self.container);
                title.show();
                d.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#cur-modal-data",  self.container).height() + title.height() + 20; // padding
                        d.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close",  self.container).show();
                            $("#cur-modal-data",  self.container).show();
                        });
                    }, 300);
                });
            })
        },
       open1: function (d) {
       	 STRAIN.controller.obj.plotDataWeightChange();
           self = this;
             self.container = d.container[0];
            	d.overlay.fadeIn('slow', function () {
                $("#cur-modal-content",  self.container).show();
                var title = $("#cur-modal-title",  self.container);
                title.show();
                d.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#cur-modal-data",  self.container).height() + title.height() + 20; // padding
                        d.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close",  self.container).show();
                            $("#cur-modal-data",  self.container).show();
                        });
                    }, 300);
                });
            })
        },
        open2: function (d) {
           STRAIN.controller.obj.plotDataTemp();
          	 self = this;
             self.container = d.container[0];
            	d.overlay.fadeIn('slow', function () {
                $("#cur-modal-content",  self.container).show();
                var title = $("#cur-modal-title",  self.container);
                title.show();
                d.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#cur-modal-data",  self.container).height() + title.height() + 20; // padding
                        d.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close",  self.container).show();
                            $("#cur-modal-data",  self.container).show();
                        });
                    }, 300);
                });
            })
        },
        close: function (d) {
            var self = this; // this = SimpleModal object
            d.container.animate({
                top: "-" + (d.container.height() + 20)
            }, 500, function () {
                $.modal.close(); // or $.modal.close();
            });
        }
        
});//graphView

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
						var arr = STRAIN.JSon.obj.keys;
						if(arr.indexOf(key) != -1){
							alert('This Name already exists ! Save with Some other Name');
							
						}
						else{
							$('#open').attr('disabled', false);
							STRAIN.JSon.obj.saveCurrentState(key);
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
						STRAIN.JSon.obj.openSavedState(radioId);
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
			});
		}
	});
	
	return {
		meaurementConfigurationView : meaurementConfigurationView,
		graphView : graphView,
		DragWeightView : DragWeightView ,
		tempView : tempView,
		stateSavingView : stateSavingView
	}
})();