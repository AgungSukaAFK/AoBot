// var YoutubeMp3Downloader = require("youtube-mp3-downloader");
import YoutubeMp3Downloader from "youtube-mp3-downloader";
import prompt from "prompt-sync";
let read = prompt()

//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "ffmpeg",        // FFmpeg binary location
    "outputPath": "./music",    // Output file location (default: the home directory)
    "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
    "queueParallelism": 2,                  // Download parallelism (default: 1)
    "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
    "allowWebm": false                      // Enable download from WebM sources (default: false)
});

//Download video and save as MP3 file
YD.download("h23uTe6LtNs");
// https://youtu.be/kff_DXor7jc

YD.on("finished", function(err, data) {
    // let jsonn = JSON.parse(data)
    console.log(data);
    console.log(`Path: ${data.file}`)
});

YD.on("error", function(error) {
    console.log(error);
});

YD.on("progress", function(progress) {
    setTimeout(() => {
        console.log(JSON.stringify(progress));
        
    }, 2000);
});


// https://www.youtube.com/watch?v=h23uTe6LtNs
// https://youtu.be/kff_DXor7jc
// while(true){
//     let inputt = read("inputt: ");
//     console.log(`raw: ${inputt}`)
//     console.log(`Hasil substring= ${inputt.slice(-11)}`)
// }