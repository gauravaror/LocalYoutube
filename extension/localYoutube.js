var stream;
var videoavailable = false;


var handelerclick = function() {
document.title = "This is Youtube clicked";
alert(document.title);
}

var handelerplay = function() {
alert("pased");
}


var handelerchange = function() {
document.title = "This is Youtube change";
alert(document.title);
}

document.addEventListener('DOMContentLoaded', function () {
//    alert("sdfsd"+getQueryVariable("v"));
    var vid = document.getElementsByTagName('video')[0];
    var videoid = getQueryVariable("v");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
                if (xhr.status==200) {
                    videoavailable= true;
                }
         }
    }
    xhr.open("GET", "http://127.0.0.1:8001/"+videoid+".mp4", true);
    xhr.send(null);
    vid.addEventListener('loadstart',loadstarthandaler);
    vid.addEventListener('error',errorhandaler);
  //  vid.addEventListener('abort',errorhandaler);
});

function loadstarthandaler () {
    var vid = document.getElementsByTagName('video')[0];
    var videoid = getQueryVariable("v");
//    alert(xhr.status);
//    alert(videoavailable);
    if (videoavailable) {
        stream = vid.src;
        vid.src = "https://127.0.0.1:8000/"+videoid+".mp4";
        vid.autoplay = true
        vid.removeEventListener('loadstart',loadstarthandaler);
    }

}


function errorhandaler() {
    var vid = document.getElementsByTagName('video')[0];
    vid.src = stream;
    vid.autoplay = true
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
