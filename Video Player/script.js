const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const fullScreen = document.getElementById("full-screen");

// to play and pause videos
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update the play, pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// update progress and timestamp
function updateProgress() {
  //   console.log(video.currentTime);
  //   console.log(video.duration);
  progress.value = (video.currentTime / video.duration) * 100;

  //   get mins
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  //   get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// set video time to progress
function setVideoProgress() {
  video.currentTime = (+video.duration * progress.value) / 100;
}

// stops the video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//   make the video full screen
function toggleFullScreen() {
  video.requestFullscreen();
}

// event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

fullScreen.addEventListener("click", toggleFullScreen);

// WE CAN DO A SIMILAR THING WITH THE AUDIO API
