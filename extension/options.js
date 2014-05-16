function save_options() {

    var list = document.getElementById('list').checked;
    chrome.storage.sync.set({'list': list}, function() {
        document.getElementById('status').textContent = "Option Saved";
        setTimeout(function(){document.getElementById('status').textContent = '' ;},1000);
    });
}

function restore_options() {
chrome.storage.sync.get({
    list: true,
  },function(item) {
    document.getElementById('list').checked = item.list;
});

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

