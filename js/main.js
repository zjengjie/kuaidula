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
	//read config
	if (localStorage['speed']){
		$('#speed').val(localStorage['speed']);
	} else {
		localStorage['speed'] = 12;
	}
	function reset(){
		i = 0;
		sentence = "";
		$('#input').val("");
		$('#go').text('快读啦').removeClass('btn-danger').addClass('btn-success');
		window.clearInterval(running);
		running = null;
		$('#display').text('快读啦');
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
					window.clearInterval(running);
					running = null;
					$('#display').text('读完啦');
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

	$('#input').text("十九八七六五四三二一开始！欢迎使用“快读啦”，你可以不用移动你的眼球就能阅读，相信大家已经明白怎么使用了，请尽兴！");
	$('#input').trigger('change');
	$('#go').trigger('click');
});


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-48583436-1', 'kuaidola.com');
  ga('send', 'pageview');

