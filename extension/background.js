
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
        if (request.LenVideo != undefined) {
//            alert("LenVideo: "+request.LenVideo);
            chrome.storage.sync.get({
             'LenVideo': 0,
             },function(item) {
                var length = parseInt(request.LenVideo);
                length = length + item.LenVideo;
  //              alert("LenVideo1: "+length);
                chrome.storage.sync.set({
                 'LenVideo': length,
                 },function() {
                    console.log("Legth Updated:");
                 });
             });
        }
        if (request.CountVideo == "inc" ) {
            chrome.storage.sync.get({
             'CountVideo': 0,
             },function(item) {
                var length = parseInt(1);
                length = length + parseInt(item.CountVideo);
  //              alert("LenVideo1: "+length);
                chrome.storage.sync.set({
                 'CountVideo': length,
                 },function() {
                    console.log("Legth Number of songs Updated:");
                 });
             });
        }
    }
    return true;
};

chrome.runtime.onMessage.addListener(messageRouter);
