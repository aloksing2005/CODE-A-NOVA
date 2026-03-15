let video = document.getElementById("videoPlayer")
let playBtn = document.getElementById("playBtn")
let progress = document.getElementById("progress")
let volume = document.getElementById("volume")
let fileInput = document.getElementById("videoFile")
let fullscreen = document.getElementById("fullscreen")

fileInput.addEventListener("change",function(){

let file = this.files[0]

if(file){
video.src = URL.createObjectURL(file)
}

})

playBtn.addEventListener("click",function(){

if(video.paused){

video.play()
playBtn.innerHTML='<i class="fa-solid fa-pause"></i>'

}else{

video.pause()
playBtn.innerHTML='<i class="fa-solid fa-play"></i>'

}

})

video.addEventListener("timeupdate",function(){

let value = (video.currentTime / video.duration) * 100
progress.value = value

})

progress.addEventListener("input",function(){

video.currentTime = (progress.value / 100) * video.duration

})

volume.addEventListener("input",function(){

video.volume = this.value

})

fullscreen.addEventListener("click",function(){

video.requestFullscreen()

})