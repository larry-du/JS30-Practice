let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //清除起始,避免setInterval重覆執行
    clearInterval(countdown);
    //取得當下時間
    const now = Date.now();
    //當下時間+倒數時間
    const then = now + seconds * 1000;
    //一開始呼叫可顯示剩餘時間
    displayTimeLeft(seconds);
    //結束時間function
    displayEndTime(then);
    //設定一秒後執行
    countdown = setInterval(() => {
        //倒數的秒數＝當下時間+倒數時間-當下時間
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //倒數完畢後,clearInterval
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //開始倒數
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

//顯示結束時間
function displayEndTime(timestamp) {
    //取得結束後時間
    const end = new Date(timestamp);
    const hour = end.getHours();
    // const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    // endTime.textContent = `Be back at${adjustedHour}:${minutes}`;
}

//點擊對應按鈕,有預設倒數時間
function startTimer() {
    //將data屬性值轉為數字
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

//註冊按鈕點擊事件,可對應預設倒數時間
buttons.forEach(button => button.addEventListener('click', startTimer));
//使用document.方式選到對應的name(只有form tag)
document.customForm.addEventListener('submit', function (e) {
    //清除submit預設行為
    e.preventDefault();
    //取得輸入值
    const mins = this.minutes.value;
    //timer傳入值是秒數,需將輸入分鐘轉為秒數
    timer(mins * 60);
    //執行後清除輸入內容
    this.reset();
})