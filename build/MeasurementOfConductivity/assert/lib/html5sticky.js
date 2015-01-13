var stickywidth = 200;
var stickyheight = 148;
var max_notes = 500;
var allowed_tags = '<br /><br><ol></ol><ul></ul><li></li><strong></strong><i></i>';
var html5sticky = {};
var note_index = 0;

html5sticky.addNote = function() {
	var tnotes = $('.note_common').length;
	if(tnotes === max_notes) {
		html5sticky.showMessage('#FFE16B', 'black', 'You can not add any more notes, please delete some to add more.');
		return false;
	}
	var nindex = ++note_index + 'stickynote';
	var bgcolor = html5sticky.getColor();
	var stickynote = $('<div class="note_common ' + bgcolor + '" />').appendTo($('.input-value'));
	html5sticky.addPin(stickynote);
	$(stickynote).append($('<h4>Important Point</h4><div id="PPM"></div><div id="EW"></div>	<div id="DEN"></div>'));
	$(stickynote).append($('<span id="idf_' + nindex + '" />'));
	$('.note_common').css({
		width : stickywidth + 'px',
		height : stickyheight + 'px'
	});
	$('.note_common p').css({
		height : (stickyheight - 60) + 'px',
		width : (stickywidth + 9) + 'px'
	});
	if(!$("#removenotes").is(':visible')) {
		$('#removenotes').slideDown('slow');
	}
};

html5sticky.getColor = function() {
	var text = "";
	var possible = "0123456789";
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return 'stickynote' + 1;
};

html5sticky.getAnimation = function(hideAnimation) {
	var words = new Array();
	if( typeof hideAnimation != 'undefined') {
		words[1] = "hide";
		words[2] = "fadeOut";
		words[3] = "slideUp";
	} else {
		words[1] = "show";
		words[2] = "fadeIn";
		words[3] = "slideDown";
	}
	var rnd = Math.ceil(Math.random() * 3);
	return words[rnd];
};

html5sticky.addPin = function(el) {
	var tag = $('<div align="center"><img src="assert/images/pin.png" alt="" ></div>');
	$(tag).css({
		position : 'absolute',
		zIndex : 99,
		top : -30,
		left : parseInt(stickywidth / 2, 10) - 10
	}).prependTo($(el));
};
