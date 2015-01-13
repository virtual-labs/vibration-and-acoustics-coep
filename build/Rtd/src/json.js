RTD.JSon = (function() {
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
		gTemp : 0,
		thicknessT : 0,
		fillMaterial : 0,
		keys : []
	}
	
	obj.saveCurrentState = function(key) {
		
		addStateObject(key);
		jsobject[key] = {
			"staticLevel" : {
					"Mindex" : obj.Mindex,
					"Rindex" : obj.Rindex,
					"getTemp" : obj.gTemp,
					"userInput" : obj.userVal,
					"status" : obj.eval
				},
				"dynamicLevel" : {
					"bare" : {
						"checked" : obj.checkB,
						"type" : obj.type
					},
					"withsheath" : {
						"checked" : obj.checkW,
						"material" : obj.materialW,
						"thickness" : obj.thicknessW
					},
					"thermowell" : {
						"checked" : obj.checkT,
						"material" : obj.materialT,
						"thickness" : obj.thicknessT,
						"fillMaterial" : obj.fillMaterial
					}
				}
			}
	}
	
	addStateObject = function(key){
		obj.keys.push(key);
		$('#openDialog').append('<label class="objName">' + key + '</label><input type="radio" class="radiobtn" name="openCheck" id="' + key + '"/><br>')
	}

	obj.openSavedState = function(key) {
		var json = jsobject[key];
		var material = json.staticLevel.Mindex;
				var id1 = '#Material';
				changeOption(id1, material);
		
				var ref = json.staticLevel.Rindex;
				var id2 = '#resistance';
				changeOption(id2, ref);
		
				$('#Temperature').html(json.staticLevel.getTemp + '&deg;C');
		
				$('#Rttext').val(json.staticLevel.userInput);
		
				var status = json.staticLevel.status;
				if(status == 1) {
					$("#Submit").addClass('greenbtn');
					$("#Submit").html("<span class='label'>Correct</span>");
					setTimeout(function() {
						$("#Submit").html("<span class='label'>Submit</span>");
					}, 4000);
				} else if(status == 0) {
					$("#Submit").addClass('redbtn');
					$("#Submit").html("<span class='label'>Re-Calculate</span>");
					setTimeout(function() {
						$("#Submit").removeClass('redbtn');
						$("#Submit").html("<span class='label'>Submit</span>");
					}, 4000);
				}
		
				//dynamic level
				var bare = json.dynamicLevel.bare.checked;
				$('#check1').prop('checked', bare);
		
				var withSheath = json.dynamicLevel.withsheath.checked;
				check('#check2', withSheath);
		
				var materialWith = json.dynamicLevel.withsheath.material;
				var id3 = '#WS1';
				changeOption(id3, materialWith);
		
				var thicknessWith = json.dynamicLevel.withsheath.thickness;
				var id4 = '#WS2';
				changeOption(id4, thicknessWith);
		
				var thermo = json.dynamicLevel.thermowell.checked;
				check('#check3', thermo);
		
				var materialThermo = json.dynamicLevel.thermowell.material;
				var id5 = '#T1';
				changeOption(id5, materialThermo);
		
				var thicknessThermo = json.dynamicLevel.thermowell.thickness;
				var id6 = '#T2';
				changeOption(id6, thicknessThermo);
		
				var fillMaterial = json.dynamicLevel.thermowell.fillMaterial;
				var id7 = '#T3';
				changeOption(id7, fillMaterial);
		
	}
	changeOption = function(id, selectNum) {
		$(id + ' option').eq(selectNum).attr('selected', 'selected');
		$(id).chosen().change();
		$(id).trigger("liszt:updated");
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
