var stream;
var videoavailable = false;


var handelerclick = function() {
document.title = "This is Youtube clicked";
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
    vid.addEventListener('loadstart',loadstarthandaler);
    vid.addEventListener('canplay',activateloadstart);
    vid.addEventListener('error',errorhandaler);
  //  vid.addEventListener('abort',errorhandaler);
});

document.addEventListener('load',activateloadstart,true);
document.addEventListener('error',activateloadstart,true);


function activateloadstart() {
    var vid = document.getElementsByTagName('video')[0];
    if (vid && vid.addEventListener) {
        vid.addEventListener('loadstart',loadstarthandaler);
    }
}


function loadstarthandaler () {
    var vid = document.getElementsByTagName('video')[0];
    var videoid = getQueryVariable("v");
    chrome.runtime.sendMessage({onlyList: "get"},function(response) {
        var isList = !(getQueryVariable("list")=="undefined");
        var list = response.list;
        if(!(list && !(isList))){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status==200) {
                    videoavailable= true;
                    var vid = document.getElementsByTagName('video')[0];
                    var videoid = getQueryVariable("v");
                    //    alert(xhr.status);
                    //    alert(videoavailable);
                        if (  videoavailable ) {
                            chrome.runtime.sendMessage({'LenVideo' : xhr.getResponseHeader('len')},function(response){console.log("length added")});;
                            stream = vid.src;
                            vid.src = "https://127.0.0.1:8000/"+videoid+".mp4";
                            vid.autoplay = true
                            vid.removeEventListener('loadstart',loadstarthandaler);
                        }
                } 
                 if (xhr.status == 0) {
                    chrome.runtime.sendMessage({notify: "serverdown"},function(response) {
                        console.log(response);
                    });
                }
         }
        }
        xhr.open("GET", "http://127.0.0.1:8001/"+videoid+".mp4", true);
        xhr.send(null);
        }
    });

}

function windowhashchangeHandaler() {
    alert("hashchangeEvent Fired");
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
    return "undefined"
}

