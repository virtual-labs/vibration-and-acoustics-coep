var CAPACITANCE = CAPACITANCE || {};

$(document).ready(function() {
	$('select').chosen();

	var capacitanceView = new CAPACITANCE.view.capacitanceView();
	var levelView = new CAPACITANCE.view.levelView();
	var GraphView = new CAPACITANCE.view.GraphView();
	var blockDiagView = new CAPACITANCE.view.blockDiagView();
	//var stateSavingView = new CAPACITANCE.view.stateSavingView();
	$("#plotcapacitanceGraph").hide();
	$("#plotCurrentGraph").hide();
});

CAPACITANCE.view = (function() {
	$("#mu").hide();
	var ht, r, s
	var capacitanceView = Backbone.View.extend({
		el : '#exp',

		events : {
			'change select' : 'selection',
			'click #configure' : 'confirmBox'
			
		},

		initialize : function() {
			CAPACITANCE.controller.obj.fainted(400, 390);
			CAPACITANCE.controller.obj.upperPart(0.2);
		},
		
		selection : function(e) {
			var selectId = $(e.target).attr('id');
			if(selectId == 'selectBox1') {
				CAPACITANCE.JSon.obj.height = document.getElementById('selectBox1').selectedIndex;
				ht = parseInt($("#selectBox1").val());
				CAPACITANCE.controller.obj.setHeight(ht);
			} else if(selectId == 'selectBox2') {
				CAPACITANCE.JSon.obj.inR = document.getElementById('selectBox2').selectedIndex;
				r = parseFloat($("#selectBox2").val());
				CAPACITANCE.controller.obj.setRadius(r);
			} else if(selectId == 'selectBox3') {
				CAPACITANCE.JSon.obj.service = document.getElementById('selectBox3').selectedIndex;
				s = parseFloat($("#selectBox3").val());
				s1 = document.getElementById('selectBox3');
				item = s1.options[s1.selectedIndex].text;
				CAPACITANCE.controller.obj.setService(s, item);
				$('#configure').attr('disabled', false);
				$('#configure').addClass('greenbtn');
			}
		},
		confirmBox : function() {
			if(ht == '' || r == '' || s == '') {
				alert("Please select values");
			} else {
				$.confirm({
					'title' : 'Configuration',
					'message' : 'You have selected:<br/> <br/>Height of tank: ' + ht + 'cm<br/>Outer radius: 2.5 cm<br/> Inner Radius: ' + r + ' cm<br/>Span Value: ' + sp + ' cm<br/>Service: ' + item + '<br/><br/> Do you want to <b>CONTINUE?</b> with this Configuration?',
					'buttons' : {
						'Yes' : {
							'class' : 'blue',
							'action' : function() {

								$("#exp").hide("slide", {
									direction : "left"
								}, 1000);

								$("#over").show("slide", {
									direction : "right"
								}, 1000);

							}
						},
						'No' : {
							'class' : 'gray',
							'action' : function() {
							}
						}
					}
				});
			}
		},//confirmBox
	});
	
	var levelView = Backbone.View.extend({
		el : '#over',
		
		events : {
			'change #selectBox4' : 'level',
			'click #userCapacitance' : 'checkUserInput',
			'click #nextVal' : 'next'
		},
		
		level : function(){
			CAPACITANCE.JSon.obj.level = document.getElementById('selectBox4').selectedIndex;
			var l = parseInt($("#selectBox4").val());
			CAPACITANCE.controller.obj.changeLevel(l);
			$('#userCapacitance').attr('disabled', false);
			$('#userCapacitance').addClass('greenbtn');
		},
		
		checkUserInput : function(){
			var ans = parseFloat($("#userInput").val());
			var v = CAPACITANCE.controller.obj.userInput(ans);
			if(v == true)
			{
				$("#userCapacitance").attr("disabled", true);
				$("#userCapacitance").removeClass('greenbtn');
			}
		},
		next : function(){
			CAPACITANCE.controller.obj.next();
		}
	});
	
	GraphView = Backbone.View.extend({
		el:'body',
		events:{
			'click #plotcapacitanceGraph':'initCap',
			'click #plotCurrentGraph':'initCur',
			'click #plotCurrentGraph1':'plotAlert',
			'click #plotcapacitanceGraph1' : 'plotAlert'
		},
		initCap: function (e) {
                e.preventDefault();
                $("#cap-modal-content").modal({
                    overlayId: 'cap-overlay',
                    containerId: 'cap-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openCap,
                    onClose: this.close,
                    minWidth: 800
                });
        },//initCap
        plotAlert : function(){
			alert("Please calculate minimum 3 values ");
		},
        openCap: function (e) {
           CAPACITANCE.controller.obj.plotData_capacitance ();
            var self = this;
            self.container = e.container[0];
            e.overlay.fadeIn('slow', function () {
                $("#cap-modal-content", self.container).show();
                var title = $("#cap-modal-title", self.container);
                title.show();
                e.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#cap-modal-data", self.container).height() + title.height() + 20; // padding
                        e.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close", self.container).show();
                            $("#cap-modal-data", self.container).show();
                        });
                    }, 300);
                });
            })
        },//openCap
        
        initCur: function (e) {
                e.preventDefault();
                $("#cur-modal-content").modal({
                    overlayId: 'cur-overlay',
                    containerId: 'cur-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: this.openCur,
                    onClose: this.close,
                    minWidth: 800
                });
        },//initCap
        
        openCur: function (e) {
            CAPACITANCE.controller.obj.plotData_current();
            var self = this;
            self.container = e.container[0];
            e.overlay.fadeIn('slow', function () {
                $("#cur-modal-content", self.container).show();
                var title = $("#cur-modal-title", self.container);
                title.show();
                e.container.slideDown('slow', function () {
                    setTimeout(function () {
                        var h = $("#cur-modal-data", self.container).height() + title.height() + 20; // padding
                        e.container.animate({
                            height: h
                        }, 200, function () {
                            $("div.close", self.container).show();
                            $("#cur-modal-data", self.container).show();
                        });
                    }, 300);
                });
            })
        },//openCur
        close: function (e) {
            var self = this; // this = SimpleModal Call.object
            e.container.animate({
                top: "-" + (e.container.height() + 20)
            }, 500, function () {
                $.modal.close() // or $.modal.close();
            });
        },//close
        
        
	})//view
	
	
	blockDiagView = Backbone.View.extend({
		el:'body',
		events:{
			'click a[name=modal]':'showBlock',
			'click #mask':'closeMask',
			'click .window':'closeIT',
			'click .close':'closeIT'
		},
		
		//show block diagram on overlay
		showBlock:function(e){
			e.preventDefault();
            var id = $(e.target).attr('href');
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            $('#mask').css({
                'width': maskWidth,
                'height': maskHeight
            });

            $('#mask').fadeIn(1000);
            $('#mask').fadeTo("slow", 0.8);
            var winH = $(window).height();
            var winW = $(window).width();
            $(id).css('top', winH / 2 - $(id).height() / 2);
            $(id).css('left', winW / 2 - $(id).width() / 2);
            $(id).fadeIn(2000);
		},//showBlock
		
		closeMask:function(e){
   			$(e.target).hide();
            $('.window').hide();
	   },
	   
	   closeIT:function(e){
	   			e.preventDefault();
	            $('#mask').hide();
	            $('.window').hide();
	   }
	})
		
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
						var arr = CAPACITANCE.JSon.obj.keys;
						if(arr.indexOf(key) != -1){
							alert('This Object Name already exists ! Save with Some other Name');
						}
						else{
							$('#open').attr('disabled', false);
							CAPACITANCE.JSon.obj.saveCurrentState(key);
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
								CAPACITANCE.JSon.obj.openSavedState(radioId);
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
			})
		}
		
		
	});

	return {
		capacitanceView : capacitanceView,
		levelView : levelView,
		GraphView : GraphView,
		blockDiagView : blockDiagView,
		stateSavingView : stateSavingView
	}

})();
