
var lastNotificationDelay = 7200000;
var shouldNotify = true;

var messageRouter =  function(request, sender, sendResponse) {
/*    alert(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");*/
    if (request) {
    
        if (request.notify == "serverdown") {
            if (window.webkitNotifications) {
              var notification = window.webkitNotifications.createNotification(
            'icons/localyoutube48.png',                      // The image.
            'Your local streaming server is down', // The title.
            'Start using node localyoutube.js.'      // The body.
            );
            if ( shouldNotify ) {
                notification.show();
                shouldNotify = false;
                setTimeout(function() { shouldNotify = true; },lastNotificationDelay)
                }
            }
            sendResponse({status: "ok"});
        }
        if (request.onlyList == "get") {
            chrome.storage.sync.get({
             list: true,
             },function(item) {
                sendResponse({ list: item.list});
             });
        }
    }
    return true;
};

chrome.runtime.onMessage.addListener(messageRouter);
