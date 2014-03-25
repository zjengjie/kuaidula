var running, i, sentence;
chrome.runtime.onMessage.addListener(
    function (request) {
        console.log('Load successful');
        if (request.action == "start") {
            ReadWindow(request.keyCode);
        }
    }
);

function ReadWindow(got) {
    //function decleration
    function pause() {
        //pause the reading
        if (running == null) {
            running = window.setInterval(function () {
                $('#display').text(((sentence.length > i) ? sentence[i] : "") + ((sentence.length > i + 1) ? sentence[i + 1] : "") + ((sentence.length > i + 2) ? sentence[i + 2] : ""));
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

    function ToDBC(txtstring) {
        //convert all characters to Big
        var tmp = "";
        for (var i = 0; i < txtstring.length; i++) {
            if (txtstring.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            } else {
                if (txtstring.charCodeAt(i) < 127) {
                    tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
                } else {
                    tmp += txtstring[i];
                }
            }

        }
        return tmp;
    }

    function reset(deleteinput) {
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

    //generate box container
    var eleContainer = document.createElement("div");
    this.eleContainer = eleContainer;
    $(eleContainer).addClass("box-container");
    $(eleContainer).attr('id', 'kuaidula-box');
    //from kuaidula.com index.php
    $(eleContainer).append("<div><button id='close'>X</button></div>");
    $(eleContainer).append("<div id='display'>快读啦</div>");
    $(eleContainer).append("<div style='text-align: center'><textarea id='input' placeholder='请在此处输入想要阅读的文字' style='width: 80%;'></textarea></div>");
    $(eleContainer).append("<div id='speedConfigure' style='text-align: center; margin-top: 3px;'><label id='speedLabel'>Speed:</label><input value='12' type='number' id='speed' style='width: 70px;'>字/秒</div>");
    $(eleContainer).append("<div class='row'><div style='align-content:center;text-align: center'><button id='go' style='width: 50%;text-align: center; align-content:center'>快读啦</button></div><div style='align-content:center;text-align: center'><button id='reset' style='width: 50%' >重置</button></div></div>");


    running = null; //indicating whether it is reading
    i = 0; //which character is being read
    sentence = ""; //read content
    //read config
    $("body").append(eleContainer);
    if (localStorage['speed']) {
        $('#speed').val(localStorage['speed']);
    } else {
        localStorage['speed'] = 12;
    }
    $('#input').change(function () {
        sentence = ToDBC($('#input').val());
    });
    $('#speed').change(function () {
        localStorage['speed'] = parseInt($('#speed').val());
        pause();
        pause();
    });
    $('#go').click(pause);
    $('#reset').click(reset);
    //put text received into box
    
    window.setTimeout(function () {
        $('#input').trigger('change');
        $('#go').trigger('click');
    }, 100);
    $(eleContainer).fadeIn(200);
    $("#close").click(function () {
        $(".box-container").remove();
    });
    $('#input').val("五四三二一开始！" + ToDBC(got));
}
