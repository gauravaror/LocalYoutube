LocalYoutube - Stream youtube videos locally.
---------------------------------------------------

LocalYoutube is a chrome extension and the backend supporting server to stream the videos on youtube.com from the local server. This will be useful for the people who likes to use youtube as a  music player and listen to same video again and again.
This will in background download the video and next time when you try to watch the same video again. This extension will make the video to be streamed from the local server instead of youtube server, in result saving lot of precious bandwidth.

### INSTALLATION INSTRUCTION.

#### Installing the streaming server.

* Go to the server directory under project(cd server).
* Install all the dependencies of the project using npm(npm install)(install npm if not available).
* Run the streaming server using nodejs(nohup node localyoutube.js > localyoutube.log &).
* Import the https server used by the streaming server in chrome under Authorities).
1. Open settings in chromium.
2. Search for Manage certificates and open the item.
3. Go to Authorities tab and import the key-cert.pem file from server folder.
4. Check all the items to accept the permission to be accepted from certificate.

PS: you can generate a new certificate and use that certificate for same.
When the certificated expire the youtube starts hanging and goinging into infinite loop , if video is not working please create a new certificate.
http://www.akadia.com/services/ssh_test_certificate.html
After following rename the certificates to server.key -> key.pem and server.crt -> key-cert.pem

#### Installing the chromium extension.

* Open the Manage extention page of chromium.
* Check the developer mode if it is not check already.
* Click on load unpacked extensions.
* select the whole extension folder from this project.

And you are done installing the extension.

### Verifying your setup is running

tail the logs of localyoutube which are localyoutube.log if you used the above command and see when you start a new video
your request is reaching server.
OR you can open the developer tool in chromium and filter using 127.0.0.1 and see if request is being server from node server.

### Additional Benefites:

when you are offline you can just enjoy your faviourite videos from the server folder all videos are locally download.


### Contact:

gauravarora.daiict(at)gmail.com

## Issues:
Please raise a bug report on github.
