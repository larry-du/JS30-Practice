
// var result = function main() {

//取得播放器元素
const video = document.querySelector('video');
// video.defaultMuted = true;
//取得播放和暫停元素
const playToggle = document.querySelector('button.toggle');
//取得快轉和返回元素
const playSkip = document.querySelectorAll('.player__button[data-skip]');
//取得調整音量與速度元素
const slider = document.querySelectorAll('.player__slider');
// //取得時間進度條元素
const progress = document.querySelector('.progress');
//取得時間條(已過時間)
const progressFilled = document.querySelector('.progress__filled');

//播放暫停
function playPause() {
    //如果video已暫停
    if (video.paused) {
        //播放電影
        video.play();
        //並更換文字內容
        playToggle.textContent = '❚ ❚';
    } else {
        //如果video沒暫停就暫停video
        video.pause();
        //並更換文字內容
        playToggle.textContent = '►';
    }
}
//快轉和返回 
function skipToggle() {
    console.log(this)
    //取得dataset skip值
    video.currentTime += parseFloat(this.dataset.skip);
}

//調整音量與播放速度
function changeVolumeAndRate() {
    // console.log(this)
    //如果input是volume
    if (this.name === 'volume') {
        //影片音量更改
        video.volume = this.value;
    }
    //如果input是playbackRate
    if (this.name === 'playbackRate') {
        //播放速度改變
        video.playbackRate = this.value;
    }
}

//改變進度條
function changePlayStatus() {
    progressFilled.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

//拖移進度條快轉
function changeProgress(e) {
    progressFilled.style.flexBasis = `${(e.offsetX / progress.offsetWidth) * 100}%`;
    video.currentTime = video.duration * (e.offsetX / progress.offsetWidth);
}

//註冊點擊影片播放事件
video.addEventListener('click', playPause);
playToggle.addEventListener('click', playPause);

//註冊快轉和返回事件
playSkip.forEach(skip => skip.addEventListener('click', skipToggle));
//註冊調整音量事件與播放速度
slider.forEach(volumeAndRate => volumeAndRate.addEventListener('click', changeVolumeAndRate));

//註冊播放狀態改變事件
video.addEventListener('timeupdate', changePlayStatus);

//註冊點擊拖移進度條快轉事件
progress.addEventListener('click', changeProgress);
//當按下滑鼠時才執行changeProgress
progress.addEventListener('mousemove', (e) => clicked && changeProgress(e));

//註冊滑鼠按下與放開事件
let clicked = false; // 預設為 false，按下左鍵時才會變成 true
progress.addEventListener('mousedown', () => clicked = true);
progress.addEventListener('mouseup', () => clicked = false);

// }
