graphOne = {
	chart : {
		renderTo : 'graph',
		type: 'line',
		zoomType: 'x',
	},
	rangeSelector : {
			selected : 1
	},
	credits : {
		enabled : false
	},
	title : {
		text : '',
		x : -20
	},
	xAxis : {
		title : {
			text : ''
		},
		labels : {
			formatter : function() {
				return this.value;
			}
		}
	},
	yAxis : {
		title : {
			text : 'Rg (Ohm)'
		},
		labels : {
			formatter : function() {
				return this.value;
			}
		}
	},
	tooltip : {
		formatter : function() {
			return 'X = ' + this.x + '  Y = ' + this.y.toFixed(2);
		}
	},
	series : []
}
