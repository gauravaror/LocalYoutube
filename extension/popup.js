
function option() {
    var optionsUrl = chrome.extension.getURL("localyoutubeoptions.html");
    chrome.tabs.create({url:optionsUrl});
}


function init() {

    var buttonaction= document.getElementById('options');
    buttonaction.addEventListener('click',option,false);

}    
document.addEventListener('DOMContentLoaded', init);

