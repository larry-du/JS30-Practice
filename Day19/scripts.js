//<video class="player"></video>
const video = document.querySelector('.player');
//<canvas class="photo"></canvas>
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
//<div class="strip"></div>
const strip = document.querySelector('.strip');
//<audio class="snap"src="./snap.mp3" hidden></audio>
const snap = document.querySelector('.snap');

const button = document.querySelector('button')


function getVideo() {
    //對使用者提出影像和麥克風連結請求,回傳一個promise
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        //如果使用者允許
        .then(localMediaStream => {
            //console.log(localMediaStream);
            //設定video來源是localMediaStream,並轉換成一個URL物件,讓src可解讀
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log('ohohohohohohohoh', err);
        })
}

function paintToCanvas() {
    //取得影像實際長寬
    const width = video.videoWidth;
    const height = video.videoHeight;

    //讓畫布寬高與與影片相同
    canvas.width = width;
    canvas.height = height;

    //設定每16毫秒,從攝影機取得圖像並放到網頁上
    //可透過return setInterval在外部停止或啟動
    return setInterval(() => {
        //從左上角開始將影像繪製到canvas上
        ctx.drawImage(video, 0, 0, width, height);
        //將圖片轉為Uint8Clamped的陣列(R,G,B,Alpha)
        let pixels = ctx.getImageData(0, 0, width, height);
        //亂數加顏色濾鏡
        // pixels = redEffect(pixels);
        // pixels = colorSplit(pixels)
        // ctx.globalAlpha = 0.1;
        pixels = greenScreen(pixels);
        //將亂數數據返回
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    //播放拍照音效
    snap.currentTime = 0;
    snap.play();

    //從canvas取得base64資料
    const data = canvas.toDataURL('image/jpeg');
    //創建一個a標籤
    const link = document.createElement('a');
    //標籤連結對象為從canvas取得base64資料
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Download Image';
    //將link放入strip裡
    strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        //red
        pixels.data[i] = pixels.data[i + 0] + 100;
        //green
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        //blue
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels
}

function colorSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        //red
        pixels.data[i - 150] = pixels.data[i + 0] + 100;
        //green
        pixels.data[i + 100] = pixels.data[i + 1] - 50;
        //blue
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5;
    }
    return pixels
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];ㄐ
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
button.addEventListener('click', takePhoto)
