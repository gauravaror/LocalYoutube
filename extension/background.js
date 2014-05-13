

var messageRouter =  function(request, sender, sendResponse) {
/*    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");*/
    if (request.notify == "serverdown") {
        if (window.webkitNotifications) {
          var notification = window.webkitNotifications.createNotification(
        'icons/localyoutube48.png',                      // The image.
        'Your local streaming server is down', // The title.
        'Start using node localyoutube.js.'      // The body.
        );
          notification.show();
    }
        sendResponse({status: "ok"});
    }
  };

chrome.runtime.onMessage.addListener(messageRouter);
