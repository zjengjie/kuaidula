function fakePost(textstr) {   
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "http://kuaidula.com/");
    var params = {text: textstr};
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
};
//minify function
fakePostCode = fakePost.toString().replace(/(\n|\t)/gm,'');
function kuaidula(info)
{
    var highlightedtext = info.selectionText;
    console.log('I am backgroud');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'start',
            keyCode: highlightedtext
        });
    });
    //chrome.tabs.create({url: "javascript:" + fakePostCode + "; fakePost('" + escape(highlightedtext) + "');"})
}

chrome.contextMenus.create(
    {title: "快读啦", // the title to add to the menu
    contexts:["selection"], // only add if there is a selection
    onclick: kuaidula}
); // the code to run when the title is clicked
 
