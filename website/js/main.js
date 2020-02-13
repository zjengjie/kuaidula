var running;
var i = 0;
var sentence = "";
function ToDBC(txtstring) { 
	var tmp = ""; 
	for(var i=0;i<txtstring.length;i++) { 
		if(txtstring.charCodeAt(i)==32) { 
			tmp= tmp+ String.fromCharCode(12288); 
		} else {
			if(txtstring.charCodeAt(i)<127) { 
				tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248); 
			} else {
				tmp += txtstring[i];
			}
		}
		
	} 
	return tmp; 
} 
$(function(){
	$("#night").change(function() {
		if (this.checked) {
			$("body").css("background-color", "black");
			$("#display").css("color", "white");
			$("#input").css("background-color", "grey");
			$("#speed").css("background-color", "grey");
		} else {
			$("body").css("background-color", "antiquewhite");
			$("#display").css("color", "black");
			$("#input").css("background-color", "white");
			$("#speed").css("background-color", "white");
		}
	});
	//read config
	if (localStorage['speed']){
		$('#speed').val(localStorage['speed']);
	} else {
		localStorage['speed'] = 12;
	}
	function reset(deleteinput){
		i = 0;
		if (deleteinput) {
			sentence = "";
			$('#input').val("");
		}
		$('#go').text('快读啦').removeClass('btn-danger').addClass('btn-success');
		window.clearInterval(running);
		running = null;
		$('#display').text('读完啦');
	}
	$('#display').fitText(0.4);
	function holdPosition(){
		$('body').css('padding-top', ($(window).height() - $('#main').height()) / 2 + "px");
	}
	holdPosition();
	window.onresize = holdPosition;
	$('#input').change(function(){
		sentence = ToDBC($('#input').val());
	});	
	$('#go').click(pause);
	$('#speed').change(function(){
		localStorage['speed'] = parseInt($('#speed').val());
		pause();
		pause();
	});
	function pause(){
		if (running == null) {
			running = window.setInterval(function(){
				$('#display').text(((sentence.length > i)? sentence[i] : "") + ((sentence.length > i + 1)? sentence[i + 1] : "") + ((sentence.length > i + 2)? sentence[i + 2] : ""));
				i = i + 1;
				if (i >= sentence.length) {
					reset(false);
				}
			}, 1000 / parseInt($('#speed').val()));
			$('#go').text('暂停').removeClass('btn-success').addClass('btn-danger');
		} else {
			window.clearInterval(running);
			running = null;
			$('#go').text('快读啦').removeClass('btn-danger').addClass('btn-success');
		}
	}
	$('#reset').click(reset);
	window.setTimeout(function(){
		$('#input').trigger('change');
		$('#go').trigger('click');
	}, 100);
});
