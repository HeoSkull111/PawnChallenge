import { ReplaySubject } from 'rxjs';

export class Timer {
  currentTime = 0
  isStart = false
  private isPause = false
  private intervalId: any
  isTimeOut: ReplaySubject<boolean>

  constructor() {
    this.isTimeOut = new ReplaySubject(3);
  }
  startCountDown() {
    this.isStart = true
    this.intervalId = setInterval(() => {
      if (!this.isPause) {
        this.currentTime--
        if (this.currentTime === 0) {
          this.isTimeOut.next(true)
          clearInterval(this.intervalId)
        }
      }
    }, 1000)
  }
  pause() {
    this.isPause = true
  }
  unPause() {
    this.isPause = false
  }
  stop() {
    clearInterval(this.intervalId)
  }

  getFormatTime(): string {
    let minutes = Math.floor(this.currentTime / 60)
    let res = ''
    minutes < 10 ? res += '0' + minutes : res += minutes
    let seconds = this.currentTime - minutes * 60;
    seconds < 10 ? res += ': 0' + seconds : res += ': ' + seconds
    return res
  }
}
