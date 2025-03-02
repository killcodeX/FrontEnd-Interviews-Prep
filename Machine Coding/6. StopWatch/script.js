class stopWatch {
  constructor() {
    this.hourTime = document.querySelector(".hour-time");
    this.minTime = document.querySelector(".minute-time");
    this.secTime = document.querySelector(".second-time");
    this.startBtn = document.querySelector(".start-btn");
    this.pauseBtn = document.querySelector(".pause-btn");
    this.resetBtn = document.querySelector(".reset-btn");
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.timer = null;
    this.init();
  }

  init() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  start() {
    this.timer = setInterval(() => {
      this.sec += 1;

      if (this.sec === 60) {
        this.sec = 0;
        this.min += 1;
      }

      if (this.min === 60) {
        this.min = 0;
        this.hour += 1;
      }

      this.update();
    }, 1000);
  }

  pause() {
    clearInterval(this.timer);
  }

  reset() {
    clearInterval(this.timer);
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.update();
  }

  update() {
    this.secTime.innerText = this.sec < 10 ? `0${this.sec}` : this.sec;
    this.minTime.innerText = this.min < 10 ? `0${this.min}` : this.min;
    this.hourTime.innerText = this.hour < 10 ? `0${this.hour}` : this.hour;
  }
}

new stopWatch();
