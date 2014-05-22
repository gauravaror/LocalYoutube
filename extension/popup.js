
function option() {
    var optionsUrl = chrome.extension.getURL("localyoutubeoptions.html");
    chrome.tabs.create({url:optionsUrl});
}


function init() {

    var buttonaction= document.getElementById('options');
    buttonaction.addEventListener('click',option,false);
    chrome.storage.sync.get({
             LenVideo: 0,
             },function(item) {
                var text = "Total Data Served(in bytes): "+ item.LenVideo;
                document.getElementById('lengthsave').textContent = text;
            });
    chrome.storage.sync.get({
             CountVideo: 0,
             },function(item) {
                var text = "Total Number of video's Served: "+ item.CountVideo;
                document.getElementById('countsave').textContent = text;
            });

}    
document.addEventListener('DOMContentLoaded', init);

