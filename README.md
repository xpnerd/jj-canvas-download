# jj-canvas-download
Downloads Canvas Video (working for Mozilla Firefox 82.0 (64-bit))

# Specific Use Case
In this particular example, frames from a video hosted on an external webpage were streamed to a canvas element. The canvas was also edited and the resulting graphic would be rendered to the canvas. When this edited footage was playing sound is heard, but the canvas has no audiotrack. After a long searched I came up with this hack: add node with streamed video and use that audiostream to capture both, rendered image and original sound.

Now the external webpage has to be found, or rather the original video stream (so the sound can be captured). Therefore there is still manual work involved and not dynamic.
1. Start the `Networking` tool in the Dev Tools (`F12`).
2. Refresh Page and look for the call that picks up a `.mp4`.
3. Use the URL and paste as `srcvid` in the code.
4. execute the code in the console.

# Next Steps / Upgrades
1. Find the URL `srcvid` only using code, some links that might help:
    1.1. https://www.moesif.com/blog/technical/apirequest/How-We-Captured-AJAX-Requests-with-a-Chrome-Extension/
    1.2. https://stackoverflow.com/questions/49435341/capture-browser-network-requests-in-javascript
    1.3. https://stackoverflow.com/questions/30643660/tracking-http-requests-sent-by-the-browser-using-javascript-jquery
    1.4. https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
2. If that is used, we probably also need a refresh/reload. So we want a reloading and be able to use the code directly without too much manual works (So callbacks or other hacks). Links that might help:
2.1. https://stackoverflow.com/questions/32726338/run-js-after-page-reload/32726743
2.2. https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
2.3. https://stackoverflow.com/questions/43171598/reloading-page-with-injected-javascript-in-browser
2.4. https://stackoverflow.com/questions/51144555/how-to-keep-the-function-in-chrome-console-and-run-it-after-reloading-the-page
