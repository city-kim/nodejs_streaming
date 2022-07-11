export default {
  secondToTime: (second: number) => {
    if (second) {
      let count = Math.floor(second)
      let time = {
        hour: 0,
        minute: 0,
        second: 0
      }
      // 시간으로 나눔
      time.hour = Math.floor(count / (24 * 60))
      if (count % (24 * 60)) {
        // 나머지를 분으로 나눈뒤 세팅
        count = count % (24 * 60)
        time.minute = Math.floor(count / 60)
      }
      if (count % 60) {
        // 그외 나머지값은 모두 초
        count = count % 60
        time.second = count % 60
      }
      return `${time.hour ? time.hour + ':' : ''}${time.minute ? time.minute : 0}:${time.second}`
    }
    return '0'
  }
}