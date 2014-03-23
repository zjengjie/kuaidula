chrome.runtime.onMessage.addListener(
    function(request){
        console.log('Load successful');
        if(request.action == "start"){
            ReadWindow(request.keyCode);
        }
    }

);
function ReadWindow(got){
        var eleContainer = document.createElement("div");
        this.eleContainer = eleContainer;
        var position_left = $(window).width()/2;
        var position_top = $(window).height()/2;
        $(eleContainer).addClass("box-container").css('left',position_left+"px").css('top',position_top+"px"); 
        $(eleContainer).css('box-shadow','10px 10px 5px #888');
        //from kuaidula.com index.php
        $(eleContainer).append("<div id='display' style='text-align: center;margin-top:90px'>快读啦</div>");
        $(eleContainer).append("<textarea id='input' placeholder='请在此处输入想要阅读的文字' style='width: 100%; align-content:center; text-align:center' '></textarea>");
        $(eleContainer).append("<div style='text-align: center; margin-top: 3px;'><label>Speed:</label><input value='12' type='number' id='speed' style='width: 70px;'>字/秒</div>");
        $(eleContainer).append("<div class='row'><div style='align-content:center;text-align: center'><button id='go' style='width: 50%;text-align: center; align-content:center'>快读啦</button></div><div style='align-content:center;text-align: center'><button id='reset' style='width: 50%' >重置</button></div></div>");
        //from kuaidula.com main.js
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
        function reset(deleteinput){
            i = 0;
            if (deleteinput) {
                sentence = "";
                $('#input').val("");
            }
            $('#go').text('快读啦');
            window.clearInterval(running);
            running = null;
            $('#display').text('读完啦');
        }
        $('#display').fitText(0.4);
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
                $('#go').text('暂停');
            } else {
                window.clearInterval(running);
                running = null;
                $('#go').text('快读啦');
            }
        }
        $('#reset').click(reset);
            $('#input').text("十九八七六五四三二一开始！" + got);
        window.setTimeout(function(){
            $('#input').trigger('change');
            $('#go').trigger('click');
            }, 100);
        });
        $("body").append(eleContainer);
        $(eleContainer).fadeIn(200);
    }

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
