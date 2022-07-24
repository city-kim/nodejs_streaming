import { DateTime } from 'luxon'
const nowDate = DateTime.now() // luxon 현재시간

const secondToTime = (second: number) => {
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
    return `${time.hour ? time.hour + ':' : ''}${time.minute ? time.minute : 0}:${zeroPad(time.second, 2)}`
  }
  return '0:00'
}

const zeroPad = (number: number, size: number) => {
  // 숫자 앞에 사이즈만큼 0 붙이기
  let num = number.toString();
  while (num.length < size) num = '0' + num
  return num;
}

const timeComparison = (time: string) => {
  const afterTime = DateTime.now().diff(DateTime.fromISO(time), ['days', 'hours', 'minutes', 'second']).toObject()
  // 값이 채워지지 않으면 0이기 때문에 높은값 순으로 출력해줌
  if (afterTime.days && afterTime.days > 0) {
    // 일이 있을경우
    return `${afterTime.days}일 전`
  } else if (afterTime.hours && afterTime.hours > 0) {
    return `${afterTime.hours}시간 전`
  } else if (afterTime.minutes && afterTime.minutes > 0) {
    return `${afterTime.minutes}분 전`
  } else if (afterTime.seconds) {
    return `${Math.floor(afterTime.seconds)}초 전`
  }
  return time
}

export { secondToTime, zeroPad, timeComparison }