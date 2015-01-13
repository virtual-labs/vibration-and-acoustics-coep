ORIFICE.JSon = (function() {
	var jsobject = {};
	var obj = {
		Betaindex : 0,
		Dindex : 0,
		serviceindex : 0,
		tappindex : 0,
		tempServindex : 0,
		tempindex : 0,
		lpm : [],
		showCd : [],
		userVal : [],
		eval : [],
		keys : []
	}
	obj.lpm[0] = 0, obj.lpm[1] = 0, obj.lpm[2] = 0, obj.lpm[3] = 0
	var rTemp, gTemp = "", userVal, eval;

	obj.saveCurrentState = function(key) {
		addStateObject(key);
		jsobject[key] = {
			"level1" : {
				"beta" : obj.Betaindex,
				"d" : obj.Dindex,
				"config" : '',
				"Q" : '',
				"lpm" : obj.lpm[0],
				"cd" : obj.showCd[0],
				"submit" : '#submitMeasure',
				"userInput" : obj.userVal[0],
				"status" : obj.eval[0]
			},
			"level2" : {
				"service" : obj.serviceindex,
				"config" : '',
				"Q" : '',
				"lpm" : obj.lpm[1],
				"cd" : obj.showCd[1],
				"submit" : '#submitMeasure',
				"userInput" : obj.userVal[1],
				"status" : obj.eval[1]
			},
			"level3" : {
				"tapping" : obj.tappindex,
				"config" : '',
				"Q" : '',
				"lpm" : obj.lpm[2],
				"cd" : obj.showCd[2],
				"submit" : '#submitMeasure',
				"userInput" : obj.userVal[2],
				"status" : obj.eval[2]
			},
			"level4" : {
				"service" : obj.tempServindex,
				"temperature" : obj.tempindex,
				"config" : '',
				"Q" : '',
				"lpm" : obj.lpm[3],
				"cd" : obj.showCd[3],
				"submit" : '#submitMeasure',
				"userInput" : obj.userVal[3],
				"status" : obj.eval[3]
			},
		}
	}
	addStateObject = function(key) {
		obj.keys.push(key);
		$('#openDialog').append('<label class="objName">' + key + '</label><input type="radio" class="radiobtn" name="openCheck" id="' + key + '"/><br>')
	}

	obj.openSavedState = function(key) {
		var json = jsobject[key];
		//level-1
		var b = json.level1.beta;
		changeOption('#betaMeasurement', b);

		var d = json.level1.d;
		changeOption('#dMeasurement', d);

		//$('#showCd').html(json.level1.cd);

		$('#UserInput1').val(json.level1.userInput);

		checkSubmit(json.level1.status, json.level1.submit);

		$("#Slider").slider('value', json.level1.lpm);
		$('#lpm').val(json.level1.lpm);
		//level-2

		var s = json.level2.service;
		changeOption('#service', s);

		$('#showCdService').html(json.level2.cd);

		$('#UserInput2').val(json.level2.userInput);

		checkSubmit(json.level2.status, json.level2.submit);

		$("#Slider1").slider('value', json.level2.lpm);
		$('#lpm1').val(json.level2.lpm);
		//level-3
		var t = json.level3.tapping;
		changeOption('#service', t);

		$('#showCdTapping').html(json.level3.cd);

		$('#UserInput3').val(json.level3.userInput);

		checkSubmit(json.level3.status, json.level3.submit);
		$("#Slider2").slider('value', json.level3.lpm);
		$('#lpm2').val(json.level3.lpm);
		//level-4
		var st = json.level4.service;
		changeOption('#TempService', st);

		var te = json.level4.temperature;
		changeOption('#Temp', te);

		$('#showCdTemp').html(json.level4.cd);

		$('#UserInput4').val(json.level4.userInput);

		checkSubmit(json.level4.status, json.level4.submit);
		$("#Slider3").slider('value', json.level4.lpm);
		$('#lpm3').val(json.level4.lpm);
	}
	checkSubmit = function(status, sub) {
		if(status == 1) {
			$(sub).addClass('greenbtn');
			$(sub).html("<span class='label'>Correct</span>");
			setTimeout(function() {
				$(sub).html("<span class='label'>Submit</span>");
			}, 4000);
		} else if(status == 0) {
			$(sub).addClass('redbtn');
			$(sub).html("<span class='label'>Re-Calculate</span>");
			setTimeout(function() {
				$(sub).removeClass('redbtn');
				$(sub).html("<span class='label'>Submit</span>");
			}, 4000);
		}
	}
	changeOption = function(id, selectNum) {
		$(id + ' option').eq(selectNum).attr('selected', 'selected');
		$(id).chosen().change();
		$(id).trigger("liszt:updated");
	}
	return {
		obj : obj
	}
})();
