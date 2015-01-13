STRAIN.JSon = (function() {
	var jsobject = {};
	var obj = {
		checkB : false,
		checkW : false,
		checkT : false,
		Mindex : 0,
		Rindex : 0,
		materialW : 0,
		thicknessW : 0,
		materialT : 0,
		thicknessT : 0,
		fillMaterial : 0,
		keys : []
	}
	var rTemp, gTemp = "", userVal, eval;

	var dlg = $("#dialog").dialog({
		autoOpen : false,
		buttons : {
			"cancel" : function() {
				$(this).dialog('close');
			}
		}
	});
	dlg.parent().appendTo($("#yourformId"));
	obj.saveCurrentState = function(key) {

		addStateObject(key);
		jsobject[key] = {
			"measurement" : {
				"material" : obj.Mindex,
				"inputVolt" : obj.inputVolt,
				"resistance" : obj.Rindex,
				"config" : obj.config,
				"gauge" : obj.gauge,
				"weight" : obj.wt,
				"userVal" : obj.userVal,
				"status" : obj.eval
			},
			"position" : {
				"position" : obj.pos,
				"outputVolt" : obj.op1,
			},
			"temperature" : {
				"temperature" : obj.temp,
				"outputVolt" : obj.op2,
			}
		}

		
	}
	addStateObject = function(key) {
		obj.keys.push(key);
		$('#openDialog').append('<label class="objName">' + key + '</label><input type="radio" class="radiobtn" name="openCheck" id="' + key + '"/><br>')

	}

	obj.openSavedState = function(key) {
		var json = jsobject[key];
		

		changeOption('#material', json.measurement.material);

		changeOption('#InputVoltage', json.measurement.inputVolt);

		changeOption('#resistance', json.measurement.resistance);

		changeOption('#config', json.measurement.config);

		changeOption('#gaugefactor', json.measurement.gauge);

		changeOption('#inputWeight', json.measurement.weight);

	}
	changeOption = function(id, selectNum) {
		if(selectNum != 0) {
			$(id + ' option').eq(selectNum).attr('selected', 'selected');
			$(id).chosen().change();
			$(id).trigger("liszt:updated");
		}
	}
	check = function(id, x) {
		if(x == true)
			$(id).prop('checked', true);
		else
			$(id).prop('checked', false);

		$(id).trigger('change');
	}
	return {
		obj : obj
	}
})();
