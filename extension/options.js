function save_options() {

    var list = document.getElementById('list').checked;
    chrome.storage.sync.set({'list': list}, function() {
        document.getElementById('status').textContent = "Option Saved";
        setTimeout(function(){document.getElementById('status').textContent = '' ;},1000);
    });
}
function save_serveraddr() {
    var serveriptext = document.getElementById('serverip').value;
    chrome.storage.sync.set({'serverip': serveriptext}, function() {
        document.getElementById('serveripstatus').textContent = "Server ip Saved";
        setTimeout(function(){document.getElementById('serveripstatus').textContent = '' ;},1000);
    });
}

function restore_options() {
chrome.storage.sync.get({
    list: true,
  },function(item) {
    document.getElementById('list').checked = item.list;
});
chrome.storage.sync.get({
    serverip: "127.0.0.1",
  },function(item) {
    document.getElementById('serverip').value = item.serverip;
});

}

$(document).ready(function () {

    $("#tabs").tabs();
    document.getElementById('save').addEventListener('click',
    save_options);
    document.getElementById('saveserverip').addEventListener('click',
    save_serveraddr);

});


$("#tabs").tabs();
document.addEventListener('DOMContentLoaded', restore_options);
