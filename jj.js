
// Example Source Video location
var srcvid = "https://www.jibjab.com/video_assets/<video_source_info>.mp4"

var recordedChunks = [];

// Audio track is missing, because video is edited in real-time with help of Canvas so only graphics are streamed. Sound is still there though.
var xcanvas = document.querySelector("canvas");
var xbutton = document.getElementById("play-pause-button");
var xvolume = document.getElementById("volume-button"); // zodat audio niet dubbel wordt afgespeeld.

// Audiostream retrieved with this hack: insert video element pointing to srcvid
var node = document.createElement("video");
node.setAttribute("src", srcvid);
document.querySelector("body").appendChild(node);

var vid = document.querySelector("video");

// Videostream retrieved from Canvas element on page
var stream = xcanvas.captureStream(60);

// Bit of code that adds audiostream to the canvas stream (that is our goal)
var checkExist = setInterval(function() {
  // `mozCaptureStream()` is experimental and Mozilla Firefox specific function instead of `captureStream()` for video
	if (vid.mozCaptureStream(60).getAudioTracks()[0]) {
    console.log("exist");
		stream.addTrack(vid.mozCaptureStream(60).getAudioTracks()[0]); // add audio track
		clearInterval(checkExist);
	}
}, 100);

//console.log(stream);
var options = { mimeType: "video/webm;"};
mediaRecorder = new MediaRecorder(stream, options);

mediaRecorder.ondataavailable = handleDataAvailable;
mediaRecorder.onstop = download;

xbutton.addEventListener("click", function(){vid.play(); xvolume.click(); mediaRecorder.start(1000/60);});

function handleDataAvailable(event) {
  //console.log("data-available");
  if (xbutton.className=="pause" & event.data.size > 0) {
    recordedChunks.push(event.data);
    //console.log(recordedChunks);
    //download();
  }  else if (xbutton.className=="play") {
    //download
    mediaRecorder.stop();
	} else {
    //console.log("not working")
  }
}

function download() {
  var blob = new Blob(recordedChunks, {
    type: "video/webm"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}