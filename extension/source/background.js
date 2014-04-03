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
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create(
        {title: "快读啦", // the title to add to the menu
        contexts:["selection"], // only add if there is a selection
        onclick: kuaidula}
    ); // the code to run when the title is clicked
})
chrome.contextMenus.onClicked.addListener(kuaidula);
 
