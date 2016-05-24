export function convertDuration(duration) {
  let hours = Math.floor(duration / 3600000) % 24;
      hours = hours == '0' ? '' : (hours < 10 && hours > 0 ? '0' + hours + ':' : hours + ':');

  let minutes = Math.floor(duration / 60000) % 60;
  let seconds = ((duration % 60000) / 1000).toFixed(0);

  return hours + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function reverse(array) {
  return array.slice().reverse();
}