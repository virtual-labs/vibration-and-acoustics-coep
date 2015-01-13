CAPACITANCE.JSon = (function() {
	var jsobject = {};
	var obj = {
		height : 0,
		htStatus : false,
		inR : 0,
		service : 0,
		servStatus : false,
		level : 0,
		ans : 0,
		result : '',
		keys : []
	}
	var rTemp, gTemp = "", userVal, eval;

	obj.saveCurrentState = function(key) {
		addStateObject(key);
		jsobject[key] = {
			"height" : obj.height,
			"htStatus" : obj.htStatus,
			"innerRad" : obj.inR,
			"service" : obj.service,
			"servStatus" : obj.servStatus,
			"level" : obj.level,
			"userVal" : obj.ans,
			"status" : obj.result
		}
	}
	addStateObject = function(key) {
		obj.keys.push(key);
		$('#openDialog').append('<label class="objName">' + key + '</label><input type="radio" class="radiobtn" name="openCheck" id="' + key + '"/><br>')
	}

	obj.openSavedState = function(key) {
		var json = jsobject[key];
		changeOption('#selectBox1', json.height, json.htStatus);
		changeOption('#selectBox2', json.innerRad, false);
		changeOption('#selectBox3', json.service, json.servStatus);
		changeOption('#selectBox4', json.level, false);
		if(status == 1) {
			$('#userCapacitance').addClass('greenbtn');
			$('#userCapacitance').html("<span class='label'>Correct</span>");
			setTimeout(function() {
				$('#userCapacitance').html("<span class='label'>Submit</span>");
			}, 4000);
		} else if(status == 0) {
			$('#userCapacitance').addClass('redbtn');
			$('#userCapacitance').html("<span class='label'>Re-Calculate</span>");
			setTimeout(function() {
				$('#userCapacitance').removeClass('redbtn');
				$('#userCapacitance').html("<span class='label'>Submit</span>");
			}, 4000);
		}
	}
	changeOption = function(id, selectNum, status) {
		if(status == true) {
			$(id).attr('disabled', false).trigger("liszt:updated");
			$(id + ' option').eq(selectNum).attr('selected', 'selected');
			$(id).chosen().change();
			$(id).trigger("liszt:updated");
			$(id).attr('disabled', true).trigger("liszt:updated");
		} else {
			$(id + ' option').eq(selectNum).attr('selected', 'selected');
			$(id).chosen().change();
			$(id).trigger("liszt:updated");
		}
	}
	return {
		obj : obj
	}
})();
