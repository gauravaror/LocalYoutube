
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
                document.getElementById('lengthsave').textContent = item.LenVideo;
            });
    chrome.storage.sync.get({
             CountVideo: 0,
             },function(item) {
                document.getElementById('countsave').textContent = item.CountVideo;
            });

}    
document.addEventListener('DOMContentLoaded', init);

